"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/LoginForm"
import { RegisterForm } from "@/components/RegisterForm"
import { toast } from "sonner"
import { useAuth } from "@/helpers/AuthProvider"
import { useIsMobile } from "@/hooks/use-IsMobile"

export default function UnirsePage() {
	const { user, login, logout, register } = useAuth()

	/* vista */
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

	/* ajustar vista en mobile */
	useEffect(() => {
		if (!user && isMobile) setView("select")
	}, [isMobile, user])

	/* helpers typed */
	const handleRegChange = <K extends keyof typeof reg>(f: K, v: string) =>
		setReg((p) => ({ ...p, [f]: v }))
	const handleLogChange = <K extends keyof typeof log>(f: K, v: string) =>
		setLog((p) => ({ ...p, [f]: v }))

	/* register */
	const handleRegister = () => {
		const err: Record<string, string> = {}
		if (!reg.nombre.trim()) err.nombre = "El nombre es requerido"
		if (!reg.apellido.trim()) err.apellido = "El apellido es requerido"
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(reg.mail))
			err.mail = "El mail es inválido"
		if (reg.password.length < 6)
			err.password = "La contraseña debe tener 6 caracteres o más"
		if (reg.password !== reg.confirm)
			err.confirm = "Las contraseñas no coinciden"

		setRegErr(err)
		if (Object.keys(err).length) {
			document.getElementById(`reg-${Object.keys(err)[0]}`)?.focus()
			return
		}

		if (!register({ mail: reg.mail, password: reg.password })) {
			setRegErr({ mail: "Ese mail ya existe" })
			document.getElementById("reg-mail")?.focus()
			return
		}

		toast("¡Registro exitoso!", { description: "Ahora podés iniciar sesión" })
		setReg({ nombre: "", apellido: "", mail: "", password: "", confirm: "" })
		setView("login")
	}

	/* login */
	const handleLogin = () => {
		const err: Record<string, string> = {}
		if (!log.mail) err.mail = "Requerido"
		if (!log.password) err.password = "Requerido"
		setLogErr(err)
		if (Object.keys(err).length) {
			document.getElementById(`log-${Object.keys(err)[0]}`)?.focus()
			return
		}

		if (!login(log.mail, log.password)) {
			setLogErr({ global: "Mail o contraseña incorrectos" })
			document.getElementById("log-mail")?.focus()
			return
		}

		toast("¡Bienvenido!", { description: "Sesión iniciada" })
		setLog({ mail: "", password: "" })
	}

	const handleLogout = () => {
		logout()
		toast("Sesión cerrada")
		setView("select")
	}

	/* sesión iniciada */
	if (user) {
		return (
			<main
				className="flex flex-col items-center justify-center h-[75vh] gap-6 px-4 text-center"
				role="main"
			>
				<h1 className="text-2xl font-bold text-primary">¡Ya estás logueado!</h1>
				<p className="text-muted-foreground max-w-sm">
					Gracias por colaborar con nosotros, tu aporte marca la diferencia.
				</p>
				{user.role === "admin" && (
					<p className="text-sm">
						Rol: <span className="font-semibold">{user.role}</span>
					</p>
				)}

				<Button
					aria-label="Cerrar sesión"
					onClick={handleLogout}
					className="bg-primary text-white hover:bg-primary/90
                     focus-visible:ring-2 focus-visible:ring-offset-2
                     focus-visible:ring-black"
				>
					Cerrar sesión
				</Button>
			</main>
		)
	}

	/*  página principal  */
	return (
		<main
			role="main"
			className="flex-1 max-w-7xl mx-auto px-3 py-10 space-y-10"
		>
			<header className="text-center space-y-2">
				<h1 className="text-3xl font-bold text-primary">¿Querés contribuir?</h1>
				<p className="text-muted-foreground max-w-md mx-auto">
					Esta página está dedicada a personas que quieran aportar al proyecto
					de balnearios del Río de la Plata.
				</p>
			</header>

			{view === "select" && (
				<nav
					aria-label="Selector de acción"
					className="flex flex-col gap-6 md:hidden"
				>
					<Button
						aria-label="Ir a formulario de registro"
						className="h-14 text-lg bg-primary text-white hover:bg-primary/90
                       focus-visible:ring-2 focus-visible:ring-offset-2
                       focus-visible:ring-black"
						onClick={() => setView("register")}
					>
						Registrarse →
					</Button>
					<Button
						aria-label="Ir a formulario de inicio de sesión"
						variant="outline"
						className="h-14 text-lg
                       focus-visible:ring-2 focus-visible:ring-offset-2
                       focus-visible:ring-black"
						onClick={() => setView("login")}
					>
						Iniciar sesión →
					</Button>
				</nav>
			)}

			{/* escritorio */}
			<div
				className="hidden md:grid md:grid-cols-2 md:gap-8"
				aria-label="Formularios de acceso"
			>
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

			{/* mobile */}
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
