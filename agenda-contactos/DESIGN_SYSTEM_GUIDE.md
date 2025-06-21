# Guía de Sistema de Diseño - Interfaces de Gestión

## 📋 Índice
1. [Introducción](#introducción)
2. [Estructura General](#estructura-general)
3. [Componentes Base](#componentes-base)
4. [Patrones de Diseño](#patrones-de-diseño)
5. [Sistema de Colores](#sistema-de-colores)
6. [Tipografía](#tipografía)
7. [Espaciado y Layout](#espaciado-y-layout)
8. [Estados y Interacciones](#estados-y-interacciones)
9. [Responsive Design](#responsive-design)
10. [Mejores Prácticas](#mejores-prácticas)

---

## 🎯 Introducción

Esta guía documenta el sistema de diseño desarrollado para interfaces de gestión (CRUD) consistentes y modernas. Se basa en principios de claridad, accesibilidad y experiencia de usuario uniforme.

### Principios Fundamentales
- **Consistencia**: Todos los componentes siguen los mismos patrones visuales
- **Claridad**: La información se presenta de manera clara y estructurada
- **Accesibilidad**: Interfaces usables para todos los usuarios
- **Simplicidad**: Diseño limpio sin elementos innecesarios

---

## 🏗️ Estructura General

### Layout Principal
```
┌─────────────────────────────────────┐
│ Sidebar (280px)     │ Main Content  │
│                     │               │
│ - Navigation        │ - Header      │
│ - Menu Items        │ - Search      │
│                     │ - List/Grid   │
│                     │               │
└─────────────────────────────────────┘
```

### Estructura de Página
1. **Header**: Título, acciones principales, búsqueda
2. **Contenido**: Lista de elementos en tarjetas individuales
3. **FAB**: Botón flotante para acción principal (móvil)

---

## 🧩 Componentes Base

### 1. Modal Component

#### Estructura
```tsx
<Modal 
  isOpen={boolean}
  onClose={function}
  title={string}
  size="default" | "large"
  footer={ReactNode}
>
  {children}
</Modal>
```

#### CSS Key Features
```css
.modal {
  max-width: 500px; /* default */
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal--large {
  max-width: 800px;
}

.header {
  flex-shrink: 0; /* Siempre visible */
}

.content {
  flex: 1;
  overflow-y: auto; /* Solo el contenido hace scroll */
}

.footer {
  flex-shrink: 0; /* Siempre visible */
}
```

### 2. InputField Component

#### Modos de Uso
- **Normal**: Campo editable con borde y fondo
- **ReadOnly**: Texto simple sin apariencia de campo

#### CSS Readonly Pattern
```css
.input--readonly {
  border: none;
  background-color: transparent;
  padding: 8px 0;
  color: #0A0A0A;
  font-weight: 500;
  cursor: default;
  tabIndex: -1; /* No focuseable */
}

.input--readonly:focus {
  outline: none;
  box-shadow: none;
}
```

### 3. Button Component

#### Variantes
- **Primary**: Acción principal (azul)
- **Secondary**: Acción secundaria (gris)

#### CSS
```css
.button {
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.button--primary {
  background-color: #1476FF;
  color: white;
}

.button--secondary {
  background-color: #F6F7F9;
  color: #545454;
}
```

---

## 🎨 Patrones de Diseño

### 1. Header Unificado

#### Estructura Consistente
```tsx
<header className={styles.header}>
  <div className={styles['title-section']}>
    <div className={styles['title-group']}>
      <Icon size={28} className={styles['title-icon']} />
      <h1 className={styles.title}>Título</h1>
      <span className={styles['title-badge']}>
        {contador}
      </span>
    </div>
    <Button onClick={openCreateModal}>
      <Plus size={18} />
      Nuevo Elemento
    </Button>
  </div>
  
  <div className={styles['search-section']}>
    <SearchBar />
    <span className={styles.stats}>
      {estadísticas}
    </span>
  </div>
</header>
```

#### CSS del Header
```css
.header {
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.06);
  padding: 24px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.title-badge {
  background: #E5F1FF;
  color: #1476FF;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 500;
}
```

### 2. Tarjetas de Lista

#### Patrón Uniforme
```tsx
<div className={styles['contact-card']} onClick={handleClick}>
  <div className={styles.avatar}>
    {iniciales}
  </div>
  
  <div className={styles.info}>
    <h3 className={styles.name}>Nombre Principal</h3>
    <div className={styles['contact-info']}>
      <div className={styles['contact-detail']}>
        <Icon size={14} />
        Detalle 1
      </div>
      <div className={styles['contact-detail']}>
        <Icon size={14} />
        Detalle 2
      </div>
      <div className={styles['contact-detail']}>
        <Icon size={14} />
        Detalle 3 (opcional)
      </div>
    </div>
  </div>
  
  <div className={styles.actions}>
    <button className={styles['edit-button']}>
      <Edit size={16} />
    </button>
    <button className={styles['delete-button']}>
      <Trash2 size={16} />
    </button>
  </div>
</div>
```

#### CSS de Tarjetas
```css
.contact-card {
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.06);
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.contact-card:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
}

.avatar {
  width: 48px;
  height: 48px;
  background-color: #1476FF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  font-weight: 600;
  font-size: 18px;
}

.actions {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.contact-card:hover .actions {
  opacity: 1;
}
```

### 3. Formularios en Modo Vista

#### Patrón de Solo Lectura
```tsx
{mode === 'view' ? (
  <InputField
    label="Campo"
    value={valor}
    icon={<Icon size={18} />}
    readOnly={true}
  />
) : (
  <InputField
    label="Campo"
    value={valor}
    onChange={handleChange}
    icon={<Icon size={18} />}
  />
)}
```

---

## 🎨 Sistema de Colores

### Colores Principales
```css
:root {
  /* Primario */
  --color-primary: #1476FF;
  --color-primary-light: #E5F1FF;
  
  /* Grises */
  --color-text-primary: #0A0A0A;
  --color-text-secondary: #545454;
  --color-text-tertiary: #8E8E93;
  
  /* Fondos */
  --color-background: #F6F7F9;
  --color-surface: #FFFFFF;
  --color-border: #E5E5EA;
  
  /* Estados */
  --color-success: #34C759;
  --color-warning: #FF9500;
  --color-error: #FF3B30;
}
```

### Uso de Colores
- **Primario (#1476FF)**: Botones principales, íconos activos, enlaces
- **Superficie (#FFFFFF)**: Tarjetas, modales, headers
- **Fondo (#F6F7F9)**: Fondo general de la aplicación
- **Bordes (#E5E5EA)**: Líneas divisorias, bordes de campos

---

## 📝 Tipografía

### Sistema de Fuentes
```css
font-family: system-ui, -apple-system, sans-serif;
```

### Jerarquía
```css
/* Títulos Principales */
.title {
  font-size: 24px;
  font-weight: 700;
  color: #0A0A0A;
}

/* Nombres en Tarjetas */
.name {
  font-size: 17px;
  font-weight: 600;
  color: #0A0A0A;
}

/* Detalles */
.contact-detail {
  font-size: 13px;
  color: #545454;
}

/* Labels */
.label {
  font-size: 13px;
  font-weight: 400;
  color: #545454;
}
```

---

## 📐 Espaciado y Layout

### Sistema de Espaciado
```css
/* Espacios Base */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 12px;
--space-lg: 16px;
--space-xl: 20px;
--space-2xl: 24px;
```

### Grid y Flex Patterns
```css
/* Layout de Formulario */
.form-row {
  display: flex;
  gap: 16px;
}

/* Lista Container */
.list-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Header Layout */
.title-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
```

---

## ⚡ Estados y Interacciones

### Estados de Hover
```css
.element:hover {
  transform: translateY(-2px);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
}
```

### Transiciones
```css
transition: all 0.2s ease;
```

### Estados de Focus
```css
.input:focus {
  border-color: #1476FF;
  outline: none;
}
```

### Estados Disabled
```css
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## 📱 Responsive Design

### Breakpoints
```css
/* Móvil */
@media (max-width: 640px) {
  .contact-card {
    padding: 12px;
    gap: 12px;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
  
  .actions {
    opacity: 1; /* Siempre visibles en móvil */
  }
}

/* Tablet */
@media (max-width: 1024px) {
  .main-content {
    margin-left: 0; /* Sin sidebar */
  }
  
  .container {
    padding: 16px;
  }
}
```

### Adaptaciones Móviles
- **Sidebar**: Se oculta y se reemplaza por menú hamburguesa
- **Botones de acción**: Siempre visibles (no solo en hover)
- **Padding**: Reducido para optimizar espacio
- **FAB**: Botón flotante para acción principal

---

## ✅ Mejores Prácticas

### 1. Estructura de Archivos
```
src/
├── components/
│   ├── ui/           # Componentes base
│   │   ├── Modal/
│   │   ├── Button/
│   │   └── InputField/
│   ├── ContactList/   # Componentes específicos
│   └── ContactForm/
├── hooks/            # Lógica de negocio
├── types/            # Definiciones TypeScript
└── styles/           # Estilos globales
```

### 2. Nomenclatura CSS
- **BEM Modifier**: `.component--modifier`
- **Kebab Case**: `.contact-card`, `.title-section`
- **Estados**: `.button--primary`, `.input--error`

### 3. Accesibilidad
```tsx
// Labels descriptivos
aria-label="Editar contacto"

// Contraste de colores
color: #0A0A0A; // Contraste 21:1

// Navegación por teclado
tabIndex={readOnly ? -1 : undefined}

// Texto alternativo
alt="Avatar de {nombre}"
```

### 4. Performance
```css
/* Transiciones suaves */
transition: transform 0.2s ease, box-shadow 0.2s ease;

/* Optimización de animaciones */
will-change: transform;

/* Evitar reflows */
transform: translateY(-2px); /* En lugar de margin-top */
```

### 5. Mantenibilidad
```tsx
// Props tipadas
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  size?: 'default' | 'large';
}

// Componentes reutilizables
const Modal: React.FC<ModalProps> = ({ ... }) => { ... }

// Hooks para lógica
const { items, create, update, delete } = useItems();
```

---

## 🚀 Implementación Rápida

### Checklist para Nuevos Proyectos

#### 1. Setup Inicial
- [ ] Instalar dependencias: `lucide-react` para iconos
- [ ] Configurar sistema de colores en CSS variables
- [ ] Crear componentes base: Modal, Button, InputField

#### 2. Layout Base
- [ ] Implementar Sidebar con navegación
- [ ] Crear estructura de header unificada
- [ ] Configurar responsive breakpoints

#### 3. Patrones de Lista
- [ ] Crear componente de tarjeta base
- [ ] Implementar hover effects y transiciones
- [ ] Configurar botones de acción (edit/delete)

#### 4. Formularios
- [ ] Implementar modo readonly para InputField
- [ ] Crear modal con header/footer fijos
- [ ] Configurar validación de formularios

#### 5. Testing
- [ ] Probar en diferentes resoluciones
- [ ] Verificar accesibilidad (contraste, navegación)
- [ ] Testear interacciones touch en móvil

---

## 📖 Recursos Adicionales

### Herramientas Recomendadas
- **Iconos**: [Lucide React](https://lucide.dev/)
- **Colores**: [Coolors.co](https://coolors.co/)
- **Tipografía**: System fonts para mejor performance
- **Accesibilidad**: [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)

### Referencias de Diseño
- **Apple Human Interface Guidelines**
- **Material Design System**
- **Ant Design System**

---

## 🔄 Changelog y Versiones

### v1.0.0 - Versión Inicial
- Sistema de diseño completo
- Componentes base implementados
- Patrones de formularios y listas
- Responsive design funcional
- Guía de implementación documentada

---

**Mantenido por**: Equipo de Desarrollo  
**Última actualización**: Junio 2025  
**Licencia**: MIT
