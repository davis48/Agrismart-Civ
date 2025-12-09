'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import {
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Bell,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Cloud,
  ChevronRight,
  Leaf,
  ShoppingCart,
  GraduationCap,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Badge, Skeleton } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useAuthStore, useParcellesStore, useAlertesStore } from '@/lib/store'
import api from '@/lib/api'

// Types
interface DashboardStats {
  totalParcelles: number
  totalCapteurs: number
  alertesActives: number
  productionEstimee: number
}

interface WeatherData {
  temperature: number
  humidite: number
  vent: number
  condition: string
  previsions: Array<{
    jour: string
    temp_min: number
    temp_max: number
    condition: string
  }>
}

interface MesureRecente {
  date: string
  humidite: number
  temperature: number
  ph: number
}

// Color scheme for charts
const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6']

// Mock data for demonstration
const mockMesures: MesureRecente[] = [
  { date: '01 Déc', humidite: 65, temperature: 28, ph: 6.5 },
  { date: '02 Déc', humidite: 68, temperature: 27, ph: 6.4 },
  { date: '03 Déc', humidite: 72, temperature: 29, ph: 6.6 },
  { date: '04 Déc', humidite: 70, temperature: 28, ph: 6.5 },
  { date: '05 Déc', humidite: 67, temperature: 30, ph: 6.3 },
  { date: '06 Déc', humidite: 63, temperature: 31, ph: 6.4 },
  { date: '07 Déc', humidite: 75, temperature: 27, ph: 6.7 },
]

const mockWeather: WeatherData = {
  temperature: 28,
  humidite: 72,
  vent: 12,
  condition: 'Partiellement nuageux',
  previsions: [
    { jour: 'Lun', temp_min: 24, temp_max: 31, condition: 'sunny' },
    { jour: 'Mar', temp_min: 23, temp_max: 29, condition: 'cloudy' },
    { jour: 'Mer', temp_min: 22, temp_max: 28, condition: 'rainy' },
    { jour: 'Jeu', temp_min: 24, temp_max: 30, condition: 'sunny' },
    { jour: 'Ven', temp_min: 25, temp_max: 32, condition: 'sunny' },
  ],
}

