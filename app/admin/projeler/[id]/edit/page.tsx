"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { getProjectById, updateProject, getServiceCategories } from "@/lib/supabase"
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

export default function EditProject() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    image: "",
    category: "",
    location: "",
    completion_date: "",
    featured: false,
    meta_title: "",
    meta_description: "",
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  const { settings } = useAdminSettings()
  const { user, isUserAdmin, loading: authLoading } = useAdminAuth({
    enabled: settings.authCheckEnabled
  })

  useEffect(() => {
    if (!authLoading && projectId) {
      loadProject()
      loadCategories()
    }
  }, [authLoading, projectId])

  async function loadProject() {
    try {
      const project = await getProjectById(projectId)
      setFormData({
        title: project.title,
        slug: project.slug,
        description: project.description,
        content: project.content,
        image: project.image || "",
        category: project.category,
        location: project.location || "",
        completion_date: project.completion_date || "",
        featured: project.featured,
        meta_title: project.meta_title || "",
        meta_description: project.meta_description || "",
      })
    } catch (error) {
      console.error('Error loading project:', error)
      setError("Proje yüklenirken hata oluştu")
    } finally {
      setInitialLoading(false)
    }
  }

  async function loadCategories() {
    try {
      const serviceCategories = await getServiceCategories()
      setCategories(serviceCategories)
    } catch (error) {
      console.error('Error loading categories:', error)
      // Fallback kategoriler
      setCategories([
        "Endüstriyel",
        "Ticari", 
        "Konut",
        "Sağlık",
        "Eğitim",
        "Spor",
        "Diğer"
      ])
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
      await updateProject(projectId, formData)
      router.push('/admin/projeler')
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
          <Link href="/admin/projeler">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Projelere Dön
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Proje Düzenle</h1>
            <p className="text-gray-400">Proje bilgilerini güncelleyin</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Proje Bilgileri</CardTitle>
              <CardDescription>
                Proje detaylarını güncelleyin
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="">Kategori Seçin</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Konum</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="İstanbul, Ankara..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="completion_date">Tamamlanma Tarihi</Label>
                    <Input
                      id="completion_date"
                      type="date"
                      value={formData.completion_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, completion_date: e.target.value }))}
                    />
                  </div>
                </div>

                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                  label="Proje Görseli"
                  folder="projects"
                />

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => 
                      setFormData(prev => ({ ...prev, featured: checked as boolean }))
                    }
                  />
                  <Label htmlFor="featured">Öne çıkan proje</Label>
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
                  <Link href="/admin/projeler">
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
