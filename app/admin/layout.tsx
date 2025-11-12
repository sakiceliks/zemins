"use client"

import { Button } from "@/components/ui/button"
import { AdminSettingsProvider } from "@/contexts/admin-settings-context"
import { ServicesProvider } from "@/contexts/services-context"
import { ArrowLeft, Settings, Image, FileText, Users, Building2, BookOpen } from "lucide-react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminSettingsProvider>
      <ServicesProvider>
        <div className="min-h-screen bg-gray-900">
          {/* Header */}
          <div className="bg-gray-800 border-b border-gray-700">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                <Link href="/admin">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Ana Sayfaya Dön
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-gray-800 border-b border-gray-700">
            <div className="container mx-auto px-6">
              <nav className="flex space-x-8">
                <Link href="/admin" className="flex items-center gap-2 py-4 px-2 border-b-2 border-transparent hover:border-amber-500 text-gray-400 hover:text-white transition-colors">
                  <Settings className="h-4 w-4" />
                  Genel Ayarlar
                </Link>
                <Link href="/admin/hero-carousel" className="flex items-center gap-2 py-4 px-2 border-b-2 border-transparent hover:border-amber-500 text-gray-400 hover:text-white transition-colors">
                  <Image className="h-4 w-4" />
                  Hero Carousel
                </Link>
                <Link href="/admin/hizmetler" className="flex items-center gap-2 py-4 px-2 border-b-2 border-transparent hover:border-amber-500 text-gray-400 hover:text-white transition-colors">
                  <Building2 className="h-4 w-4" />
                  Hizmetler
                </Link>
                <Link href="/admin/projeler" className="flex items-center gap-2 py-4 px-2 border-b-2 border-transparent hover:border-amber-500 text-gray-400 hover:text-white transition-colors">
                  <FileText className="h-4 w-4" />
                  Projeler
                </Link>
                <Link href="/admin/team" className="flex items-center gap-2 py-4 px-2 border-b-2 border-transparent hover:border-amber-500 text-gray-400 hover:text-white transition-colors">
                  <Users className="h-4 w-4" />
                  Ekip
                </Link>
                <Link href="/admin/blog" className="flex items-center gap-2 py-4 px-2 border-b-2 border-transparent hover:border-amber-500 text-gray-400 hover:text-white transition-colors">
                  <BookOpen className="h-4 w-4" />
                  Blog
                </Link>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </div>
      </ServicesProvider>
    </AdminSettingsProvider>
  )
}
