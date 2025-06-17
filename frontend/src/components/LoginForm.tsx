"use client"

import { AlertCircle } from "lucide-react"
import { BackButton } from "@/components/BackButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { MouseEventHandler } from "react"

type Values = { mail: string; password: string }
interface Props {
	showBack?: boolean
	errors: Record<string, string>
	values: Values
	onChange: <K extends keyof Values>(field: K, value: string) => void
	onSubmit: MouseEventHandler<HTMLButtonElement>
	onBack: () => void
}

export function LoginForm({
	showBack = false,
	errors,
	values,
	onChange,
	onSubmit,
	onBack,
}: Props) {
	return (
		<section
			role="form"
			aria-label="Formulario de inicio de sesión"
			className="space-y-4 border rounded-lg p-6 shadow w-full max-w-md mx-auto"
		>
			{showBack && <BackButton to="select" onBack={onBack} />}

			{/* h2 para mantener jerarquía correcta */}
			<h2 className="text-xl font-semibold text-primary mb-2">
				Iniciar sesión
			</h2>

			{errors.global && (
				<div
					role="alert"
					className="flex items-center gap-2 text-red-600 text-sm"
				>
					<AlertCircle className="w-4 h-4" />
					{errors.global}
				</div>
			)}

			<Input
				id="log-mail"
				type="email"
				placeholder="Mail"
				aria-label="Mail"
				aria-invalid={!!errors.mail}
				value={values.mail}
				onChange={(e) => onChange("mail", e.target.value)}
				className={errors.mail ? "border-red-500" : ""}
			/>
			{errors.mail && (
				<p role="alert" className="text-xs text-red-600">
					{errors.mail}
				</p>
			)}

			<Input
				id="log-password"
				type="password"
				placeholder="Contraseña"
				aria-label="Contraseña"
				aria-invalid={!!errors.password}
				value={values.password}
				onChange={(e) => onChange("password", e.target.value)}
				className={errors.password ? "border-red-500" : ""}
			/>
			{errors.password && (
				<p role="alert" className="text-xs text-red-600">
					{errors.password}
				</p>
			)}

			<Button
				aria-label="Entrar"
				onClick={onSubmit}
				className="w-full bg-primary text-white hover:bg-primary/90
                   focus-visible:ring-2 focus-visible:ring-offset-2
                   focus-visible:ring-black"
			>
				Entrar
			</Button>
		</section>
	)
}
