# LUMEN - Plantilla de Invitación de Boda

Una arquitectura minimalista y 100% estática para invitaciones de boda elegantes.

## 🎯 Características

- **100% Estático**: HTML/CSS/JS puro, sin dependencias de servidor
- **Minimalista**: Diseño luminoso y elegante con tipografía serif
- **Configuración Única**: Toda la personalización en `config.json`
- **Responsive**: Optimizado para móvil y desktop
- **SEO Optimizado**: Metadatos configurables
- **Build Opcional**: Genera carpeta `/dist` para producción

## 📁 Estructura de Archivos

```
/
├─ index.html              // Página principal
├─ 404.html                // Fallback de rutas SPA
├─ config.json             // ÚNICO archivo de personalización
├─ package.json            // Configuración de build
├─ README.md               // Documentación
├─ /assets
│  ├─ /img                 // Imágenes optimizadas
│  │  ├─ hero.jpg          // Imagen principal (1440x720)
│  │  └─ gallery1-6.jpg    // Galería (864x1152)
│  ├─ /fonts               // Fuentes (opcional)
│  └─ /media               // Videos (opcional)
├─ /css
│  └─ style.css            // Estilos del tema
└─ /js
   └─ main.js              // Lógica principal
```

## 🚀 Uso Rápido

### 1. Personalizar la Invitación

Edita **únicamente** el archivo `config.json`:

```json
{
  "couple": {
    "names": "María & José",
    "bride": "María González",
    "groom": "José Martínez"
  },
  "wedding": {
    "date": "2024-12-15T17:00:00",
    "dateFormatted": "15 de Diciembre, 2024",
    "hashtag": "#MariaYJose2024"
  },
  // ... más configuración
}
```

### 2. Desarrollo Local

```bash
# Opción 1: Servidor simple
python3 -m http.server 8000

# Opción 2: Con npm
npm run dev
```

Visita `http://localhost:8000`

### 3. Build para Producción

```bash
npm run build
```

Genera carpeta `/dist` lista para subir a cualquier hosting estático.

## 🎨 Secciones Configurables

### ✅ Siempre Visibles
- **Héroe**: Nombres, fecha, countdown opcional
- **Cronograma**: Eventos del día
- **RSVP**: Formulario de confirmación
- **Footer**: "EXO Digital Studio"

### 🔧 Opcionales (configurable en `config.json`)
- **Historia**: `story.enabled: true/false`
- **Ceremonia**: `ceremony.enabled: true/false`
- **Recepción**: `reception.enabled: true/false`
- **Dress Code**: `dresscode.enabled: true/false`
- **Mapas**: `maps.enabled: true/false`
- **Mesa de Regalos**: `gifts.enabled: true/false`
- **Galería**: `gallery.enabled: true/false`
- **Guestbook**: `guestbook.enabled: true/false`

## 🎨 Diseño

- **Estilo**: Minimalista y luminoso
- **Tipografía**: Playfair Display (serif) para títulos, Montserrat para cuerpo
- **Colores**: Dorado suave (#d4a574), beige claro (#f5f5f0)
- **Responsive**: Mobile-first (360px+)

## 📱 Responsive Design

- **Móvil**: 360px - 414px
- **Tablet**: 768px+
- **Desktop**: 1200px+

## 🔧 Configuración Detallada

### SEO
```json
"seo": {
  "title": "María & José - Nuestra Boda",
  "description": "Te invitamos a celebrar...",
  "image": "./assets/img/hero.jpg"
}
```

### RSVP con Google Sheets
```json
"rsvp": {
  "enabled": true,
  "deadline": "2024-11-30",
  "maxGuestsPerPerson": 2,
  "googleSheetUrl": "https://script.google.com/macros/s/...",
  "policy": "Sin niños - Solo adultos"
}
```

### Galería
```json
"gallery": {
  "enabled": true,
  "private": false,
  "images": [
    "./assets/img/gallery1.jpg",
    "./assets/img/gallery2.jpg"
  ]
}
```

## 🌐 Hosting Compatible

Cualquier hosting estático:
- Netlify
- Vercel
- GitHub Pages
- S3 + CloudFront
- Hosting tradicional

## 📝 Notas Importantes

1. **Rutas Relativas**: Todas las referencias usan `./` para portabilidad
2. **Sin Hardcode**: Todo el contenido viene de `config.json`
3. **Optimización**: Imágenes optimizadas (héroe max 350KB, galería 1200px)
4. **Accesibilidad**: HTML semántico, alt text, navegación por teclado
5. **Performance**: Lazy loading, CSS minificado, JavaScript asíncrono

## 🎯 Criterios de Aceptación

✅ **Funcional**:
- [ ] Cambiando solo `config.json` se personaliza completamente
- [ ] Countdown funciona correctamente
- [ ] RSVP respeta cupos y envía a Google Sheets
- [ ] Todas las secciones opcionales se muestran/ocultan correctamente

✅ **Diseño**:
- [ ] Estilo minimalista y luminoso
- [ ] Tipografía serif elegante para títulos
- [ ] Responsive en todos los dispositivos
- [ ] Colores y espaciado consistentes

✅ **Técnico**:
- [ ] 100% estático, sin dependencias de servidor
- [ ] Build genera `/dist` funcional
- [ ] SEO básico implementado
- [ ] Accesibilidad web estándar

## 🏢 EXO Digital Studio

Creado con ❤️ por EXO Digital Studio
Arquitectura minimalista para experiencias digitales elegantes.