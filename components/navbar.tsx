"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Phone, Mail, MapPin, X, ChevronRight, Menu, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface NavbarProps {
  services: Array<{ title: string; slug: string }>
}

export function Navbar({ services }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "Hizmetler", href: "/hizmetler" },
    { name: "Projeler", href: "/projeler" },
    { name: "İletişim", href: "/contact" }
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm">
      <header className="relative z-20 flex items-center justify-between p-4 sm:p-6 md:p-8 min-h-[64px] w-full">
        {/* Logo and Menu Button - Sol taraf */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">

<Link href="/">
<Image src="/logo.png" alt="Logo" width={200} height={200} />           

</Link>
          {/* Desktop Menu Button */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:flex hidden items-center text-white hover:bg-white/10 h-auto py-2">
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-base sm:text-lg font-semibold hidden lg:block ml-2">Menü</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:w-[400px] p-0 border-none bg-gray-900">
              <SheetTitle className="sr-only">Navigasyon Menüsü</SheetTitle>
              <MobileMenu 
                navigationItems={navigationItems}
                services={services} 
                onClose={() => setIsMenuOpen(false)} 
              />
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Right Side Navigation - Sağ taraf */}
        <nav className="flex items-center justify-end h-full">
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm">
            <span className="hidden lg:block text-nowrap text-white flex items-center">Bizi takip edin</span>
            <SocialLinks />
            
            {/* Mobile Menu Button */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden flex-shrink-0 text-white hover:bg-white/10 h-auto py-2">
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[400px] p-0 border-none bg-gray-900">
                <SheetTitle className="sr-only">Navigasyon Menüsü</SheetTitle>
                <MobileMenu 
                  navigationItems={navigationItems}
                  services={services} 
                  onClose={() => setIsMenuOpen(false)} 
                />
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </div>
  )
}

function SocialLinks() {
  return (
    <div className="hidden lg:flex gap-2 sm:gap-3 md:gap-4">
      <Link href="#" aria-label="Instagram" className="flex-shrink-0 text-white hover:opacity-70 transition-opacity">
        <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
      </Link>
      <Link href="#" aria-label="Facebook" className="flex-shrink-0 text-white hover:opacity-70 transition-opacity">
        <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
      </Link>
      <Link href="#" aria-label="Twitter" className="flex-shrink-0 text-white hover:opacity-70 transition-opacity">
        <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
      </Link>
      <Link href="#" aria-label="LinkedIn" className="flex-shrink-0 text-white hover:opacity-70 transition-opacity">
        <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
      </Link>
    </div>
  )
}

interface MobileMenuProps {
  navigationItems: Array<{ name: string; href: string }>
  services: Array<{ title: string; slug: string }>
  onClose: () => void
}

function MobileMenu({ navigationItems, services, onClose }: MobileMenuProps) {
  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
        
          <Image src="/logo.png" alt="Logo" width={200} height={200} />           
          </div>
       
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Main Navigation */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Menü</h3>
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors text-white"
              >
                <span className="font-medium">{item.name}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </a>
            ))}
          </div>

          <Separator className="bg-gray-700" />

          {/* Services */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Hizmetlerimiz</h3>
            {services.map((service) => (
              <Link
                key={service.title}
                href={`/hizmetler/${service.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800 transition-colors text-white"
              >
                <span className="text-sm">{service.title}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </div>

          <Separator className="bg-gray-700" />

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">İletişim</h3>
            <div className="space-y-3">
              <Link
                href="tel:+905551234567"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-white"
              >
                <Phone className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="font-medium">+90 (555) 123 45 67</div>
                  <div className="text-sm text-gray-400">Hemen ara</div>
                </div>
              </Link>
              <a
                href="mailto:info@zeminustasi.com"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-white"
              >
                <Mail className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="font-medium">info@zeminustasi.com</div>
                  <div className="text-sm text-gray-400">E-posta gönder</div>
                </div>
              </a>
              <div className="flex items-center gap-3 p-3">
                <MapPin className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="font-medium">İstanbul, Türkiye</div>
                  <div className="text-sm text-gray-400">Tüm bölgelere hizmet</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-700 bg-gray-800/50">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button className="flex-1 bg-orange-500 hover:bg-orange-600" onClick={onClose}>
              <Phone className="h-4 w-4 mr-2" />
              Ücretsiz Keşif
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent border-gray-600 text-white hover:bg-gray-700" onClick={onClose}>
              Teklif Al
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
