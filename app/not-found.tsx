"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Wrench, Phone } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1a1a1a] align-middle  flex items-center justify-center px-4">
      <div className="max-w-md mt-24 w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-[#ffbf00] mb-4">404</h1>
          <div className="w-24 h-1 bg-[#ffbf00] mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">Sayfa Bulunamadı</h2>
          <p className="text-gray-400 leading-relaxed">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. Lütfen URL'yi kontrol edin veya ana sayfaya dönün.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-10 grid gap-10">
          <Link href="/">
            <Button className="w-full bg-[#ffbf00] hover:bg-[#e6ac00] text-black font-medium py-3 transition-all duration-200 hover:shadow-lg hover:shadow-[#ffbf00]/20">
              <Home className="w-4 h-4 mr-2" />
              Ana Sayfa
            </Button>
          </Link>

          <Link href="/hizmetler">
            <Button
              variant="outline"
              className="w-full border-[#ffbf00] text-[#ffbf00] hover:bg-[#ffbf00] hover:text-black transition-all duration-200 bg-transparent"
            >
              <Wrench className="w-4 h-4 mr-2" />
              Hizmetler
            </Button>
          </Link>

          <Link href="/contact">
            <Button
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-[#2a2a2a] hover:text-white hover:border-[#ffbf00] transition-all duration-200 bg-transparent"
            >
              <Phone className="w-4 h-4 mr-2" />
              İletişim
            </Button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-500">
            Aradığınız sayfayı bulamadınız mı? Yukarıdaki menülerden devam edebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  )
}
