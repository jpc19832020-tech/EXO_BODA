# GitHub Actions Workflows para LUMEN - Invitación de Boda

Este documento describe los workflows de GitHub Actions configurados para el proyecto LUMEN - Invitación de Boda.

## 📋 Tabla de Contenidos

1. [Workflow Principal: Build and Deploy](#workflow-principal-build-and-deploy)
2. [Análisis Estático y Calidad de Código](#análisis-estático-y-calidad-de-código)
3. [Despliegue a GitHub Pages](#despliegue-a-github-pages)
4. [Configuración Requerida](#configuración-requerida)
5. [Uso y Mantenimiento](#uso-y-mantenimiento)

---

## Workflow Principal: Build and Deploy

**Archivo**: [`.github/workflows/build-deploy.yml`](.github/workflows/build-deploy.yml)

### 🎯 Propósito
Construir el proyecto estático y desplegarlo automáticamente cuando se realizan cambios en la rama principal.

### ⚙️ Cuándo se ejecuta
- En pushes a la rama `main`
- En pull requests dirigidos a `main`
- Manualmente desde la pestaña Actions

### 🔍 Jobs incluidos

#### Job: `build`
- **Runner**: Ubuntu Latest
- **Pasos**:
  1. Descarga el código del repositorio
  2. Configura Node.js v18 con caché
  3. Instala dependencias con `npm ci`
  4. Ejecuta el build del proyecto con `npm run build`
  5. Sube los artefactos generados a la carpeta `/dist`

#### Job: `deploy`
- **Runner**: Ubuntu Latest
- **Dependencias**: Requiere que el job `build` se complete con éxito
- **Ejecución**: Solo en pushes a `main` (no en PRs)
- **Permisos especiales**:
  - `pages: write` - Para escribir en GitHub Pages
  - `id-token: write` - Para autenticación
- **Pasos**:
  1. Descarga los artefactos del build
  2. Configura GitHub Pages
  3. Sube los archivos a GitHub Pages
  4. Despliega a GitHub Pages

---

## Análisis Estático y Calidad de Código

**Archivo**: [`.github/workflows/static-analysis.yml`](.github/workflows/static-analysis.yml)

### 🎯 Propósito
Realizar análisis estático del código, validaciones y verificaciones de calidad en cada cambio.

### ⚙️ Cuándo se ejecuta
- En pushes a las ramas `main` y `develop`
- En pull requests dirigidos a `main`
- Manualmente desde la pestaña Actions

### 🔍 Jobs incluidos

#### Job: `analyze`
- **Validaciones realizadas**:
  1. Sintaxis de archivos HTML
  2. Sintaxis y estilo de archivos CSS
  3. Sintaxis y calidad de archivos JavaScript
  4. Validez de archivos JSON
  5. Verificación de referencias rotas en HTML
  6. Optimización de imágenes (hero.jpg debe ser < 350KB)
  7. Proceso de build correcto
  8. Configuración mínima requerida en `config.json`
  9. Verificación de accesibilidad básica con Pa11y

#### Job: `security`
- **Verificaciones de seguridad**:
  1. Escaneo de vulnerabilidades con `npm audit`
  2. Detección de información sensible en archivos

---

## Despliegue a GitHub Pages

**Archivo**: [`.github/workflows/github-pages.yml`](.github/workflows/github-pages.yml)

### 🎯 Propósito
Despliegue optimizado y automatizado a GitHub Pages con verificaciones post-despliegue.

### ⚙️ Cuándo se ejecuta
- En pushes a la rama `main`
- Manualmente con opción de seleccionar entorno (production/staging)

### 🔍 Jobs incluidos

#### Job: `build-and-deploy`
- **Optimizaciones aplicadas**:
  1. Compresión de imágenes con imagemin
  2. Minificación de CSS con clean-css
  3. Minificación de JavaScript con Terser
  4. Generación automática de sitemap.xml
- **Pasos**:
  1. Build del proyecto
  2. Reemplazo de archivos con versiones optimizadas
  3. Configuración y despliegue a GitHub Pages
  4. Notificación del despliegue completado

#### Job: `verify`
- **Verificaciones post-despliegue**:
  1. Disponibilidad del sitio (HTTP 200)
  2. Accesibilidad de archivos críticos
  3. Análisis de rendimiento con Lighthouse
  4. Métricas de rendimiento, accesibilidad y SEO

---

## Configuración Requerida

### 🔑 Permisos del Repositorio
Para que los workflows funcionen correctamente, configurar los siguientes permisos en la configuración del repositorio:

1. **Settings > Actions > General**:
   - ✅ Allow all actions and reusable workflows
   - ✅ Allow select actions: 
     - `actions/checkout@v4`
     - `actions/setup-node@v4`
     - `actions/configure-pages@v4`
     - `actions/upload-pages-artifact@v3`
     - `actions/deploy-pages@v4`

2. **Settings > Pages**:
   - Source: Deploy from a branch
   - Branch: `gh-pages` (se creará automáticamente)
   - Folder: `/ (root)`

### 🌐 Variables de Entorno (Opcionales)
Puedes configurar estas variables en Settings > Secrets and variables > Actions:

```yaml
# Para notificaciones personalizadas
NOTIFICATION_WEBHOOK: "https://hooks.slack.com/..."
```

---

## Uso y Mantenimiento

### 🚀 Primeros Pasos

1. **Activar GitHub Pages**:
   - Ve a Settings > Pages en tu repositorio
   - selecciona "GitHub Actions" como fuente

2. **Hacer el primer despliegue**:
   - Realiza un push a la rama `main`
   - Los workflows se ejecutarán automáticamente
   - Revisa la pestaña Actions para ver el progreso

3. **Verificar el despliegue**:
   - Espera a que complete el workflow `github-pages.yml`
   - Visita la URL proporcionada en los resultados del workflow

### 📊 Monitoreo

1. **Estado de los workflows**:
   - Revisa la pestaña Actions del repositorio
   - Los workflows fallantes aparecerán en rojo

2. **Métricas de rendimiento**:
   - Los resultados de Lighthouse se guardan en los artefactos
   - Descarga los reportes para análisis detallado

### 🔧 Mantenimiento

1. **Actualización de dependencias**:
   - Los workflows usan versiones específicas de acciones
   - Actualiza regularmente para mantener seguridad

2. **Optimización de imágenes**:
   - El workflow comprime imágenes automáticamente
   - Revisa los tamaños recomendados en el README

3. **Personalización**:
   - Modifica los umbrales de rendimiento según necesidades
   - Ajusta las validaciones según los requisitos del proyecto

---

## 🆘 Solución de Problemas

### Problemas Comunes

1. **El despliegue falla**:
   - Verifica los permisos del repositorio
   - Revisa que la rama `gh-pages` exista
   - Comprueba los logs del workflow

2. **Las imágenes no se optimizan**:
   - Verifica que las imágenes estén en `assets/img/`
   - Comprueba los formatos admitidos (JPG, PNG)

3. **El análisis estático falla**:
   - Revisa la sintaxis de los archivos marcados
   - Verifica que `config.json` tenga los campos requeridos

### 📞 Ayuda Adicional

- [Documentación de GitHub Actions](https://docs.github.com/en/actions)
- [Guía de GitHub Pages](https://docs.github.com/en/pages)
- [Soporte del proyecto](https://github.com/exo-digital-studio/lumen/issues)

---

## 📝 Notas de Implementación

- Los workflows están diseñados para ser modulares y extensibles
- Se sigue el principio de "fail fast" para detectar problemas temprano
- Las verificaciones de rendimiento aseguran una experiencia óptima
- Los artefactos se conservan por 1 día para optimizar almacenamiento

**Creado por**: EXO Digital Studio  
**Última actualización**: 2025-10-15