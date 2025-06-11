declare module 'next-pwa' {
  import { NextConfig } from 'next'

  type WithPwaOptions = {
    dest: string
    disable?: boolean
    register?: boolean
    skipWaiting?: boolean
    // Agrega más opciones si las necesitas
  }

  function withPWA(options: WithPwaOptions): (nextConfig: NextConfig) => NextConfig

  export default withPWA
}
