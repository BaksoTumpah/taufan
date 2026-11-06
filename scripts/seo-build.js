// Dijalankan otomatis sebelum deploy (firebase.json -> hosting.predeploy).
// Menulis judul & deskripsi SEO dari content.json ke tag statis index.html,
// supaya Google membacanya tanpa perlu menjalankan JavaScript.
const fs = require('fs');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
let seo = {};
try { seo = JSON.parse(fs.readFileSync('content.json', 'utf8')).seo || {}; } catch (e) { console.log('seo-build: content.json tidak terbaca, dilewati'); process.exit(0); }
const t = String(seo.title || '').trim().slice(0, 100), d = String(seo.desc || '').trim().slice(0, 300);
let h = fs.readFileSync('index.html', 'utf8'), n = 0;
const sub = (re, fn) => { h = h.replace(re, (...a) => { n++; return fn(...a); }); };
if (t) {
  sub(/<title>[^<]*<\/title>/, () => `<title>${esc(t)}</title>`);
  sub(/(<meta property="og:title" content=")[^"]*(")/, (m, a, b) => a + esc(t) + b);
  sub(/(<meta name="twitter:title" content=")[^"]*(")/, (m, a, b) => a + esc(t) + b);
}
if (d) {
  sub(/(<meta name="description" content=")[^"]*(")/, (m, a, b) => a + esc(d) + b);
  sub(/(<meta property="og:description" content=")[^"]*(")/, (m, a, b) => a + esc(d) + b);
  sub(/(<meta name="twitter:description" content=")[^"]*(")/, (m, a, b) => a + esc(d) + b);
}
fs.writeFileSync('index.html', h);
console.log(`seo-build: ${n} tag diperbarui`);
