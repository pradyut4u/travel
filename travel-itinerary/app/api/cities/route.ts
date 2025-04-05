import { NextResponse } from "next/server"

// This would be a real API route that connects to the database
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search") || ""

  try {
    // In a real app, this would query the database
    // const { rows } = await sql`
    //   SELECT id, name, state
    //   FROM cities
    //   WHERE name ILIKE ${`%${search}%`} OR state ILIKE ${`%${search}%`}
    //   ORDER BY name ASC
    //   LIMIT 50
    // `

    // For demo purposes, we're returning mock data
    const mockCities = [
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

    const filteredCities = search
      ? mockCities.filter(
          (city) =>
            city.name.toLowerCase().includes(search.toLowerCase()) ||
            city.state.toLowerCase().includes(search.toLowerCase()),
        )
      : mockCities

    return NextResponse.json(filteredCities)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch cities" }, { status: 500 })
  }
}

