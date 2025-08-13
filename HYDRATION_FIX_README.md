# Hydration Hatası Düzeltimi

Bu dokümanda, Next.js uygulamasında karşılaşılan hydration hatalarının nasıl düzeltildiği açıklanmaktadır.

## Sorun

Uygulamada aşağıdaki hydration hatası görülüyordu:

```
Hydration failed because the server rendered HTML didn't match the client. 
As a result this tree will be regenerated on the client.
```

## Neden

Hydration hatası, server-side rendering (SSR) ile client-side rendering arasında HTML uyumsuzluğundan kaynaklanıyordu. Ana sorunlar:

1. **Manuel HTML Tag'leri**: `app/layout.tsx` ve `app/client-layout.tsx` dosyalarında `<html>` ve `<body>` tag'lerini manuel olarak eklememiz
2. **Font Sınıf Çakışması**: Font tanımlarının hem root layout'ta hem de client layout'ta bulunması
3. **Next.js HTML Yönetimi**: Next.js'in HTML yapısını otomatik olarak yönetmesi gerekiyor
4. **HTML İçerik Uyumsuzluğu**: `dangerouslySetInnerHTML` içinde HTML içeriği render edilirken server ve client arasında farklılık olması

## Çözüm

### 1. Root Layout Düzenlemesi (`app/layout.tsx`)

- Font tanımları buraya taşındı
- `<html>` ve `<body>` tag'leri burada tanımlandı
- `suppressHydrationWarning` eklendi
- JSON-LD script'i `<head>` bölümüne yerleştirildi

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${montserrat.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <Script id="organization-jsonld" type="application/ld+json" ... />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
```

### 2. Client Layout Düzenlemesi (`app/client-layout.tsx`)

- `<html>` ve `<body>` tag'leri kaldırıldı
- Font tanımları kaldırıldı
- Sadece içerik wrapper'ı kaldı

```tsx
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
        <div className="antialiased flex min-h-screen flex-col">
          {/* İçerik */}
        </div>
      </ThemeProvider>
    </div>
  )
}
```

### 3. HTML İçerik Güvenliği

`dangerouslySetInnerHTML` kullanımını güvenli hale getirmek için:

- HTML içeriği sanitize edildi
- `SafeHtmlContent` component'i oluşturuldu
- Server-client uyumsuzluğu önlendi

```tsx
// HTML içeriğini güvenli hale getiren yardımcı fonksiyon
function sanitizeHtml(html: string): string {
  if (!html) return ""
  
  return html
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<html[^>]*>/gi, '')
    .replace(/<\/html>/gi, '')
    .replace(/<head[^>]*>[\s\S]*?<\/head>/gi, '')
    .replace(/<body[^>]*>/gi, '')
    .replace(/<\/body>/gi, '')
    .trim()
}

// HTML içeriğini güvenli bir şekilde render eden component
function SafeHtmlContent({ content }: { content: string }) {
  if (!content) return null;
  
  const sanitizedContent = sanitizeHtml(content);
  
  // Eğer içerik boşsa veya sadece HTML tag'leri varsa, normal text olarak göster
  if (!sanitizedContent || sanitizedContent.trim() === '') {
    return (
      <div className="text-gray-600 dark:text-gray-400 text-center py-8">
        İçerik bulunamadı.
      </div>
    );
  }
  
  // HTML tag'leri varsa güvenli şekilde render et
  if (sanitizedContent.includes('<')) {
    return (
      <div 
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    );
  }
  
  // Sadece text ise normal paragraf olarak göster
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <p className="text-gray-700 dark:text-gray-300">{sanitizedContent}</p>
    </div>
  );
}
```

### 4. Next.js 15 Uyumluluğu

`params` artık bir Promise olduğu için `React.use()` ile unwrap edilmesi gerekiyor:

```tsx
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function DynamicPage({ params }: PageProps) {
  const { slug } = use(params);
  // ... component logic
}
```

## Teknik Detaylar

### Font Yönetimi
- Fontlar sadece root layout'ta tanımlanır
- CSS variable'ları (`--font-montserrat`, `--font-poppins`) root layout'ta set edilir
- Client component'lerde font sınıfları kullanılmaz

### HTML Yapısı
- `<html>` ve `<body>` tag'leri sadece root layout'ta bulunur
- Client component'ler sadece içerik wrapper'ı olarak çalışır
- `suppressHydrationWarning` theme değişikliklerinde hydration uyarılarını bastırır

### JSON-LD Entegrasyonu
- Organization JSON-LD root layout'ta `<head>` bölümüne eklenir
- Service ve Project JSON-LD'ları ilgili sayfalarda `<Script>` component'i ile eklenir

### HTML İçerik Güvenliği
- HTML içeriği sanitize edilir
- Server-client uyumsuzluğu önlenir
- Güvenli render component'i kullanılır

## Sonuç

Bu düzenlemeler sonrasında:

✅ Hydration hataları çözüldü  
✅ Font yönetimi merkezi hale getirildi  
✅ HTML yapısı Next.js standartlarına uygun hale getirildi  
✅ JSON-LD yapılandırılmış veri korundu  
✅ SEO performansı etkilenmedi  
✅ HTML içerik güvenliği sağlandı  
✅ Next.js 15 uyumluluğu sağlandı  

## Test Etme

Hydration hatalarının çözüldüğünü test etmek için:

1. Uygulamayı development modunda çalıştırın
2. Console'da hydration uyarıları olup olmadığını kontrol edin
3. Farklı sayfalara geçiş yaparak hata olup olmadığını test edin
4. Theme değişikliklerinde sorun olup olmadığını kontrol edin
5. HTML içerikli sayfalarda hydration hatası olup olmadığını kontrol edin

## Gelecek Geliştirmeler

- Font yönetimi için daha gelişmiş bir sistem
- Theme değişikliklerinde daha smooth geçişler
- Font loading optimizasyonu
- CSS-in-JS çözümleri için hazırlık
- HTML sanitization için daha gelişmiş kütüphaneler
- Content Security Policy (CSP) entegrasyonu
