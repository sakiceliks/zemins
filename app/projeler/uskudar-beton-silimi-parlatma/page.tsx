"use client"

import Link from "next/link";
import Head from "next/head";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { ScrollProgress } from "@/components/animations/scroll-progress";

export default function BetonSilimiPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <ScrollProgress />

      <Head>
        <title>Üsküdar Beton Silimi & Parlatma | BMÇ Zemin Profesyonel Hizmetler</title>
        <meta
          name="description"
          content="Üsküdar’da beton silimi ve parlatma hizmetlerinde uzman ekip. BMÇ Zemin ile beton zeminleriniz pürüzsüz, estetik ve dayanıklı hale gelir."
        />
        <meta
          name="keywords"
          content="Üsküdar beton silimi, Üsküdar beton parlatma, BMÇ Zemin, beton temizleme, zemin parlatma, endüstriyel beton silimi"
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "Organization"],
              "name": "BMÇ Zemin - Üsküdar Beton Silimi ve Parlatma",
              "alternateName": ["Üsküdar Beton Silimi", "Üsküdar Beton Parlatma"],
              "url": "https://zeminustasi.com.tr/uskudar-beton-silimi-parlatma",
              "logo": "https://zeminustasi.com.tr/logo.png",
              "image": ["https://zeminustasi.com.tr/images/beton-silimi.jpg"],
              "description": "Üsküdar BMÇ Zemin beton silimi ve parlatma hizmetleri ile zeminlerinizi pürüzsüz ve estetik hale getirir.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Fatih, Sayfiye Sk. No:24 D:3",
                "addressLocality": "Üsküdar",
                "addressRegion": "İstanbul",
                "postalCode": "34920",
                "addressCountry": "TR"
              },
              "geo": { "@type": "GeoCoordinates", "latitude": 41.0221, "longitude": 29.0236 },
              "telephone": "+90 531 281 29 58",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Zemin Kaplama ve Parlatma Hizmetleri",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Beton Silimi", "description": "Her zemine özel pürüzsüz ve dayanıklı beton silimi hizmeti." } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Beton Parlatma", "description": "Zeminlerin estetik görünümünü artıran yüksek parlaklıkta beton parlatma." } }
                ]
              },
              "founder": { "@type": "Person", "name": "Ümit Kesik" },
              "foundingDate": "2010",
              "numberOfEmployees": { "@type": "QuantitativeValue", "value": 15 }
            })
          }}
        />
      </Head>

      {/* Hero */}
      <section className="relative w-full h-[400px] bg-amber-500 flex flex-col justify-center items-center text-gray-900 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Üsküdar Beton Silimi ve Parlatma
        </h1>
        <p className="max-w-2xl text-lg">
          BMÇ Zemin ile Üsküdar'da beton zeminleriniz estetik, pürüzsüz ve dayanıklı hale gelir. Profesyonel ekip ve modern ekipmanlarla her projeye özel çözümler.
        </p>
        <Link href="/iletisim" className="mt-6">
          <Button variant="default" size="lg" className="flex items-center gap-2">
            Ücretsiz Keşif Al
            <ChevronRight className="h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-5xl mx-auto prose prose-lg dark:prose-invert text-white">
          <h2>Beton Silimi Nedir ve Neden Önemlidir?</h2>
          <p>
            Beton silimi, zeminlerdeki yüzey bozulmalarını, lekeleri ve çizikleri gideren profesyonel bir işlemdir. Üsküdar ve İstanbul genelinde BMÇ Zemin olarak, endüstriyel tesisler, otoparklar, depolar ve mağazalar için özel beton silimi hizmeti sunuyoruz. Beton silimi sayesinde zeminler hem estetik hem de dayanıklı bir yüzeye kavuşur.
          </p>
          <p>
            Beton zeminler, kullanım yoğunluğu ve çevresel faktörler nedeniyle zamanla matlaşabilir ve yüzey bozulmaları oluşabilir. Bu durum, hem estetik açıdan hem de zemin dayanıklılığı açısından sorun yaratır. BMÇ Zemin ekibi, modern makineler ve özel taşlama teknikleri ile zeminleri pürüzsüz hale getirir, ömrünü uzatır ve parlak görünüm kazandırır.
          </p>
          <p>
            Beton silimi hizmetimizde, yüksek kaliteli taşlama ekipmanları kullanılır ve her zemin tipine özel program uygulanır. Endüstriyel alanlar, ofisler ve mağazalar gibi yoğun kullanılan mekanlarda, zeminlerin güvenliği ve estetiği ön planda tutulur. Ayrıca, işlem sonrası bakım ve parlatma hizmeti ile zeminler uzun yıllar ilk günkü gibi korunur.
          </p>
          <p>
            Üsküdar beton silimi işlemi sırasında kullanılan teknikler arasında CNC taşlama makineleri, el taşlama ekipmanları ve özel temizleme kimyasalları yer alır. Bu sayede, zeminler çizik ve deformasyonlardan arındırılır, pürüzsüz ve parlak bir yüzey elde edilir. Beton parlatma ile birleştiğinde, zeminler hem estetik hem de dayanıklı olur.
          </p>
          <p>
            BMÇ Zemin olarak amacımız, Üsküdar’daki tüm müşterilerimize yüksek kalite, ekonomik fiyat ve garantili hizmet sunmaktır. Beton silimi ve parlatma hizmetimiz, zeminlerinizin ömrünü uzatır ve mekanlarınıza değer katar. Hemen bizimle iletişime geçerek ücretsiz keşif ve fiyat teklifi alabilirsiniz.
          </p>

          <div className="mt-8 flex justify-center">
            <Link href="/iletisim">
              <Button variant="default" size="lg" className="flex items-center gap-2">
                Ücretsiz Keşif Al
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / CTA Section */}
      <section className="py-16 bg-amber-500 text-gray-900 text-center">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-4">Zeminleriniz için Profesyonel Çözümler</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Üsküdar ve İstanbul genelinde BMÇ Zemin, beton silimi ve parlatma hizmetleriyle alanınızı yeniler, estetik ve dayanıklı zeminler sunar.
          </p>
          <Link href="/iletisim">
            <Button variant="default" size="lg" className="flex items-center gap-2">
              Hemen İletişime Geçin
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
