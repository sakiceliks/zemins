import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag, ArrowLeft, ArrowRight, User, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getBlogPostBySlug, getBlogPosts, getServices, generateBlogPostJsonLd } from "@/lib/supabase"
import type { Metadata } from "next"
import Script from "next/script"

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
    
    return {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || post.content.substring(0, 160),
      keywords: post.tags?.join(", ") || post.category || "",
      openGraph: {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt || post.content.substring(0, 160),
        images: post.image ? [post.image] : [],
        type: "article",
        publishedTime: post.published_at || post.created_at,
        modifiedTime: post.updated_at,
        authors: post.author ? [post.author] : ["Zemin Ustası"],
        tags: post.tags || [],
      },
      twitter: {
        card: "summary_large_image",
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt || post.content.substring(0, 160),
        images: post.image ? [post.image] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Blog Yazısı Bulunamadı',
      description: 'Aradığınız blog yazısı bulunamadı.',
    }
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
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
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
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <Link href="/blog" className="mb-4">
            <Button variant="outline" className="text-white border-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Bloga Dön
            </Button>
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.category && (
              <Badge className="bg-amber-500 text-white">{post.category}</Badge>
            )}
            {post.featured && (
              <Badge className="bg-green-500 text-white">Öne Çıkan</Badge>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-xl text-white/90 max-w-2xl">{post.excerpt}</p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Post Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              {post.author && (
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <User className="h-5 w-5 mr-2" />
                  <span>{post.author}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{new Date(post.created_at).toLocaleDateString('tr-TR', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="h-5 w-5 text-gray-600 dark:text-gray-400" />
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
              <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
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
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-amber-600 dark:prose-a:text-amber-400"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            {/* Services Section */}
            {services && services.length > 0 && (
              <div className="mt-16 bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                  İlgili Hizmetlerimiz
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.slice(0, 4).map((service) => (
                    <Link
                      key={service.id}
                      href={`/hizmetler/${service.slug}`}
                      className="block p-4 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {service.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="mt-3 flex items-center text-amber-600 dark:text-amber-400 text-sm">
                        Detayları Gör
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Link href="/hizmetler">
                    <Button variant="outline">
                      Tüm Hizmetlerimizi Görüntüle
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 bg-amber-50 dark:bg-amber-900/20 p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Bu Yazı İlginizi Çekti mi?
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Profesyonel zemin kaplama hizmetlerimiz hakkında daha fazla bilgi almak için bizimle iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/hizmetler">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    Hizmetlerimiz
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

