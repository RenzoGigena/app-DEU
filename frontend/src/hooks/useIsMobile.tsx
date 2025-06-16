import { useEffect, useState } from "react"

export function useIsMobile(breakpoint = 768) {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const mql = window.matchMedia(`(max-width:${breakpoint - 1}px)`)
		setIsMobile(mql.matches)
		const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
		mql.addEventListener("change", handler)
		return () => mql.removeEventListener("change", handler)
	}, [breakpoint])

	return isMobile
}
export default useIsMobile
