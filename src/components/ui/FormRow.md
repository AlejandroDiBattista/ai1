# FormRow Component

Componente contenedor para organizar campos de formulario en filas horizontales que se adaptan responsivamente.

## Características

- **Flexbox Layout**: Distribución automática del espacio entre campos
- **Responsive**: Se convierte en columna vertical en móviles (≤640px)
- **Flexible**: Acepta cualquier número de campos como children
- **Semántico**: Proporciona estructura clara y legible en el código
- **Auto-sizing**: Los campos se distribuyen equitativamente (flex: 1)

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `children` | `React.ReactNode` | ✅ | Campos de formulario a mostrar en la fila |
| `className` | `string` | ❌ | Clase CSS adicional para personalizar el estilo |

## Uso

```tsx
import { FormRow } from '../ui/FormRow';
import { InputField } from '../ui/InputField';

// Fila con dos campos
<FormRow>
  <InputField
    label="Nombre *"
    value={formData.firstName}
    onChange={(e) => handleChange('firstName', e.target.value)}
  />
  <InputField
    label="Apellidos *"
    value={formData.lastName}
    onChange={(e) => handleChange('lastName', e.target.value)}
  />
</FormRow>

// Fila con tres campos
<FormRow>
  <InputField label="Código *" value={formData.codigo} />
  <InputField label="Stock *" value={formData.stock} />
  <InputField label="Precio *" value={formData.precio} />
</FormRow>

// Fila con clase personalizada
<FormRow className="custom-spacing">
  <InputField label="Costo *" value={formData.costo} />
  <InputField label="Precio *" value={formData.precio} />
</FormRow>
```

## Comportamiento Responsive

### Desktop (>640px)
- **Layout**: Horizontal (flex-direction: row)
- **Gap**: 16px entre campos
- **Distribución**: Cada campo ocupa espacio igual (flex: 1)

### Mobile (≤640px)
- **Layout**: Vertical (flex-direction: column)
- **Gap**: 20px entre campos
- **Distribución**: Cada campo ocupa todo el ancho

## Casos de Uso

### Formularios de Contacto
```tsx
<FormRow>
  <InputField label="Nombre *" />
  <InputField label="Apellidos *" />
</FormRow>
```

### Formularios de Producto
```tsx
<FormRow>
  <InputField label="Código *" />
  <InputField label="Stock *" />
</FormRow>

<FormRow>
  <InputField label="Costo *" />
  <InputField label="Precio *" />
</FormRow>
```

### Formularios Complejos
```tsx
<FormRow>
  <InputField label="Campo 1" />
  <InputField label="Campo 2" />
  <InputField label="Campo 3" />
</FormRow>
```

## Ventajas

1. **🎯 Semántica**: Código más legible y expresivo
2. **📱 Responsive**: Automáticamente optimizado para móviles
3. **🔧 Mantenible**: Estilos centralizados y reutilizables
4. **⚡ Flexible**: Funciona con cualquier número de campos
5. **✨ Consistente**: Misma distribución en todos los formularios

## Integración

Se integra perfectamente con:
- InputField y TextAreaField
- Sistema de validación de formularios
- FormErrors y FormActions
- Estructura header/body/footer de formularios

## CSS Personalizado

```css
/* Ejemplo de personalización */
.custom-spacing {
  gap: 24px; /* Mayor espacio entre campos */
}

.narrow-fields > * {
  max-width: 200px; /* Limitar ancho de campos */
}
```
