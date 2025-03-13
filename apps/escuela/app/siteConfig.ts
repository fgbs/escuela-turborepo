import { Library, Video, Home } from "lucide-react"

export const siteConfig = {
  name: "Escuela TVP",
  url: "https://www.escuelatvp.cl",
  description: "Escuela Chilena de Terapia de Vidas Pasadas",
  baseLinks: {
    home: "/",
    overview: "/courses",
    settings: "/settings",
  },
  storage: {
    avatar: 'https://dabrdpdopssigtsyzrbx.supabase.co/storage/v1/object/public/avatars',
    media: 'https://dabrdpdopssigtsyzrbx.supabase.co/storage/v1/object/public/media',
    record: 'https://fgbs.nyc3.cdn.digitaloceanspaces.com/directus-tvp/recordings',
  },
  navigation: [
    { name: 'Inicio', href: '/', icon: Home, current: true },
    { name: 'Bibliografía', href: '/library', icon: Library, current: false },
    { name: 'Grabaciones', href: '/recording', icon: Video, current: false },
  ],
  userNavigation: [
    { name: 'Perfil', href: '#', current: true },
    { name: 'Configuración', href: '#', current: true },
    { name: 'Notificaciones', href: '#', current: true },
    { name: 'Salir', href: '#', current: true },
  ]
}

export type siteConfig = typeof siteConfig