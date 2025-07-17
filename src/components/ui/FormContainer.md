# FormContainer Component

Componente contenedor que encapsula toda la lógica común de formularios con estructura estandarizada: header de errores, body scrollable para campos, y footer con acciones.

## Características

- **Estructura Completa**: Header (errores) + Body (campos) + Footer (acciones)
- **Body Scrollable**: Solo el contenido de campos hace scroll, header y footer fijos
- **Manejo de Errores**: Integración automática con FormErrors
- **Acciones Integradas**: Footer con botones de cancelar/enviar automáticos
- **Estados de Formulario**: Soporte para loading, readonly, diferentes modos
- **Responsive**: Layout adaptable a móviles

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `children` | `React.ReactNode` | ✅ | Campos del formulario que van en el body |
| `errors` | `Record<string, string \| undefined>` | ❌ | Errores de validación a mostrar |
| `onSubmit` | `(e: React.FormEvent) => void` | ✅ | Función de envío del formulario |
| `onCancel` | `() => void` | ✅ | Función de cancelación |
| `isSubmitting` | `boolean` | ❌ | Si el formulario se está enviando (default: false) |
| `isReadOnly` | `boolean` | ❌ | Si el formulario es de solo lectura (default: false) |
| `mode` | `'create' \| 'edit' \| 'view'` | ❌ | Modo del formulario (default: 'create') |
| `entityName` | `string` | ❌ | Nombre de la entidad para botones (default: 'Elemento') |
| `submitDisabled` | `boolean` | ❌ | Si el botón enviar está deshabilitado (default: false) |
| `className` | `string` | ❌ | Clase CSS adicional |

## Estructura

```tsx
<FormContainer>
  {/* Header automático - FormErrors */}
  
  {/* Body scrollable - children */}
  <FormRow>...</FormRow>
  <InputField>...</InputField>
  <SelectField>...</SelectField>
  
  {/* Footer automático - FormActions */}
</FormContainer>
```

## Uso

```tsx
import { FormContainer } from '../ui/FormContainer';
import { InputField, FormRow } from '../ui';

// Formulario de contacto completo
const ContactForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de envío
  };

  return (
    <FormContainer
      errors={errors}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/contacts')}
      isSubmitting={isSubmitting}
      mode="create"
      entityName="Contacto"
    >
      <FormRow>
        <InputField
          label="Nombre *"
          value={formData.firstName}
          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          error={errors.firstName}
          required
        />
        <InputField
          label="Apellidos *"
          value={formData.lastName}
          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          error={errors.lastName}
          required
        />
      </FormRow>
      
      <InputField
        label="Email *"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        error={errors.email}
        required
      />
    </FormContainer>
  );
};
```

## Modo Solo Lectura

```tsx
<FormContainer
  errors={undefined}
  onSubmit={() => {}}
  onCancel={() => navigate('/back')}
  isReadOnly={true}
  mode="view"
  entityName="Contacto"
>
  <InputField label="Nombre" value={contact.name} readOnly />
  <InputField label="Email" value={contact.email} readOnly />
</FormContainer>
```

## Con Validación y Estados

```tsx
const ProductForm = () => {
  // ... estados ...

  return (
    <FormContainer
      errors={errors}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isSubmitting={isSubmitting}
      submitDisabled={!isFormValid}
      mode={mode}
      entityName="Producto"
    >
      <FormRow>
        <InputField label="Código *" {...codeProps} />
        <InputField label="Stock *" {...stockProps} />
      </FormRow>
      
      {/* Elementos condicionales */}
      {showProfitInfo && (
        <div className="profit-info">
          Margen: {profit}%
        </div>
      )}
    </FormContainer>
  );
};
```

## Layout Responsive

El FormContainer mantiene automáticamente:
- **Header fijo**: Errores siempre visibles arriba
- **Body scrollable**: Campos hacen scroll cuando son muchos
- **Footer fijo**: Botones siempre accesibles abajo
- **Mobile-friendly**: Se adapta a pantallas pequeñas

## Ventajas

1. **DRY**: Elimina duplicación de estructura form/header/body/footer
2. **Consistencia**: Todos los formularios tienen el mismo layout
3. **Mantenibilidad**: Cambios en FormContainer afectan todos los forms
4. **Accesibilidad**: Estructura semántica estándar
5. **UX**: Scroll solo en contenido, controles siempre visibles

## Migración desde Form Tradicional

Antes:
```tsx
<form onSubmit={handleSubmit}>
  <FormErrors errors={errors} />
  <div className="form-body">
    {/* campos */}
  </div>
  <FormActions onCancel={onCancel} />
</form>
```

Después:
```tsx
<FormContainer
  errors={errors}
  onSubmit={handleSubmit}
  onCancel={onCancel}
>
  {/* campos */}
</FormContainer>
```
