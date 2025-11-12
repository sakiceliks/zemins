import { MetadataRoute } from 'next'
import { getServices, getBlogPosts, getProjects } from '@/lib/supabase'

const baseUrl = 'https://zeminustasi.com.tr'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hizmetler`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Dinamik sayfalar
  const dynamicPages: MetadataRoute.Sitemap = []

  try {
    // Hizmetler
    const services = await getServices()
    services.forEach((service) => {
      dynamicPages.push({
        url: `${baseUrl}/hizmetler/${service.slug}`,
        lastModified: new Date(service.updated_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })
    })
  } catch (error) {
    console.error('Error fetching services for sitemap:', error)
  }

  try {
    // Blog yazıları
    const blogPosts = await getBlogPosts()
    blogPosts.forEach((post) => {
      dynamicPages.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    })
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
  }

  try {
    // Projeler (varsa)
    const projects = await getProjects()
    if (projects && projects.length > 0) {
      // Projeler listesi
      dynamicPages.push({
        url: `${baseUrl}/projeler`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      })

      // Her proje detay sayfası
      projects.forEach((project) => {
        dynamicPages.push({
          url: `${baseUrl}/projeler/${project.slug}`,
          lastModified: new Date(project.updated_at),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        })
      })
    }
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error)
  }

  // Tüm sayfaları birleştir (admin sayfaları hariç)
  return [...staticPages, ...dynamicPages]
}

