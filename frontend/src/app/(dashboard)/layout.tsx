'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar, Header, BottomNav } from '@/components/layout'
import { useAuthStore } from '@/lib/store'
import { LoadingOverlay } from '@/components/ui'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, isLoading, token } = useAuthStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading) {
      // Check if user has token in localStorage
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      
      if (!isAuthenticated && !storedToken && !token) {
        router.push('/login')
      }
    }
  }, [mounted, isAuthenticated, isLoading, token, router])

  if (!mounted) {
    return <LoadingOverlay message="Chargement..." />
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
          <div className="container mx-auto px-4 py-6 lg:px-6">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom navigation for mobile */}
      <BottomNav />
    </div>
  )
}
