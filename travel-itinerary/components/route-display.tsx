"use client"
import { ArrowRight, Clock } from "lucide-react"

interface RouteDisplayProps {
  route: {
    path: number[]
    places: any[]
    distances: number[]
    totalDistance: number
    estimatedTimes?: number[]
  }
}

export function RouteDisplay({ route }: RouteDisplayProps) {
  if (!route || !route.path || !route.places || !route.distances) {
    return <div>No route data available</div>
  }

  const totalDistance = route.distances.reduce((sum, distance) => sum + distance, 0)

  // Estimate travel time (rough calculation)
  const averageSpeedKmh = 40 // Average speed in km/h (slower for local travel)
  const totalTimeHours = totalDistance / averageSpeedKmh

  const days = Math.floor(totalTimeHours / 8) // Assuming 8 hours of travel per day
  const hours = Math.floor(totalTimeHours % 8)
  const minutes = Math.floor((totalTimeHours % 1) * 60)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Total Distance</h3>
          <p className="text-2xl font-bold">{totalDistance.toFixed(1)} km</p>
        </div>
        <div>
          <h3 className="font-medium">Estimated Travel Time</h3>
          <p className="text-2xl font-bold">
            {days > 0 ? `${days}d ` : ""}
            {hours > 0 ? `${hours}h ` : ""}
            {minutes}m
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Route Itinerary</h3>

        <div className="space-y-2">
          {route.path.map((placeId, index) => {
            const place = route.places.find((p) => p.id === placeId)
            if (!place) return null

            const isLast = index === route.path.length - 1
            const distance = !isLast ? route.distances[index] : null
            const time = route.estimatedTimes && !isLast ? route.estimatedTimes[index] : null

            return (
              <div key={`step-${index}`} className="space-y-1">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-100 text-rose-600">
                    {index + 1}
                  </div>
                  <div className="ml-3 font-medium">{place.name}</div>
                </div>

                {!isLast && (
                  <div className="flex items-center ml-4 pl-4 border-l border-dashed border-gray-300">
                    <div className="flex items-center mr-4">
                      <ArrowRight className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">{distance.toFixed(1)} km</span>
                    </div>

                    {time && (
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-500">{Math.floor(time)}m</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="space-y-2 mt-6">
        <h3 className="font-medium">Travel Tips</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• Best time to visit treks around Pune is during monsoon (June-September)</li>
          <li>• Konkan beaches are ideal during winter months (November-February)</li>
          <li>• Carry sufficient water and snacks for treks</li>
          <li>• Check weather conditions before heading to hill stations</li>
          <li>• Consider traffic conditions when planning city attractions</li>
        </ul>
      </div>
    </div>
  )
}

