import { Balneario } from "@/types/balnearios"
import DaltonicImage from "@/components/DaltonicImage"
import { notFound } from "next/navigation"

export default async function BalnearioDetail({ params }: any) {
	const { id } = params

	const data = await import("@/mocks/balnearios.json")
	const balnearios: Balneario[] = data.default

	const balneario = balnearios.find((b) => b.id === id)

	if (!balneario) return notFound()

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

				<p className="text-gray-600 text-lg">{balneario.localidad}</p>

				<DaltonicImage
					src={balneario.imagen}
					alt={balneario.imagenAlt}
					width={600}
					height={400}
					className="rounded-md"
				/>

				<p>{balneario.detalle}</p>

				<section aria-labelledby="servicios-title">
					<h2 id="servicios-title" className="text-2xl font-semibold mt-6">
						Servicios
					</h2>

					<ul className="space-y-2" role="list">
						{balneario.servicios.map((servicio, index) => {
							const servicioId = `servicio-${index}`
							return (
								<li
									key={index}
									id={servicioId}
									role="listitem"
									className="flex items-center gap-2"
									aria-label={`${servicio.nombreServicio}: ${
										servicio.tiene ? "disponible" : "no disponible"
									}`}
								>
									<span
										aria-hidden="true"
										className={`w-4 h-4 rounded-full ${
											servicio.tiene ? "bg-green-500" : "bg-red-400"
										}`}
									/>
									<span>{servicio.nombreServicio}</span>
								</li>
							)
						})}
					</ul>
				</section>
			</div>
		</main>
	)
}
