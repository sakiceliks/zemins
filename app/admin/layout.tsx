"use client"

import { Button } from "@/components/ui/button"
import { AdminSettingsProvider } from "@/contexts/admin-settings-context"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminSettingsProvider>
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Admin Paneline Dön
            </Button>
          </Link>
        </div>
      {children}
    </AdminSettingsProvider>
  )
}
