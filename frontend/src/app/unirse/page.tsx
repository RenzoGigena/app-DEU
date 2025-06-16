"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/LoginForm"
import { RegisterForm } from "@/components/RegisterForm"
import { toast } from "sonner"
import { useAuth } from "@/helpers/AuthProvider"
import { useIsMobile } from "@/hooks/useIsMobile"

export default function UnirsePage() {
	/* ─── AuthContext ──────────────────────────────────────────────── */
	const { user, login, logout, register } = useAuth()

	/* vista: select | register | login */
	const isMobile = useIsMobile()
	const [view, setView] = useState<"select" | "register" | "login">("register")

	/* formularios */
	const [reg, setReg] = useState({
		nombre: "",
		apellido: "",
		mail: "",
		password: "",
		confirm: "",
	})
	const [log, setLog] = useState({ mail: "", password: "" })
	const [regErr, setRegErr] = useState<Record<string, string>>({})
	const [logErr, setLogErr] = useState<Record<string, string>>({})

	/* ajustar vista inicial en mobile */
	useEffect(() => {
		if (!user && isMobile) setView("select")
	}, [isMobile, user])

	/* ─── handlers ─────────────────────────────────────────────────── */
	const handleRegister = () => {
		/* validaciones */
		const err: Record<string, string> = {}
		if (!reg.nombre) err.nombre = "Requerido"
		if (!reg.apellido) err.apellido = "Requerido"
		if (!reg.mail.includes("@")) err.mail = "Mail inválido"
		if (reg.password.length < 6) err.password = "≥ 6 caracteres"
		if (reg.password !== reg.confirm) err.confirm = "No coinciden"
		setRegErr(err)
		if (Object.keys(err).length) return

		/* registrar vía provider */
		const ok = register({ mail: reg.mail, password: reg.password })
		if (!ok) {
			setRegErr({ mail: "Ya registrado" })
			return
		}

		toast("Registro exitoso 🎉", { description: "Ya podés iniciar sesión" })
		setReg({ nombre: "", apellido: "", mail: "", password: "", confirm: "" })
		setView("login")
	}

	const handleLogin = () => {
		const err: Record<string, string> = {}
		if (!log.mail) err.mail = "Requerido"
		if (!log.password) err.password = "Requerido"
		setLogErr(err)
		if (Object.keys(err).length) return

		const ok = login(log.mail, log.password)
		if (!ok) {
			setLogErr({ global: "Mail o contraseña incorrectos" })
			return
		}

		toast("Bienvenido 👋", { description: "Sesión iniciada" })
		setLog({ mail: "", password: "" })
	}

	const handleLogout = () => {
		logout() // ← actualiza contexto y localStorage
		toast("Sesión cerrada")
		setView("select")
	}

	/* cambios de campos */
	const handleRegChange = (f: string, v: string) =>
		setReg((p) => ({ ...p, [f]: v }))
	const handleLogChange = (f: string, v: string) =>
		setLog((p) => ({ ...p, [f]: v }))

	/* ─── render sesión iniciada ───────────────────────────────────── */
	if (user) {
		return (
			<main
				role="main"
				className="flex flex-col items-center justify-center h-[75vh] gap-6 text-center px-4"
			>
				<h2 className="text-2xl font-bold text-primary">¡Ya estás logueado!</h2>
				<p className="text-muted-foreground max-w-sm">
					Gracias por colaborar con nosotros, tu aporte marca la diferencia.
				</p>
				<p className="text-sm">
					Rol: <span className="font-semibold">{user.role}</span>
				</p>
				<Button onClick={handleLogout} aria-label="Cerrar sesión">
					Cerrar sesión
				</Button>
			</main>
		)
	}

	/* ─── página principal ─────────────────────────────────────────── */
	return (
		<main
			role="main"
			className="flex-1 mx-auto w-full max-w-5xl px-3 py-10 space-y-10"
		>
			<section className="text-center space-y-2">
				<h2 className="text-3xl font-bold text-primary">¿Querés contribuir?</h2>
				<p className="text-muted-foreground max-w-md mx-auto">
					Esta página está dedicada a personas que quieran aportar al proyecto
					de balnearios del Río de la Plata.
				</p>
			</section>

			{/* Selección en mobile */}
			{view === "select" && (
				<div
					className="flex flex-col gap-8 md:hidden"
					aria-label="Selector de acción"
				>
					<Button
						className="h-20 text-lg"
						aria-label="Registrarse"
						onClick={() => setView("register")}
					>
						Registrarse →
					</Button>
					<Button
						className="h-20 text-lg"
						variant="outline"
						aria-label="Iniciar sesión"
						onClick={() => setView("login")}
					>
						Iniciar sesión →
					</Button>
				</div>
			)}

			{/* Escritorio: ambos formularios */}
			<div className="hidden md:grid md:grid-cols-2 md:gap-8">
				<RegisterForm
					showBack={false}
					errors={regErr}
					values={reg}
					onChange={handleRegChange}
					onSubmit={handleRegister}
					onBack={() => setView("select")}
				/>
				<LoginForm
					showBack={false}
					errors={logErr}
					values={log}
					onChange={handleLogChange}
					onSubmit={handleLogin}
					onBack={() => setView("select")}
				/>
			</div>

			{/* Mobile: formulario activo */}
			<div className="md:hidden">
				{view === "register" && (
					<RegisterForm
						showBack
						errors={regErr}
						values={reg}
						onChange={handleRegChange}
						onSubmit={handleRegister}
						onBack={() => setView("select")}
					/>
				)}
				{view === "login" && (
					<LoginForm
						showBack
						errors={logErr}
						values={log}
						onChange={handleLogChange}
						onSubmit={handleLogin}
						onBack={() => setView("select")}
					/>
				)}
			</div>
		</main>
	)
}
