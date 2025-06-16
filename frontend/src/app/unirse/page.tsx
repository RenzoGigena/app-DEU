"use client"

import { useEffect, useState } from "react"

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

// usamos la función directa

/* ──────────── tipos ──────────── */
type Role = "admin" | "contributor"
type User = { mail: string; password: string; role: Role }

/* ──────────── constantes LS ──────────── */
const LS_USERS = "balneario-users"
const LS_SESSION = "balneario-session"

/* usuarios base (solo se cargan la primera vez) */
const DEFAULT_USERS: User[] = [
	{ mail: "admin@balneario.ar", password: "admin123", role: "admin" },
	{
		mail: "colaborador@balneario.ar",
		password: "colabora",
		role: "contributor",
	},
]

export default function UnirsePage() {
	/* ───────── estado de sesión ───────── */
	const [currentUser, setCurrentUser] = useState<User | null>(null)

	/* ───────── estado formularios ─────── */
	const [register, setRegister] = useState({
		nombre: "",
		apellido: "",
		mail: "",
		password: "",
		confirm: "",
	})
	const [login, setLogin] = useState({ mail: "", password: "" })
	const [registerErr, setRegisterErr] = useState<Record<string, string>>({})
	const [loginErr, setLoginErr] = useState<Record<string, string>>({})

	/* ───────── helpers LS ───────── */
	const getUsers = (): User[] =>
		JSON.parse(localStorage.getItem(LS_USERS) || "[]")

	const saveUsers = (users: User[]) =>
		localStorage.setItem(LS_USERS, JSON.stringify(users))

	const loadSession = (): User | null =>
		JSON.parse(localStorage.getItem(LS_SESSION) || "null")

	const saveSession = (user: User | null) =>
		user
			? localStorage.setItem(LS_SESSION, JSON.stringify(user))
			: localStorage.removeItem(LS_SESSION)

	/* ───────── efecto inicial ───────── */
	useEffect(() => {
		/* 1) inyectar usuarios por defecto si hace falta */
		if (!localStorage.getItem(LS_USERS)) saveUsers(DEFAULT_USERS)

		/* 2) hidratar sesión */
		const ses = loadSession()
		if (ses) setCurrentUser(ses)
	}, [])

	/* ───────── validaciones ───────── */
	const validateRegister = () => {
		const err: Record<string, string> = {}
		if (!register.nombre) err.nombre = "Campo obligatorio"
		if (!register.apellido) err.apellido = "Campo obligatorio"
		if (!register.mail.includes("@")) err.mail = "Mail inválido"
		if (register.password.length < 6) err.password = "Mínimo 6 caracteres"
		if (register.password !== register.confirm)
			err.confirm = "Las contraseñas no coinciden"
		setRegisterErr(err)
		return Object.keys(err).length === 0
	}

	const validateLogin = () => {
		const err: Record<string, string> = {}
		if (!login.mail) err.mail = "Campo obligatorio"
		if (!login.password) err.password = "Campo obligatorio"
		setLoginErr(err)
		return Object.keys(err).length === 0
	}

	/* ───────── acciones ───────── */
	const handleRegister = () => {
		if (!validateRegister()) return

		/* comprobar mail duplicado */
		const users = getUsers()
		if (users.some((u) => u.mail === register.mail)) {
			setRegisterErr({ mail: "Ese mail ya está registrado" })
			return
		}

		const newUser: User = {
			mail: register.mail,
			password: register.password,
			role: "contributor",
		}
		saveUsers([...users, newUser])

		toast("Registro exitoso 🎉", {
			description: "Ya podés iniciar sesión",
		})
		setRegister({
			nombre: "",
			apellido: "",
			mail: "",
			password: "",
			confirm: "",
		})
	}

	const handleLogin = () => {
		if (!validateLogin()) return

		const user = getUsers().find(
			(u) => u.mail === login.mail && u.password === login.password
		)
		if (!user) {
			setLoginErr({ global: "El mail y la contraseña no coinciden" })
		} else {
			setCurrentUser(user)
			saveSession(user)
			toast("Bienvenido", { description: "Iniciaste sesión correctamente" })
			setLogin({ mail: "", password: "" })
			setLoginErr({})
		}
	}

	const handleLogout = () => {
		setCurrentUser(null)
		saveSession(null)
		toast("Sesión cerrada", { description: "Hasta la próxima" })
	}

	/* ───────── vista si YA está logueado ───────── */
	if (currentUser) {
		return (
			<main className="flex flex-col items-center justify-center h-[70vh] gap-6 text-center">
				<div>
					<h2 className="text-2xl font-bold text-primary mb-2">
						¡Ya estás logueado!
					</h2>
					<p className="text-muted-foreground max-w-md">
						Gracias por colaborar con nosotros, tu aporte marca la diferencia
					</p>
					<p className="mt-4 text-sm">
						Rol asignado:{" "}
						<span className="font-semibold">{currentUser.role}</span>
					</p>
				</div>
				<Button onClick={handleLogout}>Cerrar sesión</Button>
			</main>
		)
	}

	/* ───────── vista de registro / login ───────── */
	return (
		<main className="flex-1 mx-auto w-full max-w-5xl px-3 py-12 space-y-10">
			{/* encabezado */}
			<section className="text-center space-y-2">
				<h2 className="text-3xl font-bold text-primary">¿Querés contribuir?</h2>
				<p className="text-muted-foreground">
					Esta página está dedicada para las personas que quieran contribuir con
					el proyecto de balnearios
				</p>
			</section>

			{/* formularios */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* ---------- registro ---------- */}
				<section className="space-y-4 border rounded-lg p-6 shadow">
					<h3 className="text-xl font-semibold text-primary">Registrate</h3>

					<Input
						placeholder="Nombre"
						value={register.nombre}
						onChange={(e) =>
							setRegister({ ...register, nombre: e.target.value })
						}
						className={registerErr.nombre ? "border-red-500" : ""}
					/>
					{registerErr.nombre && (
						<p className="text-xs text-red-600">{registerErr.nombre}</p>
					)}

					<Input
						placeholder="Apellido"
						value={register.apellido}
						onChange={(e) =>
							setRegister({ ...register, apellido: e.target.value })
						}
						className={registerErr.apellido ? "border-red-500" : ""}
					/>
					{registerErr.apellido && (
						<p className="text-xs text-red-600">{registerErr.apellido}</p>
					)}

					<Input
						placeholder="Mail"
						type="email"
						value={register.mail}
						onChange={(e) => setRegister({ ...register, mail: e.target.value })}
						className={registerErr.mail ? "border-red-500" : ""}
					/>
					{registerErr.mail && (
						<p className="text-xs text-red-600">{registerErr.mail}</p>
					)}

					<Input
						placeholder="Contraseña"
						type="password"
						value={register.password}
						onChange={(e) =>
							setRegister({ ...register, password: e.target.value })
						}
						className={registerErr.password ? "border-red-500" : ""}
					/>
					{registerErr.password && (
						<p className="text-xs text-red-600">{registerErr.password}</p>
					)}

					<Input
						placeholder="Confirmar contraseña"
						type="password"
						value={register.confirm}
						onChange={(e) =>
							setRegister({ ...register, confirm: e.target.value })
						}
						className={registerErr.confirm ? "border-red-500" : ""}
					/>
					{registerErr.confirm && (
						<p className="text-xs text-red-600">{registerErr.confirm}</p>
					)}

					<Button className="w-full mt-2" onClick={handleRegister}>
						Registrarme
					</Button>
				</section>

				{/* ---------- login ---------- */}
				<section className="space-y-4 border rounded-lg p-6 shadow">
					<h3 className="text-xl font-semibold text-primary">Inicia sesión</h3>

					{loginErr.global && (
						<div className="text-red-600 flex items-center gap-2 text-sm">
							<AlertCircle className="w-4 h-4" />
							{loginErr.global}
						</div>
					)}

					<Input
						placeholder="Mail"
						type="email"
						value={login.mail}
						onChange={(e) => setLogin({ ...login, mail: e.target.value })}
						className={loginErr.mail ? "border-red-500" : ""}
					/>
					{loginErr.mail && (
						<p className="text-xs text-red-600">{loginErr.mail}</p>
					)}

					<Input
						placeholder="Contraseña"
						type="password"
						value={login.password}
						onChange={(e) => setLogin({ ...login, password: e.target.value })}
						className={loginErr.password ? "border-red-500" : ""}
					/>
					{loginErr.password && (
						<p className="text-xs text-red-600">{loginErr.password}</p>
					)}

					<Button className="w-full mt-2" onClick={handleLogin}>
						Iniciar sesión
					</Button>
				</section>
			</div>
		</main>
	)
}
