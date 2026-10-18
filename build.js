// Składa src/ w dwa samodzielne pliki: index.html (z logowaniem) i preview.html (podgląd bez logowania).
// Użycie: node build.js
const fs = require('fs');
const path = require('path');
const src = f => fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');
const tpl = src('template.html'), css = src('style.css');
const opt = f => fs.existsSync(path.join(__dirname, 'src', f)) ? src(f) : '';
const js = ['app.js', 'guide-data.js', 'guide.js', 'pitch.js', 'i18n-dict.js', 'i18n.js'].map(opt).join('\n');
// zrzuty do instrukcji: w preview.html wbudowane (działa jako jeden plik), w index.html jako pliki guide/*.webp
const gdir = path.join(__dirname, 'guide');
const shots = fs.existsSync(gdir) ? fs.readdirSync(gdir).filter(f => f.endsWith('.webp')) : [];
const guideImg = embed => JSON.stringify(Object.fromEntries(shots.map(f => [f.replace(/\.webp$/, ''), embed ? 'data:image/webp;base64,' + fs.readFileSync(path.join(gdir, f)).toString('base64') : 'guide/' + f + '?v=' + Date.now().toString(36)])));
const logo = 'data:image/webp;base64,' + fs.readFileSync(path.join(__dirname, 'icons', 'logo.webp')).toString('base64');
const BUILT = new Date().toISOString(); // godzina aktualizacji strony – pokazywana w stopce
const make = (preview, title) => tpl
  .replace('{{TITLE}}', title)
  .replace('{{PREVIEW}}', preview ? 'true' : 'false')
  .replace('{{LOGO}}', logo)
  .replace('{{CSS}}', () => css)
  .replace('{{JS}}', () => js.replace('__BUILD_TIME__', BUILT).replace("'__GUIDE_IMG__'", () => guideImg(preview)));
fs.writeFileSync(path.join(__dirname, 'index.html'), make(false, 'CrewControl · Slangeservice AS'));
fs.writeFileSync(path.join(__dirname, 'preview.html'), make(true, 'CrewControl · PODGLĄD'));
console.log('OK: index.html + preview.html');
