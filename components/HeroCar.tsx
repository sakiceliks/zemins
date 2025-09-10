"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Circle } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { ActionButtons } from "./ActionButtons"
import Link from 'next/link'

interface HeroCarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image_url: string;
  image_alt?: string;
  button_text?: string;
  button_link?: string;
  order_index: number;
  is_active: boolean;
}

const HERO_SLIDES: HeroCarouselItem[] = [
  {
    id: "slide-1",
    title: "0 Yıllık Deneyim",
    subtitle: "Sultanbeyli'de Profesyonel Temizlik Hizmetleri",
    description: "Özel ekipmanlar ve eğitimli personelimizle yaşam ve çalışma alanlarınızı hijyenik standartlarda temizliyoruz.",
    image_url: "https://jtxgdimnzgebwdtbphxt.supabase.co/storage/v1/object/public/blog-images/1755499660862_j3qf3tq9wvo.webp",
    image_alt: "Sultanbeyli Profesyonel Temizlik",
    button_text: "Hizmetlerimizi Keşfet",
    button_link: "#hakkimizda",
    order_index: 1,
    is_active: true
  },
  {
    id: "slide-2",
    title: "Daire Temizliği",
    subtitle: "Profesyonel Temizlik Ekibi",
    description: "Eğitimli personelimiz ile daire temizliği hizmeti sunuyoruz.",
    image_url: "https://jtxgdimnzgebwdtbphxt.supabase.co/storage/v1/object/public/blog-images/1755499724831_zdvkmaegiwm.webp",
    image_alt: "Daire Temizliği",
    button_text: "Hemen Ara: 0 536 291 2758",
    button_link: "tel:05362912758",
    order_index: 2,
    is_active: true
  },
  {
    id: "slide-3",
    title: "Ofis ve Apartman Temizliği",
    subtitle: "Profesyonel Ekip ve Ekipmanlar",
    description: "Ofis, apartman ve taşınma sonrası temizlik hizmetlerimizle hijyen sağlayın.",
    image_url: "https://jtxgdimnzgebwdtbphxt.supabase.co/storage/v1/object/public/blog-images/1755500133383_9x7zcep09c.webp",
    image_alt: "Ofis ve Apartman Temizliği",
    button_text: "Hizmetlerimizi Keşfet",
    button_link: "/hizmetler",
    order_index: 3,
    is_active: true
  }
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 5000)
  }

  useEffect(() => {
    if (HERO_SLIDES.length > 0) {
      resetInterval()
      return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
    }
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    resetInterval()
  }

  const goToPrevSlide = () => goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  const goToNextSlide = () => goToSlide((currentSlide + 1) % HERO_SLIDES.length)

  const activeSlide = HERO_SLIDES[currentSlide]

  return (
    <>
      {/* Background Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <Image
          key={slide.id}
          src={slide.image_url}
          alt={slide.image_alt || slide.title}
          fill
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
      ))}

      {/* Black Overlay */}
      <div className="absolute inset-0 z-10 bg-black/70"></div>

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center h-screen px-6 md:px-20 lg:px-32">
        {activeSlide.subtitle && (
          <div className="flex items-center gap-2 mb-4">
            <Circle className="h-4 w-4 text-orange-500 fill-orange-500" />
            <span className="text-lg md:text-xl text-orange-500 font-medium">
              {activeSlide.subtitle}
            </span>
          </div>
        )}
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight mb-6 max-w-3xl">
          {activeSlide.title}
        </h1>
        {activeSlide.description && (
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
            {activeSlide.description}
          </p>
        )}
        {activeSlide.button_text && activeSlide.button_link && (
          <Link href={activeSlide.button_link}>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2">
              {activeSlide.button_text}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        )}

        {/* Navigation Arrows */}
        <CarouselArrows onPrev={goToPrevSlide} onNext={goToNextSlide} />
        
        <ActionButtons/>
      </div>

      {/* Pagination Dots */}
      <CarouselDots 
        count={HERO_SLIDES.length} 
        activeIndex={currentSlide} 
        onClick={goToSlide} 
      />
    </>
  )
}

function CarouselArrows({ onPrev, onNext }: { onPrev: () => void, onNext: () => void }) {
  return (
    <div className="hidden sm:flex">
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 text-white rounded-full h-12 w-12 md:h-14 md:w-14 backdrop-blur-sm"
        onClick={onPrev}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-white/20 hover:bg-white/30 text-white rounded-full h-12 w-12 md:h-14 md:w-14 backdrop-blur-sm"
        onClick={onNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 md:h-7 md:w-7" />
      </Button>
    </div>
  )
}

function CarouselDots({ count, activeIndex, onClick }: { 
  count: number, 
  activeIndex: number, 
  onClick: (index: number) => void 
}) {
  return (
    <div className="absolute bottom-8 left-8 z-40 hidden sm:flex gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <Button
          key={index}
          className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full transition-all duration-300 hover:scale-110 ${
            index === activeIndex 
              ? "bg-orange-500 shadow-lg shadow-orange-500/50" 
              : "bg-white/50 hover:bg-white/70"
          }`}
          onClick={() => onClick(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}
