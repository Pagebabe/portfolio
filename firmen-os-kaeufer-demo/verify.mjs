import { readFile, stat } from 'node:fs/promises';

const base = new URL('./', import.meta.url);
const required = ['index.html','styles.css','app.js','manifest.webmanifest','sw.js','icon.svg'];
for (const file of required) {
  const info = await stat(new URL(file, base));
  if (!info.isFile() || info.size < 50) throw new Error(`Missing or empty submission file: ${file}`);
}

const html = (await readFile(new URL('index.html', base), 'utf8')).toLowerCase();
const app = await readFile(new URL('app.js', base), 'utf8');
const appLower = app.toLowerCase();
const sw = (await readFile(new URL('sw.js', base), 'utf8')).toLowerCase();
const manifest = JSON.parse(await readFile(new URL('manifest.webmanifest', base), 'utf8'));

for (const marker of [
  'unautorisierter prototyp',
  'alle geschäftsdaten sind synthetisch',
  'keine echten käufer-, kunden-, personal-, cad-, erp-, anlagen- oder finanzdaten',
  'noindex,nofollow',
  'role-nav',
  'demo-rolle',
  'betriebstag'
]) {
  if (!html.includes(marker)) throw new Error(`Submission boundary missing: ${marker}`);
}

for (const role of ['management','sales','project','engineering','planning','purchasing','logistics','workshop','quality','hse','field','finance','hr','it','facility']) {
  if (!app.includes(`id: '${role}'`)) throw new Error(`Role missing: ${role}`);
}

for (const day of ['2026-07-13','2026-07-14','2026-07-15','2026-07-16','2026-07-17']) {
  if (!app.includes(day)) throw new Error(`Demo day missing: ${day}`);
}

const workItems = (app.match(/id:'DW-/g) ?? []).length;
const handoffs = (app.match(/id:'HO-/g) ?? []).length;
if (workItems < 30) throw new Error(`Expected 30 work items, found ${workItems}`);
if (handoffs < 12) throw new Error(`Expected 12 handoffs, found ${handoffs}`);

const allowedBlocks = [...app.matchAll(/allowed:\s*\[([^\]]+)\]/g)];
if (allowedBlocks.length !== 15) throw new Error(`Expected 15 role navigation blocks, found ${allowedBlocks.length}`);
for (const [index, block] of allowedBlocks.entries()) {
  const count = (block[1].match(/'/g) ?? []).length / 2;
  if (count > 5) throw new Error(`Role ${index + 1} exposes ${count} primary views; maximum is 5`);
  if (count < 3) throw new Error(`Role ${index + 1} exposes too few operational views`);
}

for (const marker of ['autodesk inventor/vault (simuliert)','erp (simuliert)','microsoft 365 (simuliert)','firmen os mobile','integration hub']) {
  if (!appLower.includes(marker)) throw new Error(`Simulated source marker missing: ${marker}`);
}
for (const marker of ['evidence','capability','handoff','object','project']) {
  if (!appLower.includes(marker)) throw new Error(`Operational data marker missing: ${marker}`);
}
if (appLower.includes('@kaeufer.de')) throw new Error('Real Käufer email domain leaked into public demo');

if (manifest.display !== 'standalone') throw new Error('PWA display mode must be standalone');
if (manifest.start_url !== './' || manifest.scope !== './') throw new Error('PWA must remain scoped to the submission folder');
if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) throw new Error('PWA icon missing');

for (const marker of ['firmen-os-kaeufer-demo','cache-control','no-store','private','app_shell']) {
  if (!sw.includes(marker)) throw new Error(`Service-worker privacy marker missing: ${marker}`);
}

console.log(`Submission contract passed: ${workItems} work items, ${handoffs} handoffs, 15 roles, 5 days, scoped PWA and synthetic-data boundaries.`);
