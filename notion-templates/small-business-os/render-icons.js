// Renders Lucide line icons (see ./lucide, ISC License) as sage PNG page icons.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'out');
const COLOR = '#5E6E52';
const ICONS = {
  'start-here': 'book-open', 'sop-library': 'library', 'brand-kit': 'palette',
  orders: 'shopping-bag', customers: 'users', products: 'package',
  'launch-planner': 'rocket', 'pricing-calculator': 'calculator', suppliers: 'truck',
  'content-calendar': 'calendar-days', 'seo-keywords': 'search', goals: 'target',
  'shop-metrics': 'chart-column', finances: 'wallet', tasks: 'list-checks',
  'weekly-review': 'notebook-pen',
  // Sample rows and callouts
  flame: 'flame', gem: 'gem', frame: 'frame', sprout: 'sprout', notebook: 'notebook',
  revenue: 'circle-dollar-sign', camera: 'camera', star: 'star', gift: 'gift',
  sparkles: 'sparkles', calendar: 'calendar', lightbulb: 'lightbulb', heart: 'heart', leaf: 'leaf',
};

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  fs.mkdirSync(OUT, { recursive: true });
  for (const [name, lucide] of Object.entries(ICONS)) {
    const svg = fs.readFileSync(path.join(__dirname, 'lucide', `${lucide}.svg`), 'utf8')
      .replace(/<!--.*?-->/s, '')
      .replace('stroke="currentColor"', `stroke="${COLOR}"`)
      .replace(/width="24"\s+height="24"/, 'width="200" height="200"');
    const page = await browser.newPage({ viewport: { width: 256, height: 256 } });
    await page.setContent(`<!doctype html><html><body style="margin:0;background:transparent;width:256px;height:256px;display:flex;align-items:center;justify-content:center">${svg}</body></html>`);
    await page.screenshot({ path: path.join(OUT, `icon-${name}.png`), omitBackground: true });
    await page.close();
  }
  await browser.close();
})();
