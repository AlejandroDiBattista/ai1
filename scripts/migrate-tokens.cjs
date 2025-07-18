#!/usr/bin/env node

/**
 * Script de migración automática de valores hardcodeados a tokens CSS
 * Convierte valores como #1476FF → var(--color-primary)
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Mapeo de valores hardcodeados a tokens CSS
const TOKEN_MAPPING = {
  // Colores principales
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
  'rgba(0,0,0,0.25)': 'var(--color-overlay)',
  'rgba(0, 0, 0, 0.25)': 'var(--color-overlay)',
  
  // Colores adicionales del sistema
  '#F0F9FF': 'var(--color-blue-50)',
  '#0EA5E9': 'var(--color-blue-500)',
  '#0369A1': 'var(--color-blue-700)',
  '#1976D2': 'var(--color-blue-800)',
  '#007AFF': 'var(--color-blue-900)',
  '#E3F2FD': 'var(--color-blue-100)',
  '#BBDEFB': 'var(--color-blue-200)',
  
  '#F0FDF4': 'var(--color-green-50)',
  '#22C55E': 'var(--color-green-500)',
  '#15803D': 'var(--color-green-700)',
  '#16A34A': 'var(--color-green-600)',
  
  '#FEF2F2': 'var(--color-red-50)',
  '#EF4444': 'var(--color-red-500)',
  '#DC2626': 'var(--color-red-600)',
  '#D32F2F': 'var(--color-red-700)',
  '#FFEBEE': 'var(--color-red-100)',
  '#FFCDD2': 'var(--color-red-200)',
  '#FFE5E5': 'var(--color-red-100-alt)',
  
  '#FEF3C7': 'var(--color-yellow-100)',
  '#F59E0B': 'var(--color-yellow-500)',
  
  '#FAFAFA': 'var(--color-gray-50)',
  '#F0F0F0': 'var(--color-gray-100)',
  '#1C1C1E': 'var(--color-gray-900)',
  '#ffffff': 'var(--color-surface-01)', // lowercase variant
  
  // Colores con transparencia
  'rgba(20, 118, 255, 0.1)': 'var(--color-primary-10)',
  'rgba(20,118,255,0.1)': 'var(--color-primary-10)',
  'rgba(255, 59, 48, 0.1)': 'var(--color-error-10)',
  'rgba(255,59,48,0.1)': 'var(--color-error-10)',
  'rgba(0, 0, 0, 0.05)': 'var(--color-shadow-light)',
  'rgba(0,0,0,0.05)': 'var(--color-shadow-light)',
  'rgba(0, 0, 0, 0.06)': 'var(--color-shadow-medium)',
  'rgba(0,0,0,0.06)': 'var(--color-shadow-medium)',
  'rgba(0, 0, 0, 0.08)': 'var(--color-shadow-strong)',
  'rgba(0,0,0,0.08)': 'var(--color-shadow-strong)',
  'rgba(0, 0, 0, 0.1)': 'var(--color-shadow-darker)',
  'rgba(0,0,0,0.1)': 'var(--color-shadow-darker)',
  'rgba(0, 0, 0, 0.12)': 'var(--color-shadow-darkest)',
  'rgba(0,0,0,0.12)': 'var(--color-shadow-darkest)',
  
  // Tipografía
  'system-ui, -apple-system, sans-serif': 'var(--font-family)',
  
  // Tamaños de fuente
  '24px': 'var(--font-size-h1)',
  '20px': 'var(--font-size-h2)', 
  '17px': 'var(--font-size-h3)',
  '15px': 'var(--font-size-body)',
  '13px': 'var(--font-size-caption)',
  
  // Espaciado
  '4px': 'var(--spacing-1)',
  '8px': 'var(--spacing-2)',
  '12px': 'var(--spacing-3)',
  '14px': 'var(--spacing-sm)',
  '16px': 'var(--spacing-4)',
  '18px': 'var(--spacing-lg)',
  '20px': 'var(--spacing-5)',
  '28px': 'var(--spacing-7)',
  '36px': 'var(--spacing-9)',
  '48px': 'var(--spacing-12)',
  '56px': 'var(--spacing-xl)',
  
  // Radios
  '6px': 'var(--radius-sm)',
  '8px': 'var(--radius-base)',
  '999px': 'var(--radius-pill)',
  
  // Sombras
  '0px 2px 6px rgba(0,0,0,0.06)': 'var(--shadow-card)',
  '0px 4px 12px rgba(0,0,0,0.08)': 'var(--shadow-elevated)',
  
  // Transiciones
  '0.2s ease': 'var(--transition-fast)',
  '0.3s ease': 'var(--transition-medium)'
};

// Valores que NO deben ser reemplazados (específicos del negocio)
const PRESERVE_VALUES = [
  '44px', // altura específica de inputs
  '768px', // breakpoint móvil
  '100vh', // viewport height
  '100%', // porcentajes relativos
  '0%', // porcentajes
  'auto', // valores automáticos
  'none', // valores de none
  'inherit', // herencia
  'transparent' // transparente
];

// Contextos donde ciertos valores NO deben reemplazarse
const CONTEXT_RULES = {
  'height:': ['24px', '20px', '17px', '15px', '13px'], // No reemplazar font-sizes en height
  'width:': ['24px', '20px', '17px', '15px', '13px'],  // No reemplazar font-sizes en width
  'min-height:': ['24px', '20px', '17px', '15px', '13px'],
  'max-height:': ['24px', '20px', '17px', '15px', '13px'],
  'border-radius:': ['24px', '20px'], // Algunos radios específicos no mapear
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

function shouldPreserveValue(value, context = '') {
  // Valores explícitamente preservados
  if (PRESERVE_VALUES.includes(value)) {
    return true;
  }
  
  // Reglas contextuales
  for (const [prop, values] of Object.entries(CONTEXT_RULES)) {
    if (context.includes(prop) && values.includes(value)) {
      return true;
    }
  }
  
  return false;
}

function migrateCSS(content) {
  let result = content;
  let changes = 0;
  
  // Procesar línea por línea para mantener contexto
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    const originalLine = line;
    
    // Para cada mapeo de token
    for (const [hardcodedValue, tokenValue] of Object.entries(TOKEN_MAPPING)) {
      // Verificar si el valor está presente en la línea
      if (line.includes(hardcodedValue)) {
        // Extraer el contexto (propiedad CSS)
        const context = line.toLowerCase();
        
        // Verificar si debemos preservar este valor en este contexto
        if (!shouldPreserveValue(hardcodedValue, context)) {
          // Hacer el reemplazo
          line = line.replace(new RegExp(escapeRegExp(hardcodedValue), 'g'), tokenValue);
          
          if (line !== originalLine) {
            changes++;
            console.log(`  ✓ ${hardcodedValue} → ${tokenValue}`);
          }
        }
      }
    }
    
    lines[i] = line;
  }
  
  return { result: lines.join('\n'), changes };
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function migrateFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const { result, changes } = migrateCSS(content);
    
    if (changes > 0) {
      await writeFile(filePath, result, 'utf8');
      console.log(`✅ ${path.relative(process.cwd(), filePath)} - ${changes} cambios`);
      return changes;
    } else {
      console.log(`⚪ ${path.relative(process.cwd(), filePath)} - sin cambios`);
      return 0;
    }
  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
    return 0;
  }
}

async function main() {
  console.log('🚀 Iniciando migración de tokens CSS...\n');
  
  const srcDir = path.join(process.cwd(), 'src');
  const cssFiles = await getAllCSSFiles(srcDir);
  
  console.log(`📁 Encontrados ${cssFiles.length} archivos CSS modules\n`);
  
  let totalChanges = 0;
  
  for (const file of cssFiles) {
    const changes = await migrateFile(file);
    totalChanges += changes;
  }
  
  console.log(`\n🎉 Migración completada:`);
  console.log(`   📄 ${cssFiles.length} archivos procesados`);
  console.log(`   ✨ ${totalChanges} cambios realizados`);
  
  if (totalChanges > 0) {
    console.log(`\n💡 Recordatorio: Ejecuta 'npm run dev' para verificar que todo funciona correctamente`);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { migrateCSS, TOKEN_MAPPING };
