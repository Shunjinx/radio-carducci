export const APP_NAME = "Radio Carducci"

export const SITE_CONFIG = {
  name: APP_NAME,
  description: "La radio del Liceo Carducci, gestita dagli studenti per gli studenti.",
  url: "https://radiocarducci.it",
  ogImage: "/images/og-image.jpg",
  links: {
    instagram: "https://www.instagram.com/radiocarducci/",
    tiktok: "https://www.tiktok.com/@radiocarducci",
    school: "https://www.iisviaasmara28.edu.it",
    voicebook: "https://www.voicebookradio.com",
  },
}

export const CREDENTIALS = {
  username: "simone.palmeri",
  password: "Gabby15bit@",
}

// Tipi di programmi disponibili
export type ProgramType = "programma" | "rubrica"

// Categorie di programmi disponibili
export const CATEGORIES = ["Intrattenimento", "Musica", "Cultura", "Scienza", "Sport", "Tecnologia", "Arte"]

// Navigation links
export const NAV_LINKS = [
  {
    name: "Radio",
    href: "/radio",
    icon: "radio",
  },
  {
    name: "Programmi",
    href: "/programmi",
    icon: "mic",
  },
  {
    name: "Rubriche",
    href: "/rubriche",
    icon: "book-open",
  },
  {
    name: "Eventi",
    href: "/events",
    icon: "calendar",
  },
  {
    name: "Palinsesto",
    href: "/schedule",
    icon: "clock",
  },
]
