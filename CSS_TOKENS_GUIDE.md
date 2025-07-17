# CSS Tokens Guide

Este proyecto utiliza un sistema de variables CSS centralizado. Las variables se definen en `src/styles/variables.css` y se basan en `src/styles/tokens.ts`.

## Ejemplos de Uso

```css
.button {
  background: var(--color-primary);
  padding: var(--spacing-3) var(--spacing-5);
  border-radius: var(--radius-md);
}
```

## Tabla de Conversión

| Valor original | Token |
| -------------- | ----- |
| `#1476FF` | `var(--color-primary)` |
| `#0F64DB` | `var(--color-primary-hover)` |
| `#FF3B30` | `var(--color-error)` |
| `#FF9500` | `var(--color-warning)` |
| `#34C759` | `var(--color-success)` |
| `#5AC8FA` | `var(--color-info)` |
| `#0A0A0A` | `var(--color-text-high)` |
| `#545454` | `var(--color-text-medium)` |
| `#8E8E93` | `var(--color-text-low)` |
| `#FFFFFF` | `var(--color-surface-01)` |
| `#F6F7F9` | `var(--color-surface-02)` |
| `#E5E5EA` | `var(--color-stroke)` |
| `4px` | `var(--spacing-1)` |
| `8px` | `var(--spacing-2)` |
| `12px` | `var(--spacing-3)` |
| `16px` | `var(--spacing-4)` |
| `20px` | `var(--spacing-5)` |
| `24px` | `var(--spacing-6)` |
| `6px` | `var(--radius-sm)` |
| `12px` | `var(--radius-md)` |
| `20px` | `var(--radius-lg)` |
| `999px` | `var(--radius-pill)` |
| `0px 2px 6px rgba(0,0,0,0.06)` | `var(--shadow-card)` |
| `0px 4px 12px rgba(0,0,0,0.08)` | `var(--shadow-elevated)` |

Al migrar estilos existentes, reemplaza los valores de la izquierda por los tokens correspondientes de la derecha, excepto en los casos explícitamente excluidos como alturas de inputs (44px) o breakpoints (768px).
