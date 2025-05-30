"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Search, Info, Clock, Radio } from "lucide-react"
import Image from "next/image"
import { useAudioPlayer } from "@/lib/use-audio-player"
import { useToast } from "@/hooks/use-toast"
import { LikeButton } from "@/components/like-button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Tipi di programmi disponibili
type ProgramType = "programma" | "rubrica"

// Categorie di programmi disponibili
const CATEGORIES = ["Intrattenimento", "Musica", "Cultura", "Scienza", "Sport", "Tecnologia", "Arte"]

// Dati dei programmi
const PROGRAMS = [
  {
    id: "1",
    title: "Chiacchiere Gratis",
    description:
      "Intrattenimento, potete sbizzarrirvi con qualsiasi notizia generale. Magari divertente o super mega shock, che faccia informazione o cose del genere.",
    image: "/placeholder.svg?height=400&width=400",
    category: "Intrattenimento",
    type: "programma" as ProgramType,
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
    type: "programma" as ProgramType,
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
    type: "programma" as ProgramType,
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
    type: "programma" as ProgramType,
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
    type: "programma" as ProgramType,
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
    type: "programma" as ProgramType,
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
    type: "rubrica" as ProgramType,
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
    type: "rubrica" as ProgramType,
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
    type: "rubrica" as ProgramType,
    hosts: ["Lorenzo", "Sofia"],
    duration: 15,
    schedule: "Giovedì, 14:30",
    details: "3 talk - 2 intermezzi musicali",
  },
]

export default function ProgrammiPage() {
  const { playTrack } = useAudioPlayer()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("az")

  // Filtra i programmi in base ai criteri di ricerca
  const filteredPrograms = PROGRAMS.filter((program) => {
    // Filtra per termine di ricerca
    const matchesSearch =
      program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.hosts.some((host) => host.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filtra per categoria
    const matchesCategory = categoryFilter === "all" || program.category === categoryFilter

    // Filtra per tipo (programma/rubrica)
    const matchesType = typeFilter === "all" || program.type === typeFilter

    return matchesSearch && matchesCategory && matchesType
  })

  // Ordina i programmi
  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    if (sortOrder === "az") {
      return a.title.localeCompare(b.title)
    } else if (sortOrder === "za") {
      return b.title.localeCompare(a.title)
    } else if (sortOrder === "duration-asc") {
      return a.duration - b.duration
    } else if (sortOrder === "duration-desc") {
      return b.duration - a.duration
    }
    return 0
  })

  // Funzione per riprodurre un programma
  const handlePlayProgram = (program: (typeof PROGRAMS)[0]) => {
    toast({
      title: `Riproduzione di ${program.title}`,
      description: `Condotto da ${program.hosts.join(", ")}`,
    })

    // Qui si potrebbe implementare la riproduzione effettiva
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 relative bg-white/10 rounded-full p-2">
              <Image
                src="/images/logo-radio-carducci-new.png"
                alt="Radio Carducci Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                <span className="gradient-text">Programmi</span> Radio Carducci
              </h1>
              <p className="text-gray-300 text-lg">Scopri tutti i nostri programmi e rubriche</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cerca programmi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-gray-800/80 border-gray-600 text-white placeholder:text-gray-400 focus:border-red-500"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-800/80 border-gray-600 text-white">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">Tutte le categorie</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-800/80 border-gray-600 text-white">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">Tutti i tipi</SelectItem>
                <SelectItem value="programma">Programmi</SelectItem>
                <SelectItem value="rubrica">Rubriche</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-800/80 border-gray-600 text-white">
                <SelectValue placeholder="Ordina per" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="az">A-Z</SelectItem>
                <SelectItem value="za">Z-A</SelectItem>
                <SelectItem value="duration-asc">Durata (crescente)</SelectItem>
                <SelectItem value="duration-desc">Durata (decrescente)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-8 p-6 bg-gray-800/60 border border-gray-600/50 rounded-xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-white">Legenda:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Badge className="bg-red-600/30 text-red-300 border-red-500/50 px-3 py-1">Programma</Badge>
              <span className="text-gray-200 font-medium">
                30 minuti - 5 talk - 4 intermezzi musicali tra un talk e l'altro
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="bg-blue-600/30 text-blue-300 border-blue-500/50 px-3 py-1">Rubrica</Badge>
              <span className="text-gray-200 font-medium">15 minuti - 3 talk - 2 intermezzi musicali</span>
            </div>
          </div>
        </div>

        {sortedPrograms.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/60 border border-gray-600/50 rounded-xl backdrop-blur-sm">
            <Info className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <h3 className="text-2xl font-medium mb-3 text-white">Nessun programma trovato</h3>
            <p className="text-gray-300 text-lg mb-6">Prova a modificare i filtri di ricerca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedPrograms.map((program) => (
              <TooltipProvider key={program.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="bg-gray-800/70 border-gray-600/50 overflow-hidden card-hover-effect h-full flex flex-col backdrop-blur-sm">
                      <div className="relative aspect-square">
                        <Image
                          src={program.image || "/placeholder.svg"}
                          alt={program.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                          <Button
                            variant="default"
                            size="icon"
                            className="rounded-full bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handlePlayProgram(program)}
                          >
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        <div className="absolute top-3 right-3">
                          <Badge
                            className={
                              program.type === "programma"
                                ? "bg-red-600/30 text-red-300 border-red-500/50"
                                : "bg-blue-600/30 text-blue-300 border-blue-500/50"
                            }
                          >
                            {program.type === "programma" ? "Programma" : "Rubrica"}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5 flex-grow">
                        <div className="flex items-center text-sm mb-3">
                          <Badge variant="secondary" className="mr-3 bg-gray-700/50 text-gray-200 border-gray-600">
                            {program.category}
                          </Badge>
                          <div className="flex items-center text-gray-300">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="font-medium">{program.duration} min</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-xl mb-3 text-white">{program.title}</h3>
                        <p className="text-gray-200 text-sm line-clamp-3 leading-relaxed">{program.description}</p>
                      </CardContent>
                      <CardFooter className="p-5 pt-0 flex justify-between text-sm text-gray-300 mt-auto">
                        <div className="flex items-center">
                          <Radio className="h-4 w-4 mr-2" />
                          <span className="font-medium">{program.schedule}</span>
                        </div>
                        <LikeButton targetId={`program-${program.id}`} />
                      </CardFooter>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-gray-800 border-gray-600 p-4 max-w-xs">
                    <div className="space-y-3">
                      <div className="font-bold text-white text-lg">{program.title}</div>
                      <div className="text-sm">
                        <span className="text-red-400 font-medium">Durata:</span>{" "}
                        <span className="text-gray-200">{program.duration} minuti</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-red-400 font-medium">Formato:</span>{" "}
                        <span className="text-gray-200">{program.details}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-red-400 font-medium">Conduttori:</span>{" "}
                        <span className="text-gray-200">{program.hosts.join(", ")}</span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
