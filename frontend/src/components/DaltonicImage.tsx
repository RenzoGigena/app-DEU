"use client"

import Image, { ImageProps } from "next/image"
import { useAccessibilityStore } from "@/store/accesibilityStore"

export default function DaltonicImage(props: ImageProps) {
  const { daltonicMode } = useAccessibilityStore()
  return (
    <Image
      {...props}
      className={`${props.className ?? ""} ${daltonicMode ? "daltonic-filter" : ""}`}
    />
  )
}
