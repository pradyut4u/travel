// This file would contain API functions to interact with the backend
// For this demo, we're using mock data

interface City {
  id: number
  name: string
  state: string
}

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

export async function fetchCities(searchTerm = ""): Promise<City[]> {
  // In a real app, this would be an API call
  // For demo purposes, we're returning mock data

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // This would be replaced with actual API call
  // return fetch(`/api/cities?search=${searchTerm}`).then(res => res.json());

  const mockCities: City[] = [
    { id: 1, name: "Delhi", state: "Delhi" },
    { id: 2, name: "Mumbai", state: "Maharashtra" },
    { id: 3, name: "Kolkata", state: "West Bengal" },
    { id: 4, name: "Chennai", state: "Tamil Nadu" },
    { id: 5, name: "Bangalore", state: "Karnataka" },
    { id: 6, name: "Hyderabad", state: "Telangana" },
    { id: 7, name: "Ahmedabad", state: "Gujarat" },
    { id: 8, name: "Pune", state: "Maharashtra" },
    { id: 9, name: "Jaipur", state: "Rajasthan" },
    { id: 10, name: "Lucknow", state: "Uttar Pradesh" },
    { id: 11, name: "Agra", state: "Uttar Pradesh" },
    { id: 12, name: "Varanasi", state: "Uttar Pradesh" },
    { id: 13, name: "Goa", state: "Goa" },
    { id: 14, name: "Amritsar", state: "Punjab" },
    { id: 15, name: "Udaipur", state: "Rajasthan" },
  ]

  if (!searchTerm) {
    return mockCities
  }

  return mockCities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.state.toLowerCase().includes(searchTerm.toLowerCase()),
  )
}

