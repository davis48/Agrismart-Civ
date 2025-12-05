'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  Eye,
  Gauge,
  MapPin,
  RefreshCw,
  Calendar,
  Sunrise,
  Sunset,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import toast from 'react-hot-toast'
import api from '@/lib/api'

interface MeteoData {
  temperature: number
  temperatureMin: number
  temperatureMax: number
  humidity: number
  pressure: number
  windSpeed: number
  windDirection: string
  description: string
  icon: string
  visibility: number
  sunrise: string
  sunset: string
  location: string
}

interface Prevision {
  date: string
  jour: string
  tempMin: number
  tempMax: number
  description: string
  icon: string
  precipitation: number
}

const mockMeteo: MeteoData = {
  temperature: 28,
  temperatureMin: 24,
  temperatureMax: 32,
  humidity: 75,
  pressure: 1013,
  windSpeed: 12,
  windDirection: 'SO',
  description: 'Partiellement nuageux',
  icon: 'partly-cloudy',
  visibility: 10,
  sunrise: '06:15',
  sunset: '18:30',
  location: 'Abidjan, Côte d\'Ivoire'
}

const mockPrevisions: Prevision[] = [
  { date: '2024-01-16', jour: 'Mar', tempMin: 24, tempMax: 31, description: 'Ensoleillé', icon: 'sunny', precipitation: 10 },
  { date: '2024-01-17', jour: 'Mer', tempMin: 23, tempMax: 30, description: 'Nuageux', icon: 'cloudy', precipitation: 30 },
  { date: '2024-01-18', jour: 'Jeu', tempMin: 22, tempMax: 28, description: 'Pluie légère', icon: 'rainy', precipitation: 60 },
  { date: '2024-01-19', jour: 'Ven', tempMin: 23, tempMax: 29, description: 'Orageux', icon: 'stormy', precipitation: 80 },
  { date: '2024-01-20', jour: 'Sam', tempMin: 24, tempMax: 31, description: 'Ensoleillé', icon: 'sunny', precipitation: 5 },
  { date: '2024-01-21', jour: 'Dim', tempMin: 25, tempMax: 32, description: 'Ensoleillé', icon: 'sunny', precipitation: 0 },
  { date: '2024-01-22', jour: 'Lun', tempMin: 24, tempMax: 30, description: 'Partiellement nuageux', icon: 'partly-cloudy', precipitation: 20 },
]

export default function MeteoPage() {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [meteo, setMeteo] = useState<MeteoData>(mockMeteo)
  const [previsions, setPrevisions] = useState<Prevision[]>(mockPrevisions)
  const [selectedParcelle, setSelectedParcelle] = useState<string>('all')

  const fetchMeteo = useCallback(async () => {
    try {
      const response = await api.get('/meteo', {
        params: { parcelleId: selectedParcelle !== 'all' ? selectedParcelle : undefined }
      })
      if (response.data.success) {
        setMeteo(response.data.data.current)
        setPrevisions(response.data.data.forecast)
      }
    } catch {
      // Utiliser les données mock en cas d'erreur
      setMeteo(mockMeteo)
      setPrevisions(mockPrevisions)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [selectedParcelle])

  useEffect(() => {
    fetchMeteo()
  }, [fetchMeteo])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchMeteo()
    toast.success('Données météo actualisées')
  }

  const getWeatherIcon = (icon: string, size: string = 'h-8 w-8') => {
    switch (icon) {
      case 'sunny':
        return <Sun className={`${size} text-yellow-500`} />
      case 'cloudy':
        return <Cloud className={`${size} text-gray-500`} />
      case 'partly-cloudy':
        return <Cloud className={`${size} text-blue-400`} />
      case 'rainy':
        return <CloudRain className={`${size} text-blue-600`} />
      case 'stormy':
        return <CloudRain className={`${size} text-purple-600`} />
      default:
        return <Sun className={`${size} text-yellow-500`} />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Cloud className="h-7 w-7 text-blue-600" />
            Météo
          </h1>
          <p className="text-gray-500 flex items-center gap-1 mt-1">
            <MapPin className="h-4 w-4" />
            {meteo.location}
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedParcelle} onValueChange={setSelectedParcelle}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Toutes les parcelles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les parcelles</SelectItem>
              <SelectItem value="1">Parcelle Cacao Nord</SelectItem>
              <SelectItem value="2">Parcelle Café Est</SelectItem>
              <SelectItem value="3">Parcelle Hévéa Sud</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
        </div>
      </div>

      {/* Current Weather */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-end gap-2">
                  <span className="text-6xl font-bold text-gray-900">
                    {meteo.temperature}°
                  </span>
                  <span className="text-2xl text-gray-500 mb-2">C</span>
                </div>
                <p className="text-xl text-gray-600 mt-2">{meteo.description}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Min: {meteo.temperatureMin}° / Max: {meteo.temperatureMax}°
                </p>
              </div>
              <div className="text-right">
                {getWeatherIcon(meteo.icon, 'h-24 w-24')}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Lever & Coucher du soleil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sunrise className="h-6 w-6 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Lever</p>
                  <p className="text-lg font-semibold">{meteo.sunrise}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Sunset className="h-6 w-6 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Coucher</p>
                  <p className="text-lg font-semibold">{meteo.sunset}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Droplets className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Humidité</p>
              <p className="text-xl font-bold">{meteo.humidity}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Wind className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Vent</p>
              <p className="text-xl font-bold">{meteo.windSpeed} km/h</p>
              <p className="text-xs text-gray-400">{meteo.windDirection}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Gauge className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pression</p>
              <p className="text-xl font-bold">{meteo.pressure} hPa</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Eye className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Visibilité</p>
              <p className="text-xl font-bold">{meteo.visibility} km</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 7-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Prévisions sur 7 jours
          </CardTitle>
          <CardDescription>
            Planifiez vos activités agricoles en fonction de la météo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {previsions.map((prev, index) => (
              <div 
                key={prev.date}
                className={`p-4 rounded-lg text-center ${
                  index === 0 ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                }`}
              >
                <p className="font-semibold text-gray-900">{prev.jour}</p>
                <div className="my-3 flex justify-center">
                  {getWeatherIcon(prev.icon, 'h-10 w-10')}
                </div>
                <p className="text-sm text-gray-600">{prev.description}</p>
                <div className="mt-2">
                  <span className="font-bold text-gray-900">{prev.tempMax}°</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-gray-500">{prev.tempMin}°</span>
                </div>
                <div className="mt-2 flex items-center justify-center gap-1 text-xs text-blue-600">
                  <Droplets className="h-3 w-3" />
                  {prev.precipitation}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agricultural Advice */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Conseils agricoles du jour</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
              <Droplets className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <p className="font-medium text-green-900">Irrigation</p>
              <p className="text-sm text-green-700">
                Avec une humidité de {meteo.humidity}%, réduisez l&apos;irrigation de 20% aujourd&apos;hui.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
              <Thermometer className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <p className="font-medium text-green-900">Température</p>
              <p className="text-sm text-green-700">
                Température idéale pour le travail aux champs entre 6h-10h et 16h-18h.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0">
              <CloudRain className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <p className="font-medium text-green-900">Prévisions</p>
              <p className="text-sm text-green-700">
                Pluies prévues jeudi - Planifiez les traitements phytosanitaires avant.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
