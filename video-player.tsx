"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  videoUrl: string
  videoId: string
  isPlaying: boolean
  onPlayPause: () => void
  canReview: boolean
  autoStart?: boolean
  onVideoStart?: () => void
}

export default function VideoPlayer({
  videoUrl,
  videoId,
  isPlaying,
  onPlayPause,
  canReview,
  autoStart = false,
  onVideoStart,
}: VideoPlayerProps) {
  const [showPlayButton, setShowPlayButton] = useState(!autoStart)
  const [videoStarted, setVideoStarted] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (autoStart) {
      setShowPlayButton(false)
      setVideoStarted(true)
      if (onVideoStart) {
        onVideoStart()
      }
    }
  }, [autoStart, onVideoStart])

  useEffect(() => {
    setVideoStarted(false)
    setShowPlayButton(!autoStart)
  }, [videoId, autoStart])

  const handlePlayClick = () => {
    setShowPlayButton(false)
    setVideoStarted(true)
    if (onVideoStart) {
      onVideoStart()
    }
    onPlayPause()
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.src
      iframeRef.current.src = currentSrc.replace(/mute=[01]/, `mute=${!isMuted ? 1 : 0}`)
    }
  }

  const youtubeUrl = `https://www.youtube.com/embed/${videoId}?${new URLSearchParams({
    autoplay: videoStarted && isPlaying ? "1" : "0",
    mute: isMuted ? "1" : "0",
    controls: "1",
    modestbranding: "1",
    rel: "0",
    showinfo: "0",
    iv_load_policy: "3",
    start: "0",
    enablejsapi: "1",
    origin: typeof window !== "undefined" ? window.location.origin : "",
    playsinline: "1",
  }).toString()}`

  return (
    <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
      {!videoStarted ? (
        <>
          <img
            src={videoUrl || "/placeholder.svg?height=360&width=640"}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg?height=360&width=640"
            }}
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={handlePlayClick}
              size="lg"
              className="w-16 h-16 rounded-full bg-white/90 hover:bg-white text-black shadow-lg transform hover:scale-110 transition-all"
            >
              <Play className="h-8 w-8 ml-1" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-4">
            <div className="flex items-center gap-2 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              <span>{isMuted ? "Sem áudio" : "Com áudio"}</span>
            </div>
          </div>

          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
              ▶️ Clique para começar a assistir
            </div>
          </div>
        </>
      ) : (
        <>
          <iframe
            ref={iframeRef}
            src={youtubeUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title="YouTube video player"
            style={{ border: "none" }}
          />

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 right-4 flex gap-2 pointer-events-auto">
              <Button
                onClick={toggleMute}
                size="sm"
                className="w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white p-0 backdrop-blur-sm"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>

            {isPlaying && (
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  REPRODUZINDO
                </div>
              </div>
            )}

            {canReview && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce">
                  ✓ Tempo Concluído - Pode Avaliar!
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
