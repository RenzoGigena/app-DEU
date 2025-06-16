"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/LoginForm"
import { RegisterForm } from "@/components/RegisterForm"
import { toast } from "sonner"
import { useIsMobile } from "@/app/hooks/useIsMobile"

/* ─── Tipos y constantes de sesión ─────────────────────────────────── */
type Role = "admin" | "contributor"
type User = { mail: string; password: string; role: Role }

const LS_USERS = "balneario-users"
const LS_SESSION = "balneario-session"

const DEFAULT_USERS: User[] = [
	{ mail: "admin@balneario.ar", password: "admin123", role: "admin" },
	{
		mail: "colaborador@balneario.ar",
		password: "colabora",
		role: "contributor",
	},
]

/* ─── helpers localStorage ─────────────────────────────────────────── */
const getUsers = (): User[] =>
	JSON.parse(localStorage.getItem(LS_USERS) || "[]") || DEFAULT_USERS

const saveUsers = (users: User[]) =>
	localStorage.setItem(LS_USERS, JSON.stringify(users))

const getSession = (): User | null =>
	JSON.parse(localStorage.getItem(LS_SESSION) || "null")

const saveSession = (u: User | null) =>
	u
		? localStorage.setItem(LS_SESSION, JSON.stringify(u))
		: localStorage.removeItem(LS_SESSION)

/* ──────────────────────────────────────────────────────────────────── */
export default function UnirsePage() {
	/* sesión */
	const [user, setUser] = useState<User | null>(null)

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

	/* hidratar */
	useEffect(() => {
		if (!localStorage.getItem(LS_USERS)) saveUsers(DEFAULT_USERS)
		const ses = getSession()
		if (ses) setUser(ses)
	}, [])

	/* ajustar vista en mobile */
	useEffect(() => {
		if (!user && isMobile) setView("select")
	}, [isMobile, user])

	/* ─── handlers ───────────────────────────────────────────────────── */
	const handleRegister = () => {
		const err: Record<string, string> = {}
		if (!reg.nombre) err.nombre = "Requerido"
		if (!reg.apellido) err.apellido = "Requerido"
		if (!reg.mail.includes("@")) err.mail = "Mail inválido"
		if (reg.password.length < 6) err.password = "≥ 6 caracteres"
		if (reg.password !== reg.confirm) err.confirm = "No coinciden"
		setRegErr(err)
		if (Object.keys(err).length) return

		const users = getUsers()
		if (users.some((u) => u.mail === reg.mail)) {
			setRegErr({ mail: "Ya registrado" })
			return
		}

		const nuevo: User = {
			mail: reg.mail,
			password: reg.password,
			role: "contributor",
		}
		saveUsers([...users, nuevo])
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

		const usuario = getUsers().find(
			(u) => u.mail === log.mail && u.password === log.password
		)
		if (!usuario) {
			setLogErr({ global: "Mail o contraseña incorrectos" })
			return
		}

		setUser(usuario)
		saveSession(usuario)
		toast("Bienvenido 👋", { description: "Sesión iniciada" })
		setLog({ mail: "", password: "" })
	}

	const handleLogout = () => {
		setUser(null)
		saveSession(null)
		toast("Sesión cerrada")
		setView("select")
	}

	/* cambio de inputs */
	const handleRegChange = (field: string, value: string) =>
		setReg((prev) => ({ ...prev, [field]: value }))
	const handleLogChange = (field: string, value: string) =>
		setLog((prev) => ({ ...prev, [field]: value }))

	/* ─── render logged in ───────────────────────────────────────────── */
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

	/* ─── página principal ───────────────────────────────────────────── */
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

			{/* Selector en mobile */}
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

			{/* Escritorio: siempre ambos */}
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
