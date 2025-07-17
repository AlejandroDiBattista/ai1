# ListContainer Component

## Descripción
El componente `ListContainer` proporciona un contenedor estandarizado para todas las listas en la aplicación. Similar a `FormSection`, centraliza el estilo y comportamiento de los contenedores de lista, incluyendo el manejo de estados vacíos.

## Características principales
- ✅ Contenedor consistente para listas
- ✅ Manejo integrado de estados vacíos
- ✅ Variantes específicas por tipo de entidad
- ✅ Responsive design
- ✅ Integración con `ListCard` y otros componentes de UI

## Props

```typescript
interface ListContainerProps {
  children?: React.ReactNode;           // Contenido de la lista (ListCard components)
  variant?: 'default' | 'contacts' | 'products' | 'purchases'; // Variante de estilo
  className?: string;                   // Clases CSS adicionales
  emptyStateTitle?: string;             // Título para estado vacío
  emptyStateMessage?: string;           // Mensaje para estado vacío
  isEmpty?: boolean;                    // Si true, muestra estado vacío
}
```

## Uso

### Lista con elementos
```tsx
<ListContainer variant="contacts">
  {contacts.map((contact) => (
    <ListCard key={contact.id}>
      {/* Contenido del contacto */}
    </ListCard>
  ))}
</ListContainer>
```

### Lista vacía
```tsx
<ListContainer
  variant="contacts"
  isEmpty={true}
  emptyStateTitle="No hay contactos"
  emptyStateMessage="Agrega tu primer contacto para empezar"
/>
```

## Variantes disponibles
- `default`: Estilo básico sin personalización específica
- `contacts`: Optimizado para listas de contactos
- `products`: Optimizado para listas de productos  
- `purchases`: Optimizado para listas de compras

## Integración con otros componentes
- Se usa dentro de `ContactList`, `ProductList`, `PurchaseList`
- Contiene múltiples `ListCard` components
- Trabaja junto con `ListItemActions`

## Características técnicas
- Responsive design automático
- Estado vacío centralizado
- Flexbox layout con gap consistente
- Altura mínima definida para consistencia visual
- Props opcionales para máxima flexibilidad

## Estados
1. **Con contenido**: Muestra los `children` en un layout flexbox
2. **Vacío**: Muestra un estado vacío centralizado con título y mensaje personalizables

El componente simplifica significativamente la creación de listas consistentes en toda la aplicación.