const cultureDistribution = [
  { name: 'Cacao', value: 45 },
  { name: 'Café', value: 25 },
  { name: 'Palmier', value: 15 },
  { name: 'Riz', value: 10 },
  { name: 'Autres', value: 5 },
]

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { setParcelles } = useParcellesStore()
  const { alertes, setAlertes, setUnreadCount } = useAlertesStore()

  const [stats, setStats] = useState<DashboardStats>({
    totalParcelles: 0,
    totalCapteurs: 0,
    alertesActives: 0,
    productionEstimee: 0,
  })
  const [loading, setLoading] = useState(true)
  const [weather] = useState<WeatherData>(mockWeather)
  const [mesures] = useState<MesureRecente[]>(mockMesures)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch parcelles
        const parcellesRes = await api.get('/parcelles')
        if (parcellesRes.data.success) {
          setParcelles(parcellesRes.data.data)
          setStats(prev => ({ ...prev, totalParcelles: parcellesRes.data.data.length }))
        }

        // Fetch capteurs count
        const capteursRes = await api.get('/capteurs')
        if (capteursRes.data.success) {
          setStats(prev => ({ ...prev, totalCapteurs: capteursRes.data.data.length }))
        }

        // Fetch alertes
        const alertesRes = await api.get('/alertes/unread')
        setAlertes(alertesRes.data.data.slice(0, 5))
        setUnreadCount(alertesRes.data.count)
        setStats(prev => ({ ...prev, alertesActives: alertesRes.data.data.length }))
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [setParcelles, setAlertes, setUnreadCount])

  const getAlertColor = (niveau: string) => {
    switch (niveau) {
      case 'critique':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'important':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-6 w-6 text-yellow-500" />
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />
      case 'rainy':
        return <Droplets className="h-6 w-6 text-blue-500" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bonjour, {user?.prenoms || 'Agriculteur'} 👋
          </h1>
          <p className="text-gray-500">
            Voici un aperçu de vos cultures et de votre exploitation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="py-1 px-3">
            <CheckCircle className="h-3 w-3 mr-1" />
            Système opérationnel
          </Badge>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Parcelles</p>
                {loading ? (
                  <Skeleton className="h-8 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{stats.totalParcelles}</p>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+2 ce mois</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Capteurs</p>
                {loading ? (
                  <Skeleton className="h-8 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCapteurs}</p>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Thermometer className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-blue-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span>Tous actifs</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Alertes</p>
                {loading ? (
                  <Skeleton className="h-8 w-16 mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-gray-900">{stats.alertesActives}</p>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-orange-600">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span>À traiter</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">ROI estimé</p>
                <p className="text-2xl font-bold text-gray-900">+23%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-purple-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>vs. saison passée</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather and alerts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather card */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Météo</CardTitle>
            <Link
              href="/meteo"
              className="text-sm text-green-600 hover:text-green-700 flex items-center"
            >
              Voir détails
              <ChevronRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Current weather */}
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                  <Sun className="h-10 w-10 text-white" />
                </div>
                <div>
                  <p className="text-4xl font-bold text-gray-900">{weather.temperature}°C</p>
                  <p className="text-gray-500">{weather.condition}</p>
                </div>
              </div>

              {/* Weather details */}
              <div className="flex gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">Humidité</p>
                    <p className="font-semibold">{weather.humidite}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Vent</p>
                    <p className="font-semibold">{weather.vent} km/h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-day forecast */}
            <div className="mt-6 grid grid-cols-5 gap-2">
              {weather.previsions.map((prev, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-600">{prev.jour}</p>
                  {getWeatherIcon(prev.condition)}
                  <p className="text-sm font-semibold mt-1">
                    {prev.temp_max}° / {prev.temp_min}°
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Alertes récentes</CardTitle>
            <Link
              href="/alertes"
              className="text-sm text-green-600 hover:text-green-700 flex items-center"
            >
              Voir tout
              <ChevronRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loading ? (
                <>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </>
              ) : alertes.length > 0 ? (
                alertes.slice(0, 3).map((alerte) => (
                  <div
                    key={alerte.id}
                    className={cn(
                      "p-3 rounded-lg border",
                      getAlertColor(alerte.niveau)
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm">{alerte.titre}</p>
                        <p className="text-xs mt-0.5 opacity-80">
                          {alerte.parcelle_nom || 'Général'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="h-10 w-10 mx-auto mb-2 text-green-500" />
                  <p>Aucune alerte active</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soil parameters chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Paramètres du sol (7 jours)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mesures}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="humidite"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Humidité (%)"
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#EF4444"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Température (°C)"
                  />
                  <Line
                    type="monotone"
                    dataKey="ph"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="pH"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Culture distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Répartition des cultures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={cultureDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {cultureDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {cultureDistribution.map((culture, index) => (
                  <div key={culture.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="text-sm text-gray-600">{culture.name}</span>
                    </div>
                    <span className="text-sm font-medium">{culture.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/parcelles/new">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <p className="font-medium text-gray-900">Nouvelle parcelle</p>
              <p className="text-xs text-gray-500">Ajouter une parcelle</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/diagnostic">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Leaf className="h-6 w-6 text-blue-600" />
              </div>
              <p className="font-medium text-gray-900">Diagnostic IA</p>
              <p className="text-xs text-gray-500">Analyser une plante</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/marketplace">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                <ShoppingCart className="h-6 w-6 text-orange-600" />
              </div>
              <p className="font-medium text-gray-900">Marketplace</p>
              <p className="text-xs text-gray-500">Acheter/Vendre</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/formations">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                <GraduationCap className="h-6 w-6 text-purple-600" />
              </div>
              <p className="font-medium text-gray-900">Formations</p>
              <p className="text-xs text-gray-500">Apprendre</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
