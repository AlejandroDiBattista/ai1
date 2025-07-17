# SelectField Component

Componente de campo de selección (dropdown) que mantiene consistencia visual y funcional con InputField.

## Características

- **Diseño Consistente**: Mismo estilo visual que InputField
- **Icono Opcional**: Soporte para iconos junto al label
- **Validación**: Manejo de errores con estilos visuales
- **Estados**: Soporte para readOnly, disabled, required
- **Accesibilidad**: Labels apropiados y aria-attributes
- **Responsive**: Se adapta al contenedor padre

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `label` | `string` | ✅ | Texto del label |
| `value` | `string` | ✅ | Valor seleccionado actual |
| `onChange` | `(e: ChangeEvent<HTMLSelectElement>) => void` | ✅ | Función de cambio |
| `options` | `SelectOption[]` | ✅ | Array de opciones disponibles |
| `placeholder` | `string` | ❌ | Texto del placeholder (default: "Seleccionar opción...") |
| `error` | `string` | ❌ | Mensaje de error a mostrar |
| `icon` | `React.ReactNode` | ❌ | Icono para mostrar junto al label |
| `readOnly` | `boolean` | ❌ | Si el campo es de solo lectura |
| `disabled` | `boolean` | ❌ | Si el campo está deshabilitado |
| `required` | `boolean` | ❌ | Si el campo es obligatorio |
| `className` | `string` | ❌ | Clase CSS adicional |
| `id` | `string` | ❌ | ID del elemento (se genera automáticamente si no se proporciona) |

## Tipo SelectOption

```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Uso

```tsx
import { SelectField } from '../ui/SelectField';
import { User } from 'lucide-react';

// Uso básico
<SelectField
  label="País"
  value={formData.country}
  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
  options={[
    { value: 'es', label: 'España' },
    { value: 'fr', label: 'Francia' },
    { value: 'it', label: 'Italia' }
  ]}
/>

// Con icono y validación
<SelectField
  label="Cliente"
  value={formData.customerId}
  onChange={(e) => handleCustomerChange(e.target.value)}
  options={customers.map(customer => ({
    value: customer.id,
    label: `${customer.name} - ${customer.email}`
  }))}
  placeholder="Seleccionar cliente..."
  error={errors.customerId}
  icon={<User size={18} />}
  required
/>

// Con opciones deshabilitadas
<SelectField
  label="Producto"
  value={formData.productId}
  onChange={(e) => setFormData(prev => ({ ...prev, productId: e.target.value }))}
  options={products.map(product => ({
    value: product.id,
    label: `${product.name} (Stock: ${product.stock})`,
    disabled: product.stock === 0
  }))}
/>

// Solo lectura
<SelectField
  label="Estado"
  value="active"
  onChange={() => {}}
  options={[{ value: 'active', label: 'Activo' }]}
  readOnly
/>
```

## Estados Visuales

- **Normal**: Fondo gris claro (#F6F7F9)
- **Focus**: Borde azul con sombra sutil
- **Error**: Borde rojo con mensaje de error
- **Disabled**: Fondo gris oscuro, texto atenuado
- **Required**: Asterisco rojo junto al label

## Integración con Formularios

```tsx
// Ejemplo en formulario completo
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    type: ''
  });
  
  return (
    <form>
      <InputField
        label="Nombre"
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
      />
      
      <SelectField
        label="País"
        value={formData.country}
        onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
        options={countryOptions}
        required
      />
      
      <SelectField
        label="Tipo de Cliente"
        value={formData.type}
        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
        options={typeOptions}
      />
    </form>
  );
};
```

## Casos de Uso

- **Formularios de contacto** - Selección de países, estados, categorías
- **Formularios de compra** - Selección de clientes, productos, métodos de pago  
- **Configuraciones** - Opciones de sistema, preferencias, roles
- **Filtros** - Opciones de ordenamiento, categorías, estados
- **Cualquier dropdown** que necesite consistencia con InputField
