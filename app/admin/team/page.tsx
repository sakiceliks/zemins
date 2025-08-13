"use client"

import { useState, useEffect } from "react"
import { getTeamMembers, deleteTeamMember, type TeamMember } from "@/lib/supabase"
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
import { Plus, Edit, Trash2, ArrowLeft, ArrowUp, ArrowDown, Mail, Phone, Linkedin, Twitter } from "lucide-react"
import { useAdminAuth } from "@/hooks/use-admin-auth"
import { useAdminSettings } from "@/contexts/admin-settings-context"
import Link from "next/link"
import Image from "next/image"

export default function AdminTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const { settings } = useAdminSettings()
  const { user, isUserAdmin, loading: authLoading } = useAdminAuth({
    enabled: settings.authCheckEnabled
  })

  useEffect(() => {
    if (!authLoading) {
      loadTeamMembers()
    }
  }, [authLoading])

  async function loadTeamMembers() {
    try {
      const data = await getTeamMembers()
      setTeamMembers(data)
    } catch (error) {
      console.error('Error loading team members:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteTeamMember(id)
      await loadTeamMembers()
    } catch (error) {
      console.error('Error deleting team member:', error)
    }
  }

  async function handleReorder(id: string, direction: 'up' | 'down') {
    const currentIndex = teamMembers.findIndex(member => member.id === id)
    if (currentIndex === -1) return

    const newTeamMembers = [...teamMembers]
    if (direction === 'up' && currentIndex > 0) {
      const temp = newTeamMembers[currentIndex].order
      newTeamMembers[currentIndex].order = newTeamMembers[currentIndex - 1].order
      newTeamMembers[currentIndex - 1].order = temp
      setTeamMembers(newTeamMembers.sort((a, b) => a.order - b.order))
    } else if (direction === 'down' && currentIndex < newTeamMembers.length - 1) {
      const temp = newTeamMembers[currentIndex].order
      newTeamMembers[currentIndex].order = newTeamMembers[currentIndex + 1].order
      newTeamMembers[currentIndex + 1].order = temp
      setTeamMembers(newTeamMembers.sort((a, b) => a.order - b.order))
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Admin Paneline Dön
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ekip Yönetimi</h1>
              <p className="text-gray-600 dark:text-gray-400">Ekip üyelerini yönetin</p>
            </div>
          </div>
          <Link href="/admin/team/new">
            <Button className="bg-amber-500 hover:bg-amber-600">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Ekip Üyesi
            </Button>
          </Link>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={member.id} className="overflow-hidden">
              {member.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-amber-600 font-medium">
                      {member.position}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={member.active ? "default" : "secondary"}>
                        {member.active ? "Aktif" : "Pasif"}
                      </Badge>
                      <Badge variant="outline">Sıra: {member.order}</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {member.bio}
                </p>
                
                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  {member.email && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Mail className="h-4 w-4 mr-2" />
                      {member.email}
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4 mr-2" />
                      {member.phone}
                    </div>
                  )}
                </div>

                {/* Social Media */}
                <div className="flex gap-2 mb-4">
                  {member.social_media?.linkedin && (
                    <Link href={member.social_media.linkedin} target="_blank">
                      <Button size="sm" variant="outline">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                  {member.social_media?.twitter && (
                    <Link href={member.social_media.twitter} target="_blank">
                      <Button size="sm" variant="outline">
                        <Twitter className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(member.id, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReorder(member.id, 'down')}
                      disabled={index === teamMembers.length - 1}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/team/${member.id}/edit`}>
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
                          <AlertDialogTitle>Ekip Üyesi Sil</AlertDialogTitle>
                          <AlertDialogDescription>
                            Bu ekip üyesini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>İptal</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(member.id)}
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

        {teamMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Henüz hiç ekip üyesi eklenmemiş.</p>
            <Link href="/admin/team/new">
              <Button className="bg-amber-500 hover:bg-amber-600">
                <Plus className="mr-2 h-4 w-4" />
                İlk Ekip Üyesini Ekle
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

