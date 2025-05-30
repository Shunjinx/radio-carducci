import type { ProgramType } from "./constants"

export interface Program {
  id: string
  title: string
  description: string
  image: string
  category: string
  type: ProgramType
  hosts: string[]
  duration: number
  schedule: string
  details: string
}

// Dati dei programmi
export const PROGRAMS: Program[] = [
  {
    id: "1",
    title: "Chiacchiere Gratis",
    description:
      "Intrattenimento, potete sbizzarrirvi con qualsiasi notizia generale. Magari divertente o super mega shock, che faccia informazione o cose del genere.",
    image: "/placeholder.svg?height=400&width=400",
    category: "Intrattenimento",
    type: "programma",
    hosts: ["Sofia", "Riccardo"],
    duration: 30,
    schedule: "Lunedì, 15:00",
    details: "5 talk - 4 intermezzi musicali tra un talk e l'altro",
  },
  {
    id: "2",
    title: "Emergenza Emergenti",
    description:
      "Interviste ai cantanti emergenti. Solitamente l'intervista si fa nei talk 3 e 4, poiché il primo è di presentazione del programma, il secondo d'introduzione dell'ospite e il quinto di chiusura.",
    image: "/placeholder.svg?height=400&width=400",
    category: "Musica",
    type: "programma",
    hosts: ["Lorenzo", "Milla"],
    duration: 30,
    schedule: "Martedì, 16:00",
    details: "5 talk - 4 intermezzi musicali tra un talk e l'altro",
  },
  {
    id: "3",
    title: "Olympic Arena",
    description:
      "Intervista agli atleti della nostra scuola, di altre, insomma persone prevalentemente giovani che fanno sport ad alti livelli. Anche qui l'intervista sarà nei talk 3 e 4.",
    image: "/placeholder.svg?height=400&width=400",
    category: "Sport",
    type: "programma",
    hosts: ["Simone B.", "Sofia B."],
    duration: 30,
    schedule: "Mercoledì, 15:00",
    details: "5 talk - 4 intermezzi musicali tra un talk e l'altro",
  },
  {
    id: "4",
    title: "Biglietti X2",
    description: "Musei, spettacoli a teatro, mostre, queste cose qui. Una guida agli eventi culturali da non perdere.",
    image: "/placeholder.svg?height=400&width=400",
    category: "Cultura",
    type: "programma",
    hosts: ["Paolo"],
    duration: 30,
    schedule: "Giovedì, 16:00",
    details: "5 talk - 4 intermezzi musicali tra un talk e l'altro",
  },
  {
    id: "5",
    title: "Broken Sound",
    description:
      "Sul metal e le sue diramazioni. Un viaggio nel mondo della musica metal e delle sue diverse sfaccettature.",
    image: "/placeholder.svg?height=400&width=400",
    category: "Musica",
    type: "programma",
    hosts: ["Tommaso"],
    duration: 30,
    schedule: "Venerdì, 15:00",
    details: "5 talk - 4 intermezzi musicali tra un talk e l'altro",
  },
  {
    id: "6",
    title: "Ricette Letterarie",
    description:
      "Troviamo la ricetta di un cibo scritta in un libro della letteratura italiana o estera che sia e la diciamo. Facciamo sempre un'introduzione allo/a scrittrice/ore e poi diciamo la ricetta.",
    image: "/placeholder.svg?height=400&width=400",
    category: "Cultura",
    type: "programma",
    hosts: ["Nicole"],
    duration: 30,
    schedule: "Venerdì, 16:30",
    details: "5 talk - 4 intermezzi musicali tra un talk e l'altro",
  },
  {
    id: "7",
    title: "Almanacco",
    description:
      "Evento del passato accaduto in quel giorno (es: il 21 marzo del 1963 chiudeva Alcatraz, famosa prigione di massima sicurezza).",
    image: "/placeholder.svg?height=400&width=400",
    category: "Cultura",
    type: "rubrica",
    hosts: ["Prof. Bellone"],
    duration: 15,
    schedule: "Lunedì, 14:30",
    details: "3 talk - 2 intermezzi musicali",
  },
  {
    id: "8",
    title: "Radio Scienza Pop",
    description: "Parliamo di scienza in tutte le sue forme: spazio, biologia, AI, tecnologia, chimica, e bla bla bla.",
    image: "/placeholder.svg?height=400&width=400",
    category: "Scienza",
    type: "rubrica",
    hosts: ["Simone"],
    duration: 15,
    schedule: "Mercoledì, 14:30",
    details: "3 talk - 2 intermezzi musicali",
  },
  {
    id: "9",
    title: "Strano ma Funziona",
    description:
      "Facciamo conoscere alla gente oggetti strani che funzionano (posate con i ventilatori per far raffreddare il cibo, cappello che fa crescere i capelli e cosi via).",
    image: "/placeholder.svg?height=400&width=400",
    category: "Tecnologia",
    type: "rubrica",
    hosts: ["Lorenzo", "Sofia"],
    duration: 15,
    schedule: "Giovedì, 14:30",
    details: "3 talk - 2 intermezzi musicali",
  },
]

// Filtra solo le rubriche
export const RUBRICHE = PROGRAMS.filter((program) => program.type === "rubrica")
