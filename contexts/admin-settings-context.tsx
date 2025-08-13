"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AdminSettings {
  authCheckEnabled: boolean
}

interface AdminSettingsContextType {
  settings: AdminSettings
  updateSettings: (newSettings: Partial<AdminSettings>) => void
  toggleAuthCheck: () => void
}

const AdminSettingsContext = createContext<AdminSettingsContextType | undefined>(undefined)

const defaultSettings: AdminSettings = {
  authCheckEnabled: false // Varsayılan olarak kapalı
}

export function AdminSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings)

  // Local storage'dan ayarları yükle
  useEffect(() => {
    const savedSettings = localStorage.getItem('admin-settings')
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsedSettings })
      } catch (error) {
        console.error('Error parsing admin settings:', error)
      }
    }
  }, [])

  // Ayarları güncelle ve local storage'a kaydet
  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    localStorage.setItem('admin-settings', JSON.stringify(updatedSettings))
  }

  // Auth check'i aç/kapat
  const toggleAuthCheck = () => {
    const newValue = !settings.authCheckEnabled
    updateSettings({ authCheckEnabled: newValue })
  }

  return (
    <AdminSettingsContext.Provider value={{ settings, updateSettings, toggleAuthCheck }}>
      {children}
    </AdminSettingsContext.Provider>
  )
}

export function useAdminSettings() {
  const context = useContext(AdminSettingsContext)
  if (context === undefined) {
    throw new Error('useAdminSettings must be used within an AdminSettingsProvider')
  }
  return context
}
