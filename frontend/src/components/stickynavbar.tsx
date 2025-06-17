"use client"

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import React, { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useAuth } from "@/helpers/AuthProvider"

export default function StickyNavbar() {
	const { user } = useAuth()

	/* estado controlado del Sheet  */
	const [open, setOpen] = useState(false)

	/* helper para cerrar el menú al hacer clic en cualquier enlace  */
	const handleClose = () => setOpen(false)

	const navItems = [
		{ href: "/", label: "Bienvenida" },
		{ href: "/balnearios", label: "Balnearios" },
		{ href: "/unirse", label: "Unirse" },
		{ href: "/configuracion", label: "Configuración" },
	]

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-[var(--primary)] text-[var(--primary-foreground)] backdrop-blur-md py-1 shadow-sm">
			<div className="container mx-auto flex items-center justify-between px-4">
				<div className="flex items-center gap-2">
					<Image
						src="/favicon-96x96.png"
						alt="Logo Balnearios Río de la Plata"
						width={64}
						height={64}
						className="hidden lg:block"
					/>
					<Link
						href="/"
						aria-label="Inicio"
						className="text-2xl font-bold tracking-tight"
					>
						Balnearios Río de la Plata
					</Link>
				</div>
				{/* Logo */}

				{/* Navegación desktop */}
				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList className="gap-6">
						{user?.role === "admin" && (
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link
										href="/solicitudes"
										className="text-base font-medium transition-all duration-200 border-b-2 border-2 border-transparent hover:border-[var(--accent)] hover:text-[var(--accent)]"
									>
										Solicitudes
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						)}

						{navItems.map(({ href, label }) => (
							<NavigationMenuItem key={href}>
								<NavigationMenuLink asChild>
									<Link
										href={href}
										className="text-base font-medium transition-all duration-200 border-b-2 border-2 border-transparent hover:border-[var(--accent)] hover:text-[var(--accent)]"
									>
										{label}
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				{/* Menú mobile */}
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<Button
							variant="ghost"
							size="icon"
							aria-label="Abrir menú de navegación"
							className="lg:hidden text-[var(--accent)] hover:text-[var(--accent)]"
						>
							<Menu className="h-6 w-6" />
						</Button>
					</SheetTrigger>

					<SheetContent side="right" className="px-6 pt-8">
						<nav className="flex flex-col gap-6" aria-label="Navegación">
							{user?.role === "admin" && (
								<Link
									href="/solicitudes"
									onClick={handleClose}
									className="text-base font-medium mb-4 transition-all duration-200 border-b-2 border-2 border-transparent hover:border-[var(--accent)] hover:text-[var(--accent)] "
								>
									Solicitudes
								</Link>
							)}
							{navItems.map(({ href, label }) => (
								<Link
									key={href}
									href={href}
									onClick={handleClose}
									className="text-base font-medium transition-all duration-200 border-b-2 border-2 border-transparent hover:border-[var(--accent)] hover:text-[var(--accent)]"
								>
									{label}
								</Link>
							))}
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	)
}
