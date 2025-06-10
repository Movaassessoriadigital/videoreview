"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Star, Crown, Zap, DollarSign, MapPin } from "lucide-react"

// Brazilian names for notifications
const BRAZILIAN_NAMES = [
  "Ana Silva",
  "Carlos Santos",
  "Maria Oliveira",
  "João Pereira",
  "Fernanda Costa",
  "Rafael Lima",
  "Juliana Alves",
  "Pedro Rodrigues",
  "Camila Ferreira",
  "Lucas Martins",
  "Beatriz Souza",
  "Gabriel Nascimento",
  "Larissa Barbosa",
  "Thiago Ribeiro",
  "Amanda Carvalho",
  "Diego Araújo",
  "Isabela Gomes",
  "Mateus Dias",
  "Letícia Rocha",
  "Bruno Cardoso",
]

// Brazilian cities
const BRAZILIAN_CITIES = [
  "São Paulo - SP",
  "Rio de Janeiro - RJ",
  "Belo Horizonte - MG",
  "Salvador - BA",
  "Brasília - DF",
  "Fortaleza - CE",
  "Curitiba - PR",
  "Recife - PE",
  "Porto Alegre - RS",
  "Manaus - AM",
]

// Plan specific messages
const PLAN_MESSAGES = {
  basico: [
    "acabou de adquirir o Plano Básico",
    "desbloqueou +200 vídeos premium",
    "ativou recompensas 2x maiores",
    "garantiu saque via PIX em 24h",
    "começou a ganhar mais dinheiro",
  ],
  premium: [
    "acabou de adquirir o Plano Premium",
    "desbloqueou +500 vídeos premium",
    "ativou recompensas 3x maiores",
    "garantiu saque PIX instantâneo",
    "ganhou bônus de R$ 50",
    "acessou vídeos exclusivos",
  ],
  vip: [
    "acabou de adquirir o Plano VIP",
    "desbloqueou acesso ilimitado",
    "ativou recompensas 5x maiores",
    "ganhou bônus de R$ 100",
    "conseguiu gerente dedicado",
    "entrou no programa de afiliados",
  ],
}

interface Notification {
  id: number
  name: string
  city: string
  action: string
  plan: "basico" | "premium" | "vip"
  timeAgo: string
  earnings?: string
}

export default function PurchaseNotifications() {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null)

  // Generate random notification
  const generateNotification = (): Notification => {
    const plans: ("basico" | "premium" | "vip")[] = ["basico", "premium", "vip"]
    const plan = plans[Math.floor(Math.random() * plans.length)]
    const name = BRAZILIAN_NAMES[Math.floor(Math.random() * BRAZILIAN_NAMES.length)]
    const city = BRAZILIAN_CITIES[Math.floor(Math.random() * BRAZILIAN_CITIES.length)]
    const action = PLAN_MESSAGES[plan][Math.floor(Math.random() * PLAN_MESSAGES[plan].length)]

    const minutesAgo = Math.floor(Math.random() * 30) + 1
    const timeAgo = minutesAgo === 1 ? "1 minuto atrás" : `${minutesAgo} minutos atrás`

    let earnings = ""
    if (Math.random() > 0.7) {
      switch (plan) {
        case "basico":
          earnings = `R$ ${(Math.random() * 200 + 100).toFixed(0)}`
          break
        case "premium":
          earnings = `R$ ${(Math.random() * 400 + 200).toFixed(0)}`
          break
        case "vip":
          earnings = `R$ ${(Math.random() * 600 + 300).toFixed(0)}`
          break
      }
    }

    return {
      id: Date.now() + Math.random(),
      name,
      city,
      action,
      plan,
      timeAgo,
      earnings,
    }
  }

  // Show notification every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = generateNotification()
      setCurrentNotification(newNotification)

      setTimeout(() => {
        setCurrentNotification(null)
      }, 4000)
    }, 15000)

    // Show first notification after 2 seconds
    setTimeout(() => {
      const firstNotification = generateNotification()
      setCurrentNotification(firstNotification)
      setTimeout(() => {
        setCurrentNotification(null)
      }, 4000)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Get plan details
  const getPlanDetails = (plan: "basico" | "premium" | "vip") => {
    switch (plan) {
      case "basico":
        return {
          icon: Star,
          color: "bg-blue-500",
          badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
          name: "Básico",
        }
      case "premium":
        return {
          icon: Crown,
          color: "bg-purple-500",
          badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
          name: "Premium",
        }
      case "vip":
        return {
          icon: Zap,
          color: "bg-gradient-to-r from-yellow-500 to-orange-500",
          badgeColor: "bg-yellow-100 text-yellow-700 border-yellow-200",
          name: "VIP",
        }
    }
  }

  if (!currentNotification) return null

  const planDetails = getPlanDetails(currentNotification.plan)
  const IconComponent = planDetails.icon

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:left-auto md:top-20 md:bottom-auto md:right-4 md:transform-none md:translate-x-0 z-50 max-w-sm mx-4 md:mx-0">
      <Card
        className="bg-white border border-gray-200 shadow-2xl animate-in slide-in-from-right-full duration-500 hover:shadow-3xl transition-all"
        style={{
          animation: "slideInRight 0.5s ease-out",
        }}
      >
        <CardContent className="p-3">
          <div className="flex items-start gap-3">
            <div
              className={`w-10 h-10 ${planDetails.color} rounded-full flex items-center justify-center flex-shrink-0`}
            >
              <IconComponent className="h-5 w-5 text-white" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <p className="font-bold text-gray-800 text-sm truncate">{currentNotification.name}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{currentNotification.city}</span>
                  </div>
                </div>
                <Badge className={`${planDetails.badgeColor} text-xs px-2 py-0 flex-shrink-0`}>
                  {planDetails.name}
                </Badge>
              </div>

              <p className="text-xs text-gray-700 mb-2 leading-tight">{currentNotification.action}</p>

              {currentNotification.earnings && (
                <div className="flex items-center gap-1 mb-2">
                  <DollarSign className="h-3 w-3 text-green-500" />
                  <span className="text-xs font-bold text-green-600">
                    Já ganhou {currentNotification.earnings} este mês
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-gray-500">{currentNotification.timeAgo}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Ativo</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-green-500 h-1 rounded-full animate-pulse"
              style={{
                width: "75%",
                animation: "progress 4s linear",
              }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  )
}
