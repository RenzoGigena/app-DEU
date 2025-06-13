"use client"

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu } from "lucide-react"
import React from "react"

export default function StickyNavbar() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-[var(--primary)] text-[var(--primary-foreground)] backdrop-blur-md py-1 shadow-sm">
			<div className="container mx-auto flex items-center justify-between px-4">
				{/* Logo */}
				<Link href="/" className="text-2xl font-bold tracking-tight">
					Balnearios Río de la Plata
				</Link>

				{/* Navegación en desktop */}
				<NavigationMenu className="hidden lg:flex">
					<NavigationMenuList className="gap-6">
						{[
							{ href: "/", label: "Bienvenida" },
							{ href: "/balnearios", label: "Balnearios" },
							{ href: "/unirse", label: "Unirse" },
							{ href: "/configuracion", label: "Configuración" },
						].map(({ href, label }) => (
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
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon" className="lg:hidden text-[var(--accent)] hover:text-[var(--accent)]">
							<Menu className="h-6 w-6" />
						</Button>
					</SheetTrigger>
					<SheetContent side="right" className="px-6 pt-8">
						<nav className="flex flex-col gap-6">
							{[
								{ href: "/", label: "Bienvenida" },
								{ href: "/balnearios", label: "Balnearios" },
								{ href: "/unirse", label: "Unirse" },
								{ href: "/configuracion", label: "Configuración" },
							].map(({ href, label }) => (
								<Link
									key={href}
									href={href}
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
