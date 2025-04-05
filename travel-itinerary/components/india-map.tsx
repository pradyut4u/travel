"use client"

import { useEffect, useRef } from "react"

export function IndiaMap({ selectedCities = [], startCity, endCity, optimizedRoute, showRoute = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const mapImage = new Image()
    mapImage.crossOrigin = "anonymous"
    mapImage.src = "/placeholder.svg?height=600&width=600&text=India Map"

    // City coordinates (normalized to 0-1 range)
    // In a real app, these would come from the database
    const cityCoordinates = {
      1: { x: 0.45, y: 0.25 }, // Delhi
      2: { x: 0.25, y: 0.55 }, // Mumbai
      3: { x: 0.65, y: 0.55 }, // Kolkata
      4: { x: 0.55, y: 0.75 }, // Chennai
      5: { x: 0.35, y: 0.65 }, // Bangalore
      6: { x: 0.45, y: 0.55 }, // Hyderabad
      7: { x: 0.2, y: 0.35 }, // Ahmedabad
      8: { x: 0.3, y: 0.6 }, // Pune
      9: { x: 0.35, y: 0.35 }, // Jaipur
      10: { x: 0.5, y: 0.35 }, // Lucknow
      11: { x: 0.45, y: 0.3 }, // Agra
      12: { x: 0.55, y: 0.4 }, // Varanasi
      13: { x: 0.2, y: 0.65 }, // Goa
      14: { x: 0.35, y: 0.2 }, // Amritsar
      15: { x: 0.3, y: 0.4 }, // Udaipur
    }

    mapImage.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw map
      ctx.drawImage(mapImage, 0, 0, canvas.width, canvas.height)

      // Draw cities
      selectedCities.forEach((city) => {
        const coords = cityCoordinates[city.id]
        if (!coords) return

        const x = coords.x * canvas.width
        const y = coords.y * canvas.height

        // Draw city dot
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, 2 * Math.PI)
        ctx.fillStyle = "#f43f5e" // rose-500
        ctx.fill()

        // Draw city name
        ctx.font = "12px Arial"
        ctx.fillStyle = "#000"
        ctx.textAlign = "center"
        ctx.fillText(city.name, x, y - 15)
      })

      // Highlight start and end cities
      if (startCity && cityCoordinates[startCity.id]) {
        const coords = cityCoordinates[startCity.id]
        const x = coords.x * canvas.width
        const y = coords.y * canvas.height

        ctx.beginPath()
        ctx.arc(x, y, 12, 0, 2 * Math.PI)
        ctx.strokeStyle = "#22c55e" // green-500
        ctx.lineWidth = 3
        ctx.stroke()
      }

      if (endCity && cityCoordinates[endCity.id]) {
        const coords = cityCoordinates[endCity.id]
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

        optimizedRoute.path.forEach((cityId, index) => {
          const coords = cityCoordinates[cityId]
          if (!coords) return

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
  }, [selectedCities, startCity, endCity, optimizedRoute, showRoute])

  return <canvas ref={canvasRef} width={600} height={600} className="w-full h-full" />
}

