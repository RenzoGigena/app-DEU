"use client"

import { CreateSolicitudDto } from "@/types/solicitudes-dto"
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
		setFormData({ ...formData, [e.target.name]: e.target.value })
		if (errors[e.target.name]) {
			setErrors((prev) => ({ ...prev, [e.target.name]: "" }))
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
			newErrors.nombreBalneario = "Requerido"
		if (!formData.localidad.trim()) newErrors.localidad = "Requerido"
		if (!formData.descripcion.trim()) newErrors.descripcion = "Requerido"
		if (!formData.telefono.trim()) newErrors.telefono = "Requerido"
		if (!formData.contribuidor.trim()) newErrors.contribuidor = "Requerido"
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
		>
			<div
				className="mt-20 w-full max-w-3xl px-4"
				onClick={(e) => e.stopPropagation()} // evita que se cierre al hacer click adentro
			>
				<form
					onSubmit={handleSubmit}
					className="bg-white border border-gray-300 p-6 rounded-lg space-y-4 shadow-xl"
				>
					<h2 className="text-xl font-semibold text-center text-gray-800">
						Crear Solicitud
					</h2>

					{[
						{ name: "nombreBalneario", placeholder: "Nombre del balneario" },
						{ name: "localidad", placeholder: "Localidad" },
						{ name: "telefono", placeholder: "Teléfono de contacto" },
						{ name: "url", placeholder: "URL del sitio o perfil (opcional)" },
						{ name: "contribuidor", placeholder: "Tu nombre o alias" },
					].map(({ name, placeholder }) => (
						<div key={name}>
							<input
								type={name === "url" ? "url" : "text"}
								name={name}
								placeholder={placeholder}
								value={(formData as any)[name]}
								onChange={handleChange}
								className={`w-full border px-4 py-2 rounded ${
									errors[name] ? "border-red-500" : "border-gray-300"
								}`}
							/>
							{errors[name] && (
								<p className="text-red-600 text-sm mt-1">{errors[name]}</p>
							)}
						</div>
					))}

					<div>
						<textarea
							name="descripcion"
							placeholder="Descripción"
							value={formData.descripcion}
							onChange={handleChange}
							className={`w-full border px-4 py-2 rounded ${
								errors.descripcion ? "border-red-500" : "border-gray-300"
							}`}
							required
						/>
						{errors.descripcion && (
							<p className="text-red-600 text-sm mt-1">{errors.descripcion}</p>
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
