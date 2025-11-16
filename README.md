# 🍺 BeerSp - Aplicación Social de Degustación de Cervezas

![BeerSp Logo](https://via.placeholder.com/800x200/D4A574/FFFFFF?text=BeerSp)

## 📋 Descripción

BeerSp es una aplicación social diseñada para fomentar el turismo de calidad en cervecerías. Permite a los usuarios compartir sus experiencias de degustación, descubrir nuevas cervezas, conectar con amigos cerveceros y obtener galardones por sus actividades.

## ✨ Características Principales

### 🔐 Autenticación y Perfil
- Verificación de mayoría de edad (18+)
- Registro con email y contraseña
- Perfil personalizable con foto, ubicación y biografía
- Estadísticas personales de actividad

### 🍻 Degustaciones
- Registro de cervezas degustadas con valoración (0-5 estrellas)
- Información detallada: estilo, país, color, IBU, porcentaje de alcohol
- Asociación con locales/cervecerías
- Sistema de "me gusta" para locales favoritos

### 👥 Social
- Sistema de amistades con solicitudes
- Feed de actividad de amigos
- Comentarios en degustaciones de amigos
- Los 5 amigos más activos en el dashboard

### 🏆 Gamificación
- Sistema de galardones con 10 niveles
- Categorías: degustaciones, países, estilos, locales, comentarios
- Galardones exponenciales (ej: nivel 1 = 5 cervezas, nivel 2 = 10, nivel 3 = 25)
- Seguimiento de progreso

### 📊 Descubrimiento
- Lista de cervezas mejor valoradas globalmente
- Filtros por estilo y país
- Búsqueda de usuarios y cervezas
- Recomendaciones basadas en gustos

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** con TypeScript
- **Vite** como build tool
- **CSS3** con variables custom y diseño responsivo

### Backend
- **AWS Amplify Gen 2**
- **Amazon Cognito** - Autenticación
- **AWS AppSync** (GraphQL) - API
- **Amazon DynamoDB** - Base de datos NoSQL
- **Amazon S3** - Almacenamiento de imágenes

## 📁 Estructura del Proyecto

```
beersp/
├── amplify/                  # Configuración de AWS Amplify
│   ├── auth/                 # Recursos de autenticación
│   ├── data/                 # Schema GraphQL y recursos de datos
│   └── backend.ts            # Configuración del backend
├── src/
│   ├── components/           # Componentes React reutilizables
│   │   ├── auth/            # Componentes de autenticación
│   │   ├── layout/          # Header, Navigation, Footer
│   │   ├── profile/         # Componentes de perfil
│   │   ├── friends/         # Gestión de amigos
│   │   ├── tastings/        # Componentes de degustaciones
│   │   ├── badges/          # Visualización de galardones
│   │   ├── venues/          # Locales/cervecerías
│   │   └── common/          # Componentes comunes (Button, Input, etc)
│   ├── pages/               # Páginas principales
│   │   ├── Home.tsx         # Dashboard principal
│   │   ├── Profile.tsx      # Perfil de usuario
│   │   ├── Friends.tsx      # Gestión de amistades
│   │   ├── TopRated.tsx     # Cervezas mejor valoradas
│   │   ├── AddTasting.tsx   # Nueva degustación
│   │   └── Search.tsx       # Búsqueda
│   ├── hooks/               # Custom hooks
│   ├── contexts/            # Context API
│   ├── services/            # Servicios (API, storage, etc)
│   ├── types/               # Definiciones TypeScript
│   ├── utils/               # Funciones auxiliares
│   ├── styles/              # Estilos globales
│   ├── App.tsx              # Componente principal
│   └── main.tsx             # Entry point
├── public/                  # Assets estáticos
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ y npm
- Cuenta de AWS
- AWS CLI configurado
- Git

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/beersp.git
cd beersp
```

### Paso 2: Instalar Dependencias
```bash
npm install
```

### Paso 3: Configurar AWS Amplify
```bash
# Iniciar sesión en AWS
aws configure

# Inicializar Amplify (si es necesario)
npx ampx sandbox
```

### Paso 4: Ejecutar en Modo Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Paso 5: Desplegar a Producción
```bash
# Build del proyecto
npm run build

# Desplegar con Amplify
git push origin main
# Amplify desplegará automáticamente
```

## 🎨 Guía de Diseño

### Paleta de Colores
- **Primario**: `#D4A574` (Ámbar dorado)
- **Secundario**: `#8B6F47` (Marrón cerveza)
- **Acento**: `#E8B86D` (Dorado claro)
- **Fondo**: `#FFF8F0` (Crema suave)
- **Superficie**: `#FFFFFF` (Blanco)
- **Texto**: `#2C2C2C` (Gris oscuro)

### Tipografía
- **Interfaz**: Inter
- **Títulos**: Montserrat

### Componentes
Todos los componentes siguen el sistema de diseño establecido con:
- Espaciado consistente (8px, 16px, 24px, 32px)
- Border radius de 4px a 16px
- Transiciones suaves de 150-300ms
- Sombras sutiles para elevación

## 📱 Responsividad

La aplicación está optimizada para:
- 📱 Móviles (< 768px)
- 💻 Tablets (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🔒 Seguridad

- ✅ Verificación de edad obligatoria (18+)
- ✅ Autenticación con Amazon Cognito
- ✅ Autorización a nivel de modelo (owner-based)
- ✅ Validación de inputs en frontend y backend
- ✅ Sanitización de datos de usuario
- ✅ HTTPS obligatorio en producción

## 📊 Modelos de Datos

### Principales Entidades
- **UserProfile**: Información extendida del usuario
- **Beer**: Cervezas con toda su información
- **Tasting**: Registro de degustaciones
- **Venue**: Locales/cervecerías
- **Badge**: Definición de galardones
- **UserBadge**: Galardones obtenidos por usuarios
- **Friendship**: Relaciones de amistad
- **Comment**: Comentarios en degustaciones

## 🧪 Testing

```bash
# Ejecutar tests (cuando estén implementados)
npm test

# Tests con coverage
npm run test:coverage
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Preview del build de producción
- `npm run lint` - Ejecuta el linter
- `npm run sandbox` - Inicia el sandbox de Amplify

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Estándares de Código
- Usar TypeScript strict mode
- Seguir las convenciones de nomenclatura establecidas
- Comentar código complejo
- Escribir tests para nuevas funcionalidades
- Mantener componentes pequeños y reutilizables

## 📄 Licencia

Este proyecto es un ejercicio académico y no tiene fines comerciales.

## ⚠️ Disclaimer

Esta aplicación forma parte de un ejercicio académico que en ningún caso tiene por objeto promover el consumo de alcohol. BeerSp está destinado únicamente a mayores de 18 años y promueve el turismo cultural y gastronómico responsable.

## 👥 Equipo

- **Desarrollo**: [Tu Nombre]
- **Diseño**: [Nombre del diseñador]
- **Backend**: AWS Amplify

## 📧 Contacto

Para preguntas o sugerencias: [tu-email@ejemplo.com]

## 🗺️ Roadmap

### Versión 1.1 (Futuro)
- [ ] Integración con propietarios de locales
- [ ] Sistema de recomendaciones con ML
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] Notificaciones push
- [ ] Integración con redes sociales
- [ ] Mapa interactivo de cervecerías
- [ ] Exportar historial de degustaciones

### Versión 2.0 (Futuro Lejano)
- [ ] Expansión a otras bebidas (sidras, vinos)
- [ ] Sistema de eventos cerveceros
- [ ] Marketplace para productos
- [ ] Tours virtuales de cervecerías

---

**¡Hecho con 🍺 y ❤️ para la comunidad cervecera!**