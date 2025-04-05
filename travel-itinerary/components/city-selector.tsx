"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { fetchCities } from "@/lib/api"

export function CitySelector({ onSelectCity }) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCity, setSelectedCity] = useState(null)

  useEffect(() => {
    const loadCities = async () => {
      setLoading(true)
      try {
        // In a real app, this would fetch from the API with the search term
        const data = await fetchCities(searchTerm)
        setCities(data)
      } catch (error) {
        console.error("Error loading cities:", error)
      } finally {
        setLoading(false)
      }
    }

    // Mock data for demonstration
    setCities([
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
    ])
    setLoading(false)

    // In a real app, you would use this:
    // const timer = setTimeout(loadCities, 300)
    // return () => clearTimeout(timer)
  }, [searchTerm])

  const handleSelectCity = (city) => {
    setSelectedCity(city)
    setOpen(false)
    onSelectCity(city)
    setSelectedCity(null)
  }

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.state.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedCity ? selectedCity.name : "Select a city..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search cities..." value={searchTerm} onValueChange={setSearchTerm} />
            {loading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <CommandList>
                <CommandEmpty>No cities found.</CommandEmpty>
                <CommandGroup className="max-h-60 overflow-y-auto">
                  {filteredCities.map((city) => (
                    <CommandItem key={city.id} value={city.name} onSelect={() => handleSelectCity(city)}>
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedCity?.id === city.id ? "opacity-100" : "opacity-0")}
                      />
                      <span>{city.name}</span>
                      <span className="ml-2 text-sm text-gray-500">{city.state}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

