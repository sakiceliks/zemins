# Veritabanı Migration Kurulumu

Bu dokümanda, Supabase veritabanında gerekli tabloları ve verileri oluşturmak için migration dosyalarının nasıl çalıştırılacağı açıklanmaktadır.

## Gerekli Tablolar

### 1. Storage Bucket (`20250115000000_create_storage_bucket.sql`)
- `uploads` adında bir storage bucket oluşturur
- Resim yükleme işlemleri için gerekli

### 2. Content Tables (`20250115000001_create_content_tables.sql`)
- `site_settings`: Site geneli ayarlar
- `faqs`: Sık sorulan sorular
- `team_members`: Ekip üyeleri

### 3. Bolgeler Table (`20250115000002_create_bolgeler_table.sql`)
- `bolgeler`: Bölgeye özel landing page'ler için
- Sultanbeyli örnek verisi dahil

## Migration Çalıştırma

### Supabase Dashboard Üzerinden

1. [Supabase Dashboard](https://supabase.com/dashboard) açın
2. Projenizi seçin
3. Sol menüden "SQL Editor" seçin
4. Her migration dosyasını sırayla çalıştırın:

```sql
-- 1. Storage bucket oluştur
-- 20250115000000_create_storage_bucket.sql içeriğini kopyalayıp çalıştırın

-- 2. Content tabloları oluştur
-- 20250115000001_create_content_tables.sql içeriğini kopyalayıp çalıştırın

-- 3. Bolgeler tablosu oluştur
-- 20250115000002_create_bolgeler_table.sql içeriğini kopyalayıp çalıştırın
```

### Supabase CLI ile

```bash
# Migration dosyalarını çalıştır
supabase db reset

# Veya sadece yeni migration'ları
supabase db push
```

## Tablo Yapıları

### Bolgeler Tablosu

```sql
CREATE TABLE bolgeler (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  slug TEXT UNIQUE NOT NULL,
  company JSONB NOT NULL,
  seo JSONB NOT NULL,
  navigation JSONB NOT NULL,
  hero JSONB NOT NULL,
  stats JSONB NOT NULL,
  service_areas TEXT[] NOT NULL,
  services JSONB NOT NULL,
  advantages JSONB NOT NULL,
  social_media JSONB NOT NULL,
  footer_links JSONB NOT NULL
);
```

### Site Settings Tablosu

```sql
CREATE TABLE site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  company_description TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  working_hours TEXT NOT NULL,
  social_media JSONB,
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT NOT NULL,
  about_title TEXT NOT NULL,
  about_description TEXT NOT NULL,
  services_title TEXT NOT NULL,
  services_description TEXT NOT NULL,
  projects_title TEXT NOT NULL,
  projects_description TEXT NOT NULL,
  contact_title TEXT NOT NULL,
  contact_description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Örnek Veriler

### Sultanbeyli Bölge Verisi

- **Slug**: `sultanbeyli-tas-hali-kaplama`
- **Şirket**: Sultanbeyli Taş Halı Kaplama
- **Hizmet Bölgeleri**: Sultanbeyli, Pendik, Kartal, Maltepe, Ataşehir, Kadıköy
- **Hizmetler**: Ev kaplama, iş yeri kaplama, özel uygulamalar

### Varsayılan Site Ayarları

- **Şirket Adı**: BuildMaster İnşaat
- **Açıklama**: Yenilikçi inşaat çözümleri için güvenilir ortağınız
- **Adres**: İstanbul, İnşaat Mahallesi
- **Çalışma Saatleri**: Pazartesi-Cuma 08:00-17:00, Cumartesi 09:00-14:00

## Test Etme

Migration'ları çalıştırdıktan sonra:

1. **Bolgeler sayfası**: `/bolgeler/sultanbeyli-tas-hali-kaplama` çalışmalı
2. **Site ayarları**: Footer'da dinamik veriler görünmeli
3. **Admin paneli**: Site ayarları, FAQ'lar ve ekip üyeleri yönetilebilmeli

## Sorun Giderme

### "Table does not exist" Hatası
- Migration dosyalarını sırayla çalıştırdığınızdan emin olun
- Supabase Dashboard'da "Table Editor" altında tabloları kontrol edin

### "Row Level Security" Hatası
- RLS politikaları migration'larda tanımlanmıştır
- `auth.role() = 'anon'` politikası ile herkes erişebilir

### "Data not found" Hatası
- Örnek verilerin migration'larda eklendiğinden emin olun
- SQL Editor'da `SELECT * FROM bolgeler;` ile veri kontrolü yapın

## Gelecek Geliştirmeler

- Daha fazla bölge verisi ekleme
- Admin panelinden bölge yönetimi
- Dinamik bölge sayfası oluşturma
- SEO optimizasyonu
- Çoklu dil desteği
