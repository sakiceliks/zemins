import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Tag, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProjectBySlug, getProjects } from "@/lib/supabase"
import type { Metadata } from "next"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    const projects = await getProjects()
    return projects.map((project) => ({
      slug: project.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  try {
    const project = await getProjectBySlug(params.slug)
    
    return {
      title: project.meta_title || project.title,
      description: project.meta_description || project.description,
      openGraph: {
        title: project.meta_title || project.title,
        description: project.meta_description || project.description,
        images: project.image ? [project.image] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Proje Bulunamadı',
      description: 'Aradığınız proje bulunamadı.',
    }
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  let project
  
  try {
    project = await getProjectBySlug(params.slug)
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
                      <Link href="/projeler" className="mb-4">
              <Button variant="outline" className="text-white border-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Projelere Dön
              </Button>
            </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{project.title}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{project.description}</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Project Info */}
            <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Building className="h-5 w-5 mr-2" />
                <span>Kategori: {project.category}</span>
              </div>
              {project.location && (
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Konum: {project.location}</span>
                </div>
              )}
              {project.completion_date && (
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Tamamlanma: {new Date(project.completion_date).toLocaleDateString('tr-TR')}</span>
                </div>
              )}
              {project.featured && (
                <div className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 px-3 py-1 rounded-full text-sm font-medium">
                  Öne Çıkan Proje
                </div>
              )}
            </div>

            {/* Project Content */}
 <div 
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />

            {/* CTA Section */}
            <div className="mt-16 bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Benzer Bir Proje mi İstiyorsunuz?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Bu projeye benzer çalışmalar için bizimle iletişime geçin ve ücretsiz keşif hizmeti alın.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    Ücretsiz Keşif
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline">
                    Diğer Projeler
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