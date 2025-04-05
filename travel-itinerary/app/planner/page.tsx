"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, X, RotateCw, Save } from "lucide-react"
import { PuneMap } from "@/components/pune-map"
import { PlaceCard } from "@/components/place-card"
import { RouteDisplay } from "@/components/route-display"
import { calculateRoute } from "@/lib/route-calculator"
import { fetchPlaces } from "@/lib/api"

// Define place type
interface Place {
  id: number
  name: string
  category: string
  description: string
  distance: string
  image: string
  location: {
    lat: number
    lng: number
  }
}

export default function PlannerPage() {
  const [places, setPlaces] = useState<Place[]>([])
  const [selectedPlaces, setSelectedPlaces] = useState<Place[]>([])
  const [startPlace, setStartPlace] = useState<Place | null>(null)
  const [endPlace, setEndPlace] = useState<Place | null>(null)
  const [optimizedRoute, setOptimizedRoute] = useState(null)
  const [tripName, setTripName] = useState("")
  const [activeTab, setActiveTab] = useState("select")
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const data = await fetchPlaces()
        setPlaces(data)
      } catch (error) {
        console.error("Error loading places:", error)
      }
    }

    loadPlaces()
  }, [])

  const handleAddPlace = (place: Place) => {
    if (!selectedPlaces.find((p) => p.id === place.id)) {
      setSelectedPlaces([...selectedPlaces, place])
    }
  }

  const handleRemovePlace = (placeId: number) => {
    setSelectedPlaces(selectedPlaces.filter((place) => place.id !== placeId))

    if (startPlace?.id === placeId) {
      setStartPlace(null)
    }

    if (endPlace?.id === placeId) {
      setEndPlace(null)
    }
  }

  const handleSetStartPlace = (place: Place) => {
    setStartPlace(place)
  }

  const handleSetEndPlace = (place: Place) => {
    setEndPlace(place)
  }

  const handleOptimizeRoute = async () => {
    if (selectedPlaces.length < 2) {
      alert("Please select at least 2 places")
      return
    }

    try {
      // In a real app, this would be an API call
      const route = await calculateRoute(selectedPlaces, startPlace, endPlace)
      setOptimizedRoute(route)
      setActiveTab("route")
    } catch (error) {
      console.error("Error optimizing route:", error)
      alert("Failed to optimize route. Please try again.")
    }
  }

  const handleSaveTrip = async () => {
    if (!tripName.trim()) {
      alert("Please enter a trip name")
      return
    }

    if (!optimizedRoute) {
      alert("Please optimize your route first")
      return
    }

    try {
      // In a real app, this would be an API call to save the trip
      alert(`Trip "${tripName}" saved successfully!`)
    } catch (error) {
      console.error("Error saving trip:", error)
      alert("Failed to save trip. Please try again.")
    }
  }

  const filteredPlaces = places.filter((place) => {
    const matchesCategory = activeCategory === "all" || place.category === activeCategory
    const matchesSearch =
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <MapPin className="w-5 h-5 text-rose-500" />
            <span>Pune Explorer</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Plan Your Trip</h1>
            <p className="text-gray-500">Create your custom itinerary around Pune</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="select">Select Places</TabsTrigger>
              <TabsTrigger value="route" disabled={!optimizedRoute}>
                View Route
              </TabsTrigger>
            </TabsList>

            <TabsContent value="select" className="mt-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Explore Places</CardTitle>
                      <CardDescription>Choose attractions, treks, and beaches to visit</CardDescription>

                      <div className="flex flex-col gap-4 mt-4">
                        <Input
                          placeholder="Search places..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant={activeCategory === "all" ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setActiveCategory("all")}
                          >
                            All
                          </Badge>
                          <Badge
                            variant={activeCategory === "attraction" ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setActiveCategory("attraction")}
                          >
                            City Attractions
                          </Badge>
                          <Badge
                            variant={activeCategory === "trek" ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setActiveCategory("trek")}
                          >
                            Treks
                          </Badge>
                          <Badge
                            variant={activeCategory === "beach" ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setActiveCategory("beach")}
                          >
                            Beaches
                          </Badge>
                          <Badge
                            variant={activeCategory === "fort" ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setActiveCategory("fort")}
                          >
                            Forts
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredPlaces.length === 0 ? (
                          <p className="text-gray-500 col-span-full">No places found matching your criteria</p>
                        ) : (
                          filteredPlaces.map((place) => (
                            <PlaceCard
                              key={place.id}
                              place={place}
                              onAddPlace={handleAddPlace}
                              isSelected={selectedPlaces.some((p) => p.id === place.id)}
                            />
                          ))
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <Card className="sticky top-4">
                    <CardHeader>
                      <CardTitle>Your Itinerary</CardTitle>
                      <CardDescription>
                        {selectedPlaces.length === 0
                          ? "Select places to add to your itinerary"
                          : `${selectedPlaces.length} places selected`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {selectedPlaces.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 border-2 border-dashed rounded-md">
                          <p className="text-sm text-gray-500">Click on places to add them to your itinerary</p>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                          {selectedPlaces.map((place) => (
                            <div key={place.id} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-rose-500" />
                                <span className="text-sm font-medium">{place.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`px-2 ${startPlace?.id === place.id ? "bg-green-100" : ""}`}
                                  onClick={() => handleSetStartPlace(place)}
                                >
                                  Start
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className={`px-2 ${endPlace?.id === place.id ? "bg-red-100" : ""}`}
                                  onClick={() => handleSetEndPlace(place)}
                                >
                                  End
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleRemovePlace(place.id)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <Button
                        className="w-full mt-6 bg-rose-600 hover:bg-rose-700"
                        onClick={handleOptimizeRoute}
                        disabled={selectedPlaces.length < 2}
                      >
                        <RotateCw className="w-4 h-4 mr-2" />
                        Optimize Route
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Map Preview</CardTitle>
                  <CardDescription>View your selected places</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] rounded-md border overflow-hidden">
                    <PuneMap
                      selectedPlaces={selectedPlaces}
                      startPlace={startPlace}
                      endPlace={endPlace}
                      optimizedRoute={optimizedRoute}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="route" className="mt-6">
              {optimizedRoute && (
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Optimized Route</CardTitle>
                      <CardDescription>The most efficient path for your journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RouteDisplay route={optimizedRoute} />

                      <div className="mt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="trip-name">Trip Name</Label>
                          <Input
                            id="trip-name"
                            placeholder="Enter a name for your trip"
                            value={tripName}
                            onChange={(e) => setTripName(e.target.value)}
                          />
                        </div>

                        <Button className="w-full" onClick={handleSaveTrip}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Trip
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Route Map</CardTitle>
                      <CardDescription>Visual representation of your journey</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] rounded-md border overflow-hidden">
                        <PuneMap
                          selectedPlaces={selectedPlaces}
                          startPlace={startPlace}
                          endPlace={endPlace}
                          optimizedRoute={optimizedRoute}
                          showRoute={true}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 px-4 py-6 mx-auto md:px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-semibold">Pune Explorer</span>
          </div>
          <p className="text-sm text-gray-500">© 2025 Pune Explorer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

