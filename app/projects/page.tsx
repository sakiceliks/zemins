import { getProjects } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { buildSeoMetadata } from "@/lib/seo"

export const metadata = buildSeoMetadata({
  title: "Projects | BMÇ Zemin Portfolio",
  description:
    "Explore BMÇ Zemin's latest flooring and construction projects spanning epoxy, polished concrete, microcement and terrazzo applications.",
  keywords: ["bmç zemin projects", "epoxy case study", "microcement portfolio", "flooring references"],
  path: "/projects",
})

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-amber-600 to-amber-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Projelerimiz
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-amber-100">
              Başarıyla tamamladığımız projelerden örnekler
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {project.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-amber-500 text-white">Öne Çıkan</Badge>
                    </div>
                  )}
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{project.category}</Badge>
                    {project.location && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        {project.location}
                      </div>
                    )}
                  </div>
                  {project.completion_date && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      Tamamlanma: {new Date(project.completion_date).toLocaleDateString('tr-TR')}
                    </div>
                  )}
                  <Link href={`/projeler/${project.slug}`}>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600">
                      Detayları Gör
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Henüz proje eklenmemiş
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yakında projelerimizi burada görebileceksiniz.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
