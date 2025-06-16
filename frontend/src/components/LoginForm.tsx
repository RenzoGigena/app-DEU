"use client"

import { AlertCircle } from "lucide-react"
import { BackButton } from "@/components/BackButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { MouseEventHandler } from "react"

interface LoginFormProps {
	showBack?: boolean
	errors: Record<string, string>
	values: { mail: string; password: string }
	onChange: (field: string, value: string) => void
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
}: LoginFormProps) {
	return (
		<section
			role="form"
			aria-label="Formulario de inicio de sesión"
			className="space-y-4 border rounded-lg p-6 shadow w-full max-w-md mx-auto"
		>
			{showBack && <BackButton to="select" onBack={onBack} />}
			<h3 className="text-xl font-semibold text-primary mb-2">
				Iniciar sesión
			</h3>

			{errors.global && (
				<div className="text-red-600 flex items-center gap-2 text-sm">
					<AlertCircle className="w-4 h-4" />
					{errors.global}
				</div>
			)}

			<Input
				placeholder="Mail"
				aria-label="Mail"
				type="email"
				value={values.mail}
				onChange={(e) => onChange("mail", e.target.value)}
				className={errors.mail ? "border-red-500" : ""}
			/>
			{errors.mail && <p className="text-xs text-red-600">{errors.mail}</p>}

			<Input
				placeholder="Contraseña"
				aria-label="Contraseña"
				type="password"
				value={values.password}
				onChange={(e) => onChange("password", e.target.value)}
				className={errors.password ? "border-red-500" : ""}
			/>
			{errors.password && (
				<p className="text-xs text-red-600">{errors.password}</p>
			)}

			<Button className="w-full" onClick={onSubmit} aria-label="Entrar">
				Entrar
			</Button>
		</section>
	)
}
