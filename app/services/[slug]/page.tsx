import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServiceBySlug, getServices } from "@/lib/supabase"
import type { Metadata } from "next"

interface ServicePageProps {
  params: {
    slug: string
  }
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
    const service = await getServiceBySlug(params.slug)
    
    return {
      title: service.meta_title || service.title,
      description: service.meta_description || service.description,
      openGraph: {
        title: service.meta_title || service.title,
        description: service.meta_description || service.description,
        images: service.image ? [service.image] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Hizmet Bulunamadı',
      description: 'Aradığınız hizmet bulunamadı.',
    }
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  let service
  
  try {
    service = await getServiceBySlug(params.slug)
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
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
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <Link href="/hizmetler" className="mb-4">
            <Button variant="outline" className="text-white border-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Hizmetlere Dön
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{service.description}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Service Info */}
            <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar className="h-5 w-5 mr-2" />
                <span>Oluşturulma: {new Date(service.created_at).toLocaleDateString('tr-TR')}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Tag className="h-5 w-5 mr-2" />
                <span>Güncellenme: {new Date(service.updated_at).toLocaleDateString('tr-TR')}</span>
              </div>
              {service.featured && (
                <div className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 px-3 py-1 rounded-full text-sm font-medium">
                  Öne Çıkan Hizmet
                </div>
              )}
            </div>

            {/* Service Content */}
            <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />

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
          </div>
        </div>
      </section>
    </div>
  )
}