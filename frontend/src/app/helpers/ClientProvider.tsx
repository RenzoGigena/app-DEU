"use client"

import { useEffect, type ReactNode } from "react"
import { useAccessibilityStore, FontSize, ThemeColor } from "@/store/accesibilityStore" 

const fontSizeMap = {
	small: "14px",
	medium: "16px",
	large: "18px",
}

export default function ClientProvider({ children }: { children: ReactNode }) {
	const { setFontSize, setDaltonicMode, setThemeColor } = useAccessibilityStore()

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

	return <>{children}</>
}
