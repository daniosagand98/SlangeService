"""Generuje zrzuty ekranu do instrukcji (guide/*.webp) i pozycje numerków (src/guide-data.js).
Użycie (po `node build.js`):  python3 tools/guide_shots.py  &&  node build.js
Wymaga: pip install playwright pillow  oraz  playwright install chromium
"""
import io, json, os, sys
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'guide')
URL = 'file://' + os.path.join(ROOT, 'preview.html')
os.makedirs(OUT, exist_ok=True)

M = dict(width=390, height=844)       # telefon
D = dict(width=1280, height=820)      # komputer

# (id, viewport, rola, kod JS przygotowujący ekran, lista selektorów numerków [selector, nth])
WORKER_SETUP = """
const ws = crew().filter(u => u.role === 'pracownik');
const score = u => DB.tickets.filter(t => t.groupId === u.groupId).length * 3 + DB.cardTransfers.filter(t => t.status === 'pending' && t.toId === u.id).length * 5 + DB.docs.filter(d => d.userId === u.id).length;
const w = ws.sort((a, b) => score(b) - score(a))[0];
const f = DB.users.find(u => u.role === 'foreman');
if (!DB.messages.some(m => m.id === 'guide-msg')) DB.messages.push({ id: 'guide-msg', lang: 'no', fromId: f.id, toType: 'user', toId: w.id, text: 'Hei! I morgen starter vi kl. 07:00 på Rosendal. Husk hjelm og vernesko.', tr: { pl: 'Cześć! Jutro zaczynamy o 7:00 w Rosendal. Pamiętaj o kasku i butach ochronnych.' }, createdAt: Date.now() - 600000, readBy: [] });
if (!DB.cardTransfers.some(t => t.status === 'pending' && t.toId === w.id) && DB.fuelCards[0]) DB.cardTransfers.push({ id: 'guide-ct', cardId: DB.fuelCards[0].id, fromId: f.id, toId: w.id, byId: f.id, status: 'pending', createdAt: Date.now() - 3600e3 });
if (!DB.tickets.some(t => t.groupId === w.groupId && t.date >= isoLocal())) DB.tickets.push({ id: 'guide-tk', groupId: w.groupId, direction: rotStatus(groupById(w.groupId), isoLocal()) === 'NO' ? 'PL' : 'NO', userIds: [], date: addDays(isoLocal(), 8), depTime: '07:25', arrTime: '09:20', flightNo: 'DY1074', airportNO: 'BGO', airportPL: 'Gdańsk (GDN)', note: 'Bagaż rejestrowany 23 kg w cenie.', fileIds: [], createdBy: f.id, createdAt: Date.now() });
save(); ME = w; window.__W = w.id;
"""
REP_SETUP = """DB.reports = DB.reports.filter(r => !String(r.id).startsWith('g-')); const ws = crew().filter(u => u.role === 'pracownik');
DB.reports.push({ id: 'g-1', type: 'complaint', title: 'Hałas w domu po 23:00', text: 'Od tygodnia ktoś puszcza głośno muzykę w nocy.', fromId: ws[0].id, anon: true, fileIds: [], status: 'open', createdAt: Date.now() - 3600e3 },
 { id: 'g-2', type: 'request', title: 'Brak ciepłej wody', text: 'W Sjøbu 4 od wczoraj nie ma ciepłej wody.', fromId: ws[1].id, anon: false, fileIds: [], status: 'open', createdAt: Date.now() - 7200e3 }); save();"""
