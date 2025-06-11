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
    const storedFontSize = localStorage.getItem("fontSize") as FontSize
    const storedDaltonic = localStorage.getItem("daltonicMode") === "true"
    const storedColor = localStorage.getItem("themeColor") as ThemeColor

    if (storedFontSize) setFontSize(storedFontSize)
    if (storedColor) setThemeColor(storedColor)
    setDaltonicMode(storedDaltonic)

    document.documentElement.style.setProperty(
      "--font-size",
      fontSizeMap[storedFontSize || "medium"]
    )
  }, [setFontSize, setDaltonicMode, setThemeColor])

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-size",
      fontSizeMap[fontSize]
    )
  }, [fontSize])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Configuración de Accesibilidad</h2>

      <div>
        <label className="block font-semibold">Tamaño de fuente</label>
        <select
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value as FontSize)}
          className="border px-3 py-2 rounded"
        >
          <option value="small">Chico</option>
          <option value="medium">Mediano</option>
          <option value="large">Grande</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold">Modo daltónico</label>
        <input
          type="checkbox"
          checked={daltonicMode}
          onChange={(e) => setDaltonicMode(e.target.checked)}
          className="ml-2"
        />
      </div>

      {!daltonicMode && (
        <div>
          <label className="block font-semibold">Color del sitio</label>
          <select
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
    </div>
  )
}
