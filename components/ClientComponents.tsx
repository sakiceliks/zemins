"use client"

import Link from "next/link";
import Head from "next/head";
import { ChevronRight } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";
import { HoverButton } from "@/components/ui/hover-button";
import { FadeIn } from "@/components/animations/fade-in";
import { CountUp } from "@/components/animations/count-up";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { HeroCarousel } from "@/components/HeroCarousel";
import ServicesSection from "./ServiceSection";
import { ServicesCard } from "./ServicesCard";
import { BlogCards } from "./BlogCards";
import EpoxyVisualizer from "./EpoxyVisualizer";

export default function ClientComponents() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />

      {/* SEO Head */}
      <Head>
        <title>Üsküdar Beton Silimi & Beton Parlatma | BMÇ Zemin Profesyonel Hizmetler</title>
        <meta
          name="description"
          content="Üsküdar'da beton silimi ve beton parlatma hizmetlerinde uzman ekip. Endüstriyel ve ticari alanlar için uygun fiyatlı, garantili ve hızlı çözümler."
        />
        <meta
          name="keywords"
          content="Üsküdar beton silimi, Üsküdar beton parlatma, beton temizleme, zemin parlatma, BMÇ Zemin"
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "Organization"],
              "name": "BMÇ Zemin - Üsküdar Beton Silimi ve Parlatma",
              "alternateName": ["Üsküdar Beton Silimi", "Üsküdar Beton Parlatma", "İstanbul Zemin Hizmetleri"],
              "url": "https://www.zeminustasi.com.tr",
              "logo": "https://zeminustasi.com.tr/logo.png",
              "image": [
                "https://zeminustasi.com.tr/images/beton-silimi.jpg",
                "https://zeminustasi.com.tr/images/beton-parlatma.jpg"
              ],
              "description": "Zeminlerinizde estetiği ve dayanıklılığı bir araya getiren profesyonel çözümler sunuyoruz. Üsküdar ve İstanbul bölgesinde beton silimi, parlatma ve yüzey düzeltme hizmetleri.",
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

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden h-screen">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <HeroCarousel />
      </section>

      {/* Services Section */}
      <ServicesSection />
<EpoxyVisualizer/>
      {/* Features Section */}
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
            Zeminlerinizde Estetiği ve Dayanıklılığı Bir Araya Getiriyoruz
          </h1>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12">
            Her Zeminin Özel Çözümü. Profesyonel zemin kaplamaları hizmetimizle yaşam alanlarınızı yeniden şekillendiriyoruz.
            Sektördeki deneyimimiz ve uzman ekibimizle her projeye özel çözümler sunarak, beklentilerinizi en üst düzeyde karşılıyoruz.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServicesCard />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-10 md:py-16 bg-amber-500 dark:bg-amber-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 text-center max-w-5xl mx-auto">
            {[500, 25, 150, 98].map((value, index) => (
              <FadeIn key={index} direction="up" delay={(index + 1) * 0.1}>
                <div className="p-4 md:p-6">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">
                    <CountUp end={value} suffix={index === 3 ? "%" : "+"} />
                  </div>
                  <p className="text-black dark:text-gray-100 font-medium text-sm md:text-base">
                    {["Tamamlanan Projeler", "Yıllık Deneyim", "Uzman Ekip Üyeleri", "Müşteri Memnuniyeti"][index]}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="min-h-screen bg-background p-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
              Son Blog Yazılarımız
            </h1>
            <p className="text-center text-gray-700 dark:text-gray-300 mb-12">
              Zemin kaplama, epoksi ve dekoratif zemin çözümleri hakkında güncel yazılar, ipuçları ve uzman görüşleri
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <BlogCards />
            </div>
            <div className="text-center mt-12">
              <Link href="/blog">
                <HoverButton
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 md:px-8"
                  hoverEffect="ripple"
                >
                  Tüm Blog Yazılarını Görüntüle
                  <ChevronRight className="ml-2 h-4 w-4" />
                </HoverButton>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-gray-900 dark:bg-black text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
              Üsküdar Beton Projenizi Başlatmaya Hazır mısınız?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto mb-6 md:mb-10">
              Ücretsiz danışmanlık ve teklif için bugün bizimle iletişime geçin.
              Ekibimiz vizyonunuzu hassasiyet ve mükemmellikle hayata geçirmeye hazır.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/iletisim" className="w-full sm:w-auto">
                <HoverButton
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 md:px-8 w-full sm:w-auto"
                  hoverEffect="ripple"
                >
                  Ücretsiz Teklif Al
                  <ChevronRight className="ml-2 h-4 w-4" />
                </HoverButton>
              </Link>
              <Link href="/iletisim" className="w-full sm:w-auto">
                <AnimatedButton
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10 hover:text-white font-semibold px-6 md:px-8 w-full sm:w-auto"
                  hoverEffect="pulse"
                  iconAnimation={true}
                >
                  Ekibimizle İletişime Geçin
                  <ChevronRight className="ml-2 h-4 w-4" />
                </AnimatedButton>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
