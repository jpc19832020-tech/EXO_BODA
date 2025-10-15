# Estructura del Proyecto - Sitio de Boda Estático

## 📁 Archivos Esenciales

### 📄 Aplicación Principal
- `index.html` - Página principal del sitio de boda
- `config.json` - Configuración del sitio (nombres, fechas, etc.)
- `server.ts` - Servidor Node.js para desarrollo

### 🎨 Estilos y Scripts
- `css/style.css` - Estilos CSS del sitio
- `js/main.js` - Lógica JavaScript del sitio

### 🖼️ Recursos
- `assets/img/` - Imágenes del sitio (hero.jpg, gallery1-6.jpg)

### ⚙️ Configuración
- `package.json` - Dependencias y scripts del proyecto
- `package-lock.json` - Lock de dependencias
- `README.md` - Documentación del proyecto

## 🗑️ Archivos Eliminados (Innecesarios)

### Frameworks No Usados
- ❌ Toda la carpeta `src/` (Next.js/React components)
- ❌ `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`
- ❌ `postcss.config.mjs`, `components.json`, `eslint.config.mjs`

### Archivos Duplicados
- ❌ Carpeta `dist/` (versión compilada)
- ❌ Carpeta `public/` (duplicados de assets)

### Base de Datos
- ❌ Carpeta `db/` (base de datos SQLite)
- ❌ Carpeta `prisma/` (ORM no usado)

### Otros
- ❌ Carpeta `examples/` (ejemplos no usados)
- ❌ `404.html` (no necesario)

## 🚀 Estructura Final Limpia

```
wedding-site/
├── index.html          # Página principal
├── config.json         # Configuración del sitio
├── server.ts           # Servidor de desarrollo
├── package.json        # Dependencias
├── package-lock.json   # Lock de dependencias
├── README.md           # Documentación
├── css/
│   └── style.css       # Estilos
├── js/
│   └── main.js         # Lógica JavaScript
└── assets/
    └── img/
        ├── hero.jpg    # Imagen principal
        └── gallery*.jpg # Galería de imágenes
```

## ✅ Ventajas de la Limpieza

1. **Proyecto más ligero** - Menos de 15 archivos esenciales
2. **Sin dependencias innecesarias** - Solo lo necesario para un sitio estático
3. **Más fácil de entender** - Estructura simple y clara
4. **Más rápido de desplegar** - Solo archivos estáticos
5. **Sin frameworks complejos** - HTML, CSS, JavaScript puro

## 🎯 Funcionalidad Mantenida

- ✅ Sitio de boda completo con todas las secciones
- ✅ Sistema de configuración dinámico
- ✅ Galería de imágenes
- ✅ Formularios funcionales
- ✅ Countdown timer
- ✅ Diseño responsive
- ✅ Servidor de desarrollo local