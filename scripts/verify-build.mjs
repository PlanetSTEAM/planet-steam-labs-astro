import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
const html = readFileSync('dist/index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
if (duplicates.length) throw new Error('Duplicate IDs: ' + [...new Set(duplicates)].join(', '));
for (const [prefix, count] of [['q', 18], ['c', 30], ['e', 5]]) {
  for (let i = 1; i <= count; i++) {
    const id = prefix + String(i).padStart(2, '0');
    if (!ids.includes(id)) throw new Error('Missing service: ' + id);
  }
}
for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
  if (!ids.includes(id)) throw new Error('Broken anchor: ' + id);
}
const assets = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(m => m[1]).filter(url => !/^(https?:|mailto:|data:|tel:)/.test(url));
for (const url of assets) {
  const local = decodeURIComponent(url.split('?')[0]).replace(/^\/planet-steam-labs-astro\//, '').replace(/^\//, '');
  if (!local) continue;
  if (!existsSync(resolve('dist', local))) throw new Error('Missing output asset: ' + url);
}
if (!html.includes('name="proceso"') || !html.includes('required')) throw new Error('Missing contact form');
if (!html.includes('/planet-steam-labs-astro/assets/logos/')) throw new Error('Missing deployment base for logos');
if (html.includes('id="catalog-tools"')) throw new Error('Removed search toolbar has returned');
console.log(`Verified 53 catalog services, ${ids.length} unique IDs, ${assets.length} asset references and internal links.`);
