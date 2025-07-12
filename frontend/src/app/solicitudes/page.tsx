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
import { Solicitud } from "@/types/solicitudes"
import { SolicitudCard } from "@/components/SolicitudCard"
import { SolicitudService } from "@/service/solicitudService"
import { Textarea } from "@/components/ui/textarea"
import type { User } from "@/helpers/AuthProvider"
import { toast } from "sonner"

const LS_SESSION = "balneario-session"
const getSession = (): User | null =>
	JSON.parse(localStorage.getItem(LS_SESSION) || "null")

export default function SolicitudesPage() {
	const [session, setSession] = useState<User | null>(null)
	const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
	const [search, setSearch] = useState("")

	const [approveId, setApproveId] = useState<string | null>(null)
	const [rejectId, setRejectId] = useState<string | null>(null)
	const [motivo, setMotivo] = useState("")
	const [liveMsg, setLiveMsg] = useState("")

	useEffect(() => {
		setSession(getSession())
		SolicitudService.findAll().then(setSolicitudes).catch(console.error)
	}, [])

	if (!session || session.role !== "admin") {
		return (
			<main className="flex flex-col items-center justify-center h-[70vh] gap-4 text-center">
				<h2 className="text-2xl font-semibold text-primary">
					Acceso restringido
				</h2>
				<p className="text-muted-foreground">Sólo administradores.</p>
			</main>
		)
	}

	const doApprove = async () => {
		if (!approveId) return
		try {
			await SolicitudService.aprobar(approveId)
			setSolicitudes((prev) => prev.filter((s) => s.id !== approveId))
			toast.success("Solicitud aceptada", {
				description: "Se notificó al contribuidor por e-mail.",
			})
			setLiveMsg("Solicitud aceptada")
		} catch (e) {
			console.error("Error al aprobar solicitud:", e)
			toast.error("Error al aprobar solicitud")
		} finally {
			setApproveId(null)
		}
	}

	const doReject = async () => {
		if (!rejectId) return
		try {
			await SolicitudService.remove(rejectId)
			setSolicitudes((prev) => prev.filter((s) => s.id !== rejectId))
			toast.error("Solicitud rechazada", {
				description: "Motivo enviado al contribuidor.",
			})
			setLiveMsg("Solicitud rechazada")
		} catch (e) {
			console.error("Error al rechazar la solicitud:", e)
			toast.error("Error al rechazar la solicitud")
		} finally {
			setRejectId(null)
			setMotivo("")
		}
	}

	const filtered = solicitudes.filter((s) =>
		s.nombreBalneario.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<main className="flex-1 max-w-7xl mx-auto px-3 py-8 space-y-8">
			<header>
				<h1 className="text-3xl font-bold text-primary">
					Gestión de solicitudes
				</h1>
				<p className="text-muted-foreground">
					Apruebe o rechace balnearios propuestos por contribuidores.
				</p>
			</header>

			<p className="sr-only" aria-live="polite">
				{liveMsg}
			</p>

			<Input
				placeholder="Filtrar por nombre de balneario"
				aria-label="Filtrar solicitudes"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			<section className="space-y-4" aria-label="Solicitudes pendientes">
				{filtered.length ? (
					filtered.map((s) => (
						<SolicitudCard
							key={s.id}
							data={s}
							onApproveRequest={setApproveId}
							onRejectRequest={setRejectId}
						/>
					))
				) : (
					<p role="alert" className="text-muted-foreground">
						No hay solicitudes pendientes.
					</p>
				)}
			</section>

			<Dialog open={!!approveId} onOpenChange={() => setApproveId(null)}>
				<DialogContent showCloseButton={false}>
					<DialogHeader>
						<DialogTitle>Confirmar aprobación</DialogTitle>
						<DialogDescription>
							¿Está seguro de publicar este balneario?
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="flex gap-3 pt-4">
						<Button
							variant="secondary"
							className="bg-green-600 hover:bg-green-700"
							onClick={doApprove}
						>
							Aprobar
						</Button>
						<DialogTrigger asChild>
							<Button variant="outline">Cancelar</Button>
						</DialogTrigger>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={!!rejectId} onOpenChange={() => setRejectId(null)}>
				<DialogContent showCloseButton={false}>
					<DialogHeader>
						<DialogTitle>Rechazar solicitud</DialogTitle>
						<DialogDescription>
							Escriba el motivo. Se enviará al contribuidor.
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
							onClick={doReject}
							disabled={!motivo.trim()}
						>
							Confirmar
						</Button>
						<DialogTrigger asChild>
							<Button variant="outline">Cancelar</Button>
						</DialogTrigger>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</main>
	)
}
