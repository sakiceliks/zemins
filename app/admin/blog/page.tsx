"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { deleteBlogPost, getBlogPosts, type BlogPost } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, ArrowLeft, Eye, Calendar, User } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { useAdminSettings } from "@/contexts/admin-settings-context"

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const { settings } = useAdminSettings()
  const { user, isUserAdmin, loading: authLoading } = useAdminAuth({
    enabled: settings.authCheckEnabled
  })

  useEffect(() => {
    if (!authLoading) {
      loadBlogPosts()
    }
  }, [authLoading])

  async function loadBlogPosts() {
    try {
      setLoading(true)
      const data = await getBlogPosts()
      setPosts(data)
    } catch (error) {
      console.error('Error loading blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteBlogPost(id)
      await loadBlogPosts()
    } catch (error) {
      console.error('Error deleting blog post:', error)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Panele Dön
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Blog Yönetimi</h1>
              <p className="text-gray-400">Tüm blog yazılarınızı yönetin</p>
            </div>
          </div>
          <Link href="/admin/blog/new">
            <Button className="bg-amber-500 hover:bg-amber-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Blog Yazısı
            </Button>
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
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
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  {post.featured && (
                    <Badge className="bg-amber-900 text-amber-300">Öne Çıkan</Badge>
                  )}
                </div>
                <CardDescription className="line-clamp-2">
                  {post.excerpt || post.meta_description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.category && (
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                  )}
                  {post.tags && post.tags.slice(0, 2).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 mb-4 text-sm text-gray-400">
                  {post.author && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    {post.published_at ? 'Yayınlandı' : 'Taslak'}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/blog/${post.slug}`} target="_blank">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/admin/blog/${post.id}/edit`}>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Blog Yazısını Sil</AlertDialogTitle>
                          <AlertDialogDescription>
                            Bu blog yazısını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>İptal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(post.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Sil
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">Henüz blog yazısı eklenmemiş.</p>
            <Link href="/admin/blog/new">
              <Button className="bg-amber-500 hover:bg-amber-600">
                <Plus className="mr-2 h-4 w-4" />
                İlk Blog Yazısını Ekle
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

