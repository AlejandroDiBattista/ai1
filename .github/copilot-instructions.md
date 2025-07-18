# AI Copilot Instructions - Business Management System

## Project Overview
React + TypeScript business management system with CRUD operations for contacts, products, purchases, and pending tasks. Built with Vite, CSS Modules, and comprehensive design system with CSS tokens. All data persists in localStorage.

## Design System & Styling

### CSS Token System
**MANDATORY**: Use CSS custom properties (tokens) for ALL styling values. The project uses a centralized token system defined in `src/styles/variables.css`.

#### Color Tokens
```css
/* Primary colors */
--color-primary, --color-primary-hover
--color-error, --color-warning, --color-success, --color-info

/* Text colors */
--color-text-high, --color-text-medium, --color-text-low

/* Surface colors */
--color-surface-01, --color-surface-02, --color-stroke, --color-overlay

/* Extended palette */
--color-blue-50, --color-blue-500, --color-green-50, --color-red-50, etc.
```

#### Spacing Tokens (4px grid)
```css
--spacing-1 (4px), --spacing-2 (8px), --spacing-3 (12px), --spacing-4 (16px)
--spacing-5 (20px), --spacing-6 (24px), --spacing-xs (5px), --spacing-sm (14px)
```

#### Typography Tokens
```css
--font-family, --font-size-h1/h2/h3/body/caption
--font-weight-h1/h2/h3/body/caption, --line-height-*
```

#### Other Tokens
```css
--radius-sm/md/lg/pill, --shadow-card/elevated/light
--transition-fast/medium, --size-input-height
```

### Styling Rules
1. **NEVER use hardcoded values** like `#1476FF`, `16px`, `12px`, etc.
2. **ALWAYS use tokens**: `var(--color-primary)`, `var(--spacing-4)`
3. **Business-specific values are allowed**: `44px` (input height), `768px` (mobile breakpoint)
4. **Use semantic naming**: prefer `--color-text-high` over specific hex values

## Core Architecture

### Component Structure Pattern
Every entity follows the same 3-component pattern:
- `{Entity}Management.tsx` - Main container with state management
- `{Entity}List.tsx` - Grid display with search/filter  
- `{Entity}Form.tsx` - Modal form for create/edit/view modes

### Data Flow Architecture
```
Hook (useContacts/useProducts/usePurchases) 
  ↓ 
Management Component (state + modal control)
  ↓
List Component (display + actions) + Form Component (CRUD operations)
```

### Custom Hooks Pattern
All hooks follow this signature:
```typescript
export const useEntity = () => ({
  entities,           // Filtered by search
  allEntities,        // Full dataset
  searchTerm,         // Current search
  setSearchTerm,      // Search setter
  createEntity,       // Create function
  updateEntity,       // Update function
  deleteEntity        // Delete function
});
```

## Design System Components

### Form Architecture
**Always use `FormContainer`** - never raw `<form>` elements:
```tsx
<FormContainer
  errors={errors}
  onSubmit={handleSubmit}
  onCancel={onCancel}
  isSubmitting={isSubmitting}
  mode="create|edit|view"
  entityName="Contacto"
>
  <FormRow>
    <InputField label="Nombre *" {...props} />
    <InputField label="Apellidos *" {...props} />
  </FormRow>
  <InputField label="Email *" {...props} />
</FormContainer>
```

### Layout Components
- `FormRow` - Horizontal field groups (responsive to vertical on mobile)
- `FormSection` - Themed sections with title/icon (`customer`, `items`, `summary`, `default`)
- `InputField/SelectField/TextAreaField` - All support `readOnly` mode for view states

### Modal Pattern
```tsx
<Modal
  isOpen={isModalOpen}
  onClose={closeModal}
  title={getModalTitle()}
  size="default|large"
>
  <FormComponent 
    mode={modalMode}
    onSubmit={handleSubmit}
    onCancel={closeModal}
    // edit/view modes only:
    onEdit={() => setModalMode('edit')}
    onDelete={() => handleDelete()}
  />
</Modal>
```

## File Organization

### Required Files for New Entities
```
src/
├── types/{entity}.ts              # TypeScript interfaces
├── hooks/{Entity}/use{Entities}.ts # Data management hook
├── components/{Entity}/
│   ├── {Entity}Management.tsx      # Main container
│   ├── {Entity}List.tsx           # Grid display
│   ├── {Entity}Form.tsx           # Modal form
│   └── index.ts                   # Exports
```

### Import Patterns
```typescript
// UI components - always from ../ui barrel export
import { InputField, FormRow, FormContainer } from '../ui';

// Icons - always from lucide-react
import { User, Mail, Phone } from 'lucide-react';

// Types - explicit imports
import type { Contact, ContactFormData } from '../../types/contact';
```

## Development Commands

```bash
npm run dev          # Development server (http://localhost:5173)
npm run build        # Production build
npm run lint         # ESLint check
```

## Data Persistence

All data auto-saves to localStorage with these keys:
- `contacts-agenda` - Contact records
- `products-inventory` - Product records  
- `purchases-management` - Purchase records
- `pending-tasks` - Task records

## Form Validation Patterns

### Standard Validation Structure
```typescript
interface FormErrors {
  fieldName?: string;
  general?: string;
}

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  
  if (!data.requiredField.trim()) {
    errors.requiredField = 'Este campo es obligatorio';
  }
  
  return errors;
};
```

### Input Field States
- **ReadOnly mode**: `readOnly={true}` removes borders, sets `tabIndex={-1}`
- **Error state**: Red border + error message below
- **Icon support**: All fields support icon props from lucide-react

## Critical Patterns

### CSS Modules Convention
```typescript
// Always use CSS Modules
import styles from './Component.module.css';

// Class naming: kebab-case in CSS, camelCase in JS
<div className={styles['form-row']} />
```

### LocalStorage Hook Pattern
```typescript
useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    // Parse with date reconstruction
    const parsed = JSON.parse(saved).map(item => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt)
    }));
    setItems(parsed);
  }
}, []);
```

### Search Implementation
```typescript
const filteredItems = useMemo(() => {
  if (!searchTerm) return allItems;
  
  return allItems.filter(item => 
    item.field1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.field2?.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [allItems, searchTerm]);
```

## Key Design Tokens

Access via `src/styles/tokens.ts`:
- Colors: `#1476FF` (primary), `#FF3B30` (error), `#34C759` (success)
- Typography: `system-ui, -apple-system, sans-serif`
- Spacing: 4px grid system (`tokens.spacing.1` through `tokens.spacing.6`)
- Form fields: `#F6F7F9` background, `#E5E5EA` borders

## Business Logic Patterns

### Purchase Form Complexity
Purchase forms are the most complex - they include:
- Customer selection from contacts
- Multiple product selection with quantities
- Real-time price calculations (subtotal + 21% IVA)
- Stock validation
- Dynamic add/remove product rows

### Product Profit Calculations
```typescript
const margen = precio > 0 ? ((precio - costo) / precio) * 100 : 0;
const ganancia = precio - costo;
```

When contributing, prioritize consistency with existing patterns over innovation. The system values predictable structure and unified user experience.