BUG_SETUP = """DB.reports.push({ id: 'g-3', type: 'bug', title: 'Godziny – zapis dnia', text: 'Po zapisaniu dnia lista się nie odświeża.', fromId: crew()[2].id, anon: false, fileIds: [], status: 'open', createdAt: Date.now() - 600e3 }); save();"""
CAR_SETUP = """const c = DB.cars[1] || DB.cars[0]; const w = crew().find(u => u.role === 'pracownik'); DB.reports = DB.reports.filter(r => !String(r.id).startsWith('gc-'));
DB.reports.push({ id: 'gc-1', type: 'car', carId: c.id, title: 'Lampka na desce', text: 'Świeci kontrolka silnika.', fromId: w.id, anon: false, fileIds: [], status: 'open', createdAt: Date.now() - 5400e3 },
 { id: 'gc-2', type: 'car', carId: c.id, title: 'Opony / koła', text: 'Lewa tylna opona traci powietrze.', fromId: w.id, anon: false, fileIds: [], status: 'open', createdAt: Date.now() - 86400e3 }); save();"""
SCREENS = [
    # pracownik (telefon)
    ('w-dash', M, 'pracownik', WORKER_SETUP + "go('dash');", [('.hero', 0), ('.hero-act .btn, .hero-act button', 0), ('[data-act=card-accept]', 0), ('.stat', 1), ('.bnav', 0)]),
    ('w-menu', M, 'pracownik', WORKER_SETUP + "go('dash'); openMenu();", [('.sheet-grid', 0), ('.sheet .me.wide', 0), ('.sheet .acc-langs', 0)]),
    ('w-hours', M, 'pracownik', WORKER_SETUP + "ST.hoursTab='mine'; go('hours');", [('.hform input[type=date]', 0), ('.splits', 0), ('form[data-sub=hours-add] button[type=submit]', 0), ('.bigtot', 0)]),
    ('w-pay', M, 'pracownik', WORKER_SETUP + "ST.hoursTab='mine'; go('hours');", [('.paybig', 0), ('.paytab', 0), ('.paycalc', 0)], '.mypay'),
    ('w-rota', M, 'pracownik', WORKER_SETUP + "go('rota');", [('.hero2', 0), ('.cal', 0)]),
    ('w-tickets', M, 'pracownik', WORKER_SETUP + "go('tickets');", [('.ticket .route', 0), ('.tk-r .thumbs', 0), ('[data-act=trip-plan]', 0)]),
    ('w-cards', M, 'pracownik', WORKER_SETUP + "go('cards');", [('[data-act=card-accept]', 0), ('[data-act=card-history]', 0)]),
    ('w-msgs', M, 'pracownik', WORKER_SETUP + "go('msgs');", [('.m-tr', 0)]),
    ('w-account', M, 'pracownik', WORKER_SETUP + "go('dash'); ACT.profile();", [('#modal-root .acc-langs', 0), ('[data-act=acc-pass]', 0), ('[data-act=acc-boss]', 0), ('#modal-root [data-act=car-problem]', 0), ('[data-act=acc-bug]', 0)]),
    ('w-anon', M, 'pracownik', WORKER_SETUP + "go('dash'); ACT['acc-boss']();", [('.seg3', 0), ('#mform [name=title]', 0), ('.anon-box', 0), ('#mform [name=shots]', 0)], None, "document.querySelector('.rchip input[value=complaint]').checked=true; document.querySelector('[name=title]').value='Hałas w domu po 23:00'; document.querySelector('[name=text]').value='Od tygodnia ktoś puszcza głośno muzykę w nocy.'; document.querySelector('[name=anon]').checked=true;"),
    ('w-carprob', M, 'pracownik', WORKER_SETUP + "go('dash'); ACT['car-problem']({dataset:{}});", [('#mform [name=carId]', 0), ('#mform [name=title]', 0), ('#mform [name=text]', 0), ('#mform [name=urgent]', 0)], None, "document.querySelector('[name=text]').value='Od rana świeci kontrolka silnika, auto szarpie przy ruszaniu.';"),
    # foreman (telefon)
    ('f-team', M, 'foreman', "ST.hoursTab='team'; go('hours');", [('.tabs', 0), ('.view .row.wrap.gap', 0), ('.trow', 0)]),
    ('f-add', M, 'foreman', "go('hours'); ACT['hours-add-for']({dataset:{}});", [('#mform [name=userId]', 0), ('#mform input[type=date]', 0), ('#mform .splits', 0)]),
    ('f-proj', M, 'foreman', "go('projects');", [('.pcard, .view .card', 0), ('.top .btn.primary', 0)]),
    ('f-msg', M, 'foreman', "go('msgs'); msgModal('group', DB.groups[0].id);", [('#mform [name=toType]', 0), ('#mform [name=text]', 0)], None, "document.querySelector('[name=text]').value='Jutro zebranie o 7:00 przy warsztacie.';"),
    # kierownik (komputer)
    ('k-dash', D, 'kierownik', "go('dash');", [('.qa', 0), ('.alert', 0), ('.stats', 0), ('.view .grid2 .card', 0), ('.view .grid2 .card', 1)]),
    ('k-map', D, 'kierownik', "GV.map=null; go('houses');", [('.gpanel', 0), ('.gn:not(.hub)', 0), ('.gcar', 0), ('.top .btn', 0)]),
    ('k-cars', D, 'kierownik', CAR_SETUP + "go('cars');", [('.cprob.big', 0), ('.car-big', 0), ('.car-probs .btn', 0)]),
    ('k-rot', D, 'kierownik', "go('rotations');", [('.rotc', 0), ('.rotc .row.gap', 0), ('.top .btn.primary', 0)]),
    ('k-plan', D, 'kierownik', "go('rotations');", [('.board', 0), ('.tl-wrap', 0)], '.board'),
    ('k-tickets', D, 'kierownik', "go('tickets');", [('.top .btn.primary', 0), ('.ticket', 0), ('[data-act=trip-plan]', 0)]),
    ('k-people', D, 'kierownik', "go('people');", [('[data-act=approve-user]', 0), ('[data-act=admin-set-pass]', 0), ('.ucard', 0)]),
    ('k-reports', D, 'kierownik', REP_SETUP + "go('reports');", [('.tabs', 0), ('.av.anon', 0), ('.rep .row.gap', 0)]),
    ('k-backup', D, 'kierownik', "go('backup');", [('[data-act=bk-all]', 0), ('[data-act=bk-user]', 0), ('.bk-parts', 0), ('.filebtn', 0)]),
    # księgowa (komputer)
    ('q-dash', D, 'ksiegowa', "go('dash');", [('.maplink .btn', 0), ('.maplink .grow', 0), ('.side .nav', 0)]),
    ('q-run', D, 'ksiegowa', "ST.payTab='run'; go('pay');", [('.mpick', 0), ('.stats', 0), ('.paytbl tbody tr', 0), ('[data-act=pay-export]', 0)]),
    ('q-detail', D, 'ksiegowa', "ST.payTab='run'; go('pay'); payDetail(crew()[1]);", [('#modal-root .paytab', 0), ('#modal-root .li', 0)]),
    ('q-user', D, 'ksiegowa', "ST.payTab='run'; go('pay'); ACT['pay-user']({dataset:{id: crew()[1].id}});", [('#mform [name=rate]', 0), ('#mform [name=tax]', 0), ('#mform [name=bonus]', 0)]),
    ('q-rates', D, 'ksiegowa', "ST.payTab='rates'; go('pay');", [('form[data-sub=pay-rates] .card', 0), ('form[data-sub=pay-rates] .grid2 .card', 0), ('form[data-sub=pay-rates] .grid2 .card', 1), ('form[data-sub=pay-rates] > .card', 1)]),
    ('q-hours', D, 'ksiegowa', "ST.hoursTab='team'; go('hours');", [('.tabs', 0), ('.trow', 0)]),
    # admin (komputer)
    ('a-panel', D, 'admin', "go('admin');", [('.view .grid2 .card', 0), ('.view .grid2 .card', 1), ('.acctbl', 0), ('.log', 0)]),
    ('a-preview', D, 'admin', "ME = activeUsers().find(u => u.role === 'pracownik'); go('dash');", [('.pbar .seg', 0), ('.pbar-sel', 0)]),
    ('a-reports', D, 'admin', REP_SETUP + BUG_SETUP + "go('reports');", [('.rep .pill.warn', 0), ('.anon-who', 0), ('.rep .row.gap', 0)]),
]
LANGS = ['pl', 'no', 'en']

