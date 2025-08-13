# JSON-LD Yapılandırılmış Veri Entegrasyonu

Bu proje, arama motorları ve sosyal medya platformları için yapılandırılmış veri (structured data) sağlamak üzere JSON-LD formatında Schema.org markup'ları kullanmaktadır.

## Eklenen JSON-LD Yapıları

### 1. Organization Schema (Ana Sayfa)
- **Dosya**: `app/layout.tsx`
- **Tip**: Organization
- **İçerik**: Şirket bilgileri, adres, iletişim bilgileri, sosyal medya linkleri

### 2. Service Schema (Hizmet Detay Sayfaları)
- **Dosya**: `app/hizmetler/[slug]/page.tsx`
- **Tip**: Service
- **İçerik**: Hizmet adı, açıklaması, sağlayıcı bilgileri, görsel

### 3. Project Schema (Proje Detay Sayfaları)
- **Dosya**: `app/projeler/[slug]/page.tsx`
- **Tip**: CreativeWork
- **İçerik**: Proje adı, açıklaması, konum, kategori, tarih bilgileri

## Teknik Detaylar

### Kullanılan Teknolojiler
- **Next.js Script Component**: JSON-LD script'lerini render etmek için
- **Schema.org**: Standart yapılandırılmış veri şeması
- **TypeScript**: Tip güvenliği için

### JSON-LD Fonksiyonları
- `generateServiceJsonLd()`: Hizmet verilerinden JSON-LD oluşturur
- `generateProjectJsonLd()`: Proje verilerinden JSON-LD oluşturur
- `generateOrganizationJsonLd()`: Şirket bilgilerinden JSON-LD oluşturur

## SEO Faydaları

### Arama Motorları
- Google Rich Snippets desteği
- Daha iyi arama sonuçları görünümü
- Arama motoru anlayışını artırır

### Sosyal Medya
- Facebook Open Graph uyumluluğu
- Twitter Card desteği
- LinkedIn paylaşım optimizasyonu

## Test Etme

### Google Rich Results Test
1. [Google Rich Results Test](https://search.google.com/test/rich-results) sayfasına gidin
2. Test edilecek URL'yi girin
3. JSON-LD yapısının doğru parse edildiğini kontrol edin

### Schema.org Validator
1. [Schema.org Validator](https://validator.schema.org/) kullanın
2. Sayfa URL'sini test edin
3. Yapılandırılmış veri hatalarını kontrol edin

## Gelecek Geliştirmeler

### Eklenebilecek Schema'lar
- **BreadcrumbList**: Sayfa navigasyon yapısı
- **WebSite**: Site genel bilgileri
- **LocalBusiness**: Yerel işletme bilgileri
- **FAQPage**: Sık sorulan sorular
- **Review**: Müşteri yorumları

### Dinamik Veri Entegrasyonu
- Site ayarlarından dinamik veri çekme
- Gerçek zamanlı içerik güncelleme
- Çoklu dil desteği

## Notlar

- JSON-LD script'leri `<head>` bölümünde yer alır
- Her sayfa için benzersiz ID'ler kullanılır
- Hata durumlarında fallback değerler sağlanır
- SEO performansı için kritik öneme sahiptir
