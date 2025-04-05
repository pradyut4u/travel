"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Check, MapPin } from "lucide-react"

interface Place {
  id: number
  name: string
  category: string
  description: string
  distance: string
  image: string
}

interface PlaceCardProps {
  place: Place
  onAddPlace: (place: Place) => void
  isSelected: boolean
}

export function PlaceCard({ place, onAddPlace, isSelected }: PlaceCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "attraction":
        return "bg-blue-100 text-blue-800"
      case "trek":
        return "bg-green-100 text-green-800"
      case "beach":
        return "bg-cyan-100 text-cyan-800"
      case "fort":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "attraction":
        return "Attraction"
      case "trek":
        return "Trek"
      case "beach":
        return "Beach"
      case "fort":
        return "Fort"
      default:
        return category
    }
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-40">
        <img
          src={place.image || `/placeholder.svg?height=200&width=400&text=${place.name}`}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <Badge className={`absolute top-2 right-2 ${getCategoryColor(place.category)}`} variant="outline">
          {getCategoryName(place.category)}
        </Badge>
      </div>
      <CardContent className="pt-4 flex-grow">
        <h3 className="font-bold text-lg mb-1">{place.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{place.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{place.distance} from Pune</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          className={isSelected ? "bg-green-600 hover:bg-green-700 w-full" : "bg-rose-600 hover:bg-rose-700 w-full"}
          onClick={() => onAddPlace(place)}
          disabled={isSelected}
        >
          {isSelected ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Added to Itinerary
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add to Itinerary
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

