// App.js
import React, { useCallback, useEffect, useState } from "react";
import * as ExpoSplashScreen from "expo-splash-screen";
import { AuthProvider } from "./src/context/AuthContext";
import { CartProvider } from "./src/context/CartContext";
import RootNavigator from "./src/navigation/RootNavigator";

// Evita que el splash nativo de Expo se oculte automáticamente
// hasta que la app esté lista (fuentes, recursos, etc.).
ExpoSplashScreen.preventAutoHideAsync();

export default function App() {
  const [appLista, setAppLista] = useState(false);

  useEffect(() => {
    async function prepararApp() {
      try {
        // TODO: aquí puedes precargar fuentes personalizadas con expo-font,
        // o cualquier otro recurso necesario antes de mostrar la app.
        await new Promise((resolve) => setTimeout(resolve, 500));
      } finally {
        setAppLista(true);
      }
    }
    prepararApp();
  }, []);

  const alLayoutRaiz = useCallback(async () => {
    if (appLista) {
      // Oculta el splash nativo de Expo; nuestra SplashScreen personalizada
      // (mostrada dentro de RootNavigator mientras se valida la sesión)
      // toma el control visual justo después.
      await ExpoSplashScreen.hideAsync();
    }
  }, [appLista]);

  if (!appLista) {
    return null;
  }

  return (
    <AuthProvider>
      <CartProvider>
        <RootNavigator onReady={alLayoutRaiz} />
      </CartProvider>
    </AuthProvider>
  );
}