CSS = """*{animation:none!important;transition:none!important;caret-color:transparent!important}
#toasts{display:none!important} .ibanner{display:none!important}"""


def main():
    marks = {}
    with sync_playwright() as p:
        b = p.chromium.launch()
        for L in LANGS:
          for spec in SCREENS:
            sid, vp, role, js, sels = spec[:5]
            anchor = spec[5] if len(spec) > 5 else None
            post = spec[6] if len(spec) > 6 else None
            mobile = vp is M
            ctx = b.new_context(viewport=vp, device_scale_factor=1.3 if mobile else 1, is_mobile=mobile, has_touch=mobile, locale={'pl': 'pl-PL', 'no': 'nb-NO', 'en': 'en-GB'}[L], timezone_id='Europe/Oslo')
            pg = ctx.new_page()
            pg.route('**/fonts.googleapis.com/**', lambda r: r.abort())
            pg.goto(URL); pg.wait_for_timeout(500)
            pg.evaluate("localStorage.clear()"); pg.reload(); pg.wait_for_timeout(700)
            pg.evaluate(f"DB.users.forEach(u => u.lang = '{L}'); save();")
            pg.add_style_tag(content=CSS + ('' if sid == 'a-preview' else '.pbar{display:none!important}'))
            pg.evaluate(f"(() => {{ const r = '{role}'; const c = activeUsers().filter(u => u.role === r); ME = c[0] || ME; }})()")
            pg.evaluate(f"(() => {{ {js} }})()")
            pg.wait_for_timeout(900)
            if post: pg.evaluate(post); pg.wait_for_timeout(200)
            pg.add_style_tag(content=CSS + ('' if sid == 'a-preview' else '.pbar{display:none!important}'))
            pg.evaluate("document.documentElement.style.scrollBehavior='auto'; window.scrollTo(0, 0)"); pg.wait_for_timeout(150)
            if anchor:
                pg.evaluate(f"document.querySelector('{anchor}')?.scrollIntoView({{block:'start'}}); window.scrollBy(0,-12)")
                pg.wait_for_timeout(300)
            pts = []
            for sel, nth in sels:
                loc = pg.locator(sel)
                if loc.count() <= nth:
                    print(f'  ! {sid}: brak {sel}[{nth}]', file=sys.stderr); pts.append(None); continue
                bb = loc.nth(nth).bounding_box()
                if not bb:
                    print(f'  ! {sid}: niewidoczny {sel}', file=sys.stderr); pts.append(None); continue
                x = min(max(bb['x'] + 4, 6), vp['width'] - 30); y = min(max(bb['y'] + 4, 6), vp['height'] - 30)
                pts.append([round(x / vp['width'] * 100, 2), round(y / vp['height'] * 100, 2)])
            png = pg.screenshot()
            im = Image.open(io.BytesIO(png)).convert('RGB')
            if not mobile: im = im.resize((int(im.width * 0.9), int(im.height * 0.9)), Image.LANCZOS)
            im.save(os.path.join(OUT, f'{sid}.{L}.webp'), 'WEBP', quality=55, method=6)
            marks[f'{sid}.{L}'] = {'w': vp['width'], 'h': vp['height'], 'marks': pts}
            print(f'{sid}.{L}: {os.path.getsize(os.path.join(OUT, f"{sid}.{L}.webp")) // 1024} KB, {sum(1 for x in pts if x)}/{len(pts)} numerków')
            ctx.close()
        b.close()
    with open(os.path.join(ROOT, 'src', 'guide-data.js'), 'w', encoding='utf-8') as f:
        f.write('// wygenerowane przez tools/guide_shots.py – pozycje numerków na zrzutach (w % szerokości/wysokości)\n')
        f.write('const GUIDE_MARKS = ' + json.dumps(marks, ensure_ascii=False) + ';\n')


if __name__ == '__main__':
    main()
