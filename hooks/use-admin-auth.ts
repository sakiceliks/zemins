import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase, isAdmin } from "@/lib/supabase"

interface UseAdminAuthOptions {
  enabled?: boolean
  redirectTo?: string
}

export function useAdminAuth(options: UseAdminAuthOptions = {}) {
  const { enabled = true, redirectTo = '/admin/login' } = options
  const [user, setUser] = useState<any>(null)
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      setIsUserAdmin(true) // Auth check kapalıyken admin olarak kabul et
      setUser({ email: 'admin@dev.local' }) // Dummy user bilgisi
      return
    }

    checkUser()
  }, [enabled])

  async function checkUser() {
    try {
      setLoading(true)
      
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push(redirectTo)
        return
      }

      const adminStatus = await isAdmin(user.email!)
      if (!adminStatus) {
        router.push('/')
        return
      }

      setUser(user)
      setIsUserAdmin(true)
    } catch (error) {
      console.error('Error checking user:', error)
      router.push(redirectTo)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return {
    user,
    isUserAdmin,
    loading,
    checkUser,
    handleSignOut
  }
}
