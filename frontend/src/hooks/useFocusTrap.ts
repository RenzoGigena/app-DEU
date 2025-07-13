import { useEffect } from "react"

export function useFocusTrap(ref: React.RefObject<HTMLElement | null>) {
	useEffect(() => {
		const focusableSelectors =
			"a[href], area[href], input:not([disabled]), select:not([disabled]), " +
			"textarea:not([disabled]), button:not([disabled]), iframe, object, embed, " +
			'[tabindex]:not([tabindex="-1"]), [contenteditable]'

		const el = ref.current
		if (!el) return

		const focusableEls = el.querySelectorAll<HTMLElement>(focusableSelectors)
		const firstEl = focusableEls[0]
		const lastEl = focusableEls[focusableEls.length - 1]

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key !== "Tab") return

			if (e.shiftKey) {
				// Shift + Tab
				if (document.activeElement === firstEl) {
					e.preventDefault()
					lastEl.focus()
				}
			} else {
				// Tab
				if (document.activeElement === lastEl) {
					e.preventDefault()
					firstEl.focus()
				}
			}
		}

		document.addEventListener("keydown", handleKeyDown)
		firstEl?.focus()

		return () => {
			document.removeEventListener("keydown", handleKeyDown)
		}
	}, [ref])
}
