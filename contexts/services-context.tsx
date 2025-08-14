"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { getServices, type Service } from '@/lib/supabase'

interface ServicesContextType {
  services: Service[]
  loading: boolean
  refreshServices: () => Promise<void>
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined)

export function ServicesProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  const loadServices = async () => {
    try {
      setLoading(true)
      const data = await getServices()
      setServices(data)
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshServices = async () => {
    await loadServices()
  }

  useEffect(() => {
    loadServices()
  }, [])

  return (
    <ServicesContext.Provider value={{ services, loading, refreshServices }}>
      {children}
    </ServicesContext.Provider>
  )
}

export function useServices() {
  const context = useContext(ServicesContext)
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider')
  }
  return context
}
