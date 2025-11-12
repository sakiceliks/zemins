import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface UseAdminAuthOptions {
  enabled?: boolean
  redirectTo?: string
}

interface AdminUser {
  email: string
  id: string
  token: string
  expiresAt: number
}

const AUTH_STORAGE_KEY = 'admin_auth'
const TOKEN_EXPIRY_DAYS = 7 // Token 7 gün geçerli

export function useAdminAuth(options: UseAdminAuthOptions = {}) {
  const { enabled = true, redirectTo = '/admin/login' } = options
  const [user, setUser] = useState<AdminUser | null>(null)
  const [isUserAdmin, setIsUserAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!enabled) {
      setLoading(false)
      setIsUserAdmin(true)
      setUser({ email: 'admin@dev.local', id: 'dev-user', token: 'dev-token', expiresAt: Date.now() + 86400000 })
      return
    }

    checkUser()
  }, [enabled])

  async function checkUser() {
    try {
      setLoading(true)
      
      // localStorage'dan auth bilgisini al
      const authData = getAuthFromStorage()
      
      if (!authData) {
        router.push(redirectTo)
        return
      }

      // Token süresi kontrolü
      if (authData.expiresAt < Date.now()) {
        clearAuthFromStorage()
        router.push(redirectTo)
        return
      }

      // localStorage'da geçerli token varsa direkt kabul et
      // Supabase kontrolü yapmıyoruz, tamamen localStorage tabanlı
      setUser(authData)
      setIsUserAdmin(true)
    } catch (error) {
      console.error('Error checking user:', error)
      clearAuthFromStorage()
      router.push(redirectTo)
    } finally {
      setLoading(false)
    }
  }

  async function handleSignOut() {
    clearAuthFromStorage()
    setUser(null)
    setIsUserAdmin(false)
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

// localStorage helper functions
export function saveAuthToStorage(user: AdminUser) {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  } catch (error) {
    console.error('Error saving auth to storage:', error)
  }
}

export function getAuthFromStorage(): AdminUser | null {
  try {
    const authData = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!authData) return null
    
    const parsed = JSON.parse(authData) as AdminUser
    return parsed
  } catch (error) {
    console.error('Error getting auth from storage:', error)
    return null
  }
}

export function clearAuthFromStorage() {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing auth from storage:', error)
  }
}

export function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function createAdminUser(email: string, id: string): AdminUser {
  return {
    email,
    id,
    token: generateToken(),
    expiresAt: Date.now() + (TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000)
  }
}
