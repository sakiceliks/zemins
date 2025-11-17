import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Tag, ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getBlogPosts, getFeaturedBlogPosts } from "@/lib/supabase"
import type { Metadata } from "next"
import Script from "next/script"
import { absoluteUrl, buildSeoMetadata } from "@/lib/seo"

export const metadata: Metadata = buildSeoMetadata({
  title: "Blog | Zemin Ustası - Zemin Kaplama ve İnşaat Hakkında Makaleler",
  description:
    "Zemin kaplama, epoksi, taş halı ve dekoratif zemin çözümleri hakkında güncel blog yazıları, ipuçları ve uzman görüşleri.",
  keywords: ["zemin kaplama blog", "epoksi zemin", "taş halı", "dekoratif zemin", "inşaat blog", "zemin ustası"],
  path: "/blog",
})

export default async function BlogPage() {
  let posts
  let featuredPosts

  try {
    [posts, featuredPosts] = await Promise.all([
      getBlogPosts(),
      getFeaturedBlogPosts()
    ])
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    posts = []
    featuredPosts = []
  }

  // JSON-LD for Blog Listing
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Zemin Ustası Blog",
    "description": "Zemin kaplama ve inşaat hakkında güncel blog yazıları",
    "url": absoluteUrl("/blog"),
    "publisher": {
      "@type": "Organization",
      "name": "Zemin Ustası",
      "logo": {
        "@type": "ImageObject",
        "url": absoluteUrl("/logo.png")
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || post.meta_description,
      "url": absoluteUrl(`/blog/${post.slug}`),
      "datePublished": post.published_at || post.created_at,
      "dateModified": post.updated_at,
      "image": post.image
    }))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd)
        }}
      />

      {/* Hero Section */}
      <section className="relative h-[300px] w-full overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Zemin kaplama, epoksi ve dekoratif zemin çözümleri hakkında güncel yazılar, ipuçları ve uzman görüşleri
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Öne Çıkan Yazılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.slice(0, 3).map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {post.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {post.category && (
                        <Badge variant="outline">{post.category}</Badge>
                      )}
                      <Badge className="bg-amber-500">Öne Çıkan</Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt || post.meta_description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="w-full">
                        Devamını Oku
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Tüm Yazılar</h2>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Henüz blog yazısı eklenmemiş.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {post.image && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {post.category && (
                        <Badge variant="outline">{post.category}</Badge>
                      )}
                      {post.featured && (
                        <Badge className="bg-amber-500">Öne Çıkan</Badge>
                      )}
                    </div>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {post.excerpt || post.meta_description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" className="w-full">
                        Devamını Oku
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Services CTA */}
      <section className="py-20 bg-amber-50 dark:bg-amber-900/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Hizmetlerimizi Keşfedin
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Profesyonel zemin kaplama çözümlerimiz hakkında daha fazla bilgi edinin
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hizmetler">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Tüm Hizmetlerimiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/iletisim">
              <Button variant="outline">
                İletişime Geç
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

