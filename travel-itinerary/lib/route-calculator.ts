// This is a simplified implementation of the Traveling Salesman Problem (TSP)
// In a real application, you would use a more sophisticated algorithm
// or a third-party service for route optimization

interface Place {
  id: number
  name: string
  category: string
  location: {
    lat: number
    lng: number
  }
}

interface RouteResult {
  path: number[]
  places: Place[]
  distances: number[]
  estimatedTimes: number[]
  totalDistance: number
}

// Mock distance matrix between places (in km)
// In a real app, this would come from the database or a distance matrix API
const distanceMatrix: Record<number, Record<number, number>> = {
  // Pune City Center (1)
  "1": {
    "2": 2.5, // to Shaniwar Wada
    "3": 7.8, // to Aga Khan Palace
    "4": 3.2, // to Dagdusheth Ganpati Temple
    "5": 5.5, // to Osho Ashram
    "6": 25.0, // to Sinhagad Fort
    "7": 57.0, // to Lavasa
    "8": 67.0, // to Lonavala
    "9": 70.0, // to Khandala
    "10": 60.0, // to Karla Caves
    "11": 45.0, // to Panshet Dam
    "12": 20.0, // to Khadakwasla Dam
    "13": 80.0, // to Rajmachi Trek
    "14": 65.0, // to Lohagad Fort
    "15": 58.0, // to Bhaja Caves
    "16": 150.0, // to Alibaug Beach
    "17": 180.0, // to Kashid Beach
    "18": 190.0, // to Murud Beach
    "19": 170.0, // to Harihareshwar Beach
    "20": 40.0, // to Rajgad Fort
  },
  // Add more distances for other places...
  // For brevity, we're only showing distances from Pune City Center
  // In a real app, you would have a complete distance matrix
}

// Helper function to get distance between two places
function getDistance(placeId1: number, placeId2: number): number {
  const id1 = placeId1.toString()
  const id2 = placeId2.toString()

  if (id1 === id2) return 0

  if (distanceMatrix[id1] && distanceMatrix[id1][id2]) {
    return distanceMatrix[id1][id2]
  }

  if (distanceMatrix[id2] && distanceMatrix[id2][id1]) {
    return distanceMatrix[id2][id1]
  }

  // If distance is not found, use a default approximation
  // In a real app, you would calculate this or fetch from an API
  return 30 // Default 30km if unknown
}

// Nearest neighbor algorithm for TSP
function nearestNeighborTSP(places: Place[], startPlaceId?: number | null, endPlaceId?: number | null): RouteResult {
  if (places.length < 2) {
    throw new Error("At least 2 places are required for route optimization")
  }

  const placeIds = places.map((place) => place.id)
  const path: number[] = []
  const distances: number[] = []
  const estimatedTimes: number[] = []
  let totalDistance = 0

  // Set starting place
  let currentPlaceId: number
  if (startPlaceId && placeIds.includes(startPlaceId)) {
    currentPlaceId = startPlaceId
  } else {
    currentPlaceId = placeIds[0]
  }

  path.push(currentPlaceId)

  // Create a set of unvisited places
  const unvisited = new Set(placeIds.filter((id) => id !== currentPlaceId))

  // If end place is specified, remove it from regular processing
  if (endPlaceId && placeIds.includes(endPlaceId) && endPlaceId !== currentPlaceId) {
    unvisited.delete(endPlaceId)
  }

  // Visit each place using nearest neighbor algorithm
  while (unvisited.size > 0) {
    let nearestPlaceId: number | null = null
    let shortestDistance = Number.POSITIVE_INFINITY

    // Find the nearest unvisited place
    for (const placeId of unvisited) {
      const distance = getDistance(currentPlaceId, placeId)
      if (distance < shortestDistance) {
        shortestDistance = distance
        nearestPlaceId = placeId
      }
    }

    if (nearestPlaceId === null) {
      break
    }

    // Add the nearest place to the path
    path.push(nearestPlaceId)
    distances.push(shortestDistance)

    // Estimate travel time in minutes (assuming average speed of 40 km/h)
    const timeInMinutes = (shortestDistance / 40) * 60
    estimatedTimes.push(timeInMinutes)

    totalDistance += shortestDistance

    // Update current place and remove from unvisited
    currentPlaceId = nearestPlaceId
    unvisited.delete(nearestPlaceId)
  }

  // Add the end place if specified
  if (endPlaceId && placeIds.includes(endPlaceId) && !path.includes(endPlaceId)) {
    const lastPlaceId = path[path.length - 1]
    const distance = getDistance(lastPlaceId, endPlaceId)

    path.push(endPlaceId)
    distances.push(distance)

    // Estimate travel time in minutes
    const timeInMinutes = (distance / 40) * 60
    estimatedTimes.push(timeInMinutes)

    totalDistance += distance
  }

  return {
    path,
    places,
    distances,
    estimatedTimes,
    totalDistance,
  }
}

export async function calculateRoute(
  places: Place[],
  startPlace: Place | null = null,
  endPlace: Place | null = null,
): Promise<RouteResult> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const startPlaceId = startPlace ? startPlace.id : null
    const endPlaceId = endPlace ? endPlace.id : null

    return nearestNeighborTSP(places, startPlaceId, endPlaceId)
  } catch (error) {
    console.error("Error calculating route:", error)
    throw new Error("Failed to calculate optimal route")
  }
}

