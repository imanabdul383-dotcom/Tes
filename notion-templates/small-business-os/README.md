# Small Business OS — Notion template assets

Images used by the **Small Business OS** Notion template (cover, page icon, dashboard tiles and quote card).

- `assets/` — rendered PNGs (2x resolution), referenced by the Notion template as external images.
- `render.js` — regenerates the cover, icon, tiles and quote card; `render-products.js` — regenerates the sample product illustrations. Both use Playwright + Chromium:

```bash
node render.js && node render-products.js   # writes PNGs to ./out
```

Icons are from [Lucide](https://lucide.dev) (ISC License).
