"use client"

import { BackButton } from "@/components/BackButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { MouseEventHandler } from "react"

interface RegisterFormProps {
	showBack?: boolean
	errors: Record<string, string>
	values: {
		nombre: string
		apellido: string
		mail: string
		password: string
		confirm: string
	}
	onChange: (field: string, value: string) => void
	onSubmit: MouseEventHandler<HTMLButtonElement>
	onBack: () => void
}

export function RegisterForm({
	showBack = false,
	errors,
	values,
	onChange,
	onSubmit,
	onBack,
}: RegisterFormProps) {
	return (
		<section
			role="form"
			aria-label="Formulario de registro"
			className="space-y-4 border rounded-lg p-6 shadow w-full max-w-md mx-auto"
		>
			{showBack && <BackButton to="select" onBack={onBack} />}
			<h3 className="text-xl font-semibold text-primary mb-2">Registrate</h3>

			<Input
				placeholder="Nombre"
				aria-label="Nombre"
				value={values.nombre}
				onChange={(e) => onChange("nombre", e.target.value)}
				className={errors.nombre ? "border-red-500" : ""}
			/>
			{errors.nombre && <p className="text-xs text-red-600">{errors.nombre}</p>}

			<Input
				placeholder="Apellido"
				aria-label="Apellido"
				value={values.apellido}
				onChange={(e) => onChange("apellido", e.target.value)}
				className={errors.apellido ? "border-red-500" : ""}
			/>
			{errors.apellido && (
				<p className="text-xs text-red-600">{errors.apellido}</p>
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

			<Input
				placeholder="Confirmar contraseña"
				aria-label="Confirmar contraseña"
				type="password"
				value={values.confirm}
				onChange={(e) => onChange("confirm", e.target.value)}
				className={errors.confirm ? "border-red-500" : ""}
			/>
			{errors.confirm && (
				<p className="text-xs text-red-600">{errors.confirm}</p>
			)}

			<Button
				className="w-full"
				onClick={onSubmit}
				aria-label="Enviar registro"
			>
				Registrar
			</Button>
		</section>
	)
}
