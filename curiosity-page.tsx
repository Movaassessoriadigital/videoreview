"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  DollarSign,
  Eye,
  TrendingUp,
  Star,
  Target,
  Zap,
  Lock,
  Unlock,
  AlertTriangle,
  Crown,
  Flame,
  ShieldCheck,
} from "lucide-react"

interface CuriosityPageProps {
  onNext: () => void
}

export default function CuriosityPage({ onNext }: CuriosityPageProps) {
  const [timeLeft, setTimeLeft] = useState(1847) // Aproximadamente 30 minutos
  const [currentEarning, setCurrentEarning] = useState(0)
  const [showSecrets, setShowSecrets] = useState(false)

  // Timer de urgência
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simular ganhos em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEarning(Math.floor(Math.random() * 150) + 50)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Mostrar "segredos" após alguns segundos
  useEffect(() => {
    setTimeout(() => setShowSecrets(true), 2000)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background effects mais intensos */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-5 w-80 h-80 bg-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-5 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-500/25 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header com timer de urgência */}
        <div className="bg-red-600/90 backdrop-blur-md border-b border-red-400/50 py-3">
          <div className="px-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-yellow-300 animate-bounce" />
              <span className="text-white font-bold text-sm">ACESSO EXPIRA EM:</span>
            </div>
            <div className="text-2xl font-bold text-yellow-300">{formatTime(timeLeft)}</div>
            <div className="text-xs text-white/80">Depois disso, você perderá esta oportunidade PARA SEMPRE</div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <main className="flex-1 px-4 py-6 space-y-6">
          {/* Headline com gatilho de curiosidade */}
          <div className="text-center space-y-4">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black border-0 px-4 py-2 text-sm font-bold animate-pulse">
              🤫 SEGREDO REVELADO PELA PRIMEIRA VEZ
            </Badge>

            <h1 className="text-3xl font-bold text-white leading-tight">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                O QUE AS EMPRESAS
              </span>
              <br />
              <span className="text-white">NÃO QUEREM</span>
              <br />
              <span className="text-red-400">QUE VOCÊ SAIBA...</span>
            </h1>

            <p className="text-lg text-white/90 leading-relaxed">
              Existe um <span className="font-bold text-yellow-400">"buraco" no sistema</span> que permite pessoas
              comuns ganharem
              <span className="font-bold text-green-400"> R$ 50 a R$ 200 por dia</span> fazendo algo que você já faz...
            </p>
          </div>

          {/* Revelação gradual com gatilhos */}
          <Card className="bg-black/40 backdrop-blur-md border border-yellow-400/50 shadow-2xl">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <Lock className="h-8 w-8 text-yellow-400 mx-auto mb-2 animate-pulse" />
                  <h3 className="text-white font-bold text-lg">🔐 INFORMAÇÃO CONFIDENCIAL</h3>
                </div>

                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 p-3 rounded-lg border border-green-400/30">
                    <p className="text-white text-sm">
                      ✅ <span className="font-bold">DESCOBERTA:</span> Grandes empresas pagam milhões para saber a
                      opinião das pessoas sobre seus produtos...
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-3 rounded-lg border border-blue-400/30">
                    <p className="text-white text-sm">
                      ✅ <span className="font-bold">SEGREDO:</span> Elas precisam de pessoas comuns para avaliar
                      conteúdos e dar feedback...
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-3 rounded-lg border border-yellow-400/30">
                    <p className="text-white text-sm">
                      ✅ <span className="font-bold">OPORTUNIDADE:</span> Você pode ser pago para fazer isso no conforto
                      da sua casa!
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prova social com ganhos em tempo real */}
          <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/50 shadow-2xl">
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <h3 className="text-white font-bold text-lg mb-2">💰 GANHOS EM TEMPO REAL:</h3>
              </div>

              <div className="space-y-3">
                <div className="bg-black/30 p-3 rounded-lg border border-green-400/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-green-400 font-bold">Ana Silva - SP</div>
                      <div className="text-white/80 text-sm">Acabou de ganhar</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">R$ {currentEarning}</div>
                      <div className="text-xs text-white/60">há 2 minutos</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-black/30 p-2 rounded border border-green-400/30">
                    <div className="text-lg font-bold text-green-400">R$ 1.847</div>
                    <div className="text-xs text-white/70">Carlos - RJ</div>
                  </div>
                  <div className="bg-black/30 p-2 rounded border border-blue-400/30">
                    <div className="text-lg font-bold text-blue-400">R$ 2.156</div>
                    <div className="text-xs text-white/70">Maria - MG</div>
                  </div>
                  <div className="bg-black/30 p-2 rounded border border-purple-400/30">
                    <div className="text-lg font-bold text-purple-400">R$ 3.289</div>
                    <div className="text-xs text-white/70">João - PR</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gatilho de autoridade e prova */}
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/50 shadow-2xl">
            <CardContent className="p-4">
              <div className="text-center space-y-3">
                <Crown className="h-8 w-8 text-yellow-400 mx-auto animate-bounce" />
                <h3 className="text-white font-bold text-lg">👑 MÉTODO EXCLUSIVO</h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <ShieldCheck className="h-4 w-4 text-green-400" />
                    <span>
                      Usado por <span className="font-bold text-yellow-400">47.892 pessoas</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                    <span>
                      Taxa de sucesso de <span className="font-bold text-green-400">98.7%</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <span>
                      <span className="font-bold text-green-400">R$ 2.3 milhões</span> pagos este mês
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revelação dos "segredos" */}
          {showSecrets && (
            <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/50 shadow-2xl animate-in slide-in-from-bottom-4 duration-1000">
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <Unlock className="h-8 w-8 text-yellow-400 mx-auto animate-pulse" />
                  <h3 className="text-white font-bold text-lg">🔓 SEGREDOS REVELADOS:</h3>

                  <div className="space-y-2 text-left">
                    <div className="bg-black/30 p-2 rounded border border-yellow-400/30">
                      <p className="text-white text-sm">
                        🤫 <span className="font-bold text-yellow-400">SEGREDO #1:</span> As empresas pagam até R$ 50
                        por uma simples avaliação de 30 segundos
                      </p>
                    </div>
                    <div className="bg-black/30 p-2 rounded border border-green-400/30">
                      <p className="text-white text-sm">
                        🤫 <span className="font-bold text-green-400">SEGREDO #2:</span> Você pode fazer isso assistindo
                        vídeos que já assistiria de graça
                      </p>
                    </div>
                    <div className="bg-black/30 p-2 rounded border border-blue-400/30">
                      <p className="text-white text-sm">
                        🤫 <span className="font-bold text-blue-400">SEGREDO #3:</span> O pagamento cai na sua conta em
                        até 24 horas via PIX
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Gatilho de escassez e urgência */}
          <Card className="bg-gradient-to-r from-red-600/30 to-pink-600/30 border border-red-400/50 shadow-2xl">
            <CardContent className="p-4">
              <div className="text-center space-y-3">
                <Flame className="h-8 w-8 text-red-400 mx-auto animate-bounce" />
                <h3 className="text-red-400 font-bold text-lg">⚠️ ÚLTIMA CHANCE</h3>

                <div className="space-y-2">
                  <p className="text-white text-sm">
                    Apenas <span className="font-bold text-yellow-400">73 vagas restantes</span> para acessar hoje
                  </p>
                  <p className="text-white/80 text-xs">
                    Depois que as vagas acabarem, você terá que entrar numa lista de espera de 30 dias
                  </p>
                  <div className="bg-red-500/30 p-2 rounded border border-red-400/50">
                    <p className="text-white text-xs font-bold">
                      🚨 ATENÇÃO: Esta oportunidade pode ser removida a qualquer momento
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Final com gatilho de curiosidade máximo */}
          <div className="space-y-4">
            <Button
              onClick={onNext}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-6 text-lg shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-yellow-400 animate-pulse"
            >
              <div className="flex items-center justify-center gap-2">
                <Eye className="h-5 w-5" />
                <span>REVELAR O MÉTODO COMPLETO</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            </Button>

            <div className="text-center space-y-2">
              <p className="text-white/90 text-sm font-medium">
                👆 <span className="text-yellow-400 font-bold">CLIQUE AGORA</span> e descubra como ganhar seu primeiro
                R$ 100 ainda hoje
              </p>
              <p className="text-white/60 text-xs">⏰ Oferta válida apenas pelos próximos {formatTime(timeLeft)}</p>
            </div>
          </div>

          {/* Garantias finais */}
          <div className="text-center space-y-2 pb-4">
            <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>Acesso 100% gratuito</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
              <Target className="h-4 w-4 text-green-400" />
              <span>Método testado e aprovado</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
              <Zap className="h-4 w-4 text-blue-400" />
              <span>Resultados em 24 horas</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
