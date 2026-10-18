"""Wyciąga stałe teksty interfejsu (PL) z src/app.js – pomoc przy uzupełnianiu tłumaczeń w src/i18n-dict.js.
Użycie: python3 tools/extract_strings.py src/app.js > strings.json
"""
import json, re, sys

src = open(sys.argv[1], encoding='utf-8').read()
chunks = []


def scan(i, end_char=None):
    """Skanuje kod od i; zwraca indeks za end_char (dla ${...})."""
    depth = 0
    prev = ''
    n = len(src)
    while i < n:
        c = src[i]
        if c in ' \t\r\n':
            i += 1; continue
        if src.startswith('//', i):
            i = src.find('\n', i); i = n if i < 0 else i; continue
        if src.startswith('/*', i):
            i = src.find('*/', i) + 2; continue
        if c in '\'"':
            j = i + 1; buf = []
            while src[j] != c:
                if src[j] == '\\': buf.append(src[j:j + 2]); j += 2; continue
                buf.append(src[j]); j += 1
            chunks.append(''.join(buf)); i = j + 1; prev = 'str'; continue
        if c == '`':
            i = template(i + 1); prev = 'str'; continue
        if c == '/' and (prev in ('', '(', ',', '=', ':', '[', '!', '&', '|', '?', '{', '}', ';', 'return', '+', '-', '*', '%', '<', '>', '~', '^')):
            j = i + 1; cls = False
            while True:
                if src[j] == '\\': j += 2; continue
                if src[j] == '[': cls = True
                elif src[j] == ']': cls = False
                elif src[j] == '/' and not cls: break
                j += 1
            j += 1
            while j < n and src[j].isalpha(): j += 1
            i = j; prev = 'regex'; continue
        if c == '{': depth += 1
        if c == '}':
            if end_char == '}' and depth == 0: return i + 1
            depth -= 1
        m = re.match(r'[A-Za-z_$][\w$]*', src[i:])
        if m:
            prev = m.group(0) if m.group(0) == 'return' else 'id'; i += len(m.group(0)); continue
        prev = c
        i += 1
    return i


def template(i):
    buf = []
    while True:
        c = src[i]
        if c == '\\': buf.append(src[i + 1]); i += 2; continue
        if c == '`': chunks.append(''.join(buf) ); return i + 1
        if src.startswith('${', i):
            chunks.append(''.join(buf) + '\x00'); buf = []
            i = scan(i + 2, '}'); continue
        buf.append(c); i += 1


scan(0)
out = []
seen = set()
for ch in chunks:
    for part in re.split(r'<[^>]*>|\x00|\n', ch):
        t = re.sub(r'\s+', ' ', part.replace('&nbsp;', ' ')).strip(' ·–—,:;()')
        if len(t) < 2 or not re.search(r'[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]', t): continue
        if re.search(r'[{};=]|=>|\$\{', t): continue
        if ' ' not in t and re.fullmatch(r'[a-z0-9_\-.:#]+', t): continue  # klasy, identyfikatory
        if re.fullmatch(r'[\w\-]+( [\w\-]+)+', t) and t == t.lower() and not re.search(r'[ąćęłńóśźż]', t) and len(t.split()) <= 4 and not re.search(r'\b(dni|tyg|os|min|temu|teraz|nigdy|brak|wolne|auto|dom|miejsc|godz|nie|do|na|w|z)\b', t): continue
        if t not in seen: seen.add(t); out.append(t)
print(json.dumps(out, ensure_ascii=False, indent=0))
