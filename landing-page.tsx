"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  DollarSign,
  Eye,
  Users,
  TrendingUp,
  Star,
  CheckCircle,
  Clock,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"

interface LandingPageProps {
  onNext: () => void
}

export default function LandingPage({ onNext }: LandingPageProps) {
  const [onlineUsers, setOnlineUsers] = useState(0)
  const [earnings, setEarnings] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)

  // Simular usuários online
  useEffect(() => {
    const baseUsers = Math.floor(Math.random() * 2000) + 3500
    setOnlineUsers(baseUsers)

    const interval = setInterval(() => {
      const variation = Math.floor(Math.random() * 100) - 50
      setOnlineUsers((prev) => Math.max(3000, prev + variation))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Simular ganhos em tempo real
  useEffect(() => {
    const baseEarnings = Math.floor(Math.random() * 50000) + 150000
    setEarnings(baseEarnings)

    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 500) + 100
      setEarnings((prev) => prev + increment)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Animação de entrada
  useEffect(() => {
    setTimeout(() => setShowAnimation(true), 500)
  }, [])

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header com estatísticas em tempo real */}
        <div className="bg-black/30 backdrop-blur-md border-b border-white/10 py-3">
          <div className="px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-medium">
                <span className="font-bold">{formatNumber(onlineUsers)}</span> pessoas online
              </span>
            </div>
            <div className="flex items-center gap-1 text-green-400 text-xs">
              <DollarSign className="h-3 w-3" />
              <span className="font-bold">R$ {formatNumber(earnings)}</span>
              <span className="text-white/70">pagos hoje</span>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <main className="flex-1 px-4 py-8 flex flex-col justify-center">
          <div
            className={`space-y-8 ${showAnimation ? "animate-in fade-in-0 slide-in-from-bottom-4 duration-1000" : "opacity-0"}`}
          >
            {/* Badge de urgência */}
            <div className="text-center">
              <Badge className="bg-red-500 text-white border-0 px-4 py-2 text-sm font-bold animate-bounce">
                🔥 REVELAÇÃO EXCLUSIVA - APENAS HOJE
              </Badge>
            </div>

            {/* Headline principal */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  DESCOBERTA
                </span>
                <br />
                <span className="text-white">CHOCANTE:</span>
              </h1>

              <h2 className="text-2xl font-bold text-white leading-tight">
                Como Pessoas Comuns Estão Ganhando
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent block">
                  R$ 500 a R$ 3.000
                </span>
                Por Mês em Casa
              </h2>

              <p className="text-lg text-white/90 font-medium">
                Sem vender nada, sem indicar amigos,
                <br />
                <span className="text-yellow-400 font-bold">trabalhando apenas 1-2 horas por dia!</span>
              </p>
            </div>

            {/* Prova social com fotos */}
            <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-white font-bold text-lg mb-2">📸 VEJA OS RESULTADOS REAIS:</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-500/20 p-3 rounded-lg border border-green-400/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">R$ 2.847</div>
                      <div className="text-xs text-white/80">Maria - SP</div>
                      <div className="text-xs text-green-300">Este mês</div>
                    </div>
                  </div>
                  <div className="bg-blue-500/20 p-3 rounded-lg border border-blue-400/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">R$ 1.923</div>
                      <div className="text-xs text-white/80">João - RJ</div>
                      <div className="text-xs text-blue-300">Este mês</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-white/90 text-sm mb-3">
                    <span className="font-bold text-yellow-400">+47.892 pessoas</span> já descobriram este método
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-white/80">
                    <Eye className="h-4 w-4" />
                    <span>Método sendo usado AGORA por milhares</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefícios rápidos */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-white text-sm font-medium">✅ Funciona mesmo sem experiência</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-white text-sm font-medium">✅ Pagamentos via PIX em 24h</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-white text-sm font-medium">✅ Trabalhe no seu tempo livre</span>
              </div>
            </div>

            {/* Urgência e escassez */}
            <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 shadow-2xl">
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-red-400 animate-pulse" />
                    <span className="text-red-400 font-bold text-sm">ATENÇÃO: ACESSO LIMITADO</span>
                  </div>
                  <p className="text-white text-sm mb-3">
                    Apenas <span className="font-bold text-yellow-400">127 pessoas</span> podem acessar hoje
                  </p>
                  <div className="bg-red-500/30 p-2 rounded border border-red-400/50">
                    <p className="text-white text-xs">
                      ⚠️ Esta página será removida em breve por questões de capacidade
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Principal */}
            <div className="space-y-4">
              <Button
                onClick={onNext}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-6 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-green-400"
              >
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  <span>QUERO DESCOBRIR COMO</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </Button>

              <p className="text-center text-white/70 text-xs">
                👆 Clique acima para descobrir o método que está mudando vidas
              </p>
            </div>

            {/* Garantias */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>100% Gratuito para descobrir</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                <Target className="h-4 w-4 text-blue-400" />
                <span>Método comprovado e testado</span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer com mais prova social */}
        <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 py-4">
          <div className="px-4 text-center">
            <div className="flex items-center justify-center gap-4 text-xs text-white/70">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>+47k usuários</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>R$ 2.3M pagos</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                <span>Método exclusivo</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
