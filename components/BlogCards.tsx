"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, User } from "lucide-react"
import { getBlogPosts, type BlogPost } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"

export function BlogCards() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const data = await getBlogPosts()
        // Son 3 blog yazısını al
        setPosts(data.slice(0, 3))
      } catch (error) {
        console.error('Error loading blog posts:', error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    loadBlogPosts()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="relative border-gray-700 bg-gray-900 animate-pulse overflow-hidden">
            <div className="h-48 bg-gray-700 w-full"></div>
            <CardHeader className="pb-4">
              <div className="h-4 bg-gray-700 rounded w-24 mb-2"></div>
              <div className="h-6 bg-gray-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-10 bg-gray-700 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <>
      {posts.map((post) => (
        <Card
          key={post.id}
          className="relative group hover:shadow-lg transition-all duration-300 border-gray-700 bg-gray-900 overflow-hidden"
        >
          {post.featured && (
            <Badge className="absolute top-4 right-4 z-10 bg-amber-500 text-gray-900 font-semibold">Öne Çıkan</Badge>
          )}

          {post.image && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 mb-2">
              {post.category && (
                <Badge variant="outline" className="text-xs border-amber-500 text-amber-500">
                  {post.category}
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl text-white group-hover:text-amber-500 transition-colors line-clamp-2">
              {post.title}
            </CardTitle>
            <CardDescription className="text-gray-300 leading-relaxed line-clamp-2">
              {post.excerpt || post.meta_description}
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-400">
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
                <Button
                  className="w-full mt-4 group/btn border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-gray-900"
                  variant="outline"
                >
                  Devamını Oku
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

