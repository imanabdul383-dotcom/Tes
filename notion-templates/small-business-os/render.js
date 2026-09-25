// Renders the Small Business OS image set (cover, icon, tiles, quote) to PNG.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

const OUT = path.join(__dirname, 'out');
const C = {
  cream: '#F6F3EC', beige: '#ECE6DA', sage: '#DCE3D2', sageMid: '#A9B79A',
  sageDeep: '#5E6E52', ink: '#3B4535', clay: '#E9DDD0',
};
const SERIF = "'Bitstream Charter', 'Liberation Serif', serif";
const SANS = "'Liberation Sans', 'DejaVu Sans', sans-serif";

// Lucide icons (ISC License, lucide.dev)
const ICONS = {
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  package: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  check: '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  sprout: '<path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/>',
};
const svg = (name, size, color, stroke = 1.6) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;

const page = (w, h, body, bg = 'transparent') => `<!doctype html><html><head><style>
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{width:${w}px;height:${h}px;background:${bg};overflow:hidden}
  body{font-family:${SANS};color:${C.ink}}
</style></head><body>${body}</body></html>`;

const cover = page(1500, 600, `
  <div style="position:relative;width:1500px;height:600px;background:${C.cream};overflow:hidden">
    <div style="position:absolute;width:520px;height:520px;border-radius:50%;background:${C.sage};left:-140px;top:-260px"></div>
    <div style="position:absolute;width:300px;height:300px;border-radius:50%;background:${C.beige};right:120px;bottom:-170px"></div>
    <div style="position:absolute;width:180px;height:360px;border-radius:90px 90px 0 0;background:${C.sageMid};opacity:.55;right:-40px;top:120px"></div>
    <div style="position:absolute;width:120px;height:240px;border-radius:60px 60px 0 0;background:${C.clay};left:210px;bottom:-60px"></div>
    <div style="position:absolute;left:0;right:0;top:215px;text-align:center">
      <div style="font:600 14px/1 ${SANS};letter-spacing:.42em;color:${C.sageDeep}">THE ALL-IN-ONE SHOP PLANNER</div>
      <div style="font:400 76px/1.1 ${SERIF};margin-top:22px;color:${C.ink}">Small Business OS</div>
      <div style="font:400 17px/1 ${SANS};letter-spacing:.2em;margin-top:24px;color:${C.sageDeep}">ORDERS &nbsp;·&nbsp; PRODUCTS &nbsp;·&nbsp; CUSTOMERS &nbsp;·&nbsp; FINANCES &nbsp;·&nbsp; CONTENT</div>
    </div>
  </div>`);

const icon = page(280, 280, `
  <div style="width:280px;height:280px;border-radius:64px;background:${C.sageDeep};display:flex;align-items:center;justify-content:center">
    ${svg('sprout', 150, C.cream, 1.5)}
  </div>`);

const TILES = [
  ['start', 'book', C.beige, '00'], ['orders', 'bag', C.sage, '01'],
  ['customers', 'users', C.beige, '02'], ['products', 'package', C.sage, '03'],
  ['finances', 'wallet', C.beige, '04'], ['content', 'megaphone', C.sage, '05'],
  ['tasks', 'check', C.beige, '06'],
];
const tile = (ico, bg, num) => page(600, 400, `
  <div style="position:relative;width:600px;height:400px;border-radius:28px;background:${bg};display:flex;align-items:center;justify-content:center">
    <div style="position:absolute;left:34px;top:30px;font:400 26px/1 ${SERIF};color:${C.sageDeep};opacity:.8">${num}</div>
    <div style="width:170px;height:170px;border-radius:50%;background:${C.cream};display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(94,110,82,.12)">
      ${svg(ico, 84, C.sageDeep, 1.5)}
    </div>
  </div>`);

// 600x346 so the card's bottom edge lines up with the dashboard calendar.
const quote = page(600, 346, `
  <div style="width:600px;height:346px;border-radius:28px;background:${C.sageDeep};display:flex;flex-direction:column;justify-content:center;padding:0 56px">
    <div style="font:400 84px/0.6 ${SERIF};color:${C.sageMid}">“</div>
    <div style="font:italic 400 33px/1.35 ${SERIF};color:${C.cream};margin-top:8px">Small steps every day add up to a thriving business.</div>
    <div style="font:600 13px/1 ${SANS};letter-spacing:.35em;color:${C.sageMid};margin-top:24px">DAILY REMINDER</div>
  </div>`);

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const shot = async (name, html, w, h) => {
    const p = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await p.setContent(html);
    await p.screenshot({ path: path.join(OUT, name), omitBackground: true });
    await p.close();
  };
  require('fs').mkdirSync(OUT, { recursive: true });
  await shot('cover.png', cover, 1500, 600);
  await shot('icon.png', icon, 280, 280);
  for (const [n, ico, bg, num] of TILES) await shot(`tile-${n}.png`, tile(ico, bg, num), 600, 400);
  await shot('quote.png', quote, 600, 346);
  await browser.close();
})();
