'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store'
import {
  LayoutDashboard,
  MapPin,
  Thermometer,
  Bell,
  ShoppingCart,
  GraduationCap,
  MessageSquare,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Leaf,
  BarChart3,
  Camera,
  Cloud,
  Lightbulb,
} from 'lucide-react'

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Parcelles', href: '/parcelles', icon: MapPin },
  { name: 'Capteurs', href: '/capteurs', icon: Thermometer },
  { name: 'Mesures', href: '/mesures', icon: BarChart3 },
  { name: 'Météo', href: '/meteo', icon: Cloud },
  { name: 'Alertes', href: '/alertes', icon: Bell },
  { name: 'Recommandations', href: '/recommandations', icon: Lightbulb },
  { name: 'Diagnostic IA', href: '/diagnostic', icon: Camera },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingCart },
  { name: 'Formations', href: '/formations', icon: GraduationCap },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
]

const bottomNavigation = [
  { name: 'Profil', href: '/profil', icon: User },
  { name: 'Paramètres', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full flex-col bg-white border-r border-gray-200 transition-all duration-300 lg:relative lg:z-0",
          sidebarOpen ? "w-64" : "w-0 lg:w-20",
          !sidebarOpen && "overflow-hidden lg:overflow-visible"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-600">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold text-gray-900">AgriTech CI</span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex items-center justify-center h-8 w-8 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    title={!sidebarOpen ? item.name : undefined}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 shrink-0",
                        isActive ? "text-green-600" : "text-gray-500"
                      )}
                    />
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Bottom navigation */}
        <div className="border-t border-gray-200 py-4">
          <ul className="space-y-1 px-2">
            {bottomNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                    title={!sidebarOpen ? item.name : undefined}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 shrink-0",
                        isActive ? "text-green-600" : "text-gray-500"
                      )}
                    />
                    {sidebarOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>
    </>
  )
}
