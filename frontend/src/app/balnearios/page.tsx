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
		<main
			className="flex flex-col items-center justify-center gap-2 px-4 text-center pt-10"
			role="main"
		>
			<header className="text-center space-y-2">
				<h1 className="text-3xl font-bold text-primary">Balnearios</h1>
				<p className="text-muted-foreground max-w-md mx-auto">
					Aquí encontrarás una lista de balnearios disponibles en la rivera sur del Rio de La Plata. Puedes buscar por nombre o localidad.
				</p>
			</header>

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
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
				{filteredBalnearios.length > 0 ? (
					filteredBalnearios.map((balneario: Balneario) => (
					<div
						key={balneario.nombre}
						className="w-full h-full border rounded-md p-4 shadow-md bg-white"
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
					<p className="text-gray-500 col-span-full">No se encontraron balnearios.</p>
				)}
				</div>
			</div>
		</main>
	)
}