export async function fetchPlaces(category = "", searchTerm = ""): Promise<Place[]> {
  // In a real app, this would be an API call
  // For demo purposes, we're returning mock data

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // This would be replaced with actual API call
  // return fetch(`/api/places?category=${category}&search=${searchTerm}`).then(res => res.json());

  const mockPlaces: Place[] = [
    // City Attractions
    {
      id: 1,
      name: "Shaniwar Wada",
      category: "attraction",
      description: "Historic fortification in the city of Pune, built in 1732 and the seat of the Peshwas.",
      distance: "City Center",
      image: "/placeholder.svg?height=200&width=400&text=Shaniwar%20Wada",
      location: { lat: 48, lng: 48 },
    },
    {
      id: 2,
      name: "Aga Khan Palace",
      category: "attraction",
      description:
        "Built by Sultan Muhammed Shah Aga Khan III, it's a historical landmark associated with India's freedom movement.",
      distance: "7.8 km",
      image: "/placeholder.svg?height=200&width=400&text=Aga%20Khan%20Palace",
      location: { lat: 52, lng: 52 },
    },
    {
      id: 3,
      name: "Dagdusheth Ganpati Temple",
      category: "attraction",
      description: "Popular Hindu temple dedicated to Lord Ganesha, one of the most visited temples in Maharashtra.",
      distance: "3.2 km",
      image: "/placeholder.svg?height=200&width=400&text=Dagdusheth%20Temple",
      location: { lat: 45, lng: 45 },
    },
    {
      id: 4,
      name: "Osho Ashram",
      category: "attraction",
      description:
        "International meditation resort founded by Osho, offering various meditation techniques and workshops.",
      distance: "5.5 km",
      image: "/placeholder.svg?height=200&width=400&text=Osho%20Ashram",
      location: { lat: 55, lng: 47 },
    },
    {
      id: 5,
      name: "Pataleshwar Cave Temple",
      category: "attraction",
      description: "Ancient rock-cut cave temple dedicated to Lord Shiva, dating back to the 8th century.",
      distance: "4 km",
      image: "/placeholder.svg?height=200&width=400&text=Pataleshwar%20Cave",
      location: { lat: 49, lng: 51 },
    },

    // Treks
    {
      id: 6,
      name: "Sinhagad Fort",
      category: "trek",
      description:
        "Historic fortress offering panoramic views after a moderate trek, located on a hill about 25 km from Pune.",
      distance: "25 km",
      image: "/placeholder.svg?height=200&width=400&text=Sinhagad%20Fort",
      location: { lat: 40, lng: 35 },
    },
    {
      id: 7,
      name: "Rajmachi Trek",
      category: "trek",
      description: "Popular trek near Lonavala with two fortresses, offering stunning views of the Sahyadri mountains.",
      distance: "80 km",
      image: "/placeholder.svg?height=200&width=400&text=Rajmachi%20Trek",
      location: { lat: 20, lng: 20 },
    },
    {
      id: 8,
      name: "Torna Fort",
      category: "trek",
      description:
        "The first fort captured by Shivaji Maharaj, offering a challenging trek with historical significance.",
      distance: "50 km",
      image: "/placeholder.svg?height=200&width=400&text=Torna%20Fort",
      location: { lat: 35, lng: 30 },
    },
    {
      id: 9,
      name: "Lohagad Fort",
      category: "trek",
      description: "One of the most accessible forts near Pune, offering an easy trek with beautiful views.",
      distance: "65 km",
      image: "/placeholder.svg?height=200&width=400&text=Lohagad%20Fort",
      location: { lat: 75, lng: 20 },
    },
    {
      id: 10,
      name: "Rajgad Fort",
      category: "trek",
      description:
        "Former capital of the Maratha Empire, offering a moderate to difficult trek with historical importance.",
      distance: "40 km",
      image: "/placeholder.svg?height=200&width=400&text=Rajgad%20Fort",
      location: { lat: 30, lng: 20 },
    },

    // Beaches
    {
      id: 11,
      name: "Alibaug Beach",
      category: "beach",
      description: "Popular beach town with a clean shoreline and the famous Kolaba Fort just offshore.",
      distance: "150 km",
      image: "/placeholder.svg?height=200&width=400&text=Alibaug%20Beach",
      location: { lat: 15, lng: 70 },
    },
    {
      id: 12,
      name: "Kashid Beach",
      category: "beach",
      description:
        "White sand beach known for its clean water and peaceful environment, perfect for a weekend getaway.",
      distance: "180 km",
      image: "/placeholder.svg?height=200&width=400&text=Kashid%20Beach",
      location: { lat: 10, lng: 75 },
    },
    {
      id: 13,
      name: "Murud Beach",
      category: "beach",
      description: "Beautiful beach with the historic Janjira Fort nearby, offering a mix of history and relaxation.",
      distance: "190 km",
      image: "/placeholder.svg?height=200&width=400&text=Murud%20Beach",
      location: { lat: 5, lng: 80 },
    },
    {
      id: 14,
      name: "Harihareshwar Beach",
      category: "beach",
      description: "Serene beach known as the 'temple beach' with the famous Harihareshwar Temple nearby.",
      distance: "170 km",
      image: "/placeholder.svg?height=200&width=400&text=Harihareshwar",
      location: { lat: 20, lng: 80 },
    },
    {
      id: 15,
      name: "Diveagar Beach",
      category: "beach",
      description: "Pristine beach known for its clean water, white sand, and the Suvarna Ganesh Temple.",
      distance: "160 km",
      image: "/placeholder.svg?height=200&width=400&text=Diveagar%20Beach",
      location: { lat: 18, lng: 75 },
    },

    // Forts
    {
      id: 16,
      name: "Purandar Fort",
      category: "fort",
      description: "Historic fort where the Treaty of Purandar was signed between Shivaji and the Mughals.",
      distance: "45 km",
      image: "/placeholder.svg?height=200&width=400&text=Purandar%20Fort",
      location: { lat: 42, lng: 60 },
    },
    {
      id: 17,
      name: "Shivneri Fort",
      category: "fort",
      description: "Birthplace of Chhatrapati Shivaji Maharaj, offering historical significance and scenic views.",
      distance: "95 km",
      image: "/placeholder.svg?height=200&width=400&text=Shivneri%20Fort",
      location: { lat: 25, lng: 40 },
    },
    {
      id: 18,
      name: "Pratapgad Fort",
      category: "fort",
      description:
        "Mountain fort where the famous Battle of Pratapgad was fought, offering stunning views of the Sahyadris.",
      distance: "110 km",
      image: "/placeholder.svg?height=200&width=400&text=Pratapgad%20Fort",
      location: { lat: 15, lng: 35 },
    },
    {
      id: 19,
      name: "Raigad Fort",
      category: "fort",
      description: "Capital fort of the Maratha Empire, accessible by ropeway and offering rich historical insights.",
      distance: "130 km",
      image: "/placeholder.svg?height=200&width=400&text=Raigad%20Fort",
      location: { lat: 12, lng: 60 },
    },
    {
      id: 20,
      name: "Tikona Fort",
      category: "fort",
      description: "Triangular fort offering a moderate trek and panoramic views of Pawna Lake and surrounding forts.",
      distance: "55 km",
      image: "/placeholder.svg?height=200&width=400&text=Tikona%20Fort",
      location: { lat: 38, lng: 28 },
    },
  ]

  // Filter based on category and search term
  return mockPlaces.filter((place) => {
    const matchesCategory = !category || category === "all" || place.category === category
    const matchesSearch =
      !searchTerm ||
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })
}

export async function saveTrip(tripData: any): Promise<{ success: boolean; id?: string }> {
  // In a real app, this would be an API call to save the trip to the database
  // For demo purposes, we're just simulating success

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // This would be replaced with actual API call
  // return fetch('/api/trips', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(tripData)
  // }).then(res => res.json());

  return {
    success: true,
    id: "trip_" + Math.random().toString(36).substr(2, 9),
  }
}

