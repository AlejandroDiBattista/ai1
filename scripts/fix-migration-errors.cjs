#!/usr/bin/env node

/**
 * Script para corregir errores de migración donde los tokens se concatenaron incorrectamente
 * Ejemplo: 44px se convirtió en 4var(--spacing-1) en lugar de mantenerse como 44px
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Mapeo de correcciones para valores que se tokenizaron incorrectamente
const CORRECTIONS = {
  // Valores que se concatenaron mal
  '4var(--spacing-1)': '44px',      // 44px -> 4 + 4px
  '4var(--spacing-2)': '48px',      // 48px -> 4 + 8px  
  '1var(--spacing-2)': '18px',      // 18px -> 1 + 8px
  '1var(--spacing-1)': '14px',      // 14px -> 1 + 4px
  '5var(--radius-sm)': '56px',      // 56px -> 5 + 6px
  
  // Media queries que se rompieron
  '76var(--spacing-2)': '768px',    // 768px -> 76 + 8px
  '102var(--spacing-1)': '1024px',  // 1024px -> 102 + 4px
};

async function getAllCSSFiles(dir) {
  const files = [];
  
  async function traverse(currentDir) {
    const items = await readdir(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const itemStat = await stat(fullPath);
      
      if (itemStat.isDirectory()) {
        if (!item.startsWith('.') && item !== 'node_modules') {
          await traverse(fullPath);
        }
      } else if (item.endsWith('.module.css')) {
        files.push(fullPath);
      }
    }
  }
  
  await traverse(dir);
  return files;
}

function fixMigrationErrors(content) {
  let result = content;
  let changes = 0;
  
  // Aplicar cada corrección
  for (const [errorValue, correctValue] of Object.entries(CORRECTIONS)) {
    const regex = new RegExp(escapeRegExp(errorValue), 'g');
    const matches = result.match(regex);
    
    if (matches) {
      result = result.replace(regex, correctValue);
      changes += matches.length;
      console.log(`  ✓ ${errorValue} → ${correctValue} (${matches.length} veces)`);
    }
  }
  
  return { result, changes };
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function fixFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const { result, changes } = fixMigrationErrors(content);
    
    if (changes > 0) {
      await writeFile(filePath, result, 'utf8');
      console.log(`✅ ${path.relative(process.cwd(), filePath)} - ${changes} correcciones`);
      return changes;
    } else {
      console.log(`⚪ ${path.relative(process.cwd(), filePath)} - sin errores`);
      return 0;
    }
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
    return 0;
  }
}

async function main() {
  console.log('🔧 Iniciando corrección de errores de migración...\n');
  
  const srcDir = path.join(process.cwd(), 'src');
  const cssFiles = await getAllCSSFiles(srcDir);
  
  console.log(`📁 Encontrados ${cssFiles.length} archivos CSS modules\n`);
  
  let totalChanges = 0;
  
  for (const file of cssFiles) {
    const changes = await fixFile(file);
    totalChanges += changes;
  }
  
  console.log(`\n🎉 Corrección completada:`);
  console.log(`   📄 ${cssFiles.length} archivos procesados`);
  console.log(`   ✨ ${totalChanges} errores corregidos`);
  
  if (totalChanges > 0) {
    console.log(`\n💡 Se recomienda ejecutar 'npm run tokens:validate' para verificar el estado final`);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { fixMigrationErrors, CORRECTIONS };
