"use client"

import { HeroCarousel } from "@/components/HeroCarousel"

function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative w-full overflow-hidden h-screen">
        <div className="absolute inset-0 bg-gray-900" />
        <HeroCarousel />
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Our Services
          </h2>
          <p className="text-lg text-gray-700">
            We provide quality construction services.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
