import { NextResponse } from "next/server"

// This would be a real API route that connects to the database
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || ""
  const search = searchParams.get("search") || ""

  try {
    // In a real app, this would query the database
    // const { rows } = await sql`
    //   SELECT id, name, category, description, distance, image, location
    //   FROM places
    //   WHERE
    //     (${category} = '' OR category = ${category})
    //     AND (name ILIKE ${`%${search}%`} OR description ILIKE ${`%${search}%`})
    //   ORDER BY
    //     CASE WHEN category = 'attraction' THEN 1
    //          WHEN category = 'trek' THEN 2
    //          WHEN category = 'beach' THEN 3
    //          ELSE 4
    //     END,
    //     name ASC
    //   LIMIT 50
    // `

    // For demo purposes, we're returning mock data
    const mockPlaces = [
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
      // ... more places would be here
    ]

    // Filter based on category and search term
    const filteredPlaces = mockPlaces.filter((place) => {
      const matchesCategory = !category || place.category === category
      const matchesSearch =
        !search ||
        place.name.toLowerCase().includes(search.toLowerCase()) ||
        place.description.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })

    return NextResponse.json(filteredPlaces)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 })
  }
}

