"use client" // Importaciones necesarias

import * as z from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import Typography from "@/components/ui/typography"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Esquema de validación para el formulario
const formSchema = z.object({
	email: z.string().email({ message: "Por favor, ingrese un correo válido." }),
})

export default function Home() {
	// Configuración del formulario con react-hook-form y zod
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: "" },
	})

	// Función para manejar el envío del formulario
	function onSubmit(values: z.infer<typeof formSchema>) {
		// Aquí iría la lógica para enviar el correo (ej. a una API)
		console.log("Correo enviado:", values)
	}

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				{/* Título principal */}
				<Typography variant="h1" className="text-center sm:text-left">
					Descubre los Mejores Balnearios
				</Typography>
				<Typography variant="p" className="text-center sm:text-left max-w-lg">
					Nuestra app te ayuda a encontrar los mejores balnearios en Argentina,
					con información detallada sobre ubicaciones, servicios y reseñas de
					usuarios.
				</Typography>

				{/* Alerta de bienvenida */}
				<Alert className="max-w-lg">
					<AlertTitle>¡Bienvenido!</AlertTitle>
					<AlertDescription>
						Explora balnearios y suscríbete para recibir las últimas novedades.
					</AlertDescription>
				</Alert>

				{/* Sección de tarjetas de balnearios */}
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader>
							<CardTitle>Balneario La Costa</CardTitle>
							<CardDescription>Mar del Plata, Buenos Aires</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								Disfruta de playas amplias, actividades acuáticas y restaurantes
								frente al mar.
							</p>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="outline" className="mt-4">
										Ver más
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Balneario La Costa</DialogTitle>
										<DialogDescription>
											Ubicado en Mar del Plata, ofrece estacionamiento, duchas y
											actividades familiares.
										</DialogDescription>
									</DialogHeader>
									<Image
										src="/balneario-la-costa.jpg" // Reemplaza con tu imagen
										alt="Balneario La Costa"
										width={300}
										height={200}
										className="rounded-md"
									/>
								</DialogContent>
							</Dialog>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Balneario El Paraíso</CardTitle>
							<CardDescription>Villa Gesell, Buenos Aires</CardDescription>
						</CardHeader>
						<CardContent>
							<p>
								Ideal para relajarte con vistas panorámicas y servicios de alta
								calidad.
							</p>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="outline" className="mt-4">
										Ver más
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Balneario El Paraíso</DialogTitle>
										<DialogDescription>
											Servicios premium, alquiler de carpas y actividades para
											niños.
										</DialogDescription>
									</DialogHeader>
									<Image
										src="/balneario-el-paraiso.jpg" // Reemplaza con tu imagen
										alt="Balneario El Paraíso"
										width={300}
										height={200}
										className="rounded-md"
									/>
								</DialogContent>
							</Dialog>
						</CardContent>
					</Card>
				</div>

				{/* Formulario de suscripción */}
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="max-w-lg w-full space-y-4"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Suscríbete a nuestras novedades</FormLabel>
									<FormControl>
										<Input placeholder="Ingresa tu correo" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Suscribirse</Button>
					</form>
				</Form>
			</main>

			{/* Footer */}
			<footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://example.com/learn"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/file.svg"
						alt="Ícono de archivo"
						width={16}
						height={16}
					/>
					Aprender más
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://example.com/balnearios"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/window.svg"
						alt="Ícono de ventana"
						width={16}
						height={16}
					/>
					Ver balnearios
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://example.com"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/globe.svg"
						alt="Ícono de globo"
						width={16}
						height={16}
					/>
					Ir a la app →
				</a>
			</footer>
		</div>
	)
}
