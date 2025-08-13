"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getSiteSettings, updateSiteSettings } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Save, Loader2, ArrowLeft } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { useAdminSettings } from "@/contexts/admin-settings-context"
import Link from "next/link"

export default function SiteSettingsPage() {
  const [formData, setFormData] = useState({
    company_name: "",
    company_description: "",
    address: "",
    phone: "",
    email: "",
    working_hours: "",
    social_media: {
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: ""
    },
    hero_title: "",
    hero_subtitle: "",
    about_title: "",
    about_description: "",
    services_title: "",
    services_description: "",
    projects_title: "",
    projects_description: "",
    contact_title: "",
    contact_description: ""
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()
  const { settings } = useAdminSettings()
  const { user, isUserAdmin, loading: authLoading } = useAdminAuth({
    enabled: settings.authCheckEnabled
  })

  useEffect(() => {
    if (!authLoading) {
      loadSiteSettings()
    }
  }, [authLoading])

  async function loadSiteSettings() {
    try {
      const settings = await getSiteSettings()
      setFormData({
        company_name: settings.company_name || "",
        company_description: settings.company_description || "",
        address: settings.address || "",
        phone: settings.phone || "",
        email: settings.email || "",
        working_hours: settings.working_hours || "",
        social_media: settings.social_media || {
          facebook: "",
          instagram: "",
          twitter: "",
          linkedin: ""
        },
        hero_title: settings.hero_title || "",
        hero_subtitle: settings.hero_subtitle || "",
        about_title: settings.about_title || "",
        about_description: settings.about_description || "",
        services_title: settings.services_title || "",
        services_description: settings.services_description || "",
        projects_title: settings.projects_title || "",
        projects_description: settings.projects_description || "",
        contact_title: settings.contact_title || "",
        contact_description: settings.contact_description || ""
      })
    } catch (error) {
      console.error('Error loading site settings:', error)
      setError("Site ayarları yüklenirken hata oluştu")
    } finally {
      setInitialLoading(false)
    }
  }

  function handleSocialMediaChange(field: string, value: string) {
    setFormData(prev => ({
      ...prev,
      social_media: {
        ...prev.social_media,
        [field]: value
      }
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      await updateSiteSettings(formData)
      setSuccess("Site ayarları başarıyla güncellendi!")
      setTimeout(() => setSuccess(""), 3000)
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Admin Paneline Dön
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Site Ayarları</h1>
            <p className="text-gray-600 dark:text-gray-400">Site genelinde kullanılan tüm metinleri ve bilgileri düzenleyin</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Şirket Bilgileri</CardTitle>
              <CardDescription>Şirket adı, açıklaması ve iletişim bilgileri</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Şirket Adı *</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company_description">Şirket Açıklaması *</Label>
                  <Textarea
                    id="company_description"
                    value={formData.company_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, company_description: e.target.value }))}
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Adres *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      rows={2}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="working_hours">Çalışma Saatleri *</Label>
                  <Input
                    id="working_hours"
                    value={formData.working_hours}
                    onChange={(e) => setFormData(prev => ({ ...prev, working_hours: e.target.value }))}
                    placeholder="Pazartesi - Cuma: 08:00 - 17:00, Cumartesi: 09:00 - 14:00"
                    required
                  />
                </div>

                {/* Social Media */}
                <div className="space-y-4">
                  <Label>Sosyal Medya Linkleri</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={formData.social_media.facebook}
                        onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                        placeholder="https://facebook.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={formData.social_media.instagram}
                        onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                        placeholder="https://instagram.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={formData.social_media.twitter}
                        onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={formData.social_media.linkedin}
                        onChange={(e) => handleSocialMediaChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/..."
                      />
                    </div>
                  </div>
                </div>

                {/* Page Titles and Descriptions */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Sayfa Başlıkları ve Açıklamaları</h3>
                  
                  {/* Hero Section */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">Ana Sayfa Hero Bölümü</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="hero_title">Hero Başlık *</Label>
                        <Input
                          id="hero_title"
                          value={formData.hero_title}
                          onChange={(e) => setFormData(prev => ({ ...prev, hero_title: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero_subtitle">Hero Alt Başlık *</Label>
                        <Input
                          id="hero_subtitle"
                          value={formData.hero_subtitle}
                          onChange={(e) => setFormData(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">Hakkımızda Sayfası</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="about_title">Hakkımızda Başlık *</Label>
                        <Input
                          id="about_title"
                          value={formData.about_title}
                          onChange={(e) => setFormData(prev => ({ ...prev, about_title: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="about_description">Hakkımızda Açıklama *</Label>
                        <Textarea
                          id="about_description"
                          value={formData.about_description}
                          onChange={(e) => setFormData(prev => ({ ...prev, about_description: e.target.value }))}
                          rows={2}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Services Section */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">Hizmetler Sayfası</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="services_title">Hizmetler Başlık *</Label>
                        <Input
                          id="services_title"
                          value={formData.services_title}
                          onChange={(e) => setFormData(prev => ({ ...prev, services_title: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="services_description">Hizmetler Açıklama *</Label>
                        <Textarea
                          id="services_description"
                          value={formData.services_description}
                          onChange={(e) => setFormData(prev => ({ ...prev, services_description: e.target.value }))}
                          rows={2}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Projects Section */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">Projeler Sayfası</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="projects_title">Projeler Başlık *</Label>
                        <Input
                          id="projects_title"
                          value={formData.projects_title}
                          onChange={(e) => setFormData(prev => ({ ...prev, projects_title: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="projects_description">Projeler Açıklama *</Label>
                        <Textarea
                          id="projects_description"
                          value={formData.projects_description}
                          onChange={(e) => setFormData(prev => ({ ...prev, projects_description: e.target.value }))}
                          rows={2}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium">İletişim Sayfası</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contact_title">İletişim Başlık *</Label>
                        <Input
                          id="contact_title"
                          value={formData.contact_title}
                          onChange={(e) => setFormData(prev => ({ ...prev, contact_title: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact_description">İletişim Açıklama *</Label>
                        <Textarea
                          id="contact_description"
                          value={formData.contact_description}
                          onChange={(e) => setFormData(prev => ({ ...prev, contact_description: e.target.value }))}
                          rows={2}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
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
                    Ayarları Kaydet
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

