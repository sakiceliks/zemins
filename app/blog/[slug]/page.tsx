import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag, ArrowLeft, ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getBlogPostBySlug, getBlogPosts, getServices, generateBlogPostJsonLd } from "@/lib/supabase"
import type { Metadata } from "next"
import Script from "next/script"
import ContactWidget from "@/components/ContactWidget"
import { buildSeoMetadata } from "@/lib/seo"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const posts = await getBlogPosts()
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await getBlogPostBySlug(slug)
    
    return buildSeoMetadata({
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || post.content.substring(0, 160),
      path: `/blog/${slug}`,
      keywords: post.tags && post.tags.length > 0 ? post.tags : [post.category || post.title],
      images: post.image,
      type: "article",
      section: post.category,
      tags: post.tags,
      authors: post.author ? [post.author] : ["Zemin Ustası"],
      publishedTime: post.published_at || post.created_at,
      modifiedTime: post.updated_at,
    })
  } catch (error) {
    return buildSeoMetadata({
      title: "Blog Yazısı Bulunamadı",
      description: "Aradığınız blog yazısı bulunamadı.",
      path: "/blog",
      robots: {
        index: false,
        follow: false,
      },
    })
  }
}

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  let post
  let services

  try {
    [post, services] = await Promise.all([
      getBlogPostBySlug(slug),
      getServices()
    ])
  } catch (error) {
    notFound()
  }

  const jsonLd = generateBlogPostJsonLd(post)
  const sanitizedContent = sanitizeHtml(post.content)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Script
        id="blog-post-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden mt-[80px] sm:mt-[96px] md:mt-0 pt-24 sm:pt-32 md:pt-24">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/70 z-10" />
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
         
         
         
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-2xl max-w-4xl">{post.title}</h1>
          {post.excerpt && (
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 max-w-3xl leading-relaxed drop-shadow-lg">{post.excerpt}</p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200 dark:border-gray-700">
              {post.author && (
                <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span>{new Date(post.created_at).toLocaleDateString('tr-TR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
                  <Tag className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400" />
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Blog Post Image */}
            {post.image && (
              <div className="mb-8 sm:mb-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    priority={false}
                  />
                </div>
              </div>
            )}

            {/* Post Content */}
            <div 
              className="prose prose-sm sm:prose-base md:prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
<ContactWidget />

            {/* Services Section */}
            {services && services.length > 0 && (
              <div className="mt-8 sm:mt-12 md:mt-16 bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
                  İlgili Hizmetlerimiz
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {services.slice(0, 4).map((service) => (
                    <Link
                      key={service.id}
                      href={`/hizmetler/${service.slug}`}
                      className="block p-3 sm:p-4 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                    >
                      <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2">
                        {service.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="mt-3 flex items-center text-amber-600 dark:text-amber-400 text-xs sm:text-sm">
                        Detayları Gör
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4 sm:mt-6 text-center">
                  <Link href="/hizmetler">
                    <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                      Tüm Hizmetlerimizi Görüntüle
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}



            {/* CTA Section */}
            <div className="mt-8 sm:mt-12 md:mt-16 bg-amber-50 dark:bg-amber-900/20 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
                Bu Yazı İlginizi Çekti mi?
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 sm:mb-6">
                Profesyonel zemin kaplama hizmetlerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/hizmetler">
                  <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm w-full sm:w-auto">
                    Hizmetlerimiz
                  </Button>
                </Link>
                <Link href="/iletisim">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto">
                    İletişime Geç
                  </Button>
                </Link>
              </div>
            </div>

            {/* Contact Widget */}
          </div>
        </div>
      </section>
    </div>
  )
}

