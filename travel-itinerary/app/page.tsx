import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <MapPin className="w-5 h-5 text-rose-500" />
            <span>Pune Explorer</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/About" className="text-sm font-medium hover:underline underline-offset-4">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative py-24 bg-gradient-to-b from-rose-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Discover Pune & Beyond
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Plan the perfect itinerary to explore Pune's attractions, nearby treks, and beautiful Konkan beaches
                    with the most efficient routes.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/planner">
                    <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                      Start Planning
                    </Button>
                  </Link>
                  <Link href="/popular-routes">
                    <Button size="lg" variant="outline">
                      View Popular Routes
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
                  <img
                    src="/ttb.png?height=500&width=800&text=Pune%20and%20Surroundings"
                    alt="Map of Pune and surrounding attractions"
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Explore By Category</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the best attractions, treks, and beaches around India.
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-8 md:grid-cols-4 md:gap-8">
  {[
    { name: "City Attractions", image: "/city.jpg" },
    { name: "Nearby Treks", image: "/mntn.webp" },
    { name: "Beaches", image: "/beach.jpg" },
    { name: "Historical Forts", image: "/fort.jpg" },
  ].map((category) => (
    <a href="/planner" key={category.name} className="group relative h-60 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
      {/* Image */}
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />

      {/* Text */}
      <div className="absolute bottom-0 w-full p-4">
        <h3 className="text-xl font-bold text-white transition-opacity duration-300 group-hover:opacity-100 opacity-80">
          {category.name}
        </h3>
      </div>
    </a>
  ))}
</div>

          </div>
        </section>
        <section className="py-12 bg-gray-50 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create your perfect itinerary in just a few simple steps
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-8 md:grid-cols-3 md:gap-8">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600">
                  1
                </div>
                <h3 className="text-xl font-bold">Select Places</h3>
                <p className="text-gray-500 text-center">
                  Choose from a variety of attractions, treks, and beaches around Pune
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600">
                  2
                </div>
                <h3 className="text-xl font-bold">Optimize Route</h3>
                <p className="text-gray-500 text-center">
                  Our algorithm calculates the most efficient path between all your selected locations
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600">
                  3
                </div>
                <h3 className="text-xl font-bold">Enjoy Your Trip</h3>
                <p className="text-gray-500 text-center">
                  Get a detailed itinerary with travel times, distances, and recommendations
                </p>
              </div>
            </div>
          </div>
        </section>
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

