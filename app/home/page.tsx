"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, BookOpen, ArrowRight, Mic } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAudioPlayer } from "@/lib/use-audio-player"

export default function HomePage() {
  const { joinLiveStream } = useAudioPlayer()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="relative h-[70vh] min-h-[500px]">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Radio Carducci"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 absolute inset-0 z-20 flex items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 relative">
                <Image
                  src="/images/logo-radio-carducci-2.png"
                  alt="Radio Carducci Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Radio Carducci</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              La voce degli studenti del Liceo Carducci. Programmi, rubriche ed eventi creati dagli studenti per gli
              studenti.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2 bg-primary-600 hover:bg-primary-700" onClick={joinLiveStream}>
                <Play className="h-5 w-5" />
                Ascolta ora
              </Button>
              <Link href="/programmi">
                <Button size="lg" variant="outline" className="gap-2">
                  <Mic className="h-5 w-5" />
                  Scopri i programmi
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Cosa offriamo</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-800 card-hover-effect">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 relative mb-4">
                  <Image
                    src="/images/logo-radio-carducci-2.png"
                    alt="Radio Carducci Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Radio Live</h3>
                <p className="text-gray-400 mb-4">
                  Ascolta la nostra diretta radiofonica con musica, interviste e contenuti esclusivi creati dagli
                  studenti.
                </p>
                <Link href="/radio" className="mt-auto">
                  <Button variant="link" className="gap-1 text-primary-600">
                    Ascolta ora <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 card-hover-effect">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary-600/20 flex items-center justify-center mb-4">
                  <Mic className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Programmi</h3>
                <p className="text-gray-400 mb-4">
                  Esplora i nostri programmi di 30 minuti su cultura, musica, sport e molto altro, realizzati dagli
                  studenti del liceo.
                </p>
                <Link href="/programmi" className="mt-auto">
                  <Button variant="link" className="gap-1 text-primary-600">
                    Scopri i programmi <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 card-hover-effect">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary-600/20 flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Rubriche</h3>
                <p className="text-gray-400 mb-4">
                  Scopri le nostre rubriche di 15 minuti su scienza, cultura e tecnologia, con contenuti brevi ma ricchi
                  di informazioni.
                </p>
                <Link href="/rubriche" className="mt-auto">
                  <Button variant="link" className="gap-1 text-primary-600">
                    Scopri le rubriche <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">I nostri partner</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link href="https://www.iisviaasmara28.edu.it" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="bg-gray-900/50 border-gray-800 h-full hover:border-primary-600 transition-colors">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="h-32 w-64 relative mb-4">
                    <Image src="/images/liceo-carducci-logo.png" alt="Liceo Carducci" fill className="object-contain" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Liceo Carducci</h3>
                  <p className="text-gray-400">
                    Il nostro liceo che finanzia e supporta il progetto Radio Carducci, permettendo agli studenti di
                    esprimere la propria creatività.
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="https://www.voicebookradio.com" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="bg-gray-900/50 border-gray-800 h-full hover:border-primary-600 transition-colors">
                <CardContent className="p-6 flex flex-col items-center text-center h-full">
                  <div className="h-32 w-32 relative mb-4">
                    <Image src="/images/vbr-logo.png" alt="Voice Book Radio" fill className="object-contain" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Voice Book Radio</h3>
                  <p className="text-gray-400">
                    Partner per la formazione radiofonica, ci aiuta a sviluppare competenze tecniche e creative nel
                    mondo della radio.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-900/50 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Unisciti a Radio Carducci</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Sei uno studente del Liceo Carducci e vuoi far parte della nostra redazione? Contattaci per scoprire come
            partecipare!
          </p>
          <Button size="lg" className="gap-2">
            Contattaci
          </Button>
        </div>
      </section>
    </div>
  )
}
