"use client"
import { useState } from "react"
import ContactButton, { WhatsAppFloatingButton, PhoneFloatingButton } from "./ContactButton"
import { Pencil, Paintbrush, Phone, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function ActionButtons() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      {/* Floating Contact Menu - Hem Mobil Hem Desktop */}
      <div>
        {/* Main Floating Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed bottom-6 right-6 z-50 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="İletişim menüsü"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6" />
          )}
        </button>

        {/* Contact Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-24 right-6 z-50 bg-gray-900/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 min-w-[200px]"
            >
              <div className="flex flex-col gap-3">
                {/* Phone Button */}
                <ContactButton
                  type="phone"
                  phoneNumber="905312812958"
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800 rounded-lg px-4 py-3"
                  trackingLabel="floating_menu_phone"
                >
                  <Phone className="h-5 w-5 mr-3" />
                  <span>Ara</span>
                </ContactButton>

                {/* WhatsApp Button */}
                <ContactButton
                  type="whatsapp"
                  phoneNumber="905312812958"
                  message="Merhaba, size nasıl yardımcı olabilirim?"
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-gray-800 rounded-lg px-4 py-3"
                  trackingLabel="floating_menu_whatsapp"
                >
                  <MessageCircle className="h-5 w-5 mr-3" />
                  <span>WhatsApp</span>
                </ContactButton>

                {/* Teklif Al Button */}
                <Link
                  href="/iletisim"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full justify-start text-white hover:bg-gray-800 rounded-lg px-4 py-3 flex items-center"
                >
                  <Pencil className="h-5 w-5 mr-3" />
                  <span>Teklif Al</span>
                </Link>

                {/* Kartela Button */}
                <Link
                  href="/iletisim"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full justify-start text-white hover:bg-gray-800 rounded-lg px-4 py-3 flex items-center"
                >
                  <Paintbrush className="h-5 w-5 mr-3" />
                  <span>Kartela</span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Backdrop */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}