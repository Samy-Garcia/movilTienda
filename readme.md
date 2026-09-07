# tiendamovil

Aplicación móvil para la tienda LØØM & WEFT, desarrollada con React Native y Expo.

## Requisitos Previos

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/client) instalado en tu dispositivo móvil, o un emulador de iOS/Android.

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start` o `npx expo start`

Inicia el servidor de desarrollo (Metro Bundler). 
Abre la aplicación de Expo Go en tu dispositivo y escanea el código QR que aparece en la terminal para ver la aplicación.

### `npm run android` o `npx expo start --android`

Intenta abrir la aplicación en un emulador de Android conectado o en un dispositivo físico.

### `npm run ios` o `npx expo start --ios`

Intenta abrir la aplicación en el simulador de iOS (requiere macOS).

## Estructura del Proyecto

- `/assets`: Contiene imágenes, iconos y fuentes estáticas de la aplicación.
- `/src`: Código fuente principal de la aplicación.
  - `/api`: Configuración y servicios de llamadas a la API.
  - `/components`: Componentes reutilizables de React Native.
  - `/context`: Estados globales de la aplicación (Auth, Cart, etc.).
  - `/hooks`: Custom hooks.
  - `/navigation`: Configuración de React Navigation (rutas y navegación).
  - `/screens`: Pantallas principales de la aplicación (Home, Login, Perfil, etc.).
  - `/style`: Tokens de diseño, colores, tipografía y estilos globales.
  - `/utils`: Funciones de utilidad y helpers.

## Tecnologías Utilizadas

- React Native
- Expo SDK 57
- React Navigation
- Axios (para peticiones HTTP)
