import React from 'react';
import { MapPin } from "lucide-react"
import Link from "next/link"

const AboutUs = () => {
  return (
    <div className="bg-[#fff5f5] pt-14 px-6 py-10 md:px-16 text-gray-800">
       <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
  <div className="max-w-6xl mx-auto flex items-center justify-between h-12 px-4 md:px-6">
    {/* Logo & Title */}
    <Link href="/" className="flex items-center gap-1 font-semibold text-gray-800 hover:text-rose-600 transition text-sm">
      <MapPin className="w-4 h-4 text-rose-500" />
      <span>Pune Explorer</span>
    </Link>

    {/* Navigation */}
    <nav className="flex items-center gap-4 text-xs md:text-sm">
      <Link href="/" className="font-medium text-gray-700 hover:text-rose-600 transition">
        Home
      </Link>
      <Link href="/contact" className="font-medium text-gray-700 hover:text-rose-600 transition">
        Contact
      </Link>
    </nav>
  </div>
</header>


      {/* Page Title */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          Learn more about our mission, vision, and the team behind <span className="text-red-600 font-semibold">IndiTrail</span>.
        </p>
      </div>

      {/* Website Info */}
      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-red-200 pb-2">What is IndiTrail?</h2>
        <p className="text-gray-700 leading-relaxed">
          IndiTrail is a travel planning platform built by students for explorers. It simplifies your journey by offering personalized itineraries to explore Pune, nearby treks, historical forts, and beautiful Konkan beaches — all through efficient routes and curated experiences.
        </p>
      </section>

      {/* Mission and Vision */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 mb-20">
        <div>
          <h3 className="text-xl font-semibold mb-2 text-red-600">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed">
            To empower every traveler with smart, efficient, and enjoyable travel experiences across India, starting with Pune and the Konkan region.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-red-600">Our Vision</h3>
          <p className="text-gray-700 leading-relaxed">
            To become India’s most user-friendly and reliable travel planning companion by combining technology, local knowledge, and the spirit of exploration.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-5xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b-2 border-red-200 pb-2 text-center">Meet the Developers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {['Hrishikesh', 'Pradhyuth', 'Safir', 'Sudiksha'].map((name, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-4 hover:scale-105 hover:shadow-lg transition">
              <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center text-2xl font-bold text-red-600">
                {name.charAt(0)}
              </div>
              <p className="mt-4 font-medium text-gray-800">{name}</p>
              <p className="text-sm text-gray-500">Developer</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-700 mb-4">Want to collaborate or have a suggestion?</p>
        <a
          href="/contact"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
