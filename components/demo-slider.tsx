"use client"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MobileMenu } from "@/components/mobile-menu"
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ChevronDown,
  Menu,
  ChevronRight,
  PhoneIcon as Whatsapp,
  Pencil,
  Paintbrush,
  Circle,
  ChevronLeft,
} from "lucide-react"

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

export default function DemoSlider() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length)
    }, 5000)
  }

  useEffect(() => {
    resetInterval()
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handleDotClick = (index: number) => {
    setCurrentSlide(index)
    resetInterval()
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + heroSlides.length) % heroSlides.length)
    resetInterval()
  }

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length)
    resetInterval()
  }

  const activeSlide = heroSlides[currentSlide]

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background Image Carousel */}
      {heroSlides.map((slide, index) => (
        <Image
          key={slide.id}
          src={slide.image || "/placeholder.svg"}
          alt={`Carousel background ${index + 1}`}
          layout="fill"
          objectFit="cover"
          quality={80}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0} // Prioritize loading the first image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between p-6 md:p-8">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="Dalzemin Logo" width={150} height={40} className="h-10 object-contain" />
          <span className="text-lg font-semibold hidden md:block">Menü</span>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[400px] p-0 border-none bg-gray-900">
              <MobileMenu onClose={() => setIsMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <span className="hidden md:block">Bizi takip edin</span>
          <div className="flex gap-4">
            <Link href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-transparent border-white text-white hover:bg-white/10"
              >
                <span className="font-medium">TR</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-800 text-white border-gray-700">
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">EN</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-700 cursor-pointer">DE</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </nav>
      </header>

      {/* Hero Content */}
      <main className="relative z-20 flex flex-col items-start justify-center h-[calc(100vh-120px)] px-6 md:px-20 lg:px-32">
        <div className="flex items-center gap-2 mb-4">
          <Circle className="h-4 w-4 text-orange-500 fill-orange-500" />
          <span className="text-lg font-medium"></span>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-3xl transition-opacity duration-500 ease-in-out">
          {activeSlide.title}
        </h1>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2 transition-opacity duration-500 ease-in-out">
          {activeSlide.cta}
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Carousel Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center"
          onClick={goToPrevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 text-white rounded-full h-10 w-10 md:h-12 md:w-12 flex items-center justify-center"
          onClick={goToNextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </Button>

        {/* Floating Action Buttons - New Position and Style */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-row gap-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 shadow-lg flex items-center gap-2 text-sm">
            <Whatsapp className="h-5 w-5" />
            Whatsapp
          </Button>
          <Button className="bg-gray-800 hover:bg-gray-700 text-white rounded-full px-6 py-2 shadow-lg flex items-center gap-2 text-sm">
            <Pencil className="h-5 w-5" />
            Teklif Al
          </Button>
          <Button className="bg-gray-800 hover:bg-gray-700 text-white rounded-full px-6 py-2 shadow-lg flex items-center gap-2 text-sm">
            <Paintbrush className="h-5 w-5" />
            Kartela
          </Button>
        </div>
      </main>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-6 md:left-20 lg:left-32 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-colors duration-300 ${
              index === currentSlide ? "bg-orange-500" : "bg-white/50"
            }`}
            onClick={() => handleDotClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Numbered Sections (Placeholder) */}
      <div className="relative z-20 flex justify-center gap-8 py-16 bg-gray-900/80 mt-auto">
        <div className="flex flex-col items-center justify-center bg-orange-500 text-white p-8 rounded-lg shadow-lg w-64 h-48">
          <span className="text-6xl font-bold">01</span>
          <p className="text-center mt-2">Some Feature</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-700 text-white p-8 rounded-lg shadow-lg w-64 h-48">
          <span className="text-6xl font-bold">02</span>
          <p className="text-center mt-2">Another Feature</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-700 text-white p-8 rounded-lg shadow-lg w-64 h-48">
          <span className="text-6xl font-bold">03</span>
          <p className="text-center mt-2">Yet Another</p>
        </div>
      </div>
    </div>
  )
}
