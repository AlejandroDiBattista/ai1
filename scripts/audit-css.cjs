const fs = require('fs');
const path = require('path');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .flatMap(entry => {
      const res = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(res) : res;
    });
}

const files = walk(path.join(__dirname, '../src'))
  .filter(f => f.endsWith('.module.css'));

const colors = new Set();
const sizes = new Set();
const radii = new Set();
const shadows = new Set();

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  for (const m of content.matchAll(/#[0-9a-fA-F]{3,6}\b|rgba?\([^\)]+\)/g)) {
    colors.add(m[0]);
  }
  for (const m of content.matchAll(/\b\d+px\b/g)) {
    const value = m[0];
    if (/radius|border-radius/.test(content.slice(Math.max(0, m.index - 20), m.index + 20))) {
      radii.add(value);
    } else if (/box-shadow/.test(content.slice(Math.max(0, m.index - 20), m.index + 20))) {
      shadows.add(value);
    } else {
      sizes.add(value);
    }
  }
});

console.log('CSS Audit Results');
console.log('Colors:', Array.from(colors).join(', '));
console.log('Sizes:', Array.from(sizes).join(', '));
console.log('Radii:', Array.from(radii).join(', '));
console.log('Shadows:', Array.from(shadows).join(', '));
