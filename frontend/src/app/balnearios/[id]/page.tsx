import { Balneario } from "@/types/balnearios"
import DaltonicImage from "@/components/DaltonicImage"
import { notFound } from "next/navigation"

export default async function BalnearioDetail({ params }: any) {
	const { id } = params

	const data = await import("@/database/balnearios.JSON")
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
									className="flex items-center gap-2"
									role="listitem"
								>
									<input
										id={servicioId}
										type="checkbox"
										checked={servicio.tiene}
										readOnly
										className="accent-blue-500"
										tabIndex={-1}
										aria-checked={servicio.tiene}
										aria-disabled="true"
									/>
									<label htmlFor={servicioId}>{servicio.nombreServicio}</label>
								</li>
							)
						})}
					</ul>
				</section>
			</div>
		</main>
	)
}
