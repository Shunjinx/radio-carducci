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

// Categorie di rubriche disponibili
const CATEGORIES = ["Cultura", "Scienza", "Tecnologia"]

// Dati delle rubriche
const RUBRICHE = [
  {
    id: "1",
    title: "Almanacco",
    description:
      "Evento del passato accaduto in quel giorno (es: il 21 marzo del 1963 chiudeva Alcatraz, famosa prigione di massima sicurezza).",
    image: "/placeholder.svg?height=400&width=400",
    category: "Cultura",
    hosts: ["Prof. Bellone"],
    duration: 15,
    schedule: "Lunedì, 14:30",
    details: "3 talk - 2 intermezzi musicali",
  },
  {
    id: "2",
    title: "Radio Scienza Pop",
    description: "Parliamo di scienza in tutte le sue forme: spazio, biologia, AI, tecnologia, chimica, e bla bla bla.",
    image: "/placeholder.svg?height=400&width=400",
    category: "Scienza",
    hosts: ["Simone"],
    duration: 15,
    schedule: "Mercoledì, 14:30",
    details: "3 talk - 2 intermezzi musicali",
  },
  {
    id: "3",
    title: "Strano ma Funziona",
    description:
      "Facciamo conoscere alla gente oggetti strani che funzionano (posate con i ventilatori per far raffreddare il cibo, cappello che fa crescere i capelli e cosi via).",
    image: "/placeholder.svg?height=400&width=400",
    category: "Tecnologia",
    hosts: ["Lorenzo", "Sofia"],
    duration: 15,
    schedule: "Giovedì, 14:30",
    details: "3 talk - 2 intermezzi musicali",
  },
]

export default function RubrichePage() {
  const { playTrack } = useAudioPlayer()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("az")

  // Filtra le rubriche in base ai criteri di ricerca
  const filteredRubriche = RUBRICHE.filter((rubrica) => {
    // Filtra per termine di ricerca
    const matchesSearch =
      rubrica.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rubrica.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rubrica.hosts.some((host) => host.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filtra per categoria
    const matchesCategory = categoryFilter === "all" || rubrica.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  // Ordina le rubriche
  const sortedRubriche = [...filteredRubriche].sort((a, b) => {
    if (sortOrder === "az") {
      return a.title.localeCompare(b.title)
    } else if (sortOrder === "za") {
      return b.title.localeCompare(a.title)
    }
    return 0
  })

  // Funzione per riprodurre una rubrica
  const handlePlayRubrica = (rubrica: (typeof RUBRICHE)[0]) => {
    toast({
      title: `Riproduzione di ${rubrica.title}`,
      description: `Condotto da ${rubrica.hosts.join(", ")}`,
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
            <span className="gradient-text">Rubriche</span> Radio Carducci
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cerca rubriche..."
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

          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700">
              <SelectValue placeholder="Ordina per" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="az">A-Z</SelectItem>
              <SelectItem value="za">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-8 p-4 bg-gray-900/50 border border-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Formato Rubriche:</h2>
        <div className="flex items-start gap-2">
          <Badge variant="outline" className="bg-blue-600/20 text-blue-400 border-blue-600">
            15 minuti
          </Badge>
          <span className="text-sm text-gray-300">3 talk - 2 intermezzi musicali</span>
        </div>
      </div>

      {sortedRubriche.length === 0 ? (
        <div className="text-center py-12 bg-gray-900/50 border border-gray-800 rounded-lg">
          <Info className="h-12 w-12 mx-auto text-gray-500 mb-4" />
          <h3 className="text-xl font-medium mb-2">Nessuna rubrica trovata</h3>
          <p className="text-gray-400 mb-6">Prova a modificare i filtri di ricerca.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRubriche.map((rubrica) => (
            <TooltipProvider key={rubrica.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="bg-gray-900/50 border-gray-800 overflow-hidden card-hover-effect h-full flex flex-col">
                    <div className="relative aspect-video">
                      <Image
                        src={rubrica.image || "/placeholder.svg"}
                        alt={rubrica.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                        <Button
                          variant="default"
                          size="icon"
                          className="rounded-full"
                          onClick={() => handlePlayRubrica(rubrica)}
                        >
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="bg-blue-600/20 text-blue-400 border-blue-600">
                          Rubrica
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-grow">
                      <div className="flex items-center text-xs mb-2">
                        <Badge variant="secondary" className="mr-2">
                          {rubrica.category}
                        </Badge>
                        <div className="flex items-center text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{rubrica.duration} min</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{rubrica.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-3">{rubrica.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between text-xs text-gray-500 mt-auto">
                      <div className="flex items-center">
                        <Radio className="h-3 w-3 mr-1" />
                        <span>{rubrica.schedule}</span>
                      </div>
                      <LikeButton targetId={`rubrica-${rubrica.id}`} />
                    </CardFooter>
                  </Card>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-800 border-gray-700 p-3 max-w-xs">
                  <div className="space-y-2">
                    <div className="font-bold">{rubrica.title}</div>
                    <div className="text-sm">
                      <span className="text-blue-400">Durata:</span> {rubrica.duration} minuti
                    </div>
                    <div className="text-sm">
                      <span className="text-blue-400">Formato:</span> {rubrica.details}
                    </div>
                    <div className="text-sm">
                      <span className="text-blue-400">Conduttori:</span> {rubrica.hosts.join(", ")}
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
