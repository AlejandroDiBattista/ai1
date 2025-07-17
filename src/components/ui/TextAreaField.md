# TextAreaField Component

Componente reutilizable para campos de texto multilínea que mantiene la consistencia visual con InputField.

## Características

- **Diseño Consistente**: Sigue el mismo patrón visual que InputField
- **Icono Opcional**: Soporte para iconos con posicionamiento automático
- **Estados Visuales**: Normal, error, solo lectura con estilos diferenciados
- **Validación**: Muestra mensajes de error debajo del campo
- **Accesible**: Soporte completo para lectores de pantalla
- **Responsivo**: Se adapta a diferentes tamaños de pantalla

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `label` | `string` | ❌ | Etiqueta del campo |
| `error` | `string` | ❌ | Mensaje de error a mostrar |
| `icon` | `React.ReactNode` | ❌ | Icono a mostrar en el lado izquierdo |
| `readOnly` | `boolean` | ❌ | Si el campo es de solo lectura |
| `className` | `string` | ❌ | Clase CSS adicional para el textarea |
| `...props` | `TextareaHTMLAttributes` | ❌ | Todas las props nativas de textarea |

## Uso

```tsx
import { TextAreaField } from '../ui/TextAreaField';
import { FileText } from 'lucide-react';

// Uso básico
<TextAreaField
  label="Notas"
  placeholder="Escribe tus notas aquí..."
  value={formData.notes}
  onChange={(e) => handleChange('notes', e.target.value)}
/>

// Con icono y validación
<TextAreaField
  label="Descripción *"
  placeholder="Descripción detallada..."
  value={formData.description}
  onChange={(e) => handleChange('description', e.target.value)}
  error={errors.description}
  icon={<FileText size={18} />}
  required
/>

// Solo lectura
<TextAreaField
  label="Comentarios"
  value="Comentario de solo lectura"
  icon={<FileText size={18} />}
  readOnly
/>
```

## Estados

### Normal
- Fondo gris claro (#F6F7F9)
- Borde gris (#E5E5EA)
- Al hacer focus: borde azul (#1476FF)

### Error
- Borde rojo (#FF3B30)
- Mensaje de error en rojo debajo del campo

### Solo Lectura
- Fondo gris claro mantenido
- Cursor por defecto
- Sin posibilidad de edición
- tabIndex -1 para navegación por teclado

## Características Técnicas

- **Resize**: Vertical automático para ajustar altura
- **Min-height**: 80px por defecto
- **Padding**: 12px vertical, 16px horizontal
- **Con icono**: Padding-left de 44px automático
- **Tipografía**: System fonts con line-height optimizado

## Integración

Este componente se integra perfectamente con:
- Formularios de contactos, productos y compras
- Sistemas de validación existentes
- Estructura de form-header/body/footer
- Responsive design patterns

## Ventajas

- **Consistencia**: Misma apariencia que InputField
- **Reutilización**: Una sola implementación para todos los textareas
- **Mantenimiento**: Estilos centralizados y fáciles de actualizar
- **Flexibilidad**: Todas las props nativas de textarea disponibles
