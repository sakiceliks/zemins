"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react"

interface ServiceCarouselProps {
  districts: string[]
}

export default function ServiceCarousel({ districts }: ServiceCarouselProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const itemsPerSlide = 6
  const totalSlides = Math.ceil(districts.length / itemsPerSlide)

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index)
  }

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  const getSlideItems = (slideIndex: number) => {
    const start = slideIndex * itemsPerSlide
    const end = start + itemsPerSlide
    return districts.slice(start, end)
  }

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
        >
          {Array.from({ length: totalSlides }, (_, slideIndex) => (
            <div key={slideIndex} className="min-w-full px-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {getSlideItems(slideIndex).map((district) => (
                  <div
                    key={district}
                    className="bg-gray-800 p-4 rounded-lg text-center hover:bg-amber-500 hover:text-gray-900 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 shadow-md"
                  >
                    <MapPin className="w-5 h-5 text-amber-500 mx-auto mb-2" />
                    <h3 className="font-semibold">{district}</h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors shadow-lg z-10"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors shadow-lg z-10"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlideIndex ? "bg-amber-500" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
