"use client"

import { Badge } from "@/components/ui/badge"

import { useState, useEffect, useRef } from "react"
import LandingPage from "@/components/landing-page"
import CuriosityPage from "@/components/curiosity-page"
import OffersPage from "@/components/offers-page"
import {
  Users,
  Star,
  DollarSign,
  Sparkles,
  CheckCircle,
  Trophy,
  Unlock,
  ArrowRight,
  Play,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Award,
  TrendingUp,
  Eye,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VideoCard from "@/components/video-card"
import VideoPlayer from "@/components/video-player"
import PurchaseNotifications from "@/components/purchase-notifications"
import InstallPrompt from "@/components/install-prompt"

const NEWS_ARTICLES = [
  {
    id: "1",
    title: "Jovem de 19 anos ganha R$ 3.200 em um mês avaliando vídeos online",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&crop=face",
    category: "Sucesso",
    views: "12.4k",
    time: "2h atrás",
    highlight: true,
  },
  {
    id: "2",
    title: "Mãe solteira consegue pagar faculdade do filho com renda extra de R$ 1.800/mês",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=250&fit=crop&crop=face",
    category: "Inspiração",
    views: "8.7k",
    time: "4h atrás",
    highlight: false,
  },
  {
    id: "3",
    title: "Aposentado aumenta renda em 150% trabalhando apenas 2 horas por dia",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=250&fit=crop&crop=face",
    category: "Terceira Idade",
    views: "15.2k",
    time: "6h atrás",
    highlight: true,
  },
]

// Sample videos with business and finance themes
const SAMPLE_VIDEOS = [
  {
    id: "1",
    title: "SUÍÇA 4K | Imagens Aéreas dos Alpes e Música Relaxante",
    thumbnail: "https://img.youtube.com/vi/77g75jd6wSs/maxresdefault.jpg",
    videoId: "77g75jd6wSs",
    duration: 12,
    reward: 6.5,
    category: "Paisagens",
    completed: false,
  },
  {
    id: "2",
    title: "Car CAMPING in RAIN | Cozy SOLO trip to the Rainy Mountains, AMSR",
    thumbnail: "https://img.youtube.com/vi/qrBGk07iSLY/maxresdefault.jpg",
    videoId: "qrBGk07iSLY",
    duration: 12,
    reward: 7.0,
    category: "Camping",
    completed: false,
  },
  {
    id: "3",
    title: "MARKETING DIGITAL | Como Vender Mais Online",
    thumbnail: "https://img.youtube.com/vi/X3-gKPNyrTA/maxresdefault.jpg",
    videoId: "X3-gKPNyrTA",
    duration: 12,
    reward: 8.0,
    category: "Marketing",
    completed: false,
  },
  {
    id: "4",
    title: "EMPREENDEDORISMO | 10 Dicas de Sucesso",
    thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
    videoId: "kJQP7kiw5Fk",
    duration: 12,
    reward: 5.5,
    category: "Empreendedorismo",
    completed: false,
  },
  {
    id: "5",
    title: "PRODUTIVIDADE | Como Ser Mais Eficiente no Trabalho",
    thumbnail: "https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg",
    videoId: "L_jWHffIx5E",
    duration: 12,
    reward: 4.5,
    category: "Produtividade",
    completed: false,
  },
  {
    id: "6",
    title: "VENDAS | Técnicas Para Vender Qualquer Coisa",
    thumbnail: "https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg",
    videoId: "fJ9rUzIMcZQ",
    duration: 12,
    reward: 7.5,
    category: "Vendas",
    completed: false,
  },
]

function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.round(seconds % 60)
  const paddedSeconds = String(remainingSeconds).padStart(2, "0")
  return `${minutes}:${paddedSeconds}`
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<"landing" | "curiosity" | "platform" | "offers">("landing")
  const [onlineUsers, setOnlineUsers] = useState<number>(258)
  const [balance, setBalance] = useState<number>(23.5)
  const [showCashAnimation, setShowCashAnimation] = useState<boolean>(false)
  const [completedVideos, setCompletedVideos] = useState<number>(0)
  const [videos, setVideos] = useState(SAMPLE_VIDEOS)
  const [currentVideo, setCurrentVideo] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [autoPlayStarted, setAutoPlayStarted] = useState<boolean>(false)
  const [videoStarted, setVideoStarted] = useState<boolean>(false)
  const [watchTime, setWatchTime] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<"available" | "completed">("available")
  const [canReview, setCanReview] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio("https://files.catbox.moe/8d4kqk.mp3")
    audioRef.current.volume = 0.8
  }, [])

  // Generate random number of online users
  useEffect(() => {
    const baseUsers = Math.floor(Math.random() * 1000) + 1500
    setOnlineUsers(baseUsers)

    const interval = setInterval(() => {
      const variation = Math.floor(Math.random() * 50) - 25
      setOnlineUsers((prev) => Math.max(1500, prev + variation))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  // Start time counting when video is playing
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (videoStarted && isPlaying && currentVideo && watchTime < currentVideo.duration) {
      interval = setInterval(() => {
        setWatchTime((prev) => {
          const newTime = prev + 1
          if (newTime >= currentVideo.duration) {
            setCanReview(true)
          }
          return newTime
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [videoStarted, isPlaying, watchTime, currentVideo])

  const handleLandingNext = () => {
    setCurrentPage("curiosity")
  }

  const handleCuriosityNext = () => {
    setCurrentPage("platform")
  }

  const availableVideos = videos.filter((video) => !video.completed)
  const completedVideosList = videos.filter((video) => video.completed)
  const allVideosCompleted = availableVideos.length === 0

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVideoStart = () => {
    setVideoStarted(true)
  }

  const startAutoPlay = () => {
    setAutoPlayStarted(true)
    selectVideo(availableVideos[0])
  }

  const selectVideo = (video: any) => {
    setCurrentVideo(video)
    setIsPlaying(true)
    setVideoStarted(false)
    setWatchTime(0)
    setCanReview(false)
  }

  // Play money deposit sound
  const playBankDepositSound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch((error) => {
          console.log("Error playing audio:", error)
          // Fallback for sound if file can't be played
          try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
            oscillator.frequency.linearRampToValueAtTime(1200, audioContext.currentTime + 0.3)
            oscillator.frequency.linearRampToValueAtTime(800, audioContext.currentTime + 0.6)

            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1)
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.6)

            oscillator.start()
            oscillator.stop(audioContext.currentTime + 0.6)
          } catch (fallbackError) {
            console.log("No audio support available", fallbackError)
          }
        })
      }
    } catch (error) {
      console.log("Error creating audio object", error)
    }
  }

  const evaluateVideo = (approved: boolean) => {
    if (!currentVideo) return

    // Update balance
    setBalance(balance + currentVideo.reward)
    setShowCashAnimation(true)

    // Play sound
    playBankDepositSound()

    // Update video status
    const updatedVideos = videos.map((video) => {
      if (video.id === currentVideo.id) {
        return { ...video, completed: true, approved }
      }
      return video
    })
    setVideos(updatedVideos)
    setCompletedVideos(completedVideos + 1)

    // Find the next available video
    const remainingVideos = updatedVideos.filter((v) => !v.completed)

    if (remainingVideos.length === 0) {
      // All videos completed
      setCurrentVideo(null)
    } else {
      // Automatically select the next video and start playing
      const nextVideo = remainingVideos[0]
      setCurrentVideo(nextVideo)
      setWatchTime(0)
      setCanReview(false)
      setIsPlaying(true)
      setVideoStarted(true)
    }

    // Reset cash animation
    setTimeout(() => {
      setShowCashAnimation(false)
    }, 3000)
  }

  const goToOffersPage = () => {
    setCurrentPage("offers")
  }

  const returnFromOffersPage = () => {
    setCurrentPage("platform")
  }

  switch (currentPage) {
    case "landing":
      return <LandingPage onNext={handleLandingNext} />
    case "curiosity":
      return <CuriosityPage onNext={handleCuriosityNext} />
    case "offers":
      return <OffersPage onBack={returnFromOffersPage} currentBalance={balance} />
    case "platform":
      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          {/* Centralized container for mobile view */}
          <div className="w-full max-w-md mx-auto shadow-xl">
            {/* Online users counter */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2">
              <div className="container mx-auto px-4 flex items-center justify-center gap-2">
                <Users className="h-4 w-4 animate-pulse" />
                <span className="text-sm font-medium">
                  <span className="font-bold">{formatNumber(onlineUsers)}</span> pessoas online agora
                </span>
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </div>
            </div>

            {/* Header - Mobile optimized */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10 shadow-sm">
              <div className="w-full px-3 py-2 sm:px-4 sm:py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      VideoReview
                    </h1>
                    <p className="text-xs text-gray-500">Ganhe dinheiro avaliando vídeos</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-1 rounded-full shadow-lg relative">
                    <DollarSign className="h-4 w-4 text-white" />
                    <span className="font-bold text-white text-sm">R$ {balance.toFixed(2)}</span>
                    <Sparkles className="h-3 w-3 text-white animate-pulse" />

                    {/* Enhanced money animation */}
                    {showCashAnimation && (
                      <>
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
                          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-2xl border-2 border-white">
                            <DollarSign className="h-4 w-4 animate-pulse" />
                            <span className="font-bold text-sm">+R$ {currentVideo?.reward.toFixed(2)}</span>
                            <Sparkles className="h-3 w-3 animate-spin" />
                          </div>
                        </div>

                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                          <div className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-yellow-400 opacity-75"></div>
                          <div className="animate-pulse absolute inline-flex h-4 w-4 rounded-full bg-yellow-500"></div>
                        </div>

                        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 animate-pulse">
                          <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            💰 DEPOSITADO!
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-2 py-1 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {completedVideos}/{videos.length}
                  </Badge>
                </div>
              </div>
            </header>

            <main className="px-3 py-3 sm:px-4 sm:py-4">
              {/* Test button to go directly to offers page */}
              <div className="mb-4">
                <Button
                  onClick={goToOffersPage}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 shadow-lg"
                >
                  🧪 TESTE: Ir para Página de Ofertas
                </Button>
              </div>

              {/* Main column */}
              <div>
                {allVideosCompleted ? (
                  /* Completion Section - Mobile optimized */
                  <div className="space-y-4">
                    {/* Congratulations card */}
                    <Card className="overflow-hidden border-0 shadow-2xl">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 py-8 px-4 text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm animate-bounce">
                          <Trophy className="h-10 w-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">🎉 Parabéns!</h2>
                        <p className="text-white/90 text-lg mb-4">Você completou todas as avaliações!</p>

                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 inline-block">
                          <p className="text-white/90 mb-2 text-base">Você ganhou um total de:</p>
                          <div className="flex items-center justify-center gap-2 text-3xl font-bold text-white">
                            <DollarSign className="h-8 w-8" />
                            <span>R$ {balance.toFixed(2)}</span>
                            <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Deposit notification card */}
                    <Card className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 shadow-2xl animate-bounce">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
                            <CheckCircle className="h-7 w-7 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-lg flex items-center gap-1">
                              💰 Depositado!
                              <Sparkles className="h-4 w-4 animate-pulse" />
                            </h4>
                            <div className="flex items-center gap-1 text-white">
                              <DollarSign className="h-5 w-5 animate-bounce" />
                              <span className="font-bold text-xl animate-pulse">R$ {balance.toFixed(2)}</span>
                              <span className="text-sm opacity-90">na sua conta!</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Unlock card - Mobile optimized */}
                    <Card className="overflow-hidden border-0 shadow-xl">
                      <CardContent className="p-4">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-100">
                          <div className="flex flex-col items-start gap-4">
                            <div className="bg-blue-500 p-2 rounded-full text-white mt-1 mx-auto">
                              <Unlock className="h-6 w-6" />
                            </div>
                            <div className="flex-1 text-center">
                              <h3 className="text-xl font-bold text-blue-800 mb-3">Desbloqueie o Catálogo Completo!</h3>
                              <p className="text-blue-700 text-base mb-4">
                                Avalie mais vídeos e ganhe até{" "}
                                <span className="font-bold text-xl">R$ 500,00 por mês</span>
                              </p>

                              <div className="grid grid-cols-1 gap-3 mb-6">
                                <div className="flex items-center gap-2 bg-white/60 p-3 rounded-lg">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  <span className="text-xs font-medium text-blue-800">
                                    Acesso a +500 vídeos premium
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/60 p-3 rounded-lg">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  <span className="text-xs font-medium text-blue-800">Recompensas até 3x maiores</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/60 p-3 rounded-lg">
                                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                  <span className="text-xs font-medium text-blue-800">Saque imediato via PIX</span>
                                </div>
                              </div>

                              <div className="flex flex-col gap-3">
                                <Button
                                  onClick={goToOffersPage}
                                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-lg w-full text-base py-4"
                                >
                                  Desbloquear Agora <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Final statistics - Mobile optimized */}
                    <Card className="bg-gradient-to-br from-white to-green-50 border-green-200 shadow-lg">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                          🏆 Resumo da sua Performance
                        </h3>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
                            <div className="text-xl font-bold text-green-700">{completedVideos}</div>
                            <div className="text-xs text-green-600 font-medium">Vídeos Avaliados</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="text-xl font-bold text-blue-700">R$ {balance.toFixed(2)}</div>
                            <div className="text-xs text-blue-600 font-medium">Total Ganho</div>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-200">
                            <div className="text-xl font-bold text-purple-700">100%</div>
                            <div className="text-xs text-purple-600 font-medium">Taxa de Conclusão</div>
                          </div>
                          <div className="text-center p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                            <div className="text-xl font-bold text-yellow-700">Expert</div>
                            <div className="text-xs text-yellow-600 font-medium">Nível Alcançado</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : currentVideo ? (
                  <Card className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-0">
                      {/* Video player */}
                      <VideoPlayer
                        videoUrl={currentVideo.thumbnail}
                        videoId={currentVideo.videoId}
                        isPlaying={isPlaying}
                        onPlayPause={handlePlayPause}
                        canReview={canReview}
                        autoStart={autoPlayStarted}
                        onVideoStart={handleVideoStart}
                      />

                      {/* Video information and controls - Mobile optimized */}
                      <div className="p-4 bg-gradient-to-r from-white to-gray-50">
                        <div className="flex flex-col justify-between items-start mb-4 gap-3">
                          <div>
                            <h2 className="text-lg font-bold text-gray-800 mb-2">
                              {!videoStarted ? "Clique para começar..." : "Aguarde para avaliar..."}
                            </h2>
                            <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200">
                              {currentVideo.category}
                            </Badge>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-gray-500 mb-1">💰 Recompensa</div>
                            <div className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              R$ {currentVideo.reward.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        {/* Viewing progress */}
                        <div className="mb-6">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">
                                {!videoStarted ? "Tempo para assistir" : "Tempo assistido"}
                              </span>
                            </div>
                            <div className="font-mono font-bold">
                              {formatTime(watchTime)} / {formatTime(currentVideo.duration)}
                            </div>
                          </div>
                          <Progress value={(watchTime / currentVideo.duration) * 100} className="h-3 bg-gray-200" />
                        </div>

                        {/* Evaluation buttons - Mobile optimized */}
                        {canReview ? (
                          <div className="space-y-4">
                            <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                              <h3 className="text-lg font-bold text-gray-800 mb-2">🎉 Tempo concluído!</h3>
                              <p className="text-gray-600 mb-4">Como você avalia este vídeo?</p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                              <Button
                                onClick={() => evaluateVideo(true)}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 text-base font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                                size="lg"
                              >
                                <ThumbsUp className="h-5 w-5 mr-2" />
                                Aprovado
                              </Button>

                              <Button
                                onClick={() => evaluateVideo(false)}
                                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-4 text-base font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                                size="lg"
                              >
                                <ThumbsDown className="h-5 w-5 mr-2" />
                                Reprovado
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
                              <p className="text-gray-700 font-medium text-sm">
                                {!videoStarted
                                  ? "▶️ Clique no vídeo para começar a assistir"
                                  : `⏱️ Assista por ${currentVideo.duration} segundos para avaliar`}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100 shadow-xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">Pronto para ganhar dinheiro?</h2>
                    <p className="text-gray-600 text-center max-w-md mb-6 leading-relaxed text-sm">
                      Assista vídeos por apenas 12 segundos cada e ganhe recompensas instantâneas por suas avaliações!
                    </p>
                    <Button
                      onClick={startAutoPlay}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-3 text-base font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Começar a Ganhar Agora
                    </Button>
                  </div>
                )}
              </div>

              {/* Video tabs */}
              <div className="mt-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4 bg-gray-100 p-1 rounded-xl">
                    <TabsTrigger
                      value="available"
                      className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg font-medium text-xs"
                    >
                      Disponíveis ({availableVideos.length})
                    </TabsTrigger>
                    <TabsTrigger
                      value="completed"
                      className="data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-lg font-medium text-xs"
                    >
                      Concluídos ({completedVideosList.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="available" className="mt-0">
                    {availableVideos.length > 0 ? (
                      <div className="space-y-3">
                        {availableVideos.map((video, index) => (
                          <VideoCard
                            key={video.id}
                            video={video}
                            onClick={() => selectVideo(video)}
                            isActive={currentVideo?.id === video.id}
                            position={index + 1}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-green-800 mb-2">🎉 Parabéns!</h3>
                        <p className="text-green-600 text-sm">Você avaliou todos os vídeos disponíveis!</p>
                        <div className="mt-4 text-xl font-bold text-green-700">
                          Total ganho: R$ {balance.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="completed" className="mt-0">
                    {completedVideosList.length > 0 ? (
                      <div className="space-y-3">
                        {completedVideosList.map((video) => (
                          <VideoCard key={video.id} video={video} isCompleted={true} onClick={() => {}} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-xl">
                        <Star className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-base font-medium text-gray-700 mb-1">Nenhuma avaliação</h3>
                        <p className="text-gray-500 text-xs">Você ainda não avaliou nenhum vídeo.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                {/* Statistics - Mobile optimized */}
                {!allVideosCompleted && (
                  <Card className="mt-4 bg-gradient-to-br from-white to-purple-50 border-purple-200 shadow-lg">
                    <CardContent className="p-4">
                      <h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                        📊 Suas estatísticas
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600 font-medium">Progresso</span>
                            <span className="font-bold text-purple-600">
                              {completedVideos} de {videos.length}
                            </span>
                          </div>
                          <Progress value={(completedVideos / videos.length) * 100} className="h-3" />
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-2 bg-green-50 rounded-lg">
                            <div className="text-xs text-green-600 font-medium">💰 Ganhos totais</div>
                            <div className="text-lg font-bold text-green-700">R$ {balance.toFixed(2)}</div>
                          </div>
                          <div className="text-center p-2 bg-blue-50 rounded-lg">
                            <div className="text-xs text-blue-600 font-medium">🏆 Nível</div>
                            <div className="text-lg font-bold text-blue-700">
                              {completedVideos < 3 ? "Iniciante" : completedVideos < 6 ? "Intermediário" : "Expert"}
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div className="text-center">
                          <Button
                            variant="outline"
                            className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 text-xs"
                          >
                            Ver histórico completo
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Success stories section - Mobile optimized */}
              <section className="mt-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">📰 Histórias de Sucesso</h2>
                  <p className="text-gray-600 mx-auto text-sm px-4">
                    Veja como outras pessoas estão transformando suas vidas ganhando dinheiro avaliando vídeos
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {NEWS_ARTICLES.map((article) => (
                    <Card
                      key={article.id}
                      className={`overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
                        article.highlight
                          ? "ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          className="w-full h-36 object-cover"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=200&width=300"
                          }}
                        />
                        {article.highlight && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 px-2 py-1 text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Em Alta
                            </Badge>
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2">
                          <Badge className="bg-black/70 text-white border-0 px-2 py-1 backdrop-blur-sm text-xs">
                            {article.category}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-3">
                        <h3 className="font-bold text-gray-800 text-xs leading-tight mb-3 line-clamp-3">
                          {article.title}
                        </h3>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{article.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>{Math.floor(Math.random() * 500) + 50}</span>
                            </div>
                          </div>
                          <span>{article.time}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Additional call to action - Mobile optimized */}
                <div className="mt-8 text-center">
                  <Card className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 shadow-xl">
                    <CardContent className="p-6">
                      <div className="text-white">
                        <h3 className="text-xl font-bold mb-3">💰 Você também pode ser o próximo!</h3>
                        <p className="text-base mb-4 text-white/90">
                          Junte-se a milhares de pessoas que já estão ganhando dinheiro extra avaliando vídeos
                        </p>
                        <div className="flex flex-col gap-3 justify-center items-center">
                          <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full backdrop-blur-sm">
                            <Users className="h-4 w-4" />
                            <span className="font-bold text-sm">+{formatNumber(onlineUsers)} usuários ativos</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/20 px-3 py-2 rounded-full backdrop-blur-sm">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-bold text-sm">R$ 2.3M pagos este mês</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </main>

            {/* Footer - Mobile optimized */}
            <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-8 py-6">
              <div className="container mx-auto px-4">
                <div className="flex flex-col justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                      <Star className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-700 font-bold text-sm">VideoReview</span>
                  </div>

                  <div className="flex gap-4 text-xs text-gray-500">
                    <a href="#" className="hover:text-gray-700 transition-colors">
                      Como funciona
                    </a>
                    <a href="#" className="hover:text-gray-700 transition-colors">
                      Termos
                    </a>
                    <a href="#" className="hover:text-gray-700 transition-colors">
                      Privacidade
                    </a>
                  </div>
                </div>
              </div>
            </footer>

            {/* Purchase notifications */}
            <PurchaseNotifications />

            {/* Install prompt */}
            <InstallPrompt />
          </div>
        </div>
      )
    default:
      return <LandingPage onNext={handleLandingNext} />
  }
}
