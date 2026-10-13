// Regenerates js/data.js from the JSON files in data/.
// Run: node scripts/build-data.js
// The JSON files stay the source of truth; js/data.js is only the
// fallback used when the page is opened via file:// (double-click).
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const names = ['foods', 'recipes', 'weekly-plan', 'config'];
const bundle = {};

for (const name of names) {
  const file = path.join(root, 'data', name + '.json');
  bundle[name] = JSON.parse(fs.readFileSync(file, 'utf8'));
}

const out = [
  '/* GENERATED FILE - do not edit by hand.',
  '   Source: data/*.json  ·  Rebuild: node scripts/build-data.js',
  '   Used as a fallback when fetch() is unavailable (file://). */',
  'window.ROTI_DATA=' + JSON.stringify(bundle) + ';',
  ''
].join('\n');

fs.writeFileSync(path.join(root, 'js', 'data.js'), out);
console.log('Wrote js/data.js (' + out.length + ' bytes)');
