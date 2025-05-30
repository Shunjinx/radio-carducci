"use client"

import { useState } from "react"
import { InfoIcon, CopyIcon, CheckIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CREDENTIALS } from "@/lib/constants"

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
            <InfoIcon className="h-5 w-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-gray-800 border-gray-600 p-4 max-w-xs">
          <div className="space-y-3">
            <div className="font-bold text-white text-lg">Credenziali di accesso</div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-gray-400">Username:</span>{" "}
                <span className="text-gray-200">{CREDENTIALS.username}</span>
              </div>
              <button
                onClick={() => copyToClipboard(CREDENTIALS.username, "username")}
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="Copia username"
              >
                {copied === "username" ? (
                  <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="text-gray-400">Password:</span>{" "}
                <span className="text-gray-200">{CREDENTIALS.password}</span>
              </div>
              <button
                onClick={() => copyToClipboard(CREDENTIALS.password, "password")}
                className="text-gray-400 hover:text-gray-200 transition-colors"
                aria-label="Copia password"
              >
                {copied === "password" ? (
                  <CheckIcon className="h-4 w-4 text-green-500" />
                ) : (
                  <CopyIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
