#!/usr/bin/env node

/**
 * Script de validación para auditar el uso de tokens CSS
 * Identifica valores hardcodeados que podrían migrarse
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Patrones de valores CSS que deberían usar tokens
const PATTERNS = {
  colors: {
    pattern: /#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgba?\([^)]+\)/g,
    tokenized: ['var(--color-', 'inherit', 'transparent', 'currentColor']
  },
  spacing: {
    pattern: /\b(\d+)px\b/g,
    tokenized: ['var(--spacing-'],
    ignore: ['44px', '768px'] // Valores específicos del negocio
  },
  typography: {
    pattern: /font-family:\s*[^;]+/g,
    tokenized: ['var(--font-family)']
  },
  borderRadius: {
    pattern: /border-radius:\s*(\d+)px/g,
    tokenized: ['var(--radius-']
  },
  boxShadow: {
    pattern: /box-shadow:\s*[^;]+/g,
    tokenized: ['var(--shadow-']
  }
};

// Valores que están bien hardcodeados
const ALLOWED_HARDCODED = [
  '0px', '1px', '2px', '3px', // Valores muy pequeños
  '44px', // Altura específica de inputs
  '768px', // Breakpoint móvil
  '100%', '50%', '25%', '75%', // Porcentajes
  '100vh', '100vw', // Viewport
  'auto', 'none', 'inherit', 'initial', 'unset',
  'transparent', 'currentColor'
];

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

function analyzeFile(content, filePath) {
  const issues = [];
  const stats = {
    totalLines: content.split('\n').length,
    tokenizedCount: 0,
    hardcodedCount: 0
  };
  
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    
    // Analizar cada patrón
    Object.entries(PATTERNS).forEach(([category, config]) => {
      const matches = line.match(config.pattern);
      
      if (matches) {
        matches.forEach(match => {
          // Verificar si ya usa tokens
          const usesToken = config.tokenized.some(token => match.includes(token));
          
          if (usesToken) {
            stats.tokenizedCount++;
          } else {
            // Verificar si es un valor permitido
            const isAllowed = ALLOWED_HARDCODED.some(allowed => match.includes(allowed));
            
            if (!isAllowed && !config.ignore?.some(ignored => match.includes(ignored))) {
              stats.hardcodedCount++;
              issues.push({
                file: path.relative(process.cwd(), filePath),
                line: lineNumber,
                category,
                value: match.trim(),
                suggestion: getSuggestion(match.trim(), category)
              });
            }
          }
        });
      }
    });
  });
  
  return { issues, stats };
}

function getSuggestion(value, category) {
  const suggestions = {
    colors: {
      '#1476FF': 'var(--color-primary)',
      '#0F64DB': 'var(--color-primary-hover)',
      '#FF3B30': 'var(--color-error)',
      '#0A0A0A': 'var(--color-text-high)',
      '#545454': 'var(--color-text-medium)',
      '#8E8E93': 'var(--color-text-low)',
      '#FFFFFF': 'var(--color-surface-01)',
      '#F6F7F9': 'var(--color-surface-02)',
      '#E5E5EA': 'var(--color-stroke)'
    },
    spacing: {
      '4px': 'var(--spacing-1)',
      '8px': 'var(--spacing-2)',
      '12px': 'var(--spacing-3)',
      '16px': 'var(--spacing-4)',
      '20px': 'var(--spacing-5)',
      '24px': 'var(--spacing-6)'
    },
    borderRadius: {
      '6px': 'var(--radius-sm)',
      '12px': 'var(--radius-md)',
      '20px': 'var(--radius-lg)',
      '999px': 'var(--radius-pill)'
    }
  };
  
  if (suggestions[category] && suggestions[category][value]) {
    return suggestions[category][value];
  }
  
  return `Considerar token de ${category}`;
}

function generateReport(allIssues, allStats) {
  console.log('📊 REPORTE DE VALIDACIÓN DE TOKENS CSS');
  console.log('='.repeat(50));
  
  // Estadísticas generales
  const totalTokenized = allStats.reduce((sum, stat) => sum + stat.tokenizedCount, 0);
  const totalHardcoded = allStats.reduce((sum, stat) => sum + stat.hardcodedCount, 0);
  const totalValues = totalTokenized + totalHardcoded;
  
  console.log(`\n📈 ESTADÍSTICAS GENERALES:`);
  console.log(`   ✅ Valores tokenizados: ${totalTokenized} (${((totalTokenized/totalValues)*100).toFixed(1)}%)`);
  console.log(`   ⚠️  Valores hardcodeados: ${totalHardcoded} (${((totalHardcoded/totalValues)*100).toFixed(1)}%)`);
  console.log(`   📄 Total de archivos: ${allStats.length}`);
  
  if (allIssues.length === 0) {
    console.log(`\n🎉 ¡Excelente! No se encontraron valores hardcodeados que requieran migración.`);
    return;
  }
  
  // Agrupar por categoría
  const byCategory = {};
  allIssues.forEach(issue => {
    if (!byCategory[issue.category]) {
      byCategory[issue.category] = [];
    }
    byCategory[issue.category].push(issue);
  });
  
  console.log(`\n🔍 VALORES HARDCODEADOS ENCONTRADOS (${allIssues.length}):`);
  
  Object.entries(byCategory).forEach(([category, issues]) => {
    console.log(`\n📂 ${category.toUpperCase()} (${issues.length} ocurrencias):`);
    
    // Agrupar por valor para evitar repetición
    const byValue = {};
    issues.forEach(issue => {
      if (!byValue[issue.value]) {
        byValue[issue.value] = [];
      }
      byValue[issue.value].push(issue);
    });
    
    Object.entries(byValue).forEach(([value, valueIssues]) => {
      console.log(`   🔸 ${value} → ${valueIssues[0].suggestion}`);
      console.log(`     📍 ${valueIssues.length} ocurrencia(s) en:`);
      valueIssues.forEach(issue => {
        console.log(`        ${issue.file}:${issue.line}`);
      });
    });
  });
  
  // Top archivos con más problemas
  const fileIssues = {};
  allIssues.forEach(issue => {
    if (!fileIssues[issue.file]) {
      fileIssues[issue.file] = 0;
    }
    fileIssues[issue.file]++;
  });
  
  const topFiles = Object.entries(fileIssues)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
  
  if (topFiles.length > 0) {
    console.log(`\n🎯 ARCHIVOS QUE MÁS NECESITAN MIGRACIÓN:`);
    topFiles.forEach(([file, count], index) => {
      console.log(`   ${index + 1}. ${file} (${count} valores)`);
    });
  }
  
  console.log(`\n💡 RECOMENDACIONES:`);
  console.log(`   1. Ejecuta 'node scripts/migrate-tokens.js' para migración automática`);
  console.log(`   2. Revisa manualmente los archivos con más valores hardcodeados`);
  console.log(`   3. Ejecuta este script nuevamente para verificar progreso`);
}

async function main() {
  console.log('🔍 Iniciando validación de tokens CSS...\n');
  
  const srcDir = path.join(process.cwd(), 'src');
  const cssFiles = await getAllCSSFiles(srcDir);
  
  console.log(`📁 Analizando ${cssFiles.length} archivos CSS modules...\n`);
  
  const allIssues = [];
  const allStats = [];
  
  for (const file of cssFiles) {
    try {
      const content = await readFile(file, 'utf8');
      const { issues, stats } = analyzeFile(content, file);
      
      allIssues.push(...issues);
      allStats.push(stats);
      
      const relativeFile = path.relative(process.cwd(), file);
      if (issues.length > 0) {
        console.log(`⚠️  ${relativeFile} - ${issues.length} valores hardcodeados`);
      } else {
        console.log(`✅ ${relativeFile} - completamente tokenizado`);
      }
    } catch (error) {
      console.error(`❌ Error analizando ${file}:`, error.message);
    }
  }
  
  console.log('');
  generateReport(allIssues, allStats);
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { analyzeFile, PATTERNS };
