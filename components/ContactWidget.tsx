'use client'

import ContactButton from './ContactButton'
import { Phone, Mail } from 'lucide-react'
import Link from 'next/link'

export default function ContactWidget() {
  return (
    <div className="bg-amber-600/10 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 sm:p-6 md:p-8 mt-8 sm:mt-12 rounded-md shadow-xl text-center">
      <h3 className="font-sans font-bold text-lg sm:text-2xl md:text-3xl text-amber-500 dark:text-amber-400 mb-3 sm:mb-4">
        🚀 Profesyonel Zemin Çözümleri İçin İletişime Geçin
      </h3>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-700 dark:text-slate-100 mb-4 sm:mb-6">
       Endüstriyel zemin kaplama ihtiyaçlarınız için uzman ekibimizle görüşerek, projenize en uygun çözümü hemen keşfedin.
      </p>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-700 dark:text-slate-100 font-bold mb-6 sm:mb-8">
        Hemen şimdi <strong className="text-amber-500 dark:text-amber-400">ücretsiz keşif ve fiyat teklifi</strong> almak için bize ulaşın!
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <ContactButton
          type="phone"
          phoneNumber="905312812958"
          variant="default"
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors flex items-center justify-center shadow-lg w-full sm:w-auto h-11 sm:h-12"
          trackingLabel="contact_widget_phone"
        >
          <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">+90(531) 281 29 58</span>
          <span className="sm:hidden">Hemen Ara</span>
        </ContactButton>
        <Link
          href="/iletisim"
          className="border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900 dark:hover:text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-colors flex items-center justify-center shadow-lg w-full sm:w-auto h-11 sm:h-12"
        >
          <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Ücretsiz Teklif İste
        </Link>
      </div>
    </div>
  )
}

