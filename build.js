// Składa src/ w dwa samodzielne pliki: index.html (z logowaniem) i preview.html (podgląd bez logowania).
// Użycie: node build.js
const fs = require('fs');
const path = require('path');
const src = f => fs.readFileSync(path.join(__dirname, 'src', f), 'utf8');
const tpl = src('template.html'), css = src('style.css'), js = src('app.js');
const logo = 'data:image/webp;base64,' + fs.readFileSync(path.join(__dirname, 'icons', 'logo.webp')).toString('base64');
const make = (preview, title) => tpl
  .replace('{{TITLE}}', title)
  .replace('{{PREVIEW}}', preview ? 'true' : 'false')
  .replace('{{LOGO}}', logo)
  .replace('{{CSS}}', () => css)
  .replace('{{JS}}', () => js);
fs.writeFileSync(path.join(__dirname, 'index.html'), make(false, 'CrewControl · Slangeservice AS'));
fs.writeFileSync(path.join(__dirname, 'preview.html'), make(true, 'CrewControl · PODGLĄD'));
console.log('OK: index.html + preview.html');
