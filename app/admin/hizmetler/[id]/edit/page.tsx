"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { getServiceById, updateService } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { useAdminSettings } from "@/contexts/admin-settings-context"
import { ImageUpload } from "@/components/ui/image-upload"

export default function EditService() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    image: "",
    featured: false,
    meta_title: "",
    meta_description: "",
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string
  const { settings } = useAdminSettings()
  const { user, isUserAdmin, loading: authLoading } = useAdminAuth({
    enabled: settings.authCheckEnabled
  })

  useEffect(() => {
    if (!authLoading && serviceId) {
      loadService()
    }
  }, [authLoading, serviceId])

  async function loadService() {
    try {
      const service = await getServiceById(serviceId)
      setFormData({
        title: service.title,
        slug: service.slug,
        description: service.description,
        content: service.content,
        image: service.image || "",
        featured: service.featured,
        meta_title: service.meta_title || "",
        meta_description: service.meta_description || "",
      })
    } catch (error) {
      console.error('Error loading service:', error)
      setError("Hizmet yüklenirken hata oluştu")
    } finally {
      setInitialLoading(false)
    }
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  function handleTitleChange(title: string) {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      meta_title: title
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await updateService(serviceId, formData)
      router.push('/admin/hizmetler')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/hizmetler">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Hizmetlere Dön
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Hizmet Düzenle</h1>
            <p className="text-gray-400">Hizmet bilgilerini güncelleyin</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Hizmet Bilgileri</CardTitle>
              <CardDescription>
                Hizmet detaylarını güncelleyin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Başlık *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Kısa Açıklama *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">İçerik (HTML) *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={10}
                    required
                    placeholder="HTML içerik girebilirsiniz..."
                  />
                </div>

                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                  label="Hizmet Görseli"
                  folder="services"
                />

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, featured: checked as boolean }))
                    }
                  />
                  <Label htmlFor="featured">Öne çıkan hizmet</Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="meta_title">Meta Başlık</Label>
                    <Input
                      id="meta_title"
                      value={formData.meta_title}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meta_description">Meta Açıklama</Label>
                    <Input
                      id="meta_description"
                      value={formData.meta_description}
                      onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="bg-amber-500 hover:bg-amber-600" 
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Güncelle
                  </Button>
                  <Link href="/admin/hizmetler">
                    <Button type="button" variant="outline">
                      İptal
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
