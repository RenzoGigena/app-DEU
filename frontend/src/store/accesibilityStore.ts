// src/store/accessibilityStore.ts
import { create } from "zustand"

export type FontSize = "small" | "medium" | "large"
export type ThemeColor = "blue" | "green" | "orange"

interface AccessibilityState {
  fontSize: FontSize
  daltonicMode: boolean
  themeColor: ThemeColor
  setFontSize: (size: FontSize) => void
  setDaltonicMode: (mode: boolean) => void
  setThemeColor: (color: ThemeColor) => void
}

export const useAccessibilityStore = create<AccessibilityState>((set) => ({
  fontSize: "medium",
  daltonicMode: false,
  themeColor: "blue",
  setFontSize: (fontSize) => {
    localStorage.setItem("fontSize", fontSize)
    set({ fontSize })
  },
  setDaltonicMode: (mode) => {
    localStorage.setItem("daltonicMode", String(mode))
    set({ daltonicMode: mode })
  },
  setThemeColor: (themeColor) => {
    localStorage.setItem("themeColor", themeColor)
    set({ themeColor })
  },
}))
