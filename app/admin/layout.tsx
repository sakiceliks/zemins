"use client"

import { Button } from "@/components/ui/button"
import { AdminSettingsProvider } from "@/contexts/admin-settings-context"
import { ArrowLeft, Settings, Image, FileText, Users, Building2 } from "lucide-react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminSettingsProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <Link href="/admin">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Ana Sayfaya Dön
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-6">
            <nav className="flex space-x-8">
              <Link href="/admin" className="flex items-center gap-2 py-4 px-2 border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700">
                <Settings className="h-4 w-4" />
                Genel Ayarlar
              </Link>
              <Link href="/admin/hero-carousel" className="flex items-center gap-2 py-4 px-2 border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700">
                <Image className="h-4 w-4" />
                Hero Carousel
              </Link>
              <Link href="/admin/hizmetler" className="flex items-center gap-2 py-4 px-2 border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700">
                <Building2 className="h-4 w-4" />
                Hizmetler
              </Link>
              <Link href="/admin/projeler" className="flex items-center gap-2 py-4 px-2 border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700">
                <FileText className="h-4 w-4" />
                Projeler
              </Link>
              <Link href="/admin/team" className="flex items-center gap-2 py-4 px-2 border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700">
                <Users className="h-4 w-4" />
                Ekip
              </Link>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </div>
    </AdminSettingsProvider>
  )
}
