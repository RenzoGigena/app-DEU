import { VariantProps, cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const typographyVariants = cva("", {
	variants: {
		variant: {
			h1: "text-4xl font-bold",
			h2: "text-2xl font-semibold",
			p: "text-base",
		},
	},
	defaultVariants: { variant: "p" },
})

interface TypographyProps
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof typographyVariants> {
	as?: "h1" | "h2" | "p"
}

const Typography = ({
	as: Tag = "p",
	variant,
	className,
	...props
}: TypographyProps) => {
	return (
		<Tag
			className={cn(typographyVariants({ variant }), className)}
			{...props}
		/>
	)
}

export default Typography
