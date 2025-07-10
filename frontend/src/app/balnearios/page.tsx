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

	// Mientras carga
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
					Aquí encontrarás una lista de balnearios disponibles en la rivera sur
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
					<label htmlFor="search" className="sr-only">
						Buscar balneario
					</label>
					<input
						id="search"
						type="text"
						placeholder="Buscar balneario..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="flex-grow border rounded px-4 py-2 w-full"
						aria-label={`Buscar por ${filterBy}`}
					/>

					<label htmlFor="filterBy" className="sr-only">
						Buscar por nombre o localidad
					</label>
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
				{(user?.role === "admin" || user?.role == "contributor") && (
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

						{/* Acá va el resto de tu componente */}
					</div>
				)}

				{/* Tarjetas */}
				<section
					className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4"
					role="list"
					aria-label="Lista de balnearios"
				>
					{filteredBalnearios.length > 0 ? (
						filteredBalnearios.map((balneario: Balneario) => (
							<article
								key={balneario.nombre}
								className="w-full h-full border rounded-md p-4 shadow-md bg-white"
								role="listitem"
								aria-labelledby={`balneario-${balneario.id}-nombre`}
							>
								<h3
									id={`balneario-${balneario.id}-nombre`}
									className="text-xl font-bold"
								>
									{balneario.nombre}
								</h3>
								<p className="text-gray-600">{balneario.localidad}</p>
								<p className="mt-2">{balneario.descripcion}</p>
								<Link
									href={`/balnearios/${balneario.id}`}
									className="inline-block mt-3 text-blue-600 underline hover:text-blue-800"
									aria-label={`Ver más sobre ${balneario.nombre}`}
								>
									Ver más
								</Link>
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
