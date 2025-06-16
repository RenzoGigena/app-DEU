"use client"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

/* ─── Aux: auth helpers reutilizados ───────────────────────────────── */
type Role = "admin" | "contributor"
type User = { mail: string; role: Role; password?: string }

const LS_SESSION = "balneario-session"
const getSession = (): User | null =>
	JSON.parse(localStorage.getItem(LS_SESSION) || "null")

/* ─── Tipos y datos de las solicitudes ────────────────────────────── */
export type Solicitud = {
	id: string
	nombreBalneario: string
	localidad: string
	descripcion: string
	servicios: string[]
	telefono: string
	url: string
	contribuidor: string
}

const INITIAL_SOLICITUDES: Solicitud[] = [
	{
		id: "1",
		nombreBalneario: "Balneario 12",
		localidad: "Barisso",
		descripcion: "Ubicación: Calle 9 #432.\nServicios: Baños, Parrilla.",
		servicios: ["Baños", "Parrilla"],
		telefono: "221 4924523",
		url: "balneario12.com",
		contribuidor: "PedroPascal@gmail.com",
	},
	{
		id: "2",
		nombreBalneario: "Ribera Sur",
		localidad: "Avellaneda",
		descripcion: "Amplio parque costero con fogones.",
		servicios: ["Fogones", "Estacionamiento"],
		telefono: "11 32165498",
		url: "ribera.avellaneda.ar",
		contribuidor: "ana.dev@correo.com",
	},
]

/* ─── Page Component ──────────────────────────────────────────────── */
export default function SolicitudesPage() {
	const [session, setSession] = useState<User | null>(null)

	/* estado de solicitudes y búsqueda */
	const [solicitudes, setSolicitudes] = useState<Solicitud[]>(() => [
		...INITIAL_SOLICITUDES,
	])
	const [search, setSearch] = useState("")

	/* diálogo de rechazo */
	const [rejectId, setRejectId] = useState<string | null>(null)
	const [motivo, setMotivo] = useState("")

	/* cargar sesión */
	useEffect(() => {
		setSession(getSession())
	}, [])

	if (!session || session.role !== "admin") {
		return (
			<main className="flex flex-col items-center justify-center h-[70vh] gap-4 text-center">
				<h2 className="text-2xl font-semibold text-primary">
					Acceso restringido
				</h2>
				<p className="text-muted-foreground">
					Esta sección sólo está disponible para administradores.
				</p>
			</main>
		)
	}

	/* ── handlers ──────────────────────────────────────────────────── */
	const handleApprove = (id: string) => {
		setSolicitudes((prev) => prev.filter((s) => s.id !== id))
		toast.success("Solicitud aceptada con éxito ✅", {
			description: "Se notificó al contribuidor por e-mail.",
		})
	}

	const handleReject = () => {
		if (!rejectId) return
		setSolicitudes((prev) => prev.filter((s) => s.id !== rejectId))
		toast.error("Solicitud rechazada", {
			description: "Motivo enviado al contribuidor.",
		})
		setMotivo("")
		setRejectId(null)
	}

	const filteredSolicitudes = solicitudes.filter((s) =>
		s.nombreBalneario.toLowerCase().includes(search.toLowerCase())
	)

	/* ── UI helper: card de solicitud ─────────────────────────────── */
	const Card = (s: Solicitud) => (
		<article
			key={s.id}
			className="border rounded-lg p-4 flex flex-col gap-3 md:flex-row md:items-start shadow-sm"
			aria-labelledby={`solicitud-${s.id}`}
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
					Teléfono: <a href={`tel:${s.telefono}`}>{s.telefono}</a>
				</p>
				<a
					href={`https://${s.url}`}
					target="_blank"
					rel="noopener noreferrer"
					className="text-sm underline text-primary"
				>
					{s.url}
				</a>
			</div>
			<div className="flex flex-col gap-2 md:w-40">
				<Button
					variant="secondary"
					aria-label="Aprobar solicitud"
					onClick={() => handleApprove(s.id)}
				>
					Aprobar
				</Button>
				<Button
					variant="destructive"
					aria-label="Rechazar solicitud"
					onClick={() => setRejectId(s.id)}
				>
					Rechazar por motivo
				</Button>
			</div>
		</article>
	)

	return (
		<main
			role="main"
			className="flex-1 mx-auto w-full max-w-5xl px-3 py-8 space-y-8"
		>
			<h1 className="text-3xl font-bold text-primary">
				Gestión de solicitudes
			</h1>
			<p className="text-muted-foreground">
				Esta sección está destinada a la aprobación o rechazo de balnearios
				propuestos por contribuidores.
			</p>

			{/* Buscador */}
			<Input
				placeholder="Ingrese un nombre para filtrar búsqueda"
				aria-label="Filtrar por balneario"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			{/* Listado o vacío */}
			<section className="space-y-4">
				{filteredSolicitudes.length > 0 ? (
					filteredSolicitudes.map(Card)
				) : (
					<p className="text-muted-foreground">
						No hay solicitudes pendientes.
					</p>
				)}
			</section>

			{/* Dialogo de rechazo */}
			<Dialog open={!!rejectId} onOpenChange={() => setRejectId(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>¿Desea rechazar esta solicitud?</DialogTitle>
						<DialogDescription>
							Describa brevemente el motivo. Esta información se enviará al
							contribuidor.
						</DialogDescription>
					</DialogHeader>

					<Textarea
						value={motivo}
						onChange={(e) => setMotivo(e.target.value)}
						placeholder="Motivo..."
						aria-label="Motivo de rechazo"
						className="min-h-[6rem]"
					/>

					<DialogFooter className="flex gap-3 pt-4">
						<Button
							variant="destructive"
							aria-label="Confirmar rechazo"
							onClick={handleReject}
						>
							Confirmar
						</Button>
						<DialogTrigger asChild>
							<Button variant="outline" aria-label="Cancelar rechazo">
								Cancelar
							</Button>
						</DialogTrigger>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</main>
	)
}
