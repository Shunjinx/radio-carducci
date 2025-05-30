"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

interface Track {
  id: string
  title: string
  artist: string
  url: string
  cover?: string
}

export function useAudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const { toast } = useToast()

  const playTrack = useCallback(
    (track: Track) => {
      setCurrentTrack(track)
      setIsPlaying(true)

      // In una implementazione reale, qui si avvierebbe la riproduzione audio
      toast({
        title: "Riproduzione avviata",
        description: `${track.title} - ${track.artist}`,
      })
    },
    [toast],
  )

  const pauseTrack = useCallback(() => {
    setIsPlaying(false)

    // In una implementazione reale, qui si metterebbe in pausa la riproduzione
    if (currentTrack) {
      toast({
        title: "Riproduzione in pausa",
        description: `${currentTrack.title} - ${currentTrack.artist}`,
      })
    }
  }, [currentTrack, toast])

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseTrack()
    } else if (currentTrack) {
      setIsPlaying(true)

      // In una implementazione reale, qui si riprenderebbe la riproduzione
      toast({
        title: "Riproduzione ripresa",
        description: `${currentTrack.title} - ${currentTrack.artist}`,
      })
    }
  }, [isPlaying, currentTrack, pauseTrack, toast])

  const joinLiveStream = useCallback(() => {
    const liveStream = {
      id: "live",
      title: "Radio Carducci Live",
      artist: "Radio Carducci",
      url: "/api/live-stream", // URL fittizio per la diretta
    }

    setCurrentTrack(liveStream)
    setIsPlaying(true)

    toast({
      title: "Connessione alla diretta",
      description: "Stai ascoltando Radio Carducci Live",
    })
  }, [toast])

  return {
    currentTrack,
    isPlaying,
    playTrack,
    pauseTrack,
    togglePlayPause,
    joinLiveStream,
  }
}
