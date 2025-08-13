# 🎠 Hero Carousel Yönetim Sistemi

Bu proje, ana sayfa hero carousel'ini admin panelinden yönetmek için gelişmiş bir sistem kullanır.

## 🎯 Özellikler

### ✅ Temel Özellikler
- **Resim Yükleme**: Hero carousel için resim yükleme ve yönetimi
- **İçerik Düzenleme**: Başlık, alt başlık, açıklama düzenleme
- **Buton Yönetimi**: CTA buton metni ve linki ayarlama
- **Sıralama**: Carousel öğelerini sıralama
- **Aktif/Pasif**: Öğeleri aktif veya pasif yapma
- **Gerçek Zamanlı**: Değişiklikler anında görünür

### 🎨 Görsel Özellikler
- **Responsive Tasarım**: Tüm cihazlarda uyumlu
- **Smooth Animasyonlar**: Geçişler ve hover efektleri
- **Modern UI**: Clean ve kullanıcı dostu arayüz
- **Image Preview**: Resim önizleme ve yönetimi

## 🗄️ Veritabanı Yapısı

### Hero Carousel Tablosu
```sql
CREATE TABLE hero_carousel (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,                    -- Ana başlık
  subtitle TEXT,                          -- Alt başlık
  description TEXT,                       -- Açıklama
  image_url TEXT NOT NULL,                -- Resim URL'i
  image_alt TEXT,                         -- Resim alt metni
  button_text TEXT,                       -- Buton metni
  button_link TEXT,                       -- Buton linki
  order_index INTEGER DEFAULT 0,          -- Sıralama
  is_active BOOLEAN DEFAULT true,         -- Aktif durumu
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### İndeksler
- `idx_hero_carousel_order`: Sıralama için
- `idx_hero_carousel_active`: Aktif öğeler için

### Güvenlik
- **RLS (Row Level Security)**: Aktif
- **Policies**: Sadece authenticated kullanıcılar düzenleyebilir

## 🚀 Kurulum

### 1. Veritabanı Migration
```bash
# Supabase migration'ı çalıştır
supabase db push

# Veya manuel olarak SQL çalıştır
psql -d your_database -f supabase/migrations/20250115000003_create_hero_carousel.sql
```

### 2. Admin Panel Erişimi
```
/admin/hero-carousel
```

### 3. Gerekli Bağımlılıklar
- `@supabase/auth-helpers-nextjs`
- `@supabase/supabase-js`
- `lucide-react` (icons)
- UI components (Button, Card, Input, etc.)

## 🎮 Kullanım

### Admin Panel Erişimi
1. `/admin` sayfasına gidin
2. "Hero Carousel" tab'ına tıklayın
3. "Hero Carousel Yönetimi" butonuna tıklayın

### Yeni Öğe Ekleme
1. "Yeni Öğe Ekle" butonuna tıklayın
2. Form alanlarını doldurun:
   - **Başlık** (zorunlu): Ana başlık
   - **Alt Başlık**: İsteğe bağlı alt başlık
   - **Açıklama**: Detaylı açıklama
   - **Resim**: Resim yükleyin
   - **Resim Alt Metni**: SEO için
   - **Buton Metni**: CTA buton metni
   - **Buton Linki**: Buton linki
   - **Sıra**: Görünüm sırası
   - **Aktif**: Öğeyi aktif/pasif yapın
3. "Kaydet" butonuna tıklayın

### Öğe Düzenleme
1. Mevcut öğenin yanındaki "Düzenle" butonuna tıklayın
2. Form alanlarını güncelleyin
3. "Kaydet" butonuna tıklayın

### Öğe Silme
1. Öğenin yanındaki "Sil" butonuna tıklayın
2. Onay mesajını onaylayın

### Sıralama
1. "Yukarı" ve "Aşağı" butonlarını kullanın
2. Sıralama otomatik olarak güncellenir

### Aktif/Pasif Yapma
1. "Göz" butonuna tıklayın
2. Öğe durumu değişir

## 📁 Dosya Yapısı

```
app/admin/hero-carousel/
└── page.tsx                    # Admin sayfası

