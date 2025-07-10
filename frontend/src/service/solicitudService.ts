// src/service/solicitudService.ts

import { CreateSolicitudDto } from "@/types/solicitudes-dto"
import { Solicitud } from "@/types/solicitudes"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export const SolicitudService = {
	async findAll(): Promise<Solicitud[]> {
		const res = await fetch(`${BASE_URL}/solicitudes`)
		if (!res.ok) throw new Error("Error al obtener solicitudes")
		return res.json()
	},

	async findOne(id: string): Promise<Solicitud | null> {
		const res = await fetch(`${BASE_URL}/solicitudes/${id}`)
		if (!res.ok) throw new Error(`Error al obtener la solicitud con id ${id}`)
		return res.json()
	},

	async create(data: CreateSolicitudDto): Promise<Solicitud> {
		const res = await fetch(`${BASE_URL}/solicitudes`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
		if (!res.ok) throw new Error("Error al crear solicitud")
		return res.json()
	},

	async remove(id: string): Promise<Solicitud> {
		const res = await fetch(`${BASE_URL}/solicitudes/${id}`, {
			method: "DELETE",
		})
		if (!res.ok) throw new Error(`Error al eliminar solicitud con id ${id}`)
		return res.json()
	},
}
