"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  CheckCircle,
  Star,
  Sparkles,
  Crown,
  Zap,
  Gift,
  Shield,
  Clock,
  ArrowRight,
  TrendingUp,
  Users,
  X,
  Flame,
  Target,
} from "lucide-react"

interface OffersPageProps {
  onBack: () => void
  currentBalance: number
}

const OFFERS = [
  {
    id: 1,
    title: "Plano Básico",
    subtitle: "Ideal para começar",
    price: 29.9,
    originalPrice: 59.9,
    discount: 50,
    features: [
      "Acesso a +200 vídeos premium",
      "Recompensas até 2x maiores",
      "Saque via PIX em 24h",
      "Suporte por email",
      "Sem taxa de saque",
    ],
    badge: "Mais Popular",
    color: "blue",
    icon: Star,
    paymentLink: "https://pay.kirvano.com/1acae1ea-0ed0-403e-9106-530f82413ee0",
    specialOffer: {
      title: "🔥 SUPER OFERTA RELÂMPAGO - BÁSICO",
      subtitle: "Apenas para os próximos 10 minutos!",
      price: 19.9,
      originalPrice: 29.9,
      discount: 33,
      paymentLink: "https://pay.kirvano.com/07f7f0f7-fef8-449a-b98b-047f9ddc05be",
      bonuses: [
        "🎁 BÔNUS: +50 vídeos exclusivos",
        "⚡ BÔNUS: Saque em 12h (ao invés de 24h)",
        "💰 BÔNUS: R$ 25 de crédito grátis",
        "🏆 BÔNUS: Acesso ao grupo VIP no Telegram",
        "📱 BÔNUS: App móvel exclusivo",
      ],
    },
  },
  {
    id: 2,
    title: "Plano Premium",
    subtitle: "Para ganhos máximos",
    price: 49.9,
    originalPrice: 99.9,
    discount: 50,
    features: [
      "Acesso a +500 vídeos premium",
      "Recompensas até 3x maiores",
      "Saque via PIX instantâneo",
      "Suporte prioritário 24/7",
      "Sem taxa de saque",
      "Bônus de R$ 50 no primeiro mês",
      "Acesso a vídeos exclusivos",
    ],
    badge: "Melhor Valor",
    color: "purple",
    icon: Crown,
    paymentLink: "https://pay.kirvano.com/bda26200-9d27-4077-84a1-452082cf6ac1",
    specialOffer: {
      title: "💎 SUPER OFERTA DIAMANTE - PREMIUM",
      subtitle: "Transforme sua vida financeira HOJE!",
      price: 39.9,
      originalPrice: 49.9,
      discount: 20,
      paymentLink: "https://pay.kirvano.com/8b1e0e84-af34-4363-9060-4eb29d1fb136",
      bonuses: [
        "🚀 BÔNUS: +200 vídeos ultra-premium",
        "💸 BÔNUS: R$ 100 de crédito grátis",
        "⭐ BÔNUS: Mentoria 1:1 de 30min",
        "🎯 BÔNUS: Estratégias secretas de ganhos",
        "👑 BÔNUS: Status VIP vitalício",
        "🎓 BÔNUS: Curso de monetização avançada",
      ],
    },
  },
  {
    id: 3,
    title: "Plano VIP",
    subtitle: "Ganhos profissionais",
    price: 79.9,
    originalPrice: 159.9,
    discount: 50,
    features: [
      "Acesso ilimitado a todos os vídeos",
      "Recompensas até 5x maiores",
      "Saque via PIX instantâneo",
      "Gerente de conta dedicado",
      "Sem taxa de saque",
      "Bônus de R$ 100 no primeiro mês",
      "Acesso antecipado a novos vídeos",
      "Programa de afiliados exclusivo",
    ],
    badge: "Máximo Lucro",
    color: "gold",
    icon: Zap,
    paymentLink: "https://pay.kirvano.com/b91b2cf6-e66d-4564-ad73-66bed4c0f45b",
    specialOffer: {
      title: "👑 SUPER OFERTA IMPERIAL - VIP",
      subtitle: "Para quem quer RESULTADOS EXTRAORDINÁRIOS!",
      price: 59.9,
      originalPrice: 79.9,
      discount: 25,
      paymentLink: "https://pay.kirvano.com/0049128c-7c2e-4ec3-b37f-4d1ed4474c78",
      bonuses: [
        "🔥 BÔNUS: Acesso a vídeos de R$ 50+ cada",
        "💰 BÔNUS: R$ 200 de crédito grátis",
        "🎓 BÔNUS: Curso completo de monetização",
        "📱 BÔNUS: App exclusivo para membros VIP",
        "🤝 BÔNUS: Parceria direta com criadores",
        "🏆 BÔNUS: Certificado de especialista",
        "💎 BÔNUS: Acesso vitalício a atualizações",
      ],
    },
  },
]

