# 📸 Resim Yükleme Özelliği

Bu özellik admin panelinde hizmet ve proje eklerken/düzenlerken resim yükleme imkanı sağlar.

## 🚀 Özellikler

- **Drag & Drop**: Resimleri sürükleyip bırakabilirsiniz
- **Dosya Seçimi**: "Resim Seç" butonu ile dosya seçebilirsiniz
- **Önizleme**: Yüklenen resimlerin önizlemesini görebilirsiniz
- **Dosya Kontrolü**: Sadece resim dosyaları (PNG, JPG, GIF, WebP) kabul edilir
- **Boyut Limiti**: Maksimum 5MB dosya boyutu
- **Klasör Organizasyonu**: Hizmetler ve projeler için ayrı klasörler

## 📁 Klasör Yapısı

```
uploads/
├── services/     # Hizmet görselleri
└── projects/     # Proje görselleri
```

## 🔧 Kurulum

### 1. Supabase Storage Bucket Oluşturma

Supabase Dashboard'da storage bucket oluşturun:

```sql
-- Migration dosyası: supabase/migrations/20250115000000_create_storage_bucket.sql
-- Bu dosyayı Supabase'e uygulayın
```

### 2. Environment Variables

`.env.local` dosyasına Supabase bilgilerinizi ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🎯 Kullanım

### Hizmet Ekleme/Düzenleme

1. Admin panelinde `/admin/hizmetler/new` veya `/admin/hizmetler/[id]/edit` sayfasına gidin
2. "Hizmet Görseli" bölümünde:
   - Resim seçmek için "Resim Seç" butonuna tıklayın
   - Veya resmi sürükleyip bırakın
3. Resim yüklendiğinde önizleme görünecek
4. Resmi kaldırmak için sağ üstteki X butonuna tıklayın

### Proje Ekleme/Düzenleme

1. Admin panelinde `/admin/projeler/new` veya `/admin/projeler/[id]/edit` sayfasına gidin
2. "Proje Görseli" bölümünde aynı işlemleri yapın

## 🛠️ Teknik Detaylar

### ImageUpload Komponenti

```tsx
<ImageUpload
  value={formData.image}
  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
  label="Görsel"
  folder="services" // veya "projects"
/>
```

### Supabase Fonksiyonları

```typescript
// Resim yükleme
const url = await uploadImage(file, folder)

// Resim silme
await deleteImage(filePath)
```

## 📋 Desteklenen Formatlar

- **PNG** (.png)
- **JPEG** (.jpg, .jpeg)
- **GIF** (.gif)
- **WebP** (.webp)

## ⚠️ Sınırlamalar

- Maksimum dosya boyutu: **5MB**
- Sadece resim dosyaları kabul edilir
- Dosya adları otomatik olarak rastgele oluşturulur

## 🔒 Güvenlik

- Dosya tipi kontrolü
- Dosya boyutu kontrolü
- Supabase RLS (Row Level Security) politikaları
- Sadece authenticated kullanıcılar yükleyebilir

## 🐛 Sorun Giderme

### Resim Yüklenmiyor

1. Supabase storage bucket'ının oluşturulduğundan emin olun
2. Environment variables'ların doğru olduğunu kontrol edin
3. Dosya boyutunun 5MB'dan küçük olduğunu kontrol edin
4. Dosya formatının desteklendiğini kontrol edin

### Resim Görünmüyor

1. Supabase storage bucket'ının public olduğunu kontrol edin
2. RLS politikalarının doğru ayarlandığını kontrol edin
3. Resim URL'sinin doğru olduğunu kontrol edin

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. Console'da hata mesajlarını kontrol edin
2. Supabase Dashboard'da storage bucket ayarlarını kontrol edin
3. Network sekmesinde upload isteklerini kontrol edin
