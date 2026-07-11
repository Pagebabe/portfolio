import { readFile, stat } from 'node:fs/promises';

const base = new URL('./', import.meta.url);
const required = ['index.html','styles.css','app.js','truth-audit.js','TRUTH_AUDIT.md','ONLINE_TRUTH.md','online-truth-status.json','SUBMISSION.md','LIVE_ACCEPTANCE.md','manifest.webmanifest','sw.js','icon.svg'];
for (const file of required) {
  const info = await stat(new URL(file, base));
  if (!info.isFile() || info.size < 50) throw new Error(`Missing or empty submission file: ${file}`);
}

const html = (await readFile(new URL('index.html', base), 'utf8')).toLowerCase();
const app = await readFile(new URL('app.js', base), 'utf8');
const appLower = app.toLowerCase();
const truthScript = (await readFile(new URL('truth-audit.js', base), 'utf8')).toLowerCase();
const truthAudit = (await readFile(new URL('TRUTH_AUDIT.md', base), 'utf8')).toLowerCase();
const onlineTruth = (await readFile(new URL('ONLINE_TRUTH.md', base), 'utf8')).toLowerCase();
const onlineStatus = JSON.parse(await readFile(new URL('online-truth-status.json', base), 'utf8'));
const submission = (await readFile(new URL('SUBMISSION.md', base), 'utf8')).toLowerCase();
const liveAcceptance = (await readFile(new URL('LIVE_ACCEPTANCE.md', base), 'utf8')).toLowerCase();
const sw = (await readFile(new URL('sw.js', base), 'utf8')).toLowerCase();
const manifest = JSON.parse(await readFile(new URL('manifest.webmanifest', base), 'utf8'));

for (const marker of [
  'unautorisierter prototyp',
  'alle geschäftsdaten sind synthetisch',
  'keine echten käufer-, kunden-, personal-, cad-, erp-, anlagen- oder finanzdaten',
  'noindex,nofollow',
  'role-nav',
  'demo-rolle',
  'betriebstag',
  './truth-audit.js'
]) {
  if (!html.includes(marker)) throw new Error(`Submission boundary missing: ${marker}`);
}
if (html.indexOf('./truth-audit.js') < html.indexOf('./app.js')) {
  throw new Error('Truth-audit override must load after the main demo script');
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

for (const marker of [
  'conditional go',
  'online offen',
  'nicht live vollständig geprüft',
  'echte pwa-installation',
  'keine produktiven inventor-, vault-, erp- oder microsoft-365-connectoren',
  './online_truth.md',
  './online-truth-status.json',
  './truth_audit.md',
  './submission.md',
  './live_acceptance.md'
]) {
  if (!truthScript.includes(marker)) throw new Error(`Visible truth-audit marker missing: ${marker}`);
}

for (const marker of [
  'belegt',
  'synthetisch',
  'abgeleitet',
  'offen',
  'nicht verwenden',
  'conditional go',
  'direkter menschlicher aufruf der github-pages-url',
  'vollständiger 20-angriffs-lauf des integration hub nach dem attack-18-fix',
  'kein produktives oder offiziell freigegebenes käufersystem'
]) {
  if (!truthAudit.includes(marker)) throw new Error(`Truth-audit document marker missing: ${marker}`);
}

for (const marker of [
  'online-quelle belegt',
  'live-http noch offen',
  'fehlender dns-auflösung',
  'weder ein pass noch ein fail',
  'direkte live-http-aufruf bleibt bis zum browserbeweis offen',
  'nicht 100 % betriebsfertig'
]) {
  if (!onlineTruth.includes(marker)) throw new Error(`Online truth marker missing: ${marker}`);
}

if (onlineStatus.schema_version !== '1.0') throw new Error('Online truth schema version missing');
if (onlineStatus.release_status !== 'conditional_go') throw new Error('Online truth release status must remain conditional_go');
if (onlineStatus.repository?.visibility !== 'public') throw new Error('Repository visibility truth must be public');
if (onlineStatus.repository?.default_branch !== 'master') throw new Error('Default branch truth must be master');
if (onlineStatus.deployment?.live_http_status !== 'open') throw new Error('Live HTTP status must remain open until browser evidence exists');
if (onlineStatus.human_gates?.live_browser_load !== 'open') throw new Error('Live browser gate must remain open');
if (!Array.isArray(onlineStatus.forbidden_claims) || onlineStatus.forbidden_claims.length < 7) throw new Error('Forbidden online claims incomplete');

for (const marker of [
  'zulässige einordnung',
  'geführter rundgang',
  'werkstatt / fertigung',
  'engineering / konstruktion',
  'abgabe- und beweisstand',
  'keine produktiven connectoren',
  'truth_audit.md',
  'live_acceptance.md'
]) {
  if (!submission.includes(marker)) throw new Error(`Final submission guide marker missing: ${marker}`);
}

for (const marker of [
  'live-aufruf',
  'rollen- und rechteansichten',
  'fünf-tage-simulation',
  'wahrheitsansicht',
  'responsive sichtprüfung',
  'pwa-installation',
  'offline-grundtest',
  'supabase-integrationstest',
  'fos_integration_test_pass',
  'abgabefähiger proof-of-work'
]) {
  if (!liveAcceptance.includes(marker)) throw new Error(`Live acceptance marker missing: ${marker}`);
}

if (manifest.display !== 'standalone') throw new Error('PWA display mode must be standalone');
if (manifest.start_url !== './' || manifest.scope !== './') throw new Error('PWA must remain scoped to the submission folder');
if (!Array.isArray(manifest.icons) || manifest.icons.length === 0) throw new Error('PWA icon missing');

for (const marker of ['firmen-os-kaeufer-demo','cache-control','no-store','private','app_shell']) {
  if (!sw.includes(marker)) throw new Error(`Service-worker privacy marker missing: ${marker}`);
}

console.log(`Online truth contract passed: ${workItems} work items, ${handoffs} handoffs, 15 roles, 5 days, public source verified, live HTTP kept open, scoped PWA and synthetic-data boundaries.`);
