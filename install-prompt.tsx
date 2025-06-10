"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Detect if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    setIsIOS(isIOSDevice)

    // Check if already installed
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches
    const isInstalled = localStorage.getItem("app-installed") === "true" || isStandalone

    // Capture beforeinstallprompt event for Android/Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      if (!isInstalled) {
        setShowPrompt(true)
      }
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Show prompt for iOS after 5 seconds
    if (isIOSDevice && !isInstalled) {
      const timer = setTimeout(() => {
        setShowPrompt(true)
      }, 5000)
      return () => clearTimeout(timer)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        localStorage.setItem("app-installed", "true")
      }
      setDeferredPrompt(null)
    }
    setShowPrompt(false)
  }

  const dismissPrompt = () => {
    setShowPrompt(false)
    localStorage.setItem("prompt-dismissed", "true")
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 pointer-events-none">
      <Card className="border border-blue-200 shadow-lg pointer-events-auto">
        <CardContent className="p-3 sm:p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-sm sm:text-base text-blue-800 mb-1">
                Instale o VideoReview no seu celular
              </h3>
              {isIOS ? (
                <p className="text-xs sm:text-sm text-gray-600">
                  Toque em <span className="font-medium">Compartilhar</span> e depois em{" "}
                  <span className="font-medium">Adicionar à Tela de Início</span>
                </p>
              ) : (
                <p className="text-xs sm:text-sm text-gray-600">
                  Instale para ganhar dinheiro mesmo offline e receber notificações de novos vídeos
                </p>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={dismissPrompt} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </Button>
          </div>

          {!isIOS && (
            <Button
              onClick={handleInstall}
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Instalar Agora
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
