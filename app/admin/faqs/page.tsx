"use client"

import { useState, useEffect } from "react"
import { getFAQs, deleteFAQ, type FAQ } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, ArrowLeft, Eye, ArrowUp, ArrowDown } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { useAdminSettings } from "@/contexts/admin-settings-context"
import Link from "next/link"

export default function AdminFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const { settings } = useAdminSettings()
  const { user, isUserAdmin, loading: authLoading } = useAdminAuth({
    enabled: settings.authCheckEnabled
  })

  useEffect(() => {
    if (!authLoading) {
      loadFAQs()
    }
  }, [authLoading])

  async function loadFAQs() {
    try {
      const data = await getFAQs()
      setFaqs(data)
    } catch (error) {
      console.error('Error loading FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteFAQ(id)
      await loadFAQs()
    } catch (error) {
      console.error('Error deleting FAQ:', error)
    }
  }

  async function handleReorder(id: string, direction: 'up' | 'down') {
    const currentIndex = faqs.findIndex(faq => faq.id === id)
    if (currentIndex === -1) return

    const newFaqs = [...faqs]
    if (direction === 'up' && currentIndex > 0) {
      const temp = newFaqs[currentIndex].order
      newFaqs[currentIndex].order = newFaqs[currentIndex - 1].order
      newFaqs[currentIndex - 1].order = temp
      setFaqs(newFaqs.sort((a, b) => a.order - b.order))
    } else if (direction === 'down' && currentIndex < newFaqs.length - 1) {
      const temp = newFaqs[currentIndex].order
      newFaqs[currentIndex].order = newFaqs[currentIndex + 1].order
      newFaqs[currentIndex + 1].order = temp
      setFaqs(newFaqs.sort((a, b) => a.order - b.order))
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Admin Paneline Dön
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SSS Yönetimi</h1>
              <p className="text-gray-600 dark:text-gray-400">Sık sorulan soruları yönetin</p>
            </div>
          </div>
          <Link href="/admin/faqs/new">
            <Button className="bg-amber-500 hover:bg-amber-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni SSS
            </Button>
          </Link>
        </div>

        {/* FAQs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <Card key={faq.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{faq.question}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={faq.active ? "default" : "secondary"}>
                        {faq.active ? "Aktif" : "Pasif"}
                      </Badge>
                      <Badge variant="outline">Sıra: {faq.order}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-3 mb-4">
                  {faq.answer}
                </CardDescription>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(faq.id, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(faq.id, 'down')}
                      disabled={index === faqs.length - 1}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/faqs/${faq.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>SSS Sil</AlertDialogTitle>
                          <AlertDialogDescription>
                            Bu SSS''yi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>İptal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(faq.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Sil
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {faqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Henüz hiç SSS eklenmemiş.</p>
            <Link href="/admin/faqs/new">
              <Button className="bg-amber-500 hover:bg-amber-600">
                <Plus className="mr-2 h-4 w-4" />
                İlk SSS''yi Ekle
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

