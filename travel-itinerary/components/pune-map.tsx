"use client"

import { useEffect, useRef } from "react"

interface Place {
  id: number
  name: string
  location: {
    lat: number
    lng: number
  }
}

interface PuneMapProps {
  selectedPlaces: Place[]
  startPlace: Place | null
  endPlace: Place | null
  optimizedRoute: any
  showRoute?: boolean
}

export function PuneMap({
  selectedPlaces = [],
  startPlace,
  endPlace,
  optimizedRoute,
  showRoute = false,
}: PuneMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const mapImage = new Image()
    mapImage.crossOrigin = "anonymous"
    mapImage.src = "/placeholder.svg?height=800&width=1200&text=Pune%20and%20Surroundings%20Map"

    // Normalized coordinates for places around Pune
    // In a real app, these would come from the database with actual lat/lng
    const placeCoordinates: Record<number, { x: number; y: number }> = {
      1: { x: 0.5, y: 0.5 }, // Pune City Center
      2: { x: 0.48, y: 0.48 }, // Shaniwar Wada
      3: { x: 0.52, y: 0.52 }, // Aga Khan Palace
      4: { x: 0.45, y: 0.45 }, // Dagdusheth Ganpati Temple
      5: { x: 0.55, y: 0.47 }, // Osho Ashram
      6: { x: 0.4, y: 0.35 }, // Sinhagad Fort
      7: { x: 0.3, y: 0.4 }, // Lavasa
      8: { x: 0.6, y: 0.3 }, // Lonavala
      9: { x: 0.65, y: 0.25 }, // Khandala
      10: { x: 0.7, y: 0.35 }, // Karla Caves
      11: { x: 0.25, y: 0.6 }, // Panshet Dam
      12: { x: 0.35, y: 0.65 }, // Khadakwasla Dam
      13: { x: 0.2, y: 0.2 }, // Rajmachi Trek
      14: { x: 0.75, y: 0.2 }, // Lohagad Fort
      15: { x: 0.8, y: 0.3 }, // Bhaja Caves
      16: { x: 0.15, y: 0.7 }, // Alibaug Beach
      17: { x: 0.1, y: 0.75 }, // Kashid Beach
      18: { x: 0.05, y: 0.8 }, // Murud Beach
      19: { x: 0.2, y: 0.8 }, // Harihareshwar Beach
      20: { x: 0.3, y: 0.2 }, // Rajgad Fort
    }

    mapImage.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw map
      ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height)

      // Draw places
      selectedPlaces.forEach((place) => {
        const coords = placeCoordinates[place.id] || {
          x: place.location?.lat / 100 || 0.5,
          y: place.location?.lng / 100 || 0.5,
        }

        const x = coords.x * canvas.width
        const y = coords.y * canvas.height

        // Draw place dot
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, 2 * Math.PI)
        ctx.fillStyle = "#f43f5e" // rose-500
        ctx.fill()

        // Draw place name
        ctx.font = "12px Arial"
        ctx.fillStyle = "#000"
        ctx.textAlign = "center"
        ctx.fillText(place.name, x, y - 15)
      })

      // Highlight start and end places
      if (startPlace) {
        const coords = placeCoordinates[startPlace.id] || {
          x: startPlace.location?.lat / 100 || 0.5,
          y: startPlace.location?.lng / 100 || 0.5,
        }

        const x = coords.x * canvas.width
        const y = coords.y * canvas.height

        ctx.beginPath()
        ctx.arc(x, y, 12, 0, 2 * Math.PI)
        ctx.strokeStyle = "#22c55e" // green-500
        ctx.lineWidth = 3
        ctx.stroke()
      }

      if (endPlace) {
        const coords = placeCoordinates[endPlace.id] || {
          x: endPlace.location?.lat / 100 || 0.5,
          y: endPlace.location?.lng / 100 || 0.5,
        }

        const x = coords.x * canvas.width
        const y = coords.y * canvas.height

        ctx.beginPath()
        ctx.arc(x, y, 12, 0, 2 * Math.PI)
        ctx.strokeStyle = "#ef4444" // red-500
        ctx.lineWidth = 3
        ctx.stroke()
      }

      // Draw route if available and showRoute is true
      if (showRoute && optimizedRoute && optimizedRoute.path) {
        ctx.beginPath()

        optimizedRoute.path.forEach((placeId: number, index: number) => {
          const place = selectedPlaces.find((p) => p.id === placeId)
          if (!place) return

          const coords = placeCoordinates[placeId] || {
            x: place.location?.lat / 100 || 0.5,
            y: place.location?.lng / 100 || 0.5,
          }

          const x = coords.x * canvas.width
          const y = coords.y * canvas.height

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.strokeStyle = "#3b82f6" // blue-500
        ctx.lineWidth = 3
        ctx.stroke()
      }
    }
  }, [selectedPlaces, startPlace, endPlace, optimizedRoute, showRoute])

  return <canvas ref={canvasRef} width={1200} height={800} className="w-full h-full" />
}

