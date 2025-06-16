"use client"

import React, {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react"

/* ─────────── tipos ─────────── */
export type Role = "admin" | "contributor" | "visitor"
export type User = { mail: string; role: Role }
type StoredUser = User & { password: string }

/* ─────────── constantes LS ─────────── */
const LS_USERS = "balneario-users"
const LS_SESSION = "balneario-session"

/* ─────────── datos por defecto ─────────── */
const DEFAULT_USERS: StoredUser[] = [
	{ mail: "admin@balneario.ar", password: "admin123", role: "admin" },
	{ mail: "admin@gmail.com.ar", password: "admin123", role: "admin" },
	{
		mail: "colaborador@balneario.ar",
		password: "colabora",
		role: "contributor",
	},
]

/* ─────────── helpers seguros ─────────── */
const safeParse = <T,>(json: string | null, fallback: T): T => {
	try {
		return json ? (JSON.parse(json) as T) : fallback
	} catch {
		return fallback
	}
}

const loadUsers = (): StoredUser[] =>
	safeParse<StoredUser[]>(localStorage.getItem(LS_USERS), DEFAULT_USERS)

const saveUsers = (users: StoredUser[]) =>
	localStorage.setItem(LS_USERS, JSON.stringify(users))

const loadSession = (): User | null =>
	safeParse<User | null>(localStorage.getItem(LS_SESSION), null)

const saveSession = (user: User | null) =>
	user
		? localStorage.setItem(LS_SESSION, JSON.stringify(user))
		: localStorage.removeItem(LS_SESSION)

/* ─────────── contexto ─────────── */
interface AuthCtx {
	user: User | null
	login: (mail: string, password: string) => boolean
	logout: () => void
	register: (data: { mail: string; password: string }) => boolean
}

const AuthContext = createContext<AuthCtx | null>(null)

/* ─────────── provider ─────────── */
export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null)

	/* inicialización */
	useEffect(() => {
		if (!localStorage.getItem(LS_USERS)) saveUsers(DEFAULT_USERS)
		const ses = loadSession()
		if (ses) setUser(ses)
	}, [])

	/* ---------- acciones ---------- */
	const login: AuthCtx["login"] = (mail, password) => {
		const found = loadUsers().find(
			(u) => u.mail === mail && u.password === password
		)
		if (!found) return false
		const { password: _pwd, ...sessionUser } = found
		setUser(sessionUser)
		saveSession(sessionUser)
		return true
	}

	const logout = () => {
		setUser(null)
		saveSession(null)
	}

	const register: AuthCtx["register"] = ({ mail, password }) => {
		const users = loadUsers()
		if (users.some((u) => u.mail === mail)) return false
		const newUser: StoredUser = { mail, password, role: "contributor" }
		saveUsers([...users, newUser])
		return true
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, register }}>
			{children}
		</AuthContext.Provider>
	)
}

/* ─────────── hook seguro ─────────── */
export const useAuth = (): AuthCtx => {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>")
	return ctx
}
