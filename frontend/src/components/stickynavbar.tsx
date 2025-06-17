"use client"

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import React, { useState } from "react"
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useAuth } from "@/helpers/AuthProvider"
import { usePathname } from "next/navigation"

export default function StickyNavbar() {
	const { user } = useAuth()
	const pathname = usePathname() // ← ruta actual
	const [open, setOpen] = useState(false) // controla Sheet mobile
	const handleClose = () => setOpen(false)

	/** helper para saber si un href está activo */
	const isActive = (href: string) =>
		href === "/" ? pathname === "/" : pathname!.startsWith(href)

	const navItems = [
		{ href: "/", label: "Bienvenida" },
		{ href: "/balnearios", label: "Balnearios" },
		{ href: "/unirse", label: "Unirse" },
		{ href: "/configuracion", label: "Configuración" },
	]

	/** clases compartidas */
	const base = "text-base font-medium transition-colors border-b-2 border-2  "
	const active = "border-[var(--accent)]"
	const inactive =
		"border-transparent hover:border-[var(--accent)] hover:text-[var(--accent)]"

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-[var(--primary)] text-[var(--primary-foreground)] backdrop-blur-md py-1 shadow-sm">
			<div className="container mx-auto flex items-center justify-between px-4">
				{/* Logo + título */}
				<div className="flex items-center gap-2">
					<Image
						src="/favicon-96x96.png"
						alt=""
						width={48}
						height={48}
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

				{/* ---- DESKTOP ---- */}
				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList className="gap-6">
						{user?.role === "admin" && (
							<NavigationMenuItem>
								<NavigationMenuLink asChild>
									<Link
										href="/solicitudes"
										aria-current={isActive("/solicitudes") ? "page" : undefined}
										className={
											base + (isActive("/solicitudes") ? active : inactive)
										}
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
										aria-current={isActive(href) ? "page" : undefined}
										className={base + (isActive(href) ? active : inactive)}
									>
										{label}
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				{/* ---- MOBILE ---- */}
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
						<SheetTitle>Menu de navegación</SheetTitle>
						<nav className="flex flex-col gap-6" aria-label="Navegación móvil">
							{navItems.map(({ href, label }) => (
								<Link
									key={href}
									href={href}
									onClick={handleClose}
									aria-current={isActive(href) ? "page" : undefined}
									className={
										base +
										"py-3 px-2 rounded-lg " +
										(isActive(href) ? active : inactive)
									}
								>
									{label}
								</Link>
							))}

							{user?.role === "admin" && (
								<Link
									href="/solicitudes"
									onClick={handleClose}
									aria-current={isActive("/solicitudes") ? "page" : undefined}
									className={
										base +
										"py-3 px-2 rounded-lg " +
										(isActive("/solicitudes") ? active : inactive)
									}
								>
									Solicitudes
								</Link>
							)}
						</nav>
					</SheetContent>
				</Sheet>
			</div>
		</header>
	)
}
