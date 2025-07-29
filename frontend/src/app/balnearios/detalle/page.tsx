"use client"

import { DetalleBalnearioClient } from "@/components/DetalleBalnearioClient"
import { Suspense } from "react"

export default function DetalleBalnearioPage() {
	return (
		<Suspense fallback={<p className="text-center">Cargando detalle...</p>}>
			<DetalleBalnearioClient />
		</Suspense>
	)
}
