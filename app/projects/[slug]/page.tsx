import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProjectBySlug, getProjects } from "@/lib/supabase"
import type { Metadata } from "next"
import { buildSeoMetadata } from "@/lib/seo"

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

    return buildSeoMetadata({
      title: project.meta_title || project.title,
      description: project.meta_description || project.description,
      path: `/projects/${params.slug}`,
      keywords: [project.title, project.category, project.location || "flooring project"],
      images: project.image,
      type: "article",
      section: "Projects",
      publishedTime: project.created_at,
      modifiedTime: project.updated_at,
      tags: project.category ? [project.category] : undefined,
    })
  } catch (error) {
    return buildSeoMetadata({
      title: "Project Not Found",
      description: "The project you are looking for could not be found.",
      path: "/projects",
      robots: {
        index: false,
        follow: false,
      },
    })
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
{/* Project Content */}
<div 
  className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300"
  dangerouslySetInnerHTML={{ __html: project.content }}
/>

{/* Güçlü SEO link */}
<div className="mt-10 p-6 bg-amber-50 dark:bg-gray-800 rounded-xl text-center">
  <h4 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
    Zeminleriniz için Profesyonel Çözümler
  </h4>
  <p className="text-gray-700 dark:text-gray-300 mb-4">
    Eğer Üsküdar’da beton silimi veya beton parlatma hizmeti arıyorsanız, 
    <Link 
      href="/uskudar-beton-silimi-parlatma" 
      className="text-amber-600 dark:text-amber-400 font-semibold underline hover:text-amber-700"
    >
      BMÇ Zemin profesyonel çözümlerini inceleyebilirsiniz
    </Link>.
  </p>
  <Link href="/uskudar-beton-silimi-parlatma">
    <Button className="bg-amber-500 hover:bg-amber-600 text-white">
      Hizmet Detayları
    </Button>
  </Link>
</div>

          </div>
        </div>
      </section>
    </div>
  )
}