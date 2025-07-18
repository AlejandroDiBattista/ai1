# CSS Tokens Guide

## 🎯 Objetivo

Este documento describe el sistema de tokens CSS centralizado para mantener consistencia visual y facilitar el mantenimiento del proyecto.

## 📖 Qué son los Tokens CSS

Los tokens CSS son variables CSS custom properties que centralizan todos los valores de diseño (colores, espaciado, tipografía, etc.) en un solo lugar, permitiendo:

- ✅ **Consistencia**: Mismo color/espaciado en toda la aplicación
- ✅ **Mantenimiento**: Cambios globales desde un solo archivo
- ✅ **Escalabilidad**: Fácil agregar nuevos tokens
- ✅ **Temas**: Posibilidad futura de temas oscuros/claros

## 🗂️ Estructura del Sistema

### Archivo Principal
`src/styles/variables.css` - Contiene todos los tokens CSS importados automáticamente en `index.css`

### Categorías de Tokens

#### 🎨 Colores

##### Colores Principales
```css
var(--color-primary)        /* #1476FF - Azul principal */
var(--color-primary-hover)  /* #0F64DB - Hover del azul */
var(--color-error)          /* #FF3B30 - Rojo para errores */
var(--color-warning)        /* #FF9500 - Naranja para advertencias */
var(--color-success)        /* #34C759 - Verde para éxito */
var(--color-info)           /* #5AC8FA - Azul para información */
```

##### Colores de Texto
```css
var(--color-text-high)      /* #0A0A0A - Texto principal oscuro */
var(--color-text-medium)    /* #545454 - Texto secundario */
var(--color-text-low)       /* #8E8E93 - Texto deshabilitado */
```

##### Colores de Superficie
```css
var(--color-surface-01)     /* #FFFFFF - Fondo blanco */
var(--color-surface-02)     /* #F6F7F9 - Fondo gris claro */
var(--color-stroke)         /* #E5E5EA - Bordes */
var(--color-overlay)        /* rgba(0,0,0,0.25) - Overlay modal */
```

##### Paleta Extendida
```css
/* Azules */
var(--color-blue-50)        /* #F0F9FF */
var(--color-blue-500)       /* #0EA5E9 */
var(--color-blue-700)       /* #0369A1 */

/* Verdes */
var(--color-green-50)       /* #F0FDF4 */
var(--color-green-500)      /* #22C55E */
var(--color-green-700)      /* #15803D */

/* Rojos */
var(--color-red-50)         /* #FEF2F2 */
var(--color-red-500)        /* #EF4444 */
var(--color-red-600)        /* #DC2626 */

/* Colores con Transparencia */
var(--color-primary-10)     /* rgba(20, 118, 255, 0.1) */
var(--color-error-10)       /* rgba(255, 59, 48, 0.1) */
var(--color-shadow-light)   /* rgba(0, 0, 0, 0.05) */
var(--color-shadow-medium)  /* rgba(0, 0, 0, 0.06) */
```

#### 📐 Espaciado (Grid de 4px)

```css
var(--spacing-0)            /* 0px */
var(--spacing-1)            /* 4px */
var(--spacing-2)            /* 8px */
var(--spacing-3)            /* 12px */
var(--spacing-4)            /* 16px */
var(--spacing-5)            /* 20px */
var(--spacing-6)            /* 24px */

/* Espaciado Especial */
var(--spacing-sm)           /* 14px - Entre 12px y 16px */
var(--spacing-lg)           /* 18px - Elementos medianos */
var(--spacing-xl)           /* 56px - Elementos grandes */
```

#### 🔤 Tipografía

```css
/* Familia de Fuente */
var(--font-family)          /* system-ui, -apple-system, sans-serif */

/* Tamaños */
var(--font-size-h1)         /* 24px */
var(--font-size-h2)         /* 20px */
var(--font-size-h3)         /* 17px */
var(--font-size-body)       /* 15px */
var(--font-size-caption)    /* 13px */

/* Pesos */
var(--font-weight-h1)       /* 700 */
var(--font-weight-h2)       /* 600 */
var(--font-weight-body)     /* 400 */

/* Alturas de Línea */
var(--line-height-h1)       /* 32px */
var(--line-height-h2)       /* 28px */
var(--line-height-body)     /* 22px */
```

#### 🔘 Radios de Borde

```css
var(--radius-xs)            /* 4px */
var(--radius-sm)            /* 6px */
var(--radius-base)          /* 8px */
var(--radius-md)            /* 12px */
var(--radius-lg)            /* 20px */
var(--radius-pill)          /* 999px - Bordes completamente redondeados */
```

#### 🌟 Sombras

```css
var(--shadow-card)          /* 0px 2px 6px rgba(0,0,0,0.06) */
var(--shadow-elevated)      /* 0px 4px 12px rgba(0,0,0,0.08) */
var(--shadow-light)         /* 0 4px 12px rgba(0,0,0,0.1) */
```

#### ⚡ Transiciones

```css
var(--transition-fast)      /* 0.2s ease */
var(--transition-medium)    /* 0.3s ease */
```

## 🚀 Uso en Componentes

### ✅ Correcto
```css
.button {
  background-color: var(--color-primary);
  color: var(--color-surface-01);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-family: var(--font-family);
  font-size: var(--font-size-body);
  transition: var(--transition-fast);
}

.button:hover {
  background-color: var(--color-primary-hover);
}
```

### ❌ Incorrecto
```css
.button {
  background-color: #1476FF;        /* ❌ Hardcoded */
  color: #FFFFFF;                   /* ❌ Hardcoded */
  padding: 8px 16px;                /* ❌ Hardcoded */
  border-radius: 12px;              /* ❌ Hardcoded */
  font-family: system-ui;           /* ❌ Hardcoded */
}
```

## 📊 Tabla de Conversión Rápida

| Valor Hardcodeado | Token CSS | Uso |
|-------------------|-----------|-----|
| `#1476FF` | `var(--color-primary)` | Color principal |
| `#FFFFFF` | `var(--color-surface-01)` | Fondo blanco |
| `#F6F7F9` | `var(--color-surface-02)` | Fondo gris claro |
| `#0A0A0A` | `var(--color-text-high)` | Texto principal |
| `4px` | `var(--spacing-1)` | Espaciado mínimo |
| `8px` | `var(--spacing-2)` | Gap pequeño |
| `12px` | `var(--spacing-3)` | Padding medio |
| `16px` | `var(--spacing-4)` | Padding estándar |
| `6px` | `var(--radius-sm)` | Radio pequeño |
| `12px` | `var(--radius-md)` | Radio medio |
| `15px` | `var(--font-size-body)` | Texto del cuerpo |
| `13px` | `var(--font-size-caption)` | Texto pequeño |

## ⚠️ Valores que NO deben Tokenizarse

Algunos valores son específicos del negocio y deben mantenerse hardcodeados:

```css
/* ✅ Mantener hardcodeados */
height: 44px;                /* Altura específica de inputs */
width: 768px;                /* Breakpoint móvil */
max-width: 1024px;           /* Ancho máximo del contenedor */
min-height: 100vh;           /* Viewport completo */
```

## 🛠️ Scripts de Validación

### Validar Estado Actual
```bash
node scripts/validate-tokens.cjs
```
Genera reporte de progreso mostrando:
- Porcentaje de valores tokenizados vs hardcodeados
- Archivos que necesitan migración
- Valores específicos y sugerencias

### Migración Automática
```bash
node scripts/migrate-tokens.cjs
```
Convierte automáticamente valores hardcodeados a tokens CSS respetando las reglas de preservación.

## 🔄 Flujo de Trabajo

### Para Nuevos Componentes
1. **Siempre usa tokens** en lugar de valores hardcodeados
2. **Consulta esta guía** para encontrar el token adecuado
3. **Si necesitas un nuevo valor**, añádelo a `variables.css` primero

### Para Componentes Existentes
1. **Ejecuta validación** para identificar valores hardcodeados
2. **Usa migración automática** cuando sea posible
3. **Revisa manualmente** valores específicos del negocio

### Añadir Nuevos Tokens
1. **Añade al archivo** `src/styles/variables.css`
2. **Sigue la convención** de nombres: `--categoria-nombre`
3. **Actualiza los scripts** de migración si es necesario
4. **Documenta aquí** el nuevo token

## 🎨 Ejemplos Comunes

### Botones
```css
.primary-button {
  background-color: var(--color-primary);
  color: var(--color-surface-01);
  border-radius: var(--radius-md);
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-body);
  transition: var(--transition-fast);
}

.secondary-button {
  background-color: var(--color-surface-02);
  color: var(--color-text-high);
  border: 1px solid var(--color-stroke);
}
```

### Cards
```css
.card {
  background-color: var(--color-surface-01);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-card);
}
```

### Formularios
```css
.input {
  background-color: var(--color-surface-02);
  border: 1px solid var(--color-stroke);
  border-radius: var(--radius-sm);
  padding: 0 var(--spacing-4);
  font-size: var(--font-size-body);
  color: var(--color-text-high);
}

.input:focus {
  border-color: var(--color-primary);
}

.input.error {
  border-color: var(--color-error);
}
```

## 📈 Estadísticas del Proyecto

- ✅ **97.6%** de valores tokenizados
- 📄 **25** archivos CSS modules migrados  
- 🚀 **408** cambios automatizados aplicados
- ⚡ **Sistema completamente centralizado**

---

**💡 Tip**: Usa `Cmd+F` en VS Code para buscar valores hardcodeados como `#` o `px` y reemplázalos por tokens CSS.
