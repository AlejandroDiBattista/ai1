# InputField Component

Componente de campo de entrada estandarizado con soporte para etiquetas, estados de error y modo de solo lectura.

## Características

- **Diseño Uniforme**: Estilo consistente para todos los campos de entrada
- **Estados Visuales**: Error, solo lectura, normal
- **Accesibilidad**: Etiquetas asociadas y tabindex apropiado
- **Flexible**: Extiende todas las props nativas de input HTML
- **Tokens CSS**: Completamente tokenizado para consistencia visual

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `label` | `string` | ❌ | Etiqueta del campo |
| `error` | `string` | ❌ | Mensaje de error a mostrar |
| `readOnly` | `boolean` | ❌ | Si el campo es de solo lectura |
| `className` | `string` | ❌ | Clase CSS adicional |
| `...props` | `InputHTMLAttributes` | ❌ | Todas las props nativas de HTML input |

## Estados

### Normal
Campo de entrada estándar con fondo gris claro y borde sutil.

### Error
Borde rojo y mensaje de error debajo del campo.

### Solo Lectura
Fondo sin bordes, cursor por defecto y tabindex -1 para accesibilidad.

## Uso

```tsx
import { InputField } from '../ui/InputField';

// Campo básico
<InputField
  label="Nombre"
  placeholder="Ingresa tu nombre"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// Campo con error
<InputField
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error="Email inválido"
/>

// Campo de solo lectura
<InputField
  label="ID"
  value="12345"
  readOnly={true}
/>

// Campo numérico con validación
<InputField
  label="Cantidad"
  type="number"
  min="1"
  max="100"
  value={quantity}
  onChange={(e) => setQuantity(e.target.value)}
  placeholder="0"
/>
```

## Ejemplos de Formulario

```tsx
// Formulario de contacto
<FormContainer onSubmit={handleSubmit} onCancel={handleCancel}>
  <FormRow>
    <InputField
      label="Nombre *"
      value={formData.name}
      onChange={(e) => setFormData({...formData, name: e.target.value})}
      error={errors.name}
      required
    />
    <InputField
      label="Apellidos *"
      value={formData.surname}
      onChange={(e) => setFormData({...formData, surname: e.target.value})}
      error={errors.surname}
      required
    />
  </FormRow>
  
  <InputField
    label="Email *"
    type="email"
    value={formData.email}
    onChange={(e) => setFormData({...formData, email: e.target.value})}
    error={errors.email}
    placeholder="usuario@ejemplo.com"
    required
  />
  
  <InputField
    label="Teléfono"
    type="tel"
    value={formData.phone}
    onChange={(e) => setFormData({...formData, phone: e.target.value})}
    placeholder="+34 600 000 000"
  />
</FormContainer>
```

## Integración con FormRow

```tsx
// Dos campos en la misma fila
<FormRow>
  <InputField
    label="Precio *"
    type="number"
    min="0"
    step="0.01"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    placeholder="0,00"
  />
  <InputField
    label="Stock *"
    type="number"
    min="0"
    value={stock}
    onChange={(e) => setStock(e.target.value)}
    placeholder="0"
  />
</FormRow>
```

## Modo Solo Lectura en Formularios

```tsx
// Vista de detalles con campos de solo lectura
{mode === 'view' ? (
  <>
    <InputField
      label="Código"
      value={product.code}
      readOnly={true}
    />
    <InputField
      label="Descripción"
      value={product.description}
      readOnly={true}
    />
    <InputField
      label="Precio"
      value={formatCurrency(product.price)}
      readOnly={true}
    />
  </>
) : (
  // Formulario editable...
)}
```

## Validación y Errores

```tsx
const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  
  if (!formData.name.trim()) {
    newErrors.name = 'El nombre es obligatorio';
  }
  
  if (!formData.email.trim()) {
    newErrors.email = 'El email es obligatorio';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'El email no es válido';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// En el JSX
<InputField
  label="Nombre *"
  value={formData.name}
  onChange={(e) => setFormData({...formData, name: e.target.value})}
  error={errors.name}
  required
/>
```

## Tokens CSS Utilizados

```css
/* Variables utilizadas por InputField */
--color-surface-02      /* Fondo del campo */
--color-stroke          /* Borde normal */
--color-primary         /* Borde en focus */
--color-error           /* Borde y texto de error */
--color-text-high       /* Texto principal */
--color-text-medium     /* Etiqueta */
--color-text-low        /* Placeholder */
--font-family           /* Familia de fuente */
--font-size-body        /* Tamaño del texto */
--font-size-caption     /* Tamaño de etiqueta */
--spacing-1             /* Gap pequeño */
--spacing-3             /* Gap medio */
--spacing-4             /* Padding horizontal */
--radius-sm             /* Radio de borde */
--transition-fast       /* Transición de hover/focus */
```

## Accesibilidad

- **Etiquetas asociadas**: Las etiquetas están correctamente asociadas con los inputs
- **Navegación por teclado**: Soporta navegación completa por teclado
- **Modo solo lectura**: `tabindex="-1"` en campos de solo lectura
- **Estados visuales**: Indicadores claros de error y estados
- **Atributos semánticos**: Soporte para `required`, `aria-*`, etc.

## Notas Técnicas

- **Altura fija**: 44px para todos los inputs (valor específico del negocio)
- **Responsive**: Se adapta automáticamente al contenedor
- **Tokenizado**: Usa el sistema de tokens CSS para consistencia
- **Extensible**: Acepta todas las props nativas de HTML input
- **Type safety**: Tipado completo con TypeScript
