// Renders the dashboard accent bar and the shop profile banner.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');

const OUT = path.join(__dirname, 'out');
const SEGMENTS = ['#5E6E52', '#7C8F6C', '#A9B79A', '#DCE3D2', '#E9DDD0', '#C98B6B', '#ECE6DA'];

const bar = `<!doctype html><html><body style="margin:0;background:transparent">
  <div style="display:flex;width:1200px;height:12px;border-radius:6px;overflow:hidden">
    ${SEGMENTS.map((c, i) => `<div style="flex:${[3, 2, 2, 3, 2, 1, 5][i]};background:${c}"></div>`).join('')}
  </div></body></html>`;

// Flat shop-shelf scene in the same style as the sample product illustrations.
const C = {
  cream: '#F6F3EC', beige: '#ECE6DA', sage: '#DCE3D2', sageMid: '#A9B79A', sageDeep: '#5E6E52',
  leaf: '#7C8F6C', ink: '#3B4535', amber: '#C9925A', gold: '#C8A96A', terracotta: '#C98B6B', wood: '#B98B6A',
};
const banner = `<!doctype html><html><body style="margin:0">
  <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
    <rect width="600" height="300" fill="${C.cream}"/>
    <!-- arched window -->
    <path d="M40 232V105a65 65 0 0 1 130 0v127Z" fill="${C.sage}"/>
    <circle cx="128" cy="92" r="18" fill="${C.cream}" opacity=".7"/>
    <path d="M105 42v190M40 150h130" stroke="${C.cream}" stroke-width="5"/>
    <!-- framed prints -->
    <rect x="360" y="38" width="78" height="100" rx="3" fill="${C.ink}"/>
    <rect x="366" y="44" width="66" height="88" fill="${C.cream}"/>
    <path d="M399 122V62" stroke="${C.sageDeep}" stroke-width="2"/>
    <ellipse cx="389" cy="104" rx="11" ry="5" fill="${C.sageMid}" transform="rotate(-30 389 104)"/>
    <ellipse cx="409" cy="94" rx="11" ry="5" fill="${C.leaf}" transform="rotate(30 409 94)"/>
    <ellipse cx="389" cy="82" rx="11" ry="5" fill="${C.terracotta}" transform="rotate(-30 389 82)"/>
    <ellipse cx="409" cy="72" rx="11" ry="5" fill="${C.sageMid}" transform="rotate(30 409 72)"/>
    <rect x="452" y="46" width="58" height="68" rx="3" fill="${C.ink}"/>
    <rect x="458" y="52" width="46" height="56" fill="${C.sage}"/>
    <circle cx="481" cy="80" r="13" fill="${C.terracotta}" opacity=".85"/>
    <!-- necklace on a hook -->
    <circle cx="545" cy="70" r="4" fill="${C.ink}"/>
    <path d="M531 74 Q545 140 559 74" fill="none" stroke="${C.gold}" stroke-width="2.5" stroke-dasharray="1 4" stroke-linecap="round"/>
    <circle cx="545" cy="116" r="9" fill="${C.gold}"/>
    <!-- shelf -->
    <rect x="195" y="222" width="385" height="10" rx="2" fill="${C.wood}"/>
    <rect x="215" y="232" width="8" height="18" fill="${C.wood}"/>
    <rect x="552" y="232" width="8" height="18" fill="${C.wood}"/>
    <!-- candle -->
    <rect x="222" y="160" width="52" height="62" rx="9" fill="${C.amber}"/>
    <rect x="222" y="160" width="52" height="12" rx="6" fill="${C.ink}" opacity=".15"/>
    <rect x="231" y="182" width="34" height="26" rx="3" fill="${C.cream}"/>
    <path d="M248 160v-10" stroke="${C.ink}" stroke-width="2" stroke-linecap="round"/>
    <path d="M248 128c6 8 8 14 0 21-8-7-6-13 0-21Z" fill="#E8B35C"/>
    <!-- plant pot -->
    <path d="M300 186 Q296 150 280 138M312 186 Q314 146 330 128M306 186V132" stroke="${C.sageDeep}" stroke-width="2.5" fill="none"/>
    <ellipse cx="280" cy="136" rx="14" ry="7" fill="${C.leaf}" transform="rotate(-35 280 136)"/>
    <ellipse cx="331" cy="126" rx="14" ry="7" fill="${C.sageDeep}" transform="rotate(35 331 126)"/>
    <ellipse cx="306" cy="128" rx="7" ry="14" fill="${C.leaf}"/>
    <rect x="284" y="184" width="46" height="10" rx="3" fill="${C.terracotta}"/>
    <path d="M288 194h38l-5 28h-28Z" fill="${C.terracotta}"/>
    <!-- planner stack -->
    <rect x="360" y="206" width="92" height="16" rx="3" fill="${C.sageDeep}"/>
    <rect x="366" y="192" width="82" height="14" rx="3" fill="${C.beige}" stroke="${C.ink}" stroke-opacity=".15"/>
    <rect x="372" y="180" width="72" height="12" rx="3" fill="${C.terracotta}"/>
    <!-- small vase with stems -->
    <path d="M492 166v-34M498 166l10-30M486 166l-9-26" stroke="${C.sageDeep}" stroke-width="2"/>
    <circle cx="492" cy="130" r="5" fill="${C.cream}" stroke="${C.sageMid}" stroke-width="2"/>
    <circle cx="508" cy="134" r="4" fill="${C.terracotta}"/>
    <circle cx="477" cy="138" r="4" fill="${C.sageMid}"/>
    <path d="M478 166h28c2 20-4 56-14 56s-16-36-14-56Z" fill="${C.sage}" stroke="${C.sageMid}" stroke-width="2"/>
    <!-- counter -->
    <rect x="0" y="250" width="600" height="50" fill="${C.beige}"/>
    <rect x="0" y="250" width="600" height="4" fill="${C.ink}" opacity=".06"/>
  </svg></body></html>`;

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
