"use client"

import { useState } from "react"
import { InfoIcon, CopyIcon, CheckIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function CredentialsTooltip() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="text-gray-400 hover:text-gray-300 transition-colors" aria-label="Informazioni di accesso">
            <InfoIcon className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-gray-800 border-gray-600 p-4 max-w-xs">
          <div className="space-y-3">
            <div className="font-bold text-white text-sm">Credenziali di accesso</div>
            <div className="flex items-center justify-between">
              <div className="text-xs">
                <span className="text-gray-400">User:</span> <span className="text-gray-200">simone.palmeri</span>
              </div>
              <button
                onClick={() => copyToClipboard("simone.palmeri", "username")}
                className="text-gray-400 hover:text-gray-200 transition-colors ml-2"
                aria-label="Copia username"
              >
                {copied === "username" ? (
                  <CheckIcon className="h-3 w-3 text-green-500" />
                ) : (
                  <CopyIcon className="h-3 w-3" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xs">
                <span className="text-gray-400">Pass:</span> <span className="text-gray-200">Gabby15bit@</span>
              </div>
              <button
                onClick={() => copyToClipboard("Gabby15bit@", "password")}
                className="text-gray-400 hover:text-gray-200 transition-colors ml-2"
                aria-label="Copia password"
              >
                {copied === "password" ? (
                  <CheckIcon className="h-3 w-3 text-green-500" />
                ) : (
                  <CopyIcon className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
