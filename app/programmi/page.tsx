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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 relative">
            <Image src="/images/logo-radio-carducci-2.png" alt="Radio Carducci Logo" fill className="object-contain" />
          </div>
          <h1 className="text-3xl font-bold">
            <span className="gradient-text">Programmi</span> Radio Carducci
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cerca programmi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-gray-800 border-gray-700"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">Tutte le categorie</SelectItem>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="all">Tutti i tipi</SelectItem>
              <SelectItem value="programma">Programmi</SelectItem>
              <SelectItem value="rubrica">Rubriche</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700">
              <SelectValue placeholder="Ordina per" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="az">A-Z</SelectItem>
              <SelectItem value="za">Z-A</SelectItem>
              <SelectItem value="duration-asc">Durata (crescente)</SelectItem>
              <SelectItem value="duration-desc">Durata (decrescente)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-8 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Legenda:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="bg-primary-600/20 text-primary-600 border-primary-600">
              Programma
            </Badge>
            <span className="text-sm text-gray-300">
              30 minuti - 5 talk - 4 intermezzi musicali tra un talk e l'altro
            </span>
          </div>
          <div className="flex items-start gap-2">
            <Badge variant="outline" className="bg-blue-600/20 text-blue-400 border-blue-600">
              Rubrica
            </Badge>
            <span className="text-sm text-gray-300">15 minuti - 3 talk - 2 intermezzi musicali</span>
          </div>
        </div>
      </div>

      {sortedPrograms.length === 0 ? (
        <div className="text-center py-12 bg-gray-900/50 border border-gray-800 rounded-lg">
          <Info className="h-12 w-12 mx-auto text-gray-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">Nessun programma trovato</h3>
          <p className="text-gray-400 mb-6">Prova a modificare i filtri di ricerca.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedPrograms.map((program) => (
            <TooltipProvider key={program.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="bg-gray-900/50 border-gray-800 overflow-hidden card-hover-effect h-full flex flex-col">
                    <div className="relative aspect-square">
                      <Image
                        src={program.image || "/placeholder.svg"}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                        <Button
                          variant="default"
                          size="icon"
                          className="rounded-full"
                          onClick={() => handlePlayProgram(program)}
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="outline"
                          className={
                            program.type === "programma"
                              ? "bg-primary-600/20 text-primary-600 border-primary-600"
                              : "bg-blue-600/20 text-blue-400 border-blue-600"
                          }
                        >
                          {program.type === "programma" ? "Programma" : "Rubrica"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-grow">
                      <div className="flex items-center text-xs mb-2">
                        <Badge variant="secondary" className="mr-2">
                          {program.category}
                        </Badge>
                        <div className="flex items-center text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{program.duration} min</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{program.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-3">{program.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between text-xs text-gray-500 mt-auto">
                      <div className="flex items-center">
                        <Radio className="h-3 w-3 mr-1" />
                        <span>{program.schedule}</span>
                      </div>
                      <LikeButton targetId={`program-${program.id}`} />
                    </CardFooter>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-800 border-gray-700 p-3 max-w-xs">
                  <div className="space-y-2">
                    <div className="font-bold">{program.title}</div>
                    <div className="text-sm">
                      <span className="text-primary-400">Durata:</span> {program.duration} minuti
                    </div>
                    <div className="text-sm">
                      <span className="text-primary-400">Formato:</span> {program.details}
                    </div>
                    <div className="text-sm">
                      <span className="text-primary-400">Conduttori:</span> {program.hosts.join(", ")}
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      )}
    </div>
  )
}
