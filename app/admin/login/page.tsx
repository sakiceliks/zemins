"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase, isAdmin } from "@/lib/supabase"
import { saveAuthToStorage, createAdminUser } from "@/hooks/use-admin-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Shield, ShieldOff } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [authCheckEnabled, setAuthCheckEnabled] = useState(true)
  const [checkingSettings, setCheckingSettings] = useState(true)
  const router = useRouter()

  // Local storage'dan auth check ayarını kontrol et
  useEffect(() => {
    const savedSettings = localStorage.getItem('admin-settings')
    
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        const isAuthCheckEnabled = parsedSettings.authCheckEnabled ?? true
        setAuthCheckEnabled(isAuthCheckEnabled)
        
        // Auth check kapalıysa direkt admin paneline yönlendir
        if (!isAuthCheckEnabled) {
          router.replace("/admin")
          return
        }
      } catch (error) {
        console.error('Error parsing admin settings:', error)
      }
    } else {
      // Local storage'da ayar yoksa varsayılan olarak false (auth check kapalı)
      setAuthCheckEnabled(false)
      // Auth check kapalıysa direkt admin paneline yönlendir
      router.replace("/admin")
      return
    }
    setCheckingSettings(false)
  }, [])

async function handleLogin(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    // 1. Giriş yap (Supabase auth ile doğrulama)
    const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !user) throw authError || new Error("Giriş başarısız");

    // 2. Admin kontrolü (email yerine user.id ile)
    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('user_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (adminError || !adminData) {
      await supabase.auth.signOut();
      throw new Error("Yönetici yetkiniz yok");
    }

    // 3. localStorage'a admin bilgilerini kaydet
    const adminUser = createAdminUser(user.email || email, user.id)
    saveAuthToStorage(adminUser)

    // 4. Supabase auth'tan çıkış yap (artık localStorage kullanıyoruz)
    await supabase.auth.signOut();

    router.push("/admin");
  } catch (error: any) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}

  function handleDirectAccess() {
    router.push("/admin")
  }

  // Ayarlar kontrol edilirken loading göster
  if (checkingSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {authCheckEnabled ? (
              <Shield className="h-5 w-5 text-green-600" />
            ) : (
              <ShieldOff className="h-5 w-5 text-red-600" />
            )}
            <CardTitle className="text-2xl font-bold text-white">Yönetici Girişi</CardTitle>
          </div>
          <CardDescription className="text-gray-400">
            {authCheckEnabled 
              ? "Yönetim paneline erişim için giriş yapın"
              : "Güvenlik devre dışı - Direkt erişim mümkün"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!authCheckEnabled && (
            <Alert className="border-red-800 bg-red-950">
              <ShieldOff className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">
                <strong>Güvenlik Uyarısı:</strong> Kullanıcı doğrulaması devre dışı. Admin paneline direkt erişim mümkün.
              </AlertDescription>
            </Alert>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@zeminustasi.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={!authCheckEnabled}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={!authCheckEnabled}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-amber-500 hover:bg-amber-600" 
              disabled={loading || !authCheckEnabled}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {authCheckEnabled ? "Giriş Yap" : "Güvenlik Devre Dışı"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                VEYA
              </span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleDirectAccess}
          >
            {authCheckEnabled ? "Misafir Girişi" : "Admin Paneline Git"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}