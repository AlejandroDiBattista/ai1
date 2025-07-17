# Avatar Component

## Descripción
El componente `Avatar` proporciona un avatar estandarizado y reutilizable para mostrar representaciones visuales de contactos, productos y compras en las listas. Genera automáticamente iniciales o códigos según el tipo de entidad.

## Características principales
- ✅ Avatares consistentes para diferentes tipos de entidades
- ✅ Generación automática de iniciales (contactos) y códigos (productos/compras)
- ✅ Colores específicos por tipo de entidad
- ✅ Múltiples tamaños disponibles
- ✅ Diseño responsive
- ✅ Efectos hover suaves

## Props

```typescript
interface AvatarProps {
  type: 'contact' | 'product' | 'purchase';  // Tipo de entidad
  value: string;                              // Valor base para generar el display
  firstName?: string;                         // Nombre (solo para contactos)
  lastName?: string;                          // Apellido (solo para contactos)
  size?: 'small' | 'medium' | 'large';      // Tamaño del avatar
  className?: string;                         // Clases CSS adicionales
}
```

## Uso

### Avatar para contacto
```tsx
<Avatar
  type="contact"
  value=""
  firstName="Juan"
  lastName="Pérez"
  size="medium"
/>
// Muestra: "JP" en azul
```

### Avatar para producto
```tsx
<Avatar
  type="product"
  value="LAP001"
  size="medium"
/>
// Muestra: "LA" en verde
```

### Avatar para compra
```tsx
<Avatar
  type="purchase"
  value="COMP123"
  size="medium"
/>
// Muestra: "CO" en naranja
```

## Tipos y colores
- **Contact**: Azul (#007AFF) - Muestra iniciales del nombre y apellido
- **Product**: Verde (#34C759) - Muestra primeros 2 caracteres del código
- **Purchase**: Naranja (#FF9500) - Muestra primeros 2 caracteres del ID

## Tamaños disponibles
- **Small**: 32x32px (móvil: 28x28px)
- **Medium**: 40x40px (móvil: 36x36px) - Por defecto
- **Large**: 56x56px (móvil: 48x48px)

## Integración
- Se usa en `ContactList`, `ProductList`, `PurchaseList`
- Reemplaza los avatares personalizados de cada lista
- Integrado con `ListCard` para visualización consistente

## Características técnicas
- Texto centrado con flexbox
- Border-radius: 50% para forma circular
- Font-weight: 600 para mejor legibilidad
- Transformación hover para interactividad
- Prefijos CSS para máxima compatibilidad
- `user-select: none` para evitar selección de texto

## Responsividad
Los tamaños se ajustan automáticamente en pantallas móviles para optimizar el espacio y la usabilidad.

El componente centraliza toda la lógica de generación de avatares, eliminando duplicación de código y asegurando consistencia visual en toda la aplicación.