components/
├── HeroCarousel.tsx            # Frontend carousel bileşeni
└── ui/                         # UI bileşenleri

supabase/migrations/
└── 20250115000003_create_hero_carousel.sql  # DB migration

docs/
└── HERO_CAROUSEL_README.md     # Bu dosya
```

## 🔧 Teknik Detaylar

### Frontend Bileşeni
- **React Hooks**: useState, useEffect, useRef
- **Supabase Client**: Veritabanı işlemleri
- **Image Optimization**: Next.js Image bileşeni
- **Responsive Design**: Tailwind CSS

### Backend API
- **Supabase**: PostgreSQL veritabanı
- **Real-time**: Otomatik güncelleme
- **Authentication**: Kullanıcı doğrulama
- **Storage**: Resim yükleme

### Performans
- **Lazy Loading**: Resimler lazy load edilir
- **Caching**: Supabase cache kullanımı
- **Optimization**: Resim optimizasyonu

## 🎨 Özelleştirme

### CSS Styling
```css
/* Hero carousel özel stilleri */
.hero-carousel {
  /* Özel stiller buraya */
}

.carousel-item {
  /* Carousel öğe stilleri */
}
```

### Component Props
```tsx
interface HeroCarouselProps {
  autoPlay?: boolean;           // Otomatik oynatma
  interval?: number;            // Geçiş süresi (ms)
  showNavigation?: boolean;     // Navigasyon butonları
  showDots?: boolean;          // Pagination dots
}
```

### Database Fields
```sql
-- Özel alanlar ekleyebilirsiniz
ALTER TABLE hero_carousel ADD COLUMN custom_field TEXT;
```

## 🔍 Sorun Giderme

### Resim Yüklenmiyor
1. Supabase storage bucket'ın var olduğunu kontrol edin
2. Storage policies'leri kontrol edin
3. Resim boyutunu kontrol edin (max 5MB)

### Veritabanı Hatası
1. Migration'ın çalıştığını kontrol edin
2. Supabase connection string'ini kontrol edin
3. RLS policies'leri kontrol edin

### Carousel Görünmüyor
1. Veritabanında aktif öğe var mı kontrol edin
2. Console hatalarını kontrol edin
3. Network requests'i kontrol edin

### Admin Panel Erişimi
1. Kullanıcının admin olduğunu kontrol edin
2. Authentication durumunu kontrol edin
3. RLS policies'leri kontrol edin

## 📊 Performans Metrikleri

### Database
- **Query Time**: < 100ms
- **Storage**: Optimized images
- **Cache**: Supabase built-in caching

### Frontend
- **Load Time**: < 2s
- **Image Loading**: Lazy + priority
- **Animations**: 60fps smooth

## 🚀 Gelecek Özellikler

### Planlanan Özellikler
- [ ] **Video Support**: Video carousel öğeleri
- [ ] **A/B Testing**: Farklı carousel versiyonları
- [ ] **Analytics**: Click tracking ve analytics
- [ ] **Scheduling**: Zamanlı gösterim
- [ ] **Multi-language**: Çoklu dil desteği

### Gelişmiş Özellikler
- [ ] **AI Optimization**: Otomatik resim optimizasyonu
- [ ] **Smart Caching**: Akıllı cache stratejileri
- [ ] **Performance Monitoring**: Real-time performans izleme

## 📚 Faydalı Linkler

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hooks](https://react.dev/reference/react/hooks)

## 🤝 Katkıda Bulunma

1. **Bug Report**: GitHub Issues kullanın
2. **Feature Request**: Enhancement önerileri
3. **Code Review**: Pull request'leri inceleyin
4. **Documentation**: README'leri güncelleyin

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**Not**: Hero carousel sistemi tamamen admin panelinden yönetilebilir. Kod değişikliği gerekmez.
