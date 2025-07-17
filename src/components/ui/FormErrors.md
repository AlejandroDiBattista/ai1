# FormErrors Component

Componente completamente auto-contenido para mostrar errores de validación en formularios con renderizado condicional y header integrado.

## Características

- **Auto-contenido**: Incluye su propio contenedor `form-header` con estilos pegajosos
- **Renderizado condicional**: Solo se muestra cuando hay errores presentes
- **Flexible**: Acepta cualquier objeto de errores con valores string o undefined
- **Responsivo**: Se adapta a diferentes tamaños de pantalla
- **Accesible**: Usa colores y tipografía que cumplen estándares de accesibilidad

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `errors` | `Record<string, string \| undefined>` | ✅ | Objeto con los errores a mostrar. Las claves son los nombres de campos y los valores son los mensajes de error |
| `className` | `string` | ❌ | Clase CSS adicional para personalizar el estilo |

## Uso

```tsx
import { FormErrors } from '../ui/FormErrors';

// En el componente del formulario
const [errors, setErrors] = useState<Record<string, string | undefined>>({});

// En el JSX, directamente en el form (no necesita wrapper)
<form className={styles.form}>
  <FormErrors errors={errors} />
  
  <div className={styles['form-body']}>
    {/* Campos del formulario */}
  </div>
  
  <FormActions {...props} />
</form>
```

## Ejemplo

```tsx
const errors = {
  firstName: 'El nombre es obligatorio',
  email: 'El email no es válido',
  phone: 'El teléfono es obligatorio',
  company: undefined // Se ignora automáticamente
};

<FormErrors errors={errors} />
```

## Comportamiento

### Renderizado Condicional
- **Sin errores**: El componente no se renderiza (return null)
- **Con errores**: Se muestra el header completo con la lista de errores
- **Filtrado automático**: Ignora valores undefined o vacíos

### Estructura Renderizada
```tsx
// Solo cuando hay errores
<div className="form-header">
  <div className="error-list">
    <p className="error-title">Por favor, corrige los siguientes errores:</p>
    <div className="error-item">• Mensaje de error 1</div>
    <div className="error-item">• Mensaje de error 2</div>
  </div>
</div>
```

## Estilos Integrados
El componente incluye:
- `.form-header`: Contenedor pegajoso con padding y borde inferior
- `.error-list`: Fondo rojo claro con borde rojo
- `.error-title`: Título en rojo con tipografía destacada
- `.error-item`: Items de error con bullet points

## Ventajas de la Refactorización

### Antes
```tsx
{Object.keys(errors).length > 0 && (
  <div className={styles['form-header']}>
    <FormErrors errors={errors} />
  </div>
)}
```

### Después
```tsx
<FormErrors errors={errors} />
```

## Beneficios

1. **🚀 Menos código**: Los formularios son más limpios y concisos
2. **🎯 Encapsulamiento**: FormErrors es completamente auto-contenido
3. **🔧 Mantenimiento**: Cambios al header de errores se hacen en un solo lugar
4. **✨ Consistencia**: Todos los headers de error tienen exactamente el mismo estilo
5. **📦 Simplicidad**: No requiere lógica condicional en los formularios

## Integración

Este componente funciona perfectamente con:
- Estructura de formularios header/body/footer pegajosos
- Sistema de validación de formularios
- Componentes FormActions y TextAreaField/InputField
- Responsive design patterns