export default function OffersPage({ onBack, currentBalance }: OffersPageProps) {
  const [selectedOffer, setSelectedOffer] = useState<number | null>(null)
  const [showSpecialOffer, setShowSpecialOffer] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutos em segundos

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "from-blue-500 to-blue-600",
          badge: "bg-blue-100 text-blue-700 border-blue-200",
          button: "bg-blue-600 hover:bg-blue-700",
        }
      case "purple":
        return {
          bg: "from-purple-500 to-purple-600",
          badge: "bg-purple-100 text-purple-700 border-purple-200",
          button: "bg-purple-600 hover:bg-purple-700",
        }
      case "gold":
        return {
          bg: "from-yellow-500 to-orange-500",
          badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
          button: "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600",
        }
      default:
        return {
          bg: "from-gray-500 to-gray-600",
          badge: "bg-gray-100 text-gray-700 border-gray-200",
          button: "bg-gray-600 hover:bg-gray-700",
        }
    }
  }

  const handleSpecialOfferClick = (offerId: number) => {
    setShowSpecialOffer(offerId)
    setTimeLeft(600) // Reset timer para 10 minutos
  }

  const closeSpecialOffer = () => {
    setShowSpecialOffer(null)
    setTimeLeft(600)
  }

  const currentSpecialOffer = OFFERS.find((offer) => offer.id === showSpecialOffer)

  // Timer para ofertas especiais
  useEffect(() => {
    if (showSpecialOffer !== null) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            closeSpecialOffer()
            return 600
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [showSpecialOffer])

  // Função para formatar tempo
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Fechar popup com ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSpecialOffer()
      }
    }

    if (showSpecialOffer !== null) {
      document.addEventListener("keydown", handleEsc)
      return () => document.removeEventListener("keydown", handleEsc)
    }
  }, [showSpecialOffer])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-md mx-auto shadow-xl">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 py-3 flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Desbloquear Catálogo</h1>
              <p className="text-xs text-gray-500">Escolha seu plano e ganhe mais</p>
            </div>
          </div>
        </header>

        <main className="px-3 py-4 sm:px-4 sm:py-6">
          {/* Hook section */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-6 text-white relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-6 w-6 animate-pulse" />
                    <Badge className="bg-white/20 text-white border-0 text-xs">REVELADO AGORA</Badge>
                  </div>

                  <h2 className="text-2xl font-bold mb-3">🚀 Descubra Como Pessoas Estão Ganhando Dinheiro Rápido</h2>

                  <p className="text-white/90 mb-4 text-sm leading-relaxed">
                    Mais de <span className="font-bold">47.892 pessoas</span> já descobriram o segredo para ganhar
                    <span className="font-bold"> R$ 500 a R$ 3.000 por mês</span> avaliando vídeos em casa!
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                      <div className="text-xl font-bold">R$ 2.3M</div>
                      <div className="text-xs text-white/80">Pagos este mês</div>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
                      <div className="text-xl font-bold">98.7%</div>
                      <div className="text-xs text-white/80">Taxa de sucesso</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4" />
                    <span className="font-medium">+1.247 pessoas se inscreveram hoje</span>
                    <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits section */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🔥 Acelere seus Ganhos</h2>
              <p className="text-gray-600 text-sm">
                Desbloqueie o potencial completo da plataforma e ganhe até R$ 500/mês
              </p>
            </div>

            {/* Impressive statistics */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-green-700">+2.3M</div>
                  <div className="text-xs text-green-600">Pagos este mês</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-blue-700">98%</div>
                  <div className="text-xs text-blue-600">Taxa de satisfação</div>
                </CardContent>
              </Card>
            </div>

            {/* General benefits */}
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 mb-6">
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Gift className="h-4 w-4 text-yellow-600" />O que você ganha:
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span>Acesso a vídeos com recompensas maiores</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span>Saque rápido via PIX</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span>Suporte prioritário</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span>Sem taxas escondidas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Offers */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 text-center mb-4">🔥 Ofertas Especiais - 50% OFF</h3>

            {OFFERS.map((offer) => {
              const colors = getColorClasses(offer.color)
              const IconComponent = offer.icon

              return (
                <Card
                  key={offer.id}
                  className={`overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${
                    selectedOffer === offer.id ? "ring-2 ring-blue-500 scale-105" : ""
                  } ${offer.id === 2 ? "ring-2 ring-purple-400" : ""}`}
                  onClick={() => setSelectedOffer(offer.id)}
                >
                  {/* Card header */}
                  <div className={`bg-gradient-to-r ${colors.bg} text-white p-3 sm:p-4 relative`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5" />
                        <h4 className="font-bold text-lg">{offer.title}</h4>
                      </div>
                      <Badge className={`${colors.badge} text-xs`}>{offer.badge}</Badge>
                    </div>
                    <p className="text-white/90 text-sm mb-3">{offer.subtitle}</p>

                    {/* Prices */}
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">R$ {offer.price.toFixed(2)}</span>
                      <span className="text-white/70 line-through text-sm">R$ {offer.originalPrice.toFixed(2)}</span>
                      <Badge className="bg-red-500 text-white border-0 text-xs">-{offer.discount}%</Badge>
                    </div>
                  </div>

                  {/* Card content */}
                  <CardContent className="p-4">
                    <div className="space-y-2 mb-4">
                      {offer.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          window.location.href = offer.paymentLink
                        }}
                        className={`w-full ${colors.button} text-white font-bold py-3 shadow-lg transform hover:scale-105 transition-all duration-200`}
                      >
                        Escolher este Plano
                        <Sparkles className="h-4 w-4 ml-2" />
                      </Button>

                      {/* NOVO BOTÃO DE SUPER OFERTA */}
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSpecialOfferClick(offer.id)
                        }}
                        variant="outline"
                        className="w-full border-2 border-red-500 text-red-600 hover:bg-red-50 font-bold py-3 shadow-lg transform hover:scale-105 transition-all duration-200 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 animate-pulse"></div>
                        <div className="relative flex items-center justify-center gap-2">
                          <Flame className="h-4 w-4 animate-bounce" />
                          <span>SUPER OFERTA</span>
                          <Target className="h-4 w-4 animate-spin" />
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-6 text-center">
            <Button
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-8 shadow-lg transform hover:scale-105 transition-all duration-200 w-full"
              onClick={() => {
                if (selectedOffer) {
                  const selectedOfferData = OFFERS.find((o) => o.id === selectedOffer)
                  if (selectedOfferData) {
                    window.location.href = selectedOfferData.paymentLink
                  }
                } else {
                  alert("Por favor, selecione um plano antes de continuar.")
                }
              }}
            >
              Continuar com o Plano Selecionado
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Guarantee and security section */}
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                Garantia e Segurança
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                  <span>Garantia de 7 dias - 100% do dinheiro de volta</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                  <span>Pagamento seguro com criptografia SSL</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                  <span>Suporte 24/7 via WhatsApp</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Urgency */}
          <Card className="mt-6 bg-gradient-to-r from-red-500 to-pink-500 border-0 text-white">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-4 w-4 animate-pulse" />
                <span className="font-bold text-sm">OFERTA LIMITADA</span>
              </div>
              <p className="text-white/90 text-xs">Apenas hoje: 50% OFF em todos os planos!</p>
              <p className="text-white/90 text-xs mt-1">
                Restam apenas <span className="font-bold">23 vagas</span> com desconto
              </p>
            </CardContent>
          </Card>

          {/* Testimonials Section */}
          <section className="mt-8 mb-4">
            <h3 className="text-xl font-bold text-gray-800 text-center mb-4">👨‍👩‍👧‍👦 O Que Nossos Usuários Dizem</h3>

            <div className="space-y-4">
              {/* Testimonial 1 */}
              <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        "Comecei com o plano básico e em 2 semanas já consegui fazer um upgrade para o Premium! Estou
                        ganhando em média R$ 120 por dia apenas avaliando vídeos no meu tempo livre."
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-800">Carlos Mendes</p>
                          <p className="text-xs text-gray-500">São Paulo, SP</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Plano Premium</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 2 */}
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        "Como mãe solteira, estava procurando uma forma de renda extra que pudesse fazer em casa. O
                        plano VIP mudou minha vida! Já consegui pagar a faculdade do meu filho e ainda sobra dinheiro."
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-800">Ana Oliveira</p>
                          <p className="text-xs text-gray-500">Rio de Janeiro, RJ</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 text-xs">Plano VIP</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Testimonial 3 */}
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                        alt="User"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        "Aposentado há 3 anos, encontrei no VideoReview uma forma de complementar minha renda. Com o
                        plano Premium, consigo ganhar quase o dobro da minha aposentadoria trabalhando apenas 2 horas
                        por dia!"
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-gray-800">Roberto Almeida</p>
                          <p className="text-xs text-gray-500">Belo Horizonte, MG</p>
                        </div>
                        <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">Plano Premium</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>

      {/* MODAL DE SUPER OFERTA */}
      {showSpecialOffer !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeSpecialOffer} />

          {/* Modal Content */}
          <div className="relative max-w-sm mx-4 bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-lg shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between pb-2">
                <div className="text-base font-bold text-red-800 flex items-center gap-1">
                  <Flame className="h-4 w-4 animate-bounce" />
                  SUPER OFERTA
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeSpecialOffer}
                  className="h-6 w-6 p-0 hover:bg-red-100 rounded-full"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              {currentSpecialOffer && (
                <div className="space-y-3">
                  {/* Header da super oferta */}
                  <div className="text-center bg-gradient-to-r from-red-500 to-orange-500 text-white p-4 rounded-lg -mx-4">
                    <h3 className="text-sm font-bold mb-1">{currentSpecialOffer.specialOffer.title}</h3>
                    <p className="text-white/90 text-xs mb-3">{currentSpecialOffer.specialOffer.subtitle}</p>

                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-2xl font-bold">R$ {currentSpecialOffer.specialOffer.price.toFixed(2)}</span>
                      <span className="text-white/70 line-through text-sm">
                        R$ {currentSpecialOffer.specialOffer.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    <Badge className="bg-white/20 text-white border-0 text-xs">
                      ECONOMIA DE R${" "}
                      {(
                        currentSpecialOffer.specialOffer.originalPrice - currentSpecialOffer.specialOffer.price
                      ).toFixed(2)}
                    </Badge>
                  </div>

                  {/* Bônus da super oferta */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800 text-center text-sm">🎁 BÔNUS EXCLUSIVOS:</h4>
                    <div className="max-h-40 overflow-y-auto space-y-2">
                      {currentSpecialOffer.specialOffer.bonuses.map((bonus, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-xs bg-white p-2 rounded border border-green-200"
                        >
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{bonus}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timer de urgência */}
                  <div className="bg-red-100 border border-red-300 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-1 text-red-700 mb-1">
                      <Clock className="h-3 w-3 animate-pulse" />
                      <span className="font-bold text-xs">OFERTA EXPIRA EM:</span>
                    </div>
                    <div className="text-xl font-bold text-red-800">{formatTime(timeLeft)}</div>
                    <div className="text-xs text-red-600">minutos restantes</div>
                  </div>

                  {/* Botões de ação */}
                  <div className="space-y-2">
                    <Button
                      onClick={() => (window.location.href = currentSpecialOffer.specialOffer.paymentLink)}
                      className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 text-sm shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      🔥 QUERO ESTA SUPER OFERTA!
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>

                    <Button
                      variant="outline"
                      onClick={closeSpecialOffer}
                      className="w-full border-gray-300 text-gray-600 hover:bg-gray-50 py-2 text-xs"
                    >
                      Talvez depois...
                    </Button>
                  </div>

                  {/* Garantia */}
                  <div className="text-center text-xs text-gray-600 bg-green-50 p-2 rounded border border-green-200">
                    <Shield className="h-3 w-3 inline mr-1" />
                    Garantia de 7 dias - 100% do dinheiro de volta
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
