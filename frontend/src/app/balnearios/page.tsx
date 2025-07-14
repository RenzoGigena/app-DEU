"use client"

import { useEffect, useState } from "react"

import { Balneario } from "@/types/balnearios"
import { BalnearioCard } from "@/components/BalnearioCard"
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

				<section
					className="flex flex-col gap-4 w-full max-w-5xl mx-auto px-4"
					role="list"
					aria-label="Lista de balnearios"
				>
					{filteredBalnearios.length > 0 ? (
						filteredBalnearios.map((balneario: Balneario) => (
							<BalnearioCard balneario={balneario} key={balneario.id} />
						))
					) : (
						<p
							className="text-gray-500 text-center"
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
