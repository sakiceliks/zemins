"use client"

import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface MobileMenuProps {
  onClose: () => void
  services: {
    id: string
    title: string
    slug: string
  }[]
}

const mainMenuItems = [
  { id: "1", title: "Anasayfa", link: "/" },
  { id: "2", title: "Hakkımızda", link: "/hakkimizda" },
]

// Bileşeni memoize ederek gereksiz render'ları önlüyoruz
const MobileMenu = memo(({ onClose, services }: MobileMenuProps) => {
  return (
    <div className="flex h-full flex-col bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h3>ZEMİN USTASI</h3>
          <span className="text-lg font-bold mt-2">Kurumsal</span>
        </div>

        <Button 
          variant="ghost" 
          size="icon"
          onClick={onClose}
          className="hover:bg-white/10"
        >
          <X className="h-6 w-6 text-orange-500" />
          <span className="sr-only">Menüyü Kapat</span>
        </Button>
      </div>

      {/* Ana Menü */}
      <nav className="flex-1 overflow-y-auto pr-4">
        <ul className="space-y-4 text-lg">
          {mainMenuItems.map((item) => (
            <ListItem 
              key={item.id}
              item={item}
              onClose={onClose}
            />
          ))}
        </ul>

        {/* Hizmetler */}
        <div className="mt-8">
          <Link 
            href="/hizmetler" 
            className="hover:text-orange-500 transition-colors"
            onClick={onClose}
          >
            <h3 className="text-orange-500 text-xl font-bold mb-4">
              Hizmetlerimiz
            </h3>
          </Link>
          
          <ul className="space-y-2 text-base">
            {services.map((service) => (
              <ServiceItem 
                key={service.id}
                service={service}
                onClose={onClose}
              />
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
})

// Yardımcı bileşenler
const ListItem = ({ item, onClose }: { 
  item: { title: string; link: string }, 
  onClose: () => void 
}) => (
  <li>
    <Link 
      href={item.link} 
      className="hover:text-orange-500 transition-colors" 
      onClick={onClose}
    >
      {item.title}
    </Link>
  </li>
)

const ServiceItem = ({ service, onClose }: { 
  service: { title: string; slug: string }, 
  onClose: () => void 
}) => (
  <li>
    <Link 
      href={`/hizmetler/${service.slug}`}
      className="hover:text-orange-500 transition-colors"
      onClick={onClose}
    >
      {service.title}
    </Link>
  </li>
)

export default MobileMenu