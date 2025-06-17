"use client"

import { BackButton } from "@/components/BackButton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { MouseEventHandler } from "react"

type Values = {
	nombre: string
	apellido: string
	mail: string
	password: string
	confirm: string
}
interface Props {
	showBack?: boolean
	errors: Record<string, string>
	values: Values
	onChange: <K extends keyof Values>(field: K, value: string) => void
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
}: Props) {
	return (
		<section
			role="form"
			aria-label="Formulario de registro"
			className="space-y-4 border rounded-lg p-6 shadow w-full max-w-md mx-auto"
		>
			{showBack && <BackButton to="select" onBack={onBack} />}

			{/* h2 para jerarquía correcta */}
			<h2 className="text-xl font-semibold text-primary mb-2">Registrate</h2>

			<Input
				id="reg-nombre"
				placeholder="Nombre"
				aria-label="Nombre"
				aria-invalid={!!errors.nombre}
				value={values.nombre}
				onChange={(e) => onChange("nombre", e.target.value)}
				className={errors.nombre ? "border-red-500" : ""}
			/>
			{errors.nombre && (
				<p role="alert" className="text-xs text-red-600">
					{errors.nombre}
				</p>
			)}

			<Input
				id="reg-apellido"
				placeholder="Apellido"
				aria-label="Apellido"
				aria-invalid={!!errors.apellido}
				value={values.apellido}
				onChange={(e) => onChange("apellido", e.target.value)}
				className={errors.apellido ? "border-red-500" : ""}
			/>
			{errors.apellido && (
				<p role="alert" className="text-xs text-red-600">
					{errors.apellido}
				</p>
			)}

			<Input
				id="reg-mail"
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
				id="reg-password"
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

			<Input
				id="reg-confirm"
				type="password"
				placeholder="Confirmar contraseña"
				aria-label="Confirmar contraseña"
				aria-invalid={!!errors.confirm}
				value={values.confirm}
				onChange={(e) => onChange("confirm", e.target.value)}
				className={errors.confirm ? "border-red-500" : ""}
			/>
			{errors.confirm && (
				<p role="alert" className="text-xs text-red-600">
					{errors.confirm}
				</p>
			)}

			<Button
				aria-label="Enviar registro"
				onClick={onSubmit}
				className="w-full bg-primary text-white hover:bg-primary/90
                   focus-visible:ring-2 focus-visible:ring-offset-2
                   focus-visible:ring-black"
			>
				Registrar
			</Button>
		</section>
	)
}
