const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

const tokenMap = {
  '#1476FF': 'var(--color-primary)',
  '#0F64DB': 'var(--color-primary-hover)',
  '#FF3B30': 'var(--color-error)',
  '#FF9500': 'var(--color-warning)',
  '#34C759': 'var(--color-success)',
  '#5AC8FA': 'var(--color-info)',
  '#0A0A0A': 'var(--color-text-high)',
  '#545454': 'var(--color-text-medium)',
  '#8E8E93': 'var(--color-text-low)',
  '#FFFFFF': 'var(--color-surface-01)',
  '#F6F7F9': 'var(--color-surface-02)',
  '#E5E5EA': 'var(--color-stroke)',
  'rgba(0,0,0,0.25)': 'var(--color-overlay)'
};

const spacingMap = {
  '4px': 'var(--spacing-1)',
  '8px': 'var(--spacing-2)',
  '12px': 'var(--spacing-3)',
  '16px': 'var(--spacing-4)',
  '20px': 'var(--spacing-5)',
  '24px': 'var(--spacing-6)'
};

const radiusMap = {
  '6px': 'var(--radius-sm)',
  '12px': 'var(--radius-md)',
  '20px': 'var(--radius-lg)',
  '999px': 'var(--radius-pill)'
};

const shadowMap = {
  '0px 2px 6px rgba(0,0,0,0.06)': 'var(--shadow-card)',
  '0px 4px 12px rgba(0,0,0,0.08)': 'var(--shadow-elevated)'
};

const ignoreValues = new Set(['44px', '768px']);

function escapeReg(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceRadius(content) {
  for (const [val, variable] of Object.entries(radiusMap)) {
    const reg = new RegExp(`(border-radius\\s*:\\s*)${escapeReg(val)}`, 'g');
    content = content.replace(reg, `$1${variable}`);
  }
  return content;
}

function replaceAll(content, map) {
  const entries = Object.entries(map).sort((a,b) => b[0].length - a[0].length);
  for (const [val, variable] of entries) {
    if (ignoreValues.has(val)) continue;
    const reg = new RegExp(`(?<![\\d])${escapeReg(val)}(?![\\w])`, 'g');
    content = content.replace(reg, variable);
  }
  return content;
}

function processFile(file) {
  let css = fs.readFileSync(file, 'utf8');
  css = replaceAll(css, tokenMap);
  css = replaceRadius(css);
  css = replaceAll(css, spacingMap);
  css = replaceAll(css, shadowMap);
  fs.writeFileSync(file, css);
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .flatMap(ent => {
      const res = path.join(dir, ent.name);
      return ent.isDirectory() ? walk(res) : res;
    });
}

const files = walk(path.join(root, 'src')).filter(f => f.endsWith('.css') && !f.endsWith('variables.css'));
files.forEach(processFile);
console.log('Migrated', files.length, 'CSS files');
