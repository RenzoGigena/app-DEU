"use client"

import { useEffect, type ReactNode } from "react"
import { useAccessibilityStore, FontSize, ThemeColor } from "@/store/accesibilityStore"

const fontSizeMap = {
  small: "14px",
  medium: "16px",
  large: "18px",
}

export default function ClientProvider({ children }: { children: ReactNode }) {
  const {
    fontSize,
    daltonicMode,
    themeColor,
    setFontSize,
    setDaltonicMode,
    setThemeColor,
  } = useAccessibilityStore()

  // 1. Cargar configuración desde localStorage en el primer render
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

  // 2. Aplicar dinámicamente el tema y el tamaño de fuente
  useEffect(() => {
    const html = document.documentElement

    // Setear tamaño de fuente
    html.style.setProperty("--font-size", fontSizeMap[fontSize])

    // Eliminar todas las clases de tema
    html.classList.remove("theme-blue", "theme-green", "theme-orange", "theme-daltonic")

    // Aplicar tema actual
    if (daltonicMode) {
      html.classList.add("theme-daltonic")
    } else {
      html.classList.add(`theme-${themeColor}`)
    }
  }, [fontSize, themeColor, daltonicMode])

  return <>{children}</>
}