// Renders flat sample-product illustrations for the Products gallery.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

const OUT = path.join(__dirname, 'out');
const C = {
  cream: '#F6F3EC', beige: '#ECE6DA', sage: '#DCE3D2', sageMid: '#A9B79A',
  sageDeep: '#5E6E52', ink: '#3B4535', clay: '#E9DDD0', amber: '#C9925A',
  gold: '#C8A96A', terracotta: '#C98B6B', white: '#FBFAF6',
};

const scene = (bg, art) => `<!doctype html><html><head><style>
  *{margin:0;padding:0}html,body{width:800px;height:500px;overflow:hidden;background:${bg}}
</style></head><body>
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <ellipse cx="400" cy="440" rx="230" ry="22" fill="${C.ink}" opacity=".08"/>
    ${art}
  </svg></body></html>`;

const PRODUCTS = {
  // Amber jar candle with a cream label and a flame
  candle: scene(C.sage, `
    <rect x="310" y="190" width="180" height="245" rx="26" fill="${C.amber}"/>
    <rect x="310" y="190" width="180" height="40" rx="18" fill="${C.ink}" opacity=".18"/>
    <rect x="336" y="270" width="128" height="104" rx="10" fill="${C.cream}"/>
    <text x="400" y="315" text-anchor="middle" font-family="Bitstream Charter, serif" font-size="22" fill="${C.sageDeep}">Lavender</text>
    <text x="400" y="345" text-anchor="middle" font-family="Liberation Sans, sans-serif" font-size="12" letter-spacing="3" fill="${C.sageDeep}">SOY CANDLE</text>
    <line x1="400" y1="190" x2="400" y2="160" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
    <path d="M400 92 C418 118 424 136 400 158 C376 136 382 118 400 92Z" fill="#E8B35C"/>
    <path d="M400 118 C408 130 410 140 400 152 C390 140 392 130 400 118Z" fill="#F6E3A8"/>`),
  // Fine chain with a round gold initial pendant
  necklace: scene(C.beige, `
    <path d="M230 90 C260 330 540 330 570 90" fill="none" stroke="${C.gold}" stroke-width="5" stroke-dasharray="2 7" stroke-linecap="round"/>
    <line x1="400" y1="276" x2="400" y2="300" stroke="${C.gold}" stroke-width="5"/>
    <circle cx="400" cy="345" r="50" fill="${C.gold}"/>
    <circle cx="400" cy="345" r="40" fill="none" stroke="${C.cream}" stroke-width="2" opacity=".6"/>
    <text x="400" y="364" text-anchor="middle" font-family="Bitstream Charter, serif" font-size="54" fill="${C.cream}">E</text>`),
  // Three framed botanical prints
  prints: scene(C.cream, `
    ${[[190, 150, 130, 175], [335, 110, 130, 215], [480, 150, 130, 175]].map(([x, y, w, h], i) => `
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="${C.ink}"/>
      <rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="${h - 20}" fill="${C.white}"/>
      <line x1="${x + w / 2}" y1="${y + h - 25}" x2="${x + w / 2}" y2="${y + 35}" stroke="${C.sageDeep}" stroke-width="3"/>
      ${[0, 1, 2].map(k => `
        <ellipse cx="${x + w / 2 - 18}" cy="${y + h - 55 - k * 34}" rx="18" ry="8" fill="${[C.sageMid, C.sageDeep, C.terracotta][(i + k) % 3]}" transform="rotate(-30 ${x + w / 2 - 18} ${y + h - 55 - k * 34})"/>
        <ellipse cx="${x + w / 2 + 18}" cy="${y + h - 70 - k * 34}" rx="18" ry="8" fill="${[C.sageDeep, C.sageMid, C.sageMid][(i + k) % 3]}" transform="rotate(30 ${x + w / 2 + 18} ${y + h - 70 - k * 34})"/>`).join('')}`).join('')}`),
  // Terracotta pot with a leafy plant
  pot: scene(C.sage, `
    ${[[-40, -120], [-15, -150], [15, -155], [40, -125], [0, -175]].map(([dx, dy], i) => `
      <path d="M400 275 Q${400 + dx * 0.4} ${275 + dy * 0.5} ${400 + dx} ${275 + dy}" stroke="${C.sageDeep}" stroke-width="4" fill="none"/>
      <ellipse cx="${400 + dx}" cy="${275 + dy}" rx="30" ry="14" fill="${i % 2 ? C.sageDeep : '#7C8F6C'}" transform="rotate(${dx * 1.2 - 90 + (dx < 0 ? -20 : 20)} ${400 + dx} ${275 + dy})"/>`).join('')}
    <rect x="315" y="262" width="170" height="30" rx="8" fill="${C.terracotta}"/>
    <path d="M325 292 L475 292 L455 430 L345 430 Z" fill="${C.terracotta}"/>
    <path d="M325 292 L475 292 L472 312 L328 312 Z" fill="${C.ink}" opacity=".12"/>`),
  // Digital budget planner on a tablet
  planner: scene(C.beige, `
    <rect x="235" y="95" width="330" height="330" rx="26" fill="${C.ink}"/>
    <rect x="253" y="113" width="294" height="294" rx="12" fill="${C.cream}"/>
    <text x="280" y="160" font-family="Bitstream Charter, serif" font-size="24" fill="${C.sageDeep}">Monthly Budget</text>
    ${[0, 1, 2, 3].map(i => `
      <rect x="280" y="${185 + i * 34}" width="14" height="14" rx="3" fill="none" stroke="${C.sageDeep}" stroke-width="2"/>
      <rect x="305" y="${189 + i * 34}" width="${120 - i * 18}" height="7" rx="3.5" fill="${C.sageMid}"/>`).join('')}
    ${[60, 95, 45, 110].map((h, i) => `<rect x="${440 + i * 22}" y="${335 - h}" width="14" height="${h}" rx="3" fill="${i % 2 ? C.sageDeep : C.sageMid}"/>`).join('')}
    <line x1="435" y1="336" x2="530" y2="336" stroke="${C.ink}" stroke-width="2" opacity=".3"/>`),
};

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  require('fs').mkdirSync(OUT, { recursive: true });
  for (const [name, html] of Object.entries(PRODUCTS)) {
    const p = await browser.newPage({ viewport: { width: 800, height: 500 }, deviceScaleFactor: 2 });
    await p.setContent(html);
    await p.screenshot({ path: path.join(OUT, `product-${name}.png`) });
    await p.close();
  }
  await browser.close();
})();
