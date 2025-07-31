"use client"

import { Button } from "@/components/ui/button"
import DaltonicImage from "@/components/DaltonicImage"
import type { Solicitud } from "@/types/solicitudes"

interface Props {
	data: Solicitud
	onApproveRequest: (id: string) => void
	onRejectRequest: (id: string) => void
}

export function SolicitudCard({
	data: s,
	onApproveRequest,
	onRejectRequest,
}: Props) {
	return (
		<article
			aria-labelledby={`solicitud-${s.id}`}
			role="article"
			className="border rounded-lg p-4 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4"
		>
			{/* Columna 1: info básica + imagen */}
			<div className="space-y-2">
				<h2 id={`solicitud-${s.id}`} className="font-semibold text-lg">
					{s.nombreBalneario}
				</h2>

				<p className="text-sm text-muted-foreground">
					Localidad: {s.localidad}
				</p>
				<p className="text-sm text-muted-foreground">
					Contribuidor: {s.contribuidor}
				</p>

				<DaltonicImage
					src={s.imagen}
					alt={s.imagenAlt || `Imagen de ${s.nombreBalneario}`}
					width={180}
					height={140}
					className="w-full max-w-xs object-cover rounded border"
				/>

				<p className="whitespace-pre-line text-sm">{s.descripcion}</p>
			</div>

			{/* Columna 2: detalles técnicos y ubicación */}
			<div className="space-y-2">
				<p className="text-sm">
					<strong>Contaminación del agua:</strong>{" "}
					<span className="text-blue-900">{s.contaminacionAgua}%</span>
				</p>
				<p className="text-sm">
					<strong>Contaminación de la arena:</strong>{" "}
					<span className="text-blue-900">{s.contaminacionArena}%</span>
				</p>

				<p className="text-sm">
					<strong>Servicios:</strong>{" "}
					{s.servicios
						.filter((servicio) => servicio.tiene)
						.map((m) => m.nombreServicio)
						.join(", ") || "Ninguno"}
				</p>

				<p className="text-sm">
					<strong>Teléfono:</strong>{" "}
					<a
						href={`tel:${s.telefono}`}
						className="underline focus-visible:outline"
						tabIndex={-1}
					>
						{s.telefono}
					</a>
				</p>

				<p className="text-sm">
					<strong>Sitio web:</strong>{" "}
					<a
						href={`https://${s.url}`}
						target="_blank"
						rel="noopener noreferrer"
						className="underline text-primary focus-visible:outline"
					>
						{s.url}
					</a>
				</p>

				{/* Ver ubicación en Google Maps */}
				<a
					href={`https://www.google.com/maps?q=${s.latitud},${s.longitud}`}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={`Ver ubicación en Google Maps de ${s.nombreBalneario}`}
					tabIndex={-1}
					className="inline-block mt-2"
				>
					<Button
						variant="outline"
						className="w-full text-blue-700 border-blue-700 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black focus-visible:outline-none"
					>
						Ver ubicación
					</Button>
				</a>
			</div>

			{/* Columna 3: acciones */}
			<div className="flex flex-col gap-2 justify-start md:justify-center">
				<Button
					onClick={() => onApproveRequest(s.id)}
					className="bg-green-600 hover:bg-green-700 text-white focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none"
					aria-label={`Solicitar confirmación para aprobar solicitud de ${s.nombreBalneario}`}
				>
					Aprobar
				</Button>

				<Button
					variant="destructive"
					onClick={() => onRejectRequest(s.id)}
					className="focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none"
					aria-label={`Solicitar motivo de rechazo para la solicitud de ${s.nombreBalneario}`}
				>
					Rechazar
				</Button>
			</div>
		</article>
	)
}
