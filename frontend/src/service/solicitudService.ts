// src/service/solicitudService.ts

import { CreateSolicitudDto } from "@/types/solicitudes"
import { Solicitud } from "@/types/solicitudes"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export const SolicitudService = {
	async findAll(): Promise<Solicitud[]> {
		const res = await fetch(`${BASE_URL}/solicitudes`, { cache: "no-store" })
		if (!res.ok) {
			const errorText = await res.text()
			throw new Error(`Error al obtener solicitudes: ${errorText}`)
		}
		return res.json()
	},

	async findOne(id: string): Promise<Solicitud | null> {
		const res = await fetch(`${BASE_URL}/solicitudes/${id}`, {
			cache: "no-store",
		})
		if (!res.ok) {
			const errorText = await res.text()
			throw new Error(
				`Error al obtener la solicitud con ID ${id}: ${errorText}`
			)
		}
		return res.json()
	},

	async create(data: CreateSolicitudDto): Promise<Solicitud> {
		const res = await fetch(`${BASE_URL}/solicitudes`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
		if (!res.ok) {
			const errorText = await res.text()
			throw new Error(`Error al crear solicitud: ${errorText}`)
		}
		return res.json()
	},

	async remove(id: string): Promise<Solicitud> {
		const res = await fetch(`${BASE_URL}/solicitudes/${id}`, {
			method: "DELETE",
		})
		if (!res.ok) {
			const errorText = await res.text()
			throw new Error(`Error al eliminar solicitud con ID ${id}: ${errorText}`)
		}
		return res.json()
	},

	async aprobar(id: string): Promise<Solicitud> {
		const res = await fetch(`${BASE_URL}/solicitudes/${id}/aprobar`, {
			method: "POST",
		})
		if (!res.ok) {
			const errorText = await res.text()
			throw new Error(`Error al aprobar solicitud con ID ${id}: ${errorText}`)
		}
		return res.json()
	},
}
