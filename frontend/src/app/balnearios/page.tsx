"use client"

import { useEffect, useState } from "react"

import { Balneario } from "@/types/balnearios"
import { BalnearioService } from "@/service/balnearioService"
import Link from "next/link"
import SolicitudModal from "@/components/SolicitudModal"
import { useAuth } from "@/helpers/AuthProvider"

type Filtro = "nombre" | "localidad"

export default function BalneariosPage() {
	const [filterBy, setFilterBy] = useState<Filtro>("nombre")
	const [searchTerm, setSearchTerm] = useState("")
	const [balnearios, setBalnearios] = useState<Balneario[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [showModal, setShowModal] = useState(false)
	const { user } = useAuth()

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await BalnearioService.findAll()
				setBalnearios(data)
			} catch (err) {
				setError("Error al cargar los balnearios.")
				console.error(err)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	const filteredBalnearios = balnearios.filter((b) =>
		b[filterBy].toLowerCase().includes(searchTerm.toLowerCase())
	)

	if (loading) {
		return (
			<main className="text-center pt-20">
				<p className="text-gray-500">Cargando balnearios...</p>
			</main>
		)
	}

	if (error) {
		return (
			<main className="text-center pt-20">
				<p className="text-red-500">{error}</p>
			</main>
		)
	}

	return (
		<main
			className="flex flex-col items-center justify-center gap-2 px-4 text-center pt-10"
			role="main"
			aria-labelledby="balnearios-heading"
		>
			<header className="text-center space-y-2">
				<h1 id="balnearios-heading" className="text-3xl font-bold text-primary">
					Balnearios
				</h1>
				<p
					className="text-muted-foreground max-w-md mx-auto"
					id="intro-description"
				>
					Aquí encontrarás una lista de balnearios disponibles en la ribera sur
					del Río de La Plata. Puedes buscar por nombre o localidad.
				</p>
			</header>

			<div className="space-y-6" aria-describedby="intro-description">
				{/* Buscador */}
				<form
					role="search"
					aria-label="Buscador de balnearios"
					className="pt-6 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 px-4"
				>
					<input
						id="search"
						type="text"
						placeholder="Buscar balneario..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="flex-grow border rounded px-4 py-2 w-full"
						aria-label={`Buscar por ${filterBy}`}
					/>

					<select
						id="filterBy"
						value={filterBy}
						onChange={(e) => setFilterBy(e.target.value as Filtro)}
						className="w-36 border rounded px-3 py-2"
						aria-label="Seleccionar criterio de búsqueda"
					>
						<option value="nombre">Nombre</option>
						<option value="localidad">Localidad</option>
					</select>
				</form>

				{(user?.role === "admin" || user?.role === "contributor") && (
					<div>
						<button
							onClick={() => setShowModal(true)}
							className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
						>
							Crear nueva solicitud
						</button>

						{showModal && (
							<SolicitudModal onClose={() => setShowModal(false)} />
						)}
					</div>
				)}

				{/* Tarjetas de balnearios */}
				<section
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
					role="list"
					aria-label="Lista de balnearios"
				>
					{filteredBalnearios.length > 0 ? (
						filteredBalnearios.map((balneario: Balneario) => (
							<article
								key={balneario.id}
								className="w-full h-full rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col justify-between"
								role="listitem"
								aria-labelledby={`balneario-${balneario.id}-nombre`}
							>
								<div>
									<h3
										id={`balneario-${balneario.id}-nombre`}
										className="text-2xl font-semibold text-primary mb-1"
									>
										{balneario.nombre}
									</h3>
									<p className="text-sm text-muted-foreground font-medium mb-2">
										{balneario.localidad}
									</p>
									<p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
										{balneario.descripcion}
									</p>
								</div>

								<div className="mt-4">
									<Link
										href={`/balnearios/${balneario.id}`}
										className="inline-block rounded-lg bg-primary hover:bg-blue-900 text-white text-sm font-medium px-4 py-2 transition-colors shadow-sm"
										aria-label={`Ver más sobre ${balneario.nombre}`}
									>
										Ver más
									</Link>
								</div>
							</article>
						))
					) : (
						<p
							className="text-gray-500 col-span-full"
							role="status"
							aria-live="polite"
						>
							No se encontraron balnearios.
						</p>
					)}
				</section>
			</div>
		</main>
	)
}
