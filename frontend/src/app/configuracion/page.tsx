"use client"
import { useEffect } from "react"
import {
  useAccessibilityStore,
  FontSize,
  ThemeColor,
} from '@/store/accesibilityStore'

export default function ConfigurationPage() {
  const {
    fontSize,
    daltonicMode,
    themeColor,
    setFontSize,
    setDaltonicMode,
    setThemeColor,
  } = useAccessibilityStore()

  const fontSizeMap = {
    small: "14px",
    medium: "16px",
    large: "18px",
  }

  useEffect(() => {
    const html = document.documentElement

    // Aplicar font-size
    html.style.setProperty("--font-size", fontSizeMap[fontSize])

    // Quitar clases anteriores
    html.classList.remove("theme-blue", "theme-green", "theme-orange", "theme-daltonic")

    // Agregar la clase correcta
    if (daltonicMode) {
      html.classList.add("theme-daltonic")
    } else {
      html.classList.add(`theme-${themeColor}`)
    }
  }, [fontSize, themeColor, daltonicMode])

  return (
    <main
      className="max-w-3xl mx-auto p-6"
      role="main"
      aria-labelledby="configuracion-heading"
    >
      <header className="text-center space-y-2">
        <h1 id="configuracion-heading" className="text-3xl font-bold text-primary">
          Configuración de accesibilidad
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto" id="configuracion-description">
          Aquí puedes cambiar la configuración de accesibilidad del sitio, como el tamaño de fuente, el modo daltónico y el color del tema.
          Estas opciones te ayudarán a personalizar tu experiencia de navegación.
        </p>
      </header>

      <form
        className="space-y-6 mt-6"
        aria-describedby="configuracion-description"
      >
        {/* Tamaño de fuente */}
        <div>
          <label htmlFor="font-size-select" className="block font-semibold">
            Tamaño de fuente
          </label>
          <select
            id="font-size-select"
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value as FontSize)}
            className="border px-3 py-2 rounded"
          >
            <option value="small">Chico</option>
            <option value="medium">Mediano</option>
            <option value="large">Grande</option>
          </select>
        </div>

        {/* Modo daltónico */}
        <div>
          <label htmlFor="daltonic-checkbox" className="block font-semibold">
            Modo daltónico
          </label>
          <input
            id="daltonic-checkbox"
            type="checkbox"
            checked={daltonicMode}
            onChange={(e) => setDaltonicMode(e.target.checked)}
            className="ml-2"
            aria-describedby="daltonic-description"
          />
          <p id="daltonic-description" className="text-sm text-gray-600 mt-1">
            Cambia los colores del sitio para facilitar la visualización a personas con daltonismo.
          </p>
        </div>

        {/* Selector de tema (solo si no está activo el modo daltónico) */}
        {!daltonicMode && (
          <div>
            <label htmlFor="theme-select" className="block font-semibold">
              Color del sitio
            </label>
            <select
              id="theme-select"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value as ThemeColor)}
              className="border px-3 py-2 rounded"
            >
              <option value="blue">Azul</option>
              <option value="green">Verde</option>
              <option value="orange">Naranja</option>
            </select>
          </div>
        )}
      </form>
    </main>
  )
}
