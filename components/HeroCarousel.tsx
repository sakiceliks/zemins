"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Circle } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { ActionButtons } from "./ActionButtons"

const heroSlides = [
  {
    id: 0,
    image: "/images/carousel-bg-1.png",
    title: "Beton Parlatma ile Yenilenen Zeminler!",
    cta: "Beton Parlatma",
  },
  {
    id: 1,
    image: "/images/carousel-bg-2.png",
    title: "Dayanıklı ve Estetik Zemin Çözümleri",
    cta: "Zemin Çözümleri",
  },
  {
    id: 2,
    image: "/images/carousel-bg-3.png",
    title: "Projeleriniz İçin Güvenilir Ortak",
    cta: "Projelerimiz",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
  }

  useEffect(() => {
    resetInterval()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    resetInterval()
  }

  const goToPrevSlide = () => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)
  const goToNextSlide = () => goToSlide((currentSlide + 1) % heroSlides.length)

  const activeSlide = heroSlides[currentSlide]

  return (
    <>
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <Image
          key={slide.id}
          src={slide.image}
          alt={`Slide ${index + 1}`}
          fill
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
      ))}

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center h-screen px-6 md:px-20 lg:px-32">
        <div className="flex items-center gap-2 mb-4">
          <Circle className="h-4 w-4 text-orange-500 fill-orange-500" />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-3xl">
          {activeSlide.title}
        </h1>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2">
          {activeSlide.cta}
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Navigation Arrows */}
        <CarouselArrows onPrev={goToPrevSlide} onNext={goToNextSlide} />
        
        <ActionButtons/>
        {/* Action Buttons */}
      </div>

      {/* Pagination Dots */}
      <CarouselDots 
        count={heroSlides.length} 
        activeIndex={currentSlide} 
        onClick={goToSlide} 
      />
    </>
  )
}

function CarouselArrows({ onPrev, onNext }: { onPrev: () => void, onNext: () => void }) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10 md:h-12 md:w-12"
        onClick={onPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10 md:h-12 md:w-12"
        onClick={onNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </Button>
    </>
  )
}

function CarouselDots({ count, activeIndex, onClick }: { 
  count: number, 
  activeIndex: number, 
  onClick: (index: number) => void 
}) {
  return (
    <div className="absolute hidden bottom-8 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 md:left-20 lg:left-32 z-20 sm:flex gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <Button
        id="dotbutton"
          key={index}
          className={`h1 w-1 md:h-1 md:w-1 rounded-full transition-colors duration-300 ${
            index === activeIndex ? "bg-orange-500" : "bg-white/50"
          }`}
          onClick={() => onClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}