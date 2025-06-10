import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Dashboard() {
	return (
		<>
			<div className="flex flex-col items-center justify-center h-full gap-4">
				<h1 className="text-4xl font-bold">Welcome to the Dashboard</h1>
				<p className="text-lg">
					This is a placeholder for your dashboard content.
				</p>
				<Link href="/settings">
					<Button className="mt-4">Go to Settings</Button>
				</Link>
			</div>
		</>
	)
}
