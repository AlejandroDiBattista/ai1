const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const ignoreValues = new Set(['44px', '768px']);

const valueRegex = /#[0-9a-fA-F]{3,6}\b|rgba?\([^\)]+\)|\b\d+px\b/gi;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .flatMap(ent => {
      const res = path.join(dir, ent.name);
      return ent.isDirectory() ? walk(res) : res;
    });
}

const files = walk(path.join(root, 'src')).filter(f => f.endsWith('.css') && !f.endsWith('variables.css'));

let total = 0;
let remaining = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(valueRegex) || [];
  matches.forEach(v => {
    total++;
    if (v.startsWith('var(') || ignoreValues.has(v)) return;
    remaining++;
    console.log(file + ': ' + v);
  });
});

console.log(`Remaining hardcoded values: ${remaining} of ${total}`);
