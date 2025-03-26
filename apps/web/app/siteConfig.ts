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
  }
}

export type siteConfig = typeof siteConfig