# 🚀 Despliegue en Vercel

## Paso 1: Preparar el Repositorio

1. **Crea una cuenta en GitHub** si no tienes una
2. **Sube tu código a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Inicializar proyecto de revelación de género"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/revelacion-genero.git
   git push -u origin main
   ```

## Paso 2: Configurar Vercel

1. **Ve a [vercel.com](https://vercel.com)** y crea una cuenta
2. **Conecta tu cuenta de GitHub**
3. **Importa tu repositorio** `revelacion-genero`

## Paso 3: Configuración del Proyecto

Vercel detectará automáticamente que es un proyecto Next.js. Revisa la configuración:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Paso 4: Variables de Entorno (Opcional)

Si necesitas variables de entorno:
1. Ve a la sección "Environment Variables" en Vercel
2. Agrega las variables necesarias:
   - `NEXT_PUBLIC_API_URL` (si usas una API externa)

## Paso 5: Despliegue

1. **Haz clic en "Deploy"**
2. **Espera unos minutos** mientras Vercel construye tu aplicación
3. **¡Listo!** Tu sitio estará disponible en una URL como: `https://revelacion-genero.vercel.app`

## Paso 6: Dominio Personalizado (Opcional)

1. Ve a la configuración del proyecto en Vercel
2. Haz clic en "Domains"
3. Agrega tu dominio personalizado
4. Configura los DNS según las instrucciones de Vercel

## 🎯 Características del Despliegue

- ✅ **Automático**: Cada push a GitHub actualiza el sitio
- ✅ **HTTPS**: Certificado SSL incluido
- ✅ **CDN**: Distribución global rápida
- ✅ **Preview**: Cada PR genera un preview
- ✅ **Analytics**: Métricas de uso incluidas

## 🔧 Personalización Post-Despliegue

### Cambiar fecha de revelación
Edita en `src/app/page.tsx`:
```javascript
<CountdownTimer targetDate="2026-06-01T00:00:00" />
```

### Personalizar colores
Edita en `tailwind.config.js`:
```javascript
colors: {
  'baby-pink': '#FFD1DC',
  'baby-blue': '#C3E9FF',
  // ... otros colores
}
```

### Agregar imágenes reales
Reemplaza los placeholders en `src/components/Gallery.tsx` con tus imágenes reales de ecografías.

## 📱 Compartir tu Sitio

Una vez desplegado, puedes compartir:
- **URL de Vercel**: `https://revelacion-genero.vercel.app`
- **Código QR**: Genera un QR para compartir fácilmente
- **Redes sociales**: Comparte el enlace en WhatsApp, Instagram, etc.

## 🎉 ¡Felicidades!

Tu página de revelación de género está ahora en línea y lista para recibir los videos y predicciones de tu familia.
