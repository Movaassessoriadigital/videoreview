"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, CheckCircle, Play } from "lucide-react"

interface Video {
  id: number
  title: string
  thumbnail: string
  videoId: string
  duration: number
  reward: number
  category: string
  completed: boolean
}

interface VideoCardProps {
  video: Video
  onClick: () => void
  isActive?: boolean
  isCompleted?: boolean
  position?: number
}

export default function VideoCard({ video, onClick, isActive = false, isCompleted = false, position }: VideoCardProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card
      className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
        isActive ? "ring-2 ring-blue-500 bg-blue-50" : isCompleted ? "bg-green-50 border-green-200" : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-2 sm:p-3">
        <div className="flex gap-3">
          <div className="relative flex-shrink-0">
            <img
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              className="w-16 h-12 sm:w-20 sm:h-14 object-cover rounded-lg"
            />

            <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
              {isCompleted ? (
                <CheckCircle className="h-6 w-6 text-green-400" />
              ) : (
                <Play className="h-5 w-5 text-white" />
              )}
            </div>

            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
              {formatTime(video.duration)}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-medium text-sm text-gray-800 line-clamp-2 leading-tight">{video.title}</h3>
              {position && (
                <Badge variant="outline" className="text-xs px-2 py-0 flex-shrink-0">
                  #{position}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">{video.category}</Badge>

              <div className="flex items-center gap-1 text-green-600">
                <DollarSign className="h-3 w-3" />
                <span className="font-bold text-sm">R$ {video.reward.toFixed(2)}</span>
              </div>
            </div>

            {isCompleted && (
              <div className="mt-2 flex items-center gap-1 text-green-600 text-xs">
                <CheckCircle className="h-3 w-3" />
                <span className="font-medium">Avaliado com sucesso</span>
              </div>
            )}

            {isActive && (
              <div className="mt-2 flex items-center gap-1 text-blue-600 text-xs">
                <Clock className="h-3 w-3" />
                <span className="font-medium">Reproduzindo agora...</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
