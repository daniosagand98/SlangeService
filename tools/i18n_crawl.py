"""Przechodzi przez wszystkie ekrany i okna aplikacji w wybranym języku i wypisuje teksty bez tłumaczenia.
Użycie (po `node build.js`):  python3 tools/i18n_crawl.py no  > brakujace.json
"""
import json, os, sys
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URL = 'file://' + os.path.join(ROOT, 'preview.html')
LANG = sys.argv[1] if len(sys.argv) > 1 else 'no'
ROLES = ['admin', 'kierownik', 'foreman', 'ksiegowa', 'pracownik']
SKIP_ACTS = {'go', 'go-user', 'view-as-role', 'view-as-reset', 'logout', 'reset-demo', 'backup', 'bk-all', 'bk-user', 'bk-user-id', 'bk-parts', 'acc-backup',
             'set-lang', 'card-accept', 'card-reject', 'approve-user', 'reject-user', 'report-status', 'acc-toggle', 'pay-export', 'export-hours', 'guide-print',
             'msg-orig', 'preset', 'g-zoom', 'g-fit', 'pick', 'drop', 'close-modal', 'close-modal-bg', 'close-menu', 'reset-dismiss', 'ticket-dl', 'dl-file',
             'view-file', 'install-now', 'install-hide', 'new-recovery', 'rm-split', 'add-split', 'card-cancel', 'group-shift', 'group-del', 'house-del', 'car-del',
             'user-del', 'doc-del', 'hours-del', 'project-del', 'ticket-del', 'refuel-del', 'trip-search', 'pitch-full', 'pitch-next', 'pitch-prev'}


def main():
    miss = {}
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={'width': 1280, 'height': 900})
        pg.route('**/fonts.googleapis.com/**', lambda r: r.abort())
        pg.route('**/api.mymemory.translated.net/**', lambda r: r.abort())
        pg.route('**/api.entur.io/**', lambda r: r.abort())
        pg.on('dialog', lambda d: d.dismiss())
        errs = []
        pg.on('pageerror', lambda e: errs.append(str(e)))
        pg.goto(URL); pg.wait_for_timeout(500)
        pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(700)
        pg.evaluate(f"DB.users.forEach(u => u.lang = '{LANG}'); save(); render();")
        # ekran logowania (wszystkie zakładki)
        for tab in ['login', 'register', 'reset']:
            pg.evaluate(f"(() => {{ const r = REAL; REAL = null; AUTH_TAB = '{tab}'; try {{ renderAuth(); }} catch (e) {{}} REAL = r; }})()"); pg.wait_for_timeout(150)
        pg.evaluate("render()")
        for role in ROLES:
            pg.evaluate(f"(() => {{ const c = activeUsers().filter(u => u.role === '{role}'); ME = c[0] || ME; render(); }})()")
            views = pg.evaluate("NAV.filter(navOk).map(n => n.id).concat(['user'])")
            for v in views:
                arg = "crew()[0]?.id" if v == 'user' else 'null'
                pg.evaluate(f"go('{v}', {arg})"); pg.wait_for_timeout(200)
                # zakładki w widoku
                for tab_act in ['hours-tab', 'pay-tab', 'rep-tab', 'guide-tab', 'ticket-filter', 'g-filter', 'guide-lang']:
                    n = pg.locator(f'.view [data-act="{tab_act}"]').count()
                    for i in range(n):
                        try: pg.locator(f'.view [data-act="{tab_act}"]').nth(i).click(timeout=800); pg.wait_for_timeout(120)
                        except Exception: pass
                    if n: pg.evaluate(f"go('{v}', {arg})"); pg.wait_for_timeout(120)
                acts = pg.evaluate("[...new Set([...document.querySelectorAll('[data-act]')].map(e => e.dataset.act))]")
                for a in acts:
                    if a in SKIP_ACTS or a.endswith('-tab') or a in ('ticket-filter', 'g-filter', 'guide-lang', 'g-full', 'menu'): continue
                    try:
                        pg.locator(f'[data-act="{a}"]').first.click(timeout=800); pg.wait_for_timeout(250)
                        # w oknie: kliknij też akcje wewnątrz (np. kafelki Moje konto)
                        inner = pg.evaluate("[...new Set([...document.querySelectorAll('#modal-root [data-act]')].map(e => e.dataset.act))]")
                        for ia in inner:
                            if ia in SKIP_ACTS or ia == a: continue
                            try:
                                pg.locator(f'#modal-root [data-act="{ia}"]').first.click(timeout=600); pg.wait_for_timeout(200)
                                pg.evaluate("closeModal()"); pg.wait_for_timeout(150)
                                pg.locator(f'[data-act="{a}"]').first.click(timeout=600); pg.wait_for_timeout(200)
                            except Exception: pass
                    except Exception: pass
                    pg.evaluate("closeModal(); closeMenu();"); pg.wait_for_timeout(120)
                    if pg.evaluate("VIEW") != v: pg.evaluate(f"go('{v}', {arg})"); pg.wait_for_timeout(150)
            pg.evaluate("openMenu()"); pg.wait_for_timeout(200); pg.evaluate("closeMenu()")
        for k in pg.evaluate("[...TR_MISS]"):
            miss[k] = 1
        b.close()
    print(json.dumps(sorted(miss), ensure_ascii=False, indent=0))
    if errs: print('BŁĘDY JS:', errs[:5], file=sys.stderr)


if __name__ == '__main__':
    main()
