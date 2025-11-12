"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ActionButtons } from "@/components/ActionButtons"
import { getServices, getSiteSettings } from "@/lib/supabase"

import "@/app/globals.css"
import { useEffect, useState } from "react"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [services, setServices] = useState<any[]>([])
  const [siteSettings, setSiteSettings] = useState<any>(null)
  
  // Admin sayfalarında header ve footer'ı gizle
  const isAdminPage = pathname?.startsWith('/admin')
  
  useEffect(() => {
    // Admin sayfalarında data yükleme
    if (isAdminPage) return
    
    const loadData = async () => {
      try {
        const [servicesData, settingsData] = await Promise.all([
          getServices(),
          getSiteSettings()
        ])
        setServices(servicesData)
        setSiteSettings(settingsData)
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }
    
    loadData()
  }, [isAdminPage])
  
  // Admin sayfalarında sadece children render et
  if (isAdminPage) {
    return <>{children}</>
  }
  
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <div className="antialiased flex min-h-screen flex-col">
          <Navbar services={services} />
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex-grow"
            >
              {children}
            </motion.main>
          </AnimatePresence>
          <Footer services={services} siteSettings={siteSettings} />
          <ScrollToTop />
          <ActionButtons />
        </div>
      </ThemeProvider>
    </div>
  )
}
