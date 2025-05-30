"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Clock, Radio } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LikeButton } from "@/components/like-button"
import { useToast } from "@/hooks/use-toast"
import type { Program } from "@/lib/data"

interface ProgramCardProps {
  program: Program
}

export function ProgramCard({ program }: ProgramCardProps) {
  const { toast } = useToast()
  const [isHovering, setIsHovering] = useState(false)

  const handlePlayProgram = () => {
    toast({
      title: `Riproduzione di ${program.title}`,
      description: `Condotto da ${program.hosts.join(", ")}`,
    })
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className="bg-gray-800/70 border-gray-600/50 overflow-hidden card-hover-effect h-full flex flex-col backdrop-blur-sm"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative aspect-square">
              <Image src={program.image || "/placeholder.svg"} alt={program.title} fill className="object-cover" />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/90 to-transparent transition-opacity flex items-end justify-center p-4 ${isHovering ? "opacity-100" : "opacity-0"}`}
              >
                <Button
                  variant="default"
                  size="icon"
                  className="rounded-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={handlePlayProgram}
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
  )
}
