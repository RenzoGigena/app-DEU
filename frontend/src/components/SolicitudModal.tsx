"use client"

import { CreateSolicitudDto } from "@/types/solicitudes"
import { SolicitudService } from "@/service/solicitudService"
import { toast } from "sonner"
import { useState } from "react"

interface SolicitudModalProps {
	onClose: () => void
}

const serviciosDisponibles: string[] = [
	"WiFi",
	"Estacionamiento",
	"Baños",
	"Guardavidas",
	"Parrillas",
	"Zona de acampe",
	"Permite mascotas",
]

export default function SolicitudModal({ onClose }: SolicitudModalProps) {
	const [formData, setFormData] = useState<CreateSolicitudDto>({
		nombreBalneario: "",
		localidad: "",
		descripcion: "",
		telefono: "",
		url: "",
		contribuidor: "",
		latitud: 0,
		longitud: 0,
		contaminacionAgua: 0,
		contaminacionArena: 0,
		imagen: "",
		imagenAlt: "",
		servicios: serviciosDisponibles.map((nombreServicio) => ({
			nombreServicio,
			tiene: false,
		})),
	})

	const [errors, setErrors] = useState<Record<string, string>>({})
	const [loading, setLoading] = useState(false)

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target

		setFormData((prev) => ({
			...prev,
			[name]:
				name === "latitud" ||
				name === "longitud" ||
				name.includes("contaminacion")
					? parseFloat(value)
					: value,
		}))

		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }))
		}
	}

	const handleServicioToggle = (index: number) => {
		const nuevos = [...formData.servicios]
		nuevos[index].tiene = !nuevos[index].tiene
		setFormData({ ...formData, servicios: nuevos })
	}

	const validate = () => {
		const newErrors: Record<string, string> = {}

		if (!formData.nombreBalneario.trim())
			newErrors.nombreBalneario = "El nombre del balneario es requerido."

		if (!formData.localidad.trim())
			newErrors.localidad = "La localidad es requerida."

		if (!formData.descripcion.trim())
			newErrors.descripcion = "La descripción es requerida."

		if (!formData.telefono.trim())
			newErrors.telefono = "El teléfono es requerido."
		else if (!/^\+?\d{7,15}$/.test(formData.telefono.trim()))
			newErrors.telefono = "El teléfono debe ser válido (ej: +5491144456677)."

		if (formData.url && !/^https?:\/\/.+\..+$/.test(formData.url.trim()))
			newErrors.url = "La URL debe tener formato válido (https://...)."

		if (!formData.contribuidor.trim())
			newErrors.contribuidor = "Debes indicar tu nombre o alias."

		if (!formData.imagen.trim())
			newErrors.imagen = "La URL de imagen es requerida."

		if (!formData.imagenAlt.trim())
			newErrors.imagenAlt = "El texto alternativo de imagen es requerido."

		if (isNaN(formData.latitud) || isNaN(formData.longitud))
			newErrors.latlong = "Latitud y longitud deben ser válidos."

		if (isNaN(formData.contaminacionAgua) || isNaN(formData.contaminacionArena))
			newErrors.contaminacion = "Valores de contaminación inválidos."

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!validate()) return

		setLoading(true)
		try {
			await SolicitudService.create(formData)
			toast.success("Solicitud enviada correctamente")
			onClose()
		} catch (err) {
			console.error("Error al enviar solicitud:", err)
			toast.error("Hubo un error al enviar la solicitud.")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div
			className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 overflow-y-auto"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<div
				className="mt-20 w-full max-w-3xl px-4"
				onClick={(e) => e.stopPropagation()}
			>
				<form
					onSubmit={handleSubmit}
					className="bg-white border border-gray-300 p-6 rounded-lg space-y-4 shadow-xl"
					noValidate
				>
					<h2
						id="modal-title"
						className="text-xl font-semibold text-center text-gray-800"
					>
						Crear Solicitud
					</h2>

					{[
						{
							name: "nombreBalneario",
							label: "Nombre del balneario",
							type: "text",
						},
						{ name: "localidad", label: "Localidad", type: "text" },
						{ name: "telefono", label: "Teléfono", type: "tel" },
						{ name: "url", label: "Sitio web", type: "url" },
						{ name: "contribuidor", label: "Tu nombre o alias", type: "text" },
						{ name: "imagen", label: "URL de imagen", type: "url" },
						{
							name: "imagenAlt",
							label: "Texto alternativo para imagen",
							type: "text",
						},
						{ name: "latitud", label: "Latitud", type: "number" },
						{ name: "longitud", label: "Longitud", type: "number" },
						{
							name: "contaminacionAgua",
							label: "Contaminación del agua",
							type: "number",
						},
						{
							name: "contaminacionArena",
							label: "Contaminación de la arena",
							type: "number",
						},
					].map(({ name, label, type }) => (
						<div key={name}>
							<label
								htmlFor={name}
								className="block font-medium text-sm text-gray-700"
							>
								{label}
							</label>
							<input
								id={name}
								name={name}
								type={type}
								value={(formData as any)[name]}
								onChange={handleChange}
								className={`w-full border px-4 py-2 rounded ${
									errors[name] ? "border-red-500" : "border-gray-300"
								}`}
								aria-invalid={!!errors[name]}
								aria-describedby={errors[name] ? `${name}-error` : undefined}
							/>
							{errors[name] && (
								<p
									id={`${name}-error`}
									role="alert"
									className="text-red-600 text-sm mt-1"
								>
									{errors[name]}
								</p>
							)}
						</div>
					))}

					<div>
						<label
							htmlFor="descripcion"
							className="block font-medium text-sm text-gray-700"
						>
							Descripción
						</label>
						<textarea
							id="descripcion"
							name="descripcion"
							value={formData.descripcion}
							onChange={handleChange}
							className={`w-full border px-4 py-2 rounded ${
								errors.descripcion ? "border-red-500" : "border-gray-300"
							}`}
						/>
						{errors.descripcion && (
							<p
								id="descripcion-error"
								role="alert"
								className="text-red-600 text-sm mt-1"
							>
								{errors.descripcion}
							</p>
						)}
					</div>

					<div>
						<h3 className="font-semibold text-gray-700 mb-2">
							Servicios disponibles:
						</h3>
						<div className="grid grid-cols-2 gap-2">
							{formData.servicios.map((servicio, index) => (
								<label
									key={servicio.nombreServicio}
									className="flex items-center gap-2 text-sm text-gray-700"
								>
									<input
										type="checkbox"
										checked={servicio.tiene}
										onChange={() => handleServicioToggle(index)}
										aria-label={`Servicio disponible: ${servicio.nombreServicio}`}
									/>
									{servicio.nombreServicio}
								</label>
							))}
						</div>
					</div>

					<div className="flex justify-end gap-2 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 border border-gray-400 rounded text-gray-700 hover:bg-gray-100"
							disabled={loading}
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={loading}
							className={`px-4 py-2 rounded text-white ${
								loading
									? "bg-indigo-400 cursor-not-allowed"
									: "bg-indigo-600 hover:bg-indigo-700"
							}`}
						>
							{loading ? "Enviando..." : "Enviar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
