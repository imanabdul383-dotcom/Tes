// Renders the dashboard accent bar and the shop profile banner.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

const OUT = path.join(__dirname, 'out');
const SEGMENTS = ['#5E6E52', '#7C8F6C', '#A9B79A', '#DCE3D2', '#E9DDD0', '#C98B6B', '#ECE6DA'];

const bar = `<!doctype html><html><body style="margin:0;background:transparent">
  <div style="display:flex;width:1200px;height:12px;border-radius:6px;overflow:hidden">
    ${SEGMENTS.map((c, i) => `<div style="flex:${[3, 2, 2, 3, 2, 1, 5][i]};background:${c}"></div>`).join('')}
  </div></body></html>`;

const banner = `<!doctype html><html><body style="margin:0">
  <div style="position:relative;width:600px;height:300px;overflow:hidden;background:#DCE3D2">
    <div style="position:absolute;width:420px;height:420px;border-radius:50%;background:#A9B79A;left:-120px;top:-210px;filter:blur(40px)"></div>
    <div style="position:absolute;width:360px;height:360px;border-radius:50%;background:#E9DDD0;right:-100px;top:40px;filter:blur(40px)"></div>
    <div style="position:absolute;width:260px;height:260px;border-radius:50%;background:#C98B6B;opacity:.55;left:160px;bottom:-180px;filter:blur(50px)"></div>
    <div style="position:absolute;width:200px;height:200px;border-radius:50%;background:#F6F3EC;left:40px;top:120px;filter:blur(45px)"></div>
  </div></body></html>`;

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  require('fs').mkdirSync(OUT, { recursive: true });
  const shot = async (name, html, w, h, transparent) => {
    const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await p.setContent(html);
    await p.screenshot({ path: path.join(OUT, name), omitBackground: transparent });
    await p.close();
  };
  await shot('accent-bar.png', bar, 1200, 12, true);
  await shot('shop-banner.png', banner, 600, 300, false);
  await browser.close();
})();
