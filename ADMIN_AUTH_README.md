# Admin Authentication Sistemi

Bu sistem, admin panelinde kullanıcı doğrulamasını merkezi olarak yönetmek için oluşturulmuştur.

## Özellikler

### 1. useAdminAuth Hook
- **Dosya**: `hooks/use-admin-auth.ts`
- **Amaç**: Admin sayfalarında kullanıcı doğrulaması yapar
- **Özellikler**:
  - Kullanıcı giriş kontrolü
  - Admin yetki kontrolü
  - Otomatik yönlendirme
  - Çıkış yapma fonksiyonu

### 2. AdminSettings Context
- **Dosya**: `contexts/admin-settings-context.tsx`
- **Amaç**: Admin ayarlarını merkezi olarak yönetir
- **Özellikler**:
  - Auth check açma/kapama
  - Local storage'da ayar saklama
  - Tüm admin sayfalarında erişilebilir

### 3. Admin Layout
- **Dosya**: `app/admin/layout.tsx`
- **Amaç**: Tüm admin sayfalarını AdminSettingsProvider ile sarar

## Kullanım

### Admin Sayfasında Auth Check Kullanımı

```tsx
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { useAdminSettings } from "@/contexts/admin-settings-context"

export default function AdminPage() {
  const { user, isUserAdmin, loading: authLoading } = useAdminAuth({
    enabled: useAdminSettings().settings.authCheckEnabled
  })
  const { settings } = useAdminSettings()

  if (authLoading) {
    return <LoadingSpinner />
  }

  // Sayfa içeriği...
}
```

### Auth Check'i Devre Dışı Bırakma

Admin panelindeki "Ayarlar" sekmesinden "Kullanıcı Doğrulama Kontrolü" switch'ini kapatarak auth check'i devre dışı bırakabilirsiniz.

## Güvenlik Durumları

### Auth Check Açık
- ✅ Tüm admin sayfalarında kullanıcı doğrulaması yapılır
- ✅ Admin olmayan kullanıcılar ana sayfaya yönlendirilir
- ✅ Giriş yapmamış kullanıcılar login sayfasına yönlendirilir

### Auth Check Kapalı (Varsayılan)
- ⚠️ Kullanıcı doğrulaması yapılmaz
- ⚠️ Herkes admin paneline erişebilir
- ⚠️ Login sayfasından direkt admin paneline yönlendirme
- ⚠️ Sadece geliştirme/test amaçlı kullanılmalıdır



## Dosya Yapısı

```
hooks/
  └── use-admin-auth.ts          # Auth hook'u
contexts/
  └── admin-settings-context.tsx # Ayarlar context'i
app/admin/
  ├── layout.tsx                 # Admin layout (provider)
  ├── page.tsx                   # Ana admin sayfası
  ├── services/
  │   ├── page.tsx              # Hizmetler listesi
  │   └── new/page.tsx          # Yeni hizmet
  └── projects/
      ├── page.tsx              # Projeler listesi
      └── new/page.tsx          # Yeni proje
```

## Güncellenen Sayfalar

1. **Ana Admin Sayfası** (`app/admin/page.tsx`)
   - Auth hook entegrasyonu
   - Ayarlar sekmesinde auth toggle
   - Çıkış yapma butonu

2. **Admin Login Sayfası** (`app/admin/login/page.tsx`)
   - Auth check durumuna göre otomatik yönlendirme
   - Güvenlik durumu göstergesi
   - Form alanları auth check kapalıyken devre dışı

3. **Hizmetler Sayfası** (`app/admin/services/page.tsx`)
   - Auth hook kullanımı
   - Ayarlara göre auth check

4. **Projeler Sayfası** (`app/admin/projects/page.tsx`)
   - Auth hook kullanımı
   - Ayarlara göre auth check

5. **Yeni Hizmet Sayfası** (`app/admin/services/new/page.tsx`)
   - Auth hook kullanımı

6. **Yeni Proje Sayfası** (`app/admin/projects/new/page.tsx`)
   - Auth hook kullanımı

## Notlar

- Auth check ayarı local storage'da saklanır
- Varsayılan olarak auth check kapalıdır (geliştirme için)
- Auth check kapalıyken güvenlik uyarısı gösterilir
- Tüm admin sayfaları otomatik olarak bu sistemi kullanır
