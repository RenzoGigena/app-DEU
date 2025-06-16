"use client"

import { Balneario } from "@/types/balnearios"
import Link from "next/link"
import balnearios from "@/database/balnearios.JSON"
import { useState } from "react"

type Filtro = "nombre" | "localidad"

export default function BalneariosPage() {
	const [filterBy, setFilterBy] = useState<Filtro>("nombre")
	const [searchTerm, setSearchTerm] = useState("")

	const filteredBalnearios = balnearios.filter((b: Balneario) =>
		b[filterBy].toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className="space-y-6">
			{/* Buscador */}
			<div className="pt-6 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 px-4">
				<input
					type="text"
					placeholder="Buscar balneario..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="flex-grow border rounded px-4 py-2 w-full"
				/>
				<label htmlFor="filterBy" className="sr-only">
					Buscar por
				</label>
				<select
					id="filterBy"
					value={filterBy}
					onChange={(e) => setFilterBy(e.target.value as Filtro)}
					className="w-36 border rounded px-3 py-2"
				>
					<option value="nombre">Nombre</option>
					<option value="localidad">Localidad</option>
				</select>
			</div>

			{/* Tarjetas */}
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
				{filteredBalnearios.length > 0 ? (
					filteredBalnearios.map((balneario: Balneario) => (
						<div
							key={balneario.nombre}
							className="max-w-sm border rounded-md p-4 shadow-md"
						>
							<h3 className="text-xl font-bold">{balneario.nombre}</h3>
							<p className="text-gray-600">{balneario.localidad}</p>
							<p className="mt-2">{balneario.descripcion}</p>
							<Link
								href={`/balnearios/${balneario.id}`}
								className="inline-block mt-3 text-blue-600 underline hover:text-blue-800"
							>
								Ver más
							</Link>
						</div>
					))
				) : (
					<p className="text-gray-500 col-span-full">
						No se encontraron balnearios.
					</p>
				)}
			</div>
		</div>
	)
}
