"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BackButtonProps {
	to: "select" | "login" | "register"
	onBack: (to: BackButtonProps["to"]) => void
}

export const BackButton = ({ to, onBack }: BackButtonProps) => (
	<Button
		variant="ghost"
		size="icon"
		title="Volver"
		aria-label="Volver a la selección"
		className="mb-4 md:hidden"
		onClick={() => onBack(to)}
	>
		<ArrowLeft />
	</Button>
)
