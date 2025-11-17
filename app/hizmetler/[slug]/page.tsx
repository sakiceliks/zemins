import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServiceBySlug, getServices, generateServiceJsonLd } from "@/lib/supabase"
import type { Metadata } from "next"
import Script from "next/script"
import ContactWidget from "@/components/ContactWidget"
import { buildSeoMetadata } from "@/lib/seo"

// HTML içeriğini güvenli hale getiren yardımcı fonksiyon
function sanitizeHtml(html: string): string {
  if (!html) return ""
  
  // HTML içeriğini temizle ve güvenli hale getir
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

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const services = await getServices()
    return services.map((service) => ({
      slug: service.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const service = await getServiceBySlug(slug)
    const keywordSource =
      service.features && service.features.length > 0
        ? service.features
        : [service.title, "zemin kaplama", "epoksi hizmeti"]

    return buildSeoMetadata({
      title: service.meta_title || service.title,
      description: service.meta_description || service.description,
      path: `/hizmetler/${slug}`,
      keywords: keywordSource,
      images: service.image,
      type: "article",
      section: "Services",
      publishedTime: service.created_at,
      modifiedTime: service.updated_at,
    })
  } catch (error) {
    return buildSeoMetadata({
      title: "Hizmet Bulunamadı",
      description: "Aradığınız hizmet bulunamadı.",
      path: "/hizmetler",
      robots: {
        index: false,
        follow: false,
      },
    })
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  let service
  
  try {
    const { slug } = await params
    service = await getServiceBySlug(slug)
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[350px] sm:h-[450px] md:h-[550px] lg:h-[650px] w-full overflow-hidden">
        {service.image && (
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        
        {/* Black Overlay */}
        <div className="absolute inset-0 z-10 bg-black/70"></div>
        

        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-end pb-8 sm:pb-12 md:pb-16">
          <div className="max-w-4xl w-full">
            {/* Back Button - Top */}
            <div className="mb-6 sm:mb-8">
              <Link href="/hizmetler">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-white border-white/80 hover:bg-white/20 hover:border-white bg-white/10 backdrop-blur-sm transition-all duration-300 group"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden sm:inline">Hizmetlere Dön</span>
                  <span className="sm:hidden">Geri</span>
                </Button>
              </Link>
            </div>

            {/* Title and Description */}
            <div className="space-y-4 sm:space-y-5">
              {/* Featured Badge */}
          
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                {service.title}
              </h1>
              
              {/* Description */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl leading-relaxed drop-shadow-lg">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Content Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Service Info */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                <span>Oluşturulma: {new Date(service.created_at).toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                <Tag className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                <span>Güncellenme: {new Date(service.updated_at).toLocaleDateString('tr-TR')}</span>
              </div>
              {service.featured && (
                <div className="bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                  Öne Çıkan Hizmet
                </div>
              )}
            </div>

            {/* Service Image */}
            {service.image && (
              <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority={false}
                  />
                </div>
              </div>
            )}

            {/* Service Content */}
            <SafeHtmlContent content={service.content} />
            <ContactWidget />

            {/* CTA Section */}
            <div className="mt-16 bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Bu Hizmet İlginizi Çekti mi?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Detaylı bilgi almak ve teklif talep etmek için bizimle iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/iletisim">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    Teklif Al
                  </Button>
                </Link>
                <Link href="/iletisim">
                  <Button variant="outline">
                    İletişime Geç
                  </Button>
                </Link>
              </div>
            </div>

            {/* Contact Widget */}
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <Script
        id="service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateServiceJsonLd(service))
        }}
      />
    </div>
  )
}