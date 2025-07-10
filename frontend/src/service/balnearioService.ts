// services/balneario.service.ts

import { Balneario } from "@/types/balnearios"
import { CreateBalnearioDto } from "@/types/balnearios-dto"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const BalnearioService = {
	async findAll(): Promise<Balneario[]> {
		const res = await fetch(`${BASE_URL}/balnearios`)
		if (!res.ok) throw new Error("Error al obtener balnearios")
		return res.json()
	},

	async findOne(id: string): Promise<Balneario | null> {
		const res = await fetch(`${BASE_URL}/balnearios/${id}`)
		if (!res.ok) throw new Error(`Error al obtener el balneario con id ${id}`)
		return res.json()
	},

	async create(data: CreateBalnearioDto): Promise<Balneario> {
		const res = await fetch(`${BASE_URL}/balnearios`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
		if (!res.ok) throw new Error("Error al crear balneario")
		return res.json()
	},

	async update(
		id: string,
		data: Partial<CreateBalnearioDto>
	): Promise<Balneario> {
		const res = await fetch(`${BASE_URL}/balnearios/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		})
		if (!res.ok) throw new Error(`Error al actualizar balneario con id ${id}`)
		return res.json()
	},

	async remove(id: string): Promise<Balneario> {
		const res = await fetch(`${BASE_URL}/balnearios/${id}`, {
			method: "DELETE",
		})
		if (!res.ok) throw new Error(`Error al eliminar balneario con id ${id}`)
		return res.json()
	},
}
