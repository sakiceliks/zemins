"use client"

import dynamic from 'next/dynamic'

// Dynamically import client components with no SSR
const ClientComponents = dynamic(() => import('@/components/ClientComponents'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-gray-900" />
})

function Home() {
  return (
    <ClientComponents />
  )
}

export default Home
