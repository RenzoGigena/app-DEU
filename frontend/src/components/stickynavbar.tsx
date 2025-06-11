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
		<header className="sticky top-0 z-50 w-full border-b bg-slate-100 py-6 shadow-sm">
			<div className="container mx-auto flex items-center justify-between px-3">
				{/* Logo */}
				<Link href="/" className="text-2xl font-semibold">
					Balnearios Río de la Plata
				</Link>

				{/* Navegación y menú */}
				<div className="flex items-center gap-3">
					{/* Navegación en desktop */}
					<NavigationMenu className="hidden lg:flex">
						<NavigationMenuList className="gap-6">
							{[
								{ href: "/", label: "Bienvenida" },
								{ href: "/balnearios", label: "Balnearios" },
								{ href: "/unirse", label: "Unirse" },
							].map(({ href, label }) => (
								<NavigationMenuItem key={href}>
									<NavigationMenuLink asChild>
										<Link
											href={href}
											className="text-sm font-medium hover:underline"
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
							<Button variant="ghost" size="icon" className="lg:hidden">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="px-6">
							<nav className="flex flex-col gap-4 mt-8">
								{[
									{ href: "/", label: "Bienvenida" },
									{ href: "/balnearios", label: "Balnearios" },
									{ href: "/unirse", label: "Unirse" },
								].map(({ href, label }) => (
									<Link
										key={href}
										href={href}
										className="text-sm font-medium hover:underline"
									>
										{label}
									</Link>
								))}
								<Button variant="default" className="mt-4 w-full">
									Contacto
								</Button>
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}
