"use client"

import { Button } from "@/components/ui/button"
import type { Solicitud } from "@/types/solicitudes"

interface Props {
	data: Solicitud
	/** abrir diálogo de Aprobación */
	onApproveRequest: (id: string) => void
	/** abrir diálogo de Rechazo */
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
			className="border rounded-lg p-4 flex flex-col gap-3 md:flex-row md:items-start shadow-sm"
		>
			<div className="flex-1 space-y-1">
				<h3 id={`solicitud-${s.id}`} className="font-semibold">
					{s.nombreBalneario}
				</h3>
				<p className="text-sm text-muted-foreground">
					Contribuidor: {s.contribuidor}
				</p>
				<p className="whitespace-pre-line text-sm">{s.descripcion}</p>
				<p className="text-sm">
					Servicios:{" "}
					{s.servicios
						.filter((s) => s.tiene)
						.map((m) => {
							return m.nombreServicio
						})
						.join(" ")}
				</p>
				<p className="text-sm">
					Teléfono:{" "}
					<a
						href={`tel:${s.telefono}`}
						className="underline focus-visible:outline"
					>
						{s.telefono}
					</a>
				</p>
				<a
					href={`https://${s.url}`}
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm underline text-primary focus-visible:outline "
				>
					{s.url}
				</a>
			</div>

			<div className="flex flex-col gap-2 md:w-40">
				<Button
					className="bg-green-600 hover:bg-green-700 text-white focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none"
					aria-label="Solicitar confirmación para aprobar"
					onClick={() => onApproveRequest(s.id)}
				>
					Aprobar
				</Button>

				<Button
					variant="destructive"
					className="focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:outline-none"
					aria-label="Solicitar motivo de rechazo"
					onClick={() => onRejectRequest(s.id)}
				>
					Rechazar
				</Button>
			</div>
		</article>
	)
}
