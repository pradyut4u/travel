import { NextResponse } from "next/server"

// This would be a real API route that saves trips to the database
export async function POST(request: Request) {
  try {
    const { name, userId, route } = await request.json()

    if (!name || !route) {
      return NextResponse.json({ error: "Name and route are required" }, { status: 400 })
    }

    // In a real app, this would save to the database
    // const { rows } = await sql`
    //   INSERT INTO trips (name, user_id, route_data)
    //   VALUES (${name}, ${userId || null}, ${JSON.stringify(route)})
    //   RETURNING id
    // `

    // For demo purposes, we're returning a mock response
    const tripId = "trip_" + Math.random().toString(36).substr(2, 9)

    return NextResponse.json({
      success: true,
      id: tripId,
    })
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to save trip" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  try {
    // In a real app, this would query the database
    // const { rows } = await sql`
    //   SELECT id, name, created_at, route_data
    //   FROM trips
    //   WHERE user_id = ${userId}
    //   ORDER BY created_at DESC
    // `

    // For demo purposes, we're returning mock data
    const mockTrips = [
      {
        id: "trip_1",
        name: "Golden Triangle Tour",
        created_at: "2025-03-15T10:30:00Z",
        route_data: {
          path: [1, 9, 11],
          cities: [
            { id: 1, name: "Delhi", state: "Delhi" },
            { id: 9, name: "Jaipur", state: "Rajasthan" },
            { id: 11, name: "Agra", state: "Uttar Pradesh" },
          ],
          distances: [270, 240],
          totalDistance: 510,
        },
      },
      {
        id: "trip_2",
        name: "South India Explorer",
        created_at: "2025-02-20T14:15:00Z",
        route_data: {
          path: [4, 5, 6],
          cities: [
            { id: 4, name: "Chennai", state: "Tamil Nadu" },
            { id: 5, name: "Bangalore", state: "Karnataka" },
            { id: 6, name: "Hyderabad", state: "Telangana" },
          ],
          distances: [350, 570],
          totalDistance: 920,
        },
      },
    ]

    return NextResponse.json(mockTrips)
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json({ error: "Failed to fetch trips" }, { status: 500 })
  }
}

