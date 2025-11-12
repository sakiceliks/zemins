"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Settings, BarChart3, Users, FileText, FolderOpen, Shield, ShieldOff, Image } from "lucide-react"
import Link from "next/link"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { useAdminSettings } from "@/contexts/admin-settings-context"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function AdminDashboard() {
  const { settings, toggleAuthCheck } = useAdminSettings()
  const { user, isUserAdmin, loading, handleSignOut } = useAdminAuth({
    enabled: settings.authCheckEnabled
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  if (!isUserAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Yönetim Paneli</h1>
            <p className="text-gray-400">Hoş geldiniz, {user?.email}</p>
          </div>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">Siteye Dön</Button>
            </Link>
            <Button onClick={handleSignOut} variant="destructive">
              Çıkış Yap
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Hizmetler</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 bu ay</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Projeler</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+5 bu ay</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Öne Çıkan</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Öne çıkan içerik</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admin Kullanıcılar</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Aktif yönetici</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="services">Hizmetler</TabsTrigger>
            <TabsTrigger value="hero-carousel">Hero Carousel</TabsTrigger>
            <TabsTrigger value="projects">Projeler</TabsTrigger>
            <TabsTrigger value="content">İçerik</TabsTrigger>
            <TabsTrigger value="team">Ekip</TabsTrigger>
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Hizmetler</h2>
              <Link href="/admin/hizmetler/new">
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Hizmet
                </Button>
              </Link>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Hizmet Yönetimi</CardTitle>
                <CardDescription>
                  Tüm hizmetlerinizi buradan yönetebilirsiniz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Link href="/admin/hizmetler">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Tüm Hizmetleri Görüntüle
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Projeler</h2>
              <Link href="/admin/projeler/new">
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Proje
                </Button>
              </Link>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Proje Yönetimi</CardTitle>
                <CardDescription>
                  Tüm projelerinizi buradan yönetebilirsiniz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Link href="/admin/projeler">
                    <Button variant="outline" className="w-full justify-start">
                      <FolderOpen className="mr-2 h-4 w-4" />
                      Tüm Projeleri Görüntüle
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">İçerik Yönetimi</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Site Ayarları</CardTitle>
                  <CardDescription>
                    Şirket bilgileri, sayfa başlıkları ve açıklamaları.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin/site-settings">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Site Ayarlarını Düzenle
                    </Button>
                  </Link>
                </CardContent>
              </Card>

            <Card>
              <CardHeader>
                <CardTitle>SSS Yönetimi</CardTitle>
                <CardDescription>
                  Sık sorulan soruları ekleyin ve düzenleyin.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Link href="/admin/faqs">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Tüm SSS''leri Görüntüle
                    </Button>
                  </Link>
                  <Link href="/admin/faqs/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Yeni SSS Ekle
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hero-carousel" className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Hero Carousel Yönetimi</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Carousel Öğeleri</CardTitle>
              <CardDescription>
                Ana sayfa hero carousel'ini yönetin. Resimler, başlıklar ve butonları düzenleyin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/admin/hero-carousel">
                  <Button variant="outline" className="w-full justify-start">
                    <Image className="mr-2 h-4 w-4" />
                    Hero Carousel Yönetimi
                  </Button>
                </Link>
                <div className="p-4 bg-blue-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Image className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-100">
                        Hero Carousel Özellikleri
                      </p>
                      <ul className="text-sm text-blue-300 mt-2 space-y-1">
                        <li>• Resim yükleme ve yönetimi</li>
                        <li>• Başlık, alt başlık ve açıklama düzenleme</li>
                        <li>• Buton metni ve linki ayarlama</li>
                        <li>• Sıralama ve aktif/pasif durumu</li>
                        <li>• Gerçek zamanlı önizleme</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Ekip Yönetimi</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>Ekip Üyeleri</CardTitle>
              <CardDescription>
                Ekip üyelerini ekleyin, düzenleyin ve yönetin.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link href="/admin/team">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Tüm Ekip Üyelerini Görüntüle
                  </Button>
                </Link>
                <Link href="/admin/team/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Ekip Üyesi Ekle
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Ayarlar</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Güvenlik Ayarları</CardTitle>
                <CardDescription>
                  Admin paneli güvenlik ayarlarını buradan yönetebilirsiniz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Kullanıcı Doğrulama Kontrolü</Label>
                      <p className="text-sm text-muted-foreground">
                        Admin panelindeki her sayfada kullanıcı doğrulaması yapılsın mı?
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {settings.authCheckEnabled ? (
                        <Shield className="h-4 w-4 text-green-600" />
                      ) : (
                        <ShieldOff className="h-4 w-4 text-red-600" />
                      )}
                      <Switch
                        checked={settings.authCheckEnabled}
                        onCheckedChange={toggleAuthCheck}
                      />
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-start gap-3">
                      {settings.authCheckEnabled ? (
                        <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <ShieldOff className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium">
                          {settings.authCheckEnabled ? 'Güvenlik Aktif' : 'Güvenlik Devre Dışı'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {settings.authCheckEnabled 
                            ? 'Admin panelindeki tüm sayfalarda kullanıcı doğrulaması yapılıyor.'
                            : 'Kullanıcı doğrulaması devre dışı. Dikkatli olun!'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}