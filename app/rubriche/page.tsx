"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Info } from "lucide-react"
import Image from "next/image"
import { ProgramCard } from "@/components/program-card"
import { Badge } from "@/components/ui/badge"
import { RUBRICHE } from "@/lib/data"

export default function RubrichePage() {
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

  // Filtra solo le categorie disponibili per le rubriche
  const availableCategories = [...new Set(RUBRICHE.map((rubrica) => rubrica.category))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 relative bg-white/10 rounded-full p-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20radio%20colori%202-da4AUxgQcWnmORZIYNkdWrSieWHsk9.png"
                alt="Radio Carducci Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                <span className="gradient-text">Rubriche</span> Radio Carducci
              </h1>
              <p className="text-gray-300 text-lg">Contenuti brevi e interessanti di 15 minuti</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cerca rubriche..."
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
                {availableCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-800/80 border-gray-600 text-white">
                <SelectValue placeholder="Ordina per" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="az">A-Z</SelectItem>
                <SelectItem value="za">Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-8 p-6 bg-gray-800/60 border border-gray-600/50 rounded-xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold mb-4 text-white">Formato Rubriche:</h2>
          <div className="flex items-start gap-3">
            <Badge className="bg-blue-600/30 text-blue-300 border-blue-500/50 px-3 py-1">15 minuti</Badge>
            <span className="text-gray-200 font-medium">3 talk - 2 intermezzi musicali</span>
          </div>
        </div>

        {sortedRubriche.length === 0 ? (
          <div className="text-center py-16 bg-gray-800/60 border border-gray-600/50 rounded-xl backdrop-blur-sm">
            <Info className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <h3 className="text-2xl font-medium mb-3 text-white">Nessuna rubrica trovata</h3>
            <p className="text-gray-300 text-lg mb-6">Prova a modificare i filtri di ricerca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedRubriche.map((rubrica) => (
              <ProgramCard key={rubrica.id} program={rubrica} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
