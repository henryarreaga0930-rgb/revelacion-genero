# 👶 Revelación de Género

Una página web especial para revelar el género de un bebé, creada con Next.js, Tailwind CSS y Framer Motion.

## 🌟 Características

- **Base de datos en la nube** con Upstash Redis
- **Datos compartidos** entre todos los dispositivos
- **Diseño Responsive** para móviles y desktop
- **Formulario simple** para predicciones
- **Animaciones suaves** con Framer Motion
- **Estadísticas en tiempo real** de las predicciones
- **Galería de fotos** con revelación animada

## 🛠️ Tecnologías

- **Next.js 14** - Framework de React
- **Tailwind CSS** - Estilos y diseño
- **Framer Motion** - Animaciones
- **Upstash Redis** - Base de datos en la nube
- **TypeScript** - Tipado seguro

## � Configuración Rápida

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar Upstash Redis
```bash
# Opción A: Usar el script automático
node setup-upstash.js

# Opción B: Configurar manualmente
# 1. Ve a https://upstash.com
# 2. Crea cuenta y base de datos Redis
# 3. Copia .env.example a .env.local
# 4. Reemplaza las variables de entorno
```

### 3. Iniciar desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## � Despliegue en Vercel

### 1. Preparar repositorio
```bash
git init
git add .
git commit -m "Inicializar proyecto de revelación de género"
git branch -M main
git remote add origin https://github.com/tu-usuario/revelacion-genero.git
git push -u origin main
```

### 2. Desplegar en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu repositorio de GitHub
3. Configura las variables de entorno en Vercel:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Haz deploy

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/predictions/    # API para base de datos
│   ├── layout.tsx          # Layout principal
│   └── page.tsx           # Página principal
├── components/
│   ├── WelcomeForm.tsx     # Formulario de bienvenida
│   └── RevealScreen.tsx    # Pantalla de revelación
├── lib/
│   └── storage.ts          # Conexión a base de datos
└── styles/
    └── globals.css         # Estilos globales
```

## 🎨 Personalización

### Cambiar género del bebé
Edita `src/components/RevealScreen.tsx` línea ~140:
```javascript
<div className="text-8xl mb-4">👧</div>
<h2 className="text-4xl font-cute text-pink-500 mb-2">
  ¡ES UNA NIÑA!
</h2>
```

### Agregar fotos reales
Reemplaza las URLs en `src/components/RevealScreen.tsx`:
```javascript
const babyPhotos = [
  '/photos/foto1.jpg',
  '/photos/foto2.jpg',
  // ... etc
]
```

### Cambiar colores
Edita `tailwind.config.js` para modificar la paleta de colores.

## 🔧 Variables de Entorno

Crea un archivo `.env.local` con:
```env
UPSTASH_REDIS_REST_URL=https://tu-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=tu-redis-token
```

## 📊 Funcionalidades

### Flujo del Usuario
1. **Bienvenida**: Usuario llena formulario con nombre, familia y predicción
2. **Carga**: Animación de 3 segundos mientras se prepara la revelación
3. **Revelación**: Se muestra el género con animación especial
4. **Galería**: Se muestran 6 fotos del bebé
5. **Estadísticas**: Lista completa de todas las predicciones

### Base de Datos
- **Guardado automático** de cada predicción
- **Datos compartidos** entre todos los dispositivos
- **Estadísticas en tiempo real**
- **Persistencia** de datos

## 🤝 Contribuir

1. Fork del proyecto
2. Crea una rama (`git checkout -b feature/amazing-feature`)
3. Commit de los cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🎉 ¡Disfrútalo!

Esperamos que esta página haga de tu revelación de género un momento inolvidable.
