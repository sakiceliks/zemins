"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { getServices, type Service } from "@/lib/supabase"
import Link from "next/link"

export function ServicesCard() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const data = await getServices()
        setServices(data)
      } catch (error) {
        console.error('Error loading services:', error)
        // Fallback to static data if database fails
        setServices([
          {
            id: 'fallback-1',
            title: "Taş Halı | Stone Carpet",
            slug: "tas-hali",
            description: "Doğal taş görünümünde dayanıklı ve estetik zemin kaplama çözümleri.",
            content: "",
            featured: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: 'fallback-2',
            title: "Mikro Beton",
            slug: "mikro-beton",
            description: "Modern ve minimalist tasarım için ince dokulu mikro beton uygulamaları.",
            content: "",
            featured: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="relative border-gray-700 bg-gray-900 animate-pulse">
            <CardHeader className="pb-4">
              <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-6 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-3 bg-gray-700 rounded w-full"></div>
                ))}
              </div>
              <div className="h-10 bg-gray-700 rounded w-full mt-4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <>
      {services.map((service) => {
        return (
          <Card
            key={service.id}
            className="relative group hover:shadow-lg transition-all duration-300 border-gray-700 bg-gray-900"
          >
            {service.featured && (
              <Badge className="absolute -top-2 left-4 bg-amber-500 text-gray-900 font-semibold">Öne Çıkan</Badge>
            )}

            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-amber-500">Fiyat İçin İletişim</div>
              </div>
              <CardTitle className="text-xl text-white group-hover:text-amber-500 transition-colors">
                {service.title}
              </CardTitle>
              <CardDescription className="text-gray-300 leading-relaxed">{service.description}</CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  {/* Özellikler için veritabanından gelen features array'i kullanılıyor - sadece ilk 3 tanesi gösteriliyor */}
                  {service.features && service.features.length > 0 ? (
                    service.features.slice(0, 3).map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))
                  ) : (
                    // Fallback özellikler - features yoksa gösterilir
                    <>
            
                    </>
                  )}
                </div>

                <Link href={`/hizmetler/${service.slug}`}>
                  <Button
                    className={`w-full mt-4 group/btn ${
                      service.featured
                        ? "bg-amber-500 hover:bg-amber-600 text-gray-900"
                        : "border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900"
                    }`}
                    variant={service.featured ? "default" : "outline"}
                  >
                    İncele
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}
