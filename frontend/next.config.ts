// next.config.js
const withPWA = require("next-pwa")({
	dest: "public", // Carpeta donde se generarán los archivos del Service Worker
	disable: process.env.NODE_ENV === "development", // Desactiva PWA en desarrollo para evitar conflictos
	register: true, // Registra automáticamente el Service Worker
	skipWaiting: true, // Fuerza la activación inmediata del nuevo Service Worker
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true, // Mantiene la configuración predeterminada
}

module.exports = withPWA(nextConfig)
