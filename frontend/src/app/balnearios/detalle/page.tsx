"use client"

import { useEffect, useState } from "react"

import { Balneario } from "@/types/balnearios"
import { BalnearioService } from "@/service/balnearioService"
import DaltonicImage from "@/components/DaltonicImage"
import Map from "@/components/MapWrapper"
import { notFound } from "next/navigation"
import { useSearchParams } from "next/navigation"

export default function DetalleBalnearioClient() {
	const searchParams = useSearchParams()
	const id = searchParams!.get("id")

	const [balneario, setBalneario] = useState<Balneario | null>(null)
	const [error, setError] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		if (!id) {
			setError(true)
			setLoading(false)
			return
		}

		BalnearioService.findOne(id)
			.then(setBalneario)
			.catch((err) => {
				console.error("Error obteniendo balneario:", err)
				setError(true)
			})
			.finally(() => setLoading(false))
	}, [id])

	const getContaminationLevel = (value: number) => {
		if (value >= 70) return "Alto"
		if (value >= 40) return "Medio"
		return "Bajo"
	}

	if (loading) return <p className="text-center">Cargando...</p>
	if (error || !balneario) return notFound()

	return (
		<main
			className="flex flex-col items-center justify-center gap-2 px-4 text-center pt-1"
			role="main"
			aria-labelledby="balneario-title"
		>
			<div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
				<h1 id="balneario-title" className="text-3xl font-bold">
					{balneario.nombre}
				</h1>

				<p className="text-gray-600 text-lg">
					Localidad: {balneario.localidad}
				</p>

				<DaltonicImage
					src={balneario.imagen}
					alt={balneario.imagenAlt}
					width={600}
					height={400}
					className="rounded-md"
				/>

				<p className="text-justify">{balneario.descripcion}</p>

				<section aria-labelledby="servicios-title">
					<h2 id="servicios-title" className="text-2xl font-semibold mt-6">
						Servicios
					</h2>

					<ul className="space-y-2 text-left mt-2" role="list">
						{balneario.servicios.map((servicio, index) => {
							const disponible = servicio.tiene ? "Disponible" : "No disponible"
							return (
								<li
									key={index}
									className="flex items-center gap-2"
									role="listitem"
								>
									<span
										aria-hidden="true"
										className={`w-4 h-4 rounded-full ${
											servicio.tiene ? "bg-green-500" : "bg-red-400"
										}`}
									/>
									<span>
										<strong>{servicio.nombreServicio}</strong>: {disponible}
									</span>
								</li>
							)
						})}
					</ul>
				</section>

				<section aria-labelledby="indices-contaminacion-title" className="mt-6">
					<h2
						id="indices-contaminacion-title"
						className="text-2xl font-semibold"
					>
						Índices de Contaminación
					</h2>
					<div className="flex flex-col gap-2 text-left pt-2">
						<p id="contaminacion-agua-info" aria-live="polite">
							<strong className="font-medium">Contaminación del Agua:</strong>{" "}
							<span
								className={`font-semibold ${
									balneario.contaminacionAgua >= 70
										? "text-red-600"
										: balneario.contaminacionAgua >= 40
										? "text-yellow-600"
										: "text-green-600"
								}`}
							>
								{getContaminationLevel(balneario.contaminacionAgua)} (
								{balneario.contaminacionAgua.toFixed(0)}%)
							</span>
						</p>
						<p id="contaminacion-arena-info" aria-live="polite">
							<strong className="font-medium">
								Contaminación de la Arena:
							</strong>{" "}
							<span
								className={`font-semibold ${
									balneario.contaminacionArena >= 70
										? "text-red-600"
										: balneario.contaminacionArena >= 40
										? "text-yellow-600"
										: "text-green-600"
								}`}
							>
								{getContaminationLevel(balneario.contaminacionArena)} (
								{balneario.contaminacionArena.toFixed(0)}%)
							</span>
						</p>
						<p className="text-sm text-gray-500 mt-2">
							* Índices expresados del 0 al 100. Valores mayores indican mayor
							nivel de contaminación.
						</p>
					</div>
				</section>

				<section aria-labelledby="ubicacion-title" className="mt-8">
					<h2 id="ubicacion-title" className="text-2xl font-semibold mb-2">
						Ubicación
					</h2>
					<Map
						lat={balneario.latitud}
						lng={balneario.longitud}
						nombre={balneario.nombre}
					/>
				</section>
			</div>
		</main>
	)
}
