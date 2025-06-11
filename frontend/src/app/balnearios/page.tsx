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

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function BalneariosPage() {
	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
			{/* Tarjeta 1 */}
			<Card className="max-w-sm">
				<CardHeader>
					<CardTitle>Balneario La Costa</CardTitle>
					<CardDescription>Mar del Plata</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Playas amplias, actividades y más.</p>
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
									Servicios completos y ubicación ideal.
								</DialogDescription>
							</DialogHeader>
							<Image
								src="/balneario-la-costa.jpg"
								alt="Foto"
								width={300}
								height={200}
								className="rounded-md"
							/>
						</DialogContent>
					</Dialog>
				</CardContent>
			</Card>

			{/* Tarjeta 2 */}
			<Card className="max-w-sm">
				<CardHeader>
					<CardTitle>Balneario El Paraíso</CardTitle>
					<CardDescription>Villa Gesell</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Ideal para descansar y disfrutar en familia.</p>
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
									Servicios premium y carpas.
								</DialogDescription>
							</DialogHeader>
							<Image
								src="/balneario-el-paraiso.jpg"
								alt="Foto"
								width={300}
								height={200}
								className="rounded-md"
							/>
						</DialogContent>
					</Dialog>
				</CardContent>
			</Card>
		</div>
	)
}
