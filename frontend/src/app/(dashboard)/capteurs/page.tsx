'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Wifi,
  WifiOff,
  Battery,
  Thermometer,
  Droplets,
  Sun,
  Wind,
  Gauge,
  Plus,
  Settings,
  RefreshCw,
  MoreVertical,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Edit,
  Power,
  Activity,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Spinner } from '@/components/ui/spinner'
import toast from 'react-hot-toast'
import api from '@/lib/api'

interface Capteur {
  id: string
  nom: string
  type: 'temperature' | 'humidite' | 'luminosite' | 'ph' | 'humidite_sol' | 'pression'
  parcelleId: string
  parcelleNom: string
  statut: 'actif' | 'inactif' | 'maintenance' | 'erreur'
  batterie: number
  signal: number
  derniereMesure: {
    valeur: number
    unite: string
    date: string
  }
  seuilMin: number
  seuilMax: number
  coordonnees: {
    latitude: number
    longitude: number
  }
}

const mockCapteurs: Capteur[] = [
  {
    id: '1',
    nom: 'Capteur Temp. Zone A',
    type: 'temperature',
    parcelleId: '1',
    parcelleNom: 'Parcelle Cacao Nord',
    statut: 'actif',
    batterie: 85,
    signal: 92,
    derniereMesure: { valeur: 28.5, unite: '°C', date: '2024-01-15T14:30:00' },
    seuilMin: 20,
    seuilMax: 35,
    coordonnees: { latitude: 5.3599, longitude: -4.0083 },
  },
  {
    id: '2',
    nom: 'Capteur Humidité Sol B',
    type: 'humidite_sol',
    parcelleId: '1',
    parcelleNom: 'Parcelle Cacao Nord',
    statut: 'actif',
    batterie: 72,
    signal: 78,
    derniereMesure: { valeur: 65, unite: '%', date: '2024-01-15T14:28:00' },
    seuilMin: 40,
    seuilMax: 80,
    coordonnees: { latitude: 5.3601, longitude: -4.0085 },
  },
  {
    id: '3',
    nom: 'Capteur pH Zone C',
    type: 'ph',
    parcelleId: '2',
    parcelleNom: 'Parcelle Café Est',
    statut: 'actif',
    batterie: 45,
    signal: 85,
    derniereMesure: { valeur: 6.2, unite: 'pH', date: '2024-01-15T14:25:00' },
    seuilMin: 5.5,
    seuilMax: 7.0,
    coordonnees: { latitude: 5.3620, longitude: -4.0050 },
  },
  {
    id: '4',
    nom: 'Capteur Luminosité',
    type: 'luminosite',
    parcelleId: '2',
    parcelleNom: 'Parcelle Café Est',
    statut: 'maintenance',
    batterie: 15,
    signal: 45,
    derniereMesure: { valeur: 45000, unite: 'lux', date: '2024-01-14T16:00:00' },
    seuilMin: 10000,
    seuilMax: 80000,
    coordonnees: { latitude: 5.3622, longitude: -4.0048 },
  },
  {
    id: '5',
    nom: 'Station Météo',
    type: 'temperature',
    parcelleId: '3',
    parcelleNom: 'Parcelle Hévéa Sud',
    statut: 'erreur',
    batterie: 0,
    signal: 0,
    derniereMesure: { valeur: 0, unite: '°C', date: '2024-01-10T08:00:00' },
    seuilMin: 20,
    seuilMax: 35,
    coordonnees: { latitude: 5.3550, longitude: -4.0100 },
  },
]

export default function CapteursPage() {
  const [capteurs, setCapteurs] = useState<Capteur[]>(mockCapteurs)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [selectedCapteur, setSelectedCapteur] = useState<Capteur | null>(null)

  const fetchCapteurs = useCallback(async () => {
    try {
      const response = await api.get('/capteurs')
      // Handle API response structure: {success: true, data: [...]}
      const data = response.data?.data || response.data
      if (Array.isArray(data) && data.length > 0) {
        setCapteurs(data)
      } else {
        setCapteurs(mockCapteurs)
      }
    } catch {
      // Fallback to mock data
      setCapteurs(mockCapteurs)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchCapteurs()
  }, [fetchCapteurs])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchCapteurs()
    toast.success('Données actualisées')
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'temperature': return <Thermometer className="h-5 w-5" />
      case 'humidite': return <Droplets className="h-5 w-5" />
      case 'humidite_sol': return <Droplets className="h-5 w-5" />
      case 'luminosite': return <Sun className="h-5 w-5" />
      case 'ph': return <Gauge className="h-5 w-5" />
      case 'pression': return <Wind className="h-5 w-5" />
      default: return <Activity className="h-5 w-5" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'temperature': return 'Température'
      case 'humidite': return 'Humidité Air'
      case 'humidite_sol': return 'Humidité Sol'
      case 'luminosite': return 'Luminosité'
      case 'ph': return 'pH'
      case 'pression': return 'Pression'
      default: return type
    }
  }

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'actif':
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case 'inactif':
        return <Badge className="bg-gray-100 text-gray-800">Inactif</Badge>
      case 'maintenance':
        return <Badge className="bg-orange-100 text-orange-800">Maintenance</Badge>
      case 'erreur':
        return <Badge className="bg-red-100 text-red-800">Erreur</Badge>
      default:
        return <Badge>{statut}</Badge>
    }
  }

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-500'
    if (level > 20) return 'text-orange-500'
    return 'text-red-500'
  }

  const getSignalColor = (level: number) => {
    if (level > 70) return 'text-green-500'
    if (level > 40) return 'text-orange-500'
    return 'text-red-500'
  }

  const isValueAlert = (capteur: Capteur) => {
    const { valeur } = capteur.derniereMesure
    return valeur < capteur.seuilMin || valeur > capteur.seuilMax
  }

  const filteredCapteurs = capteurs.filter(capteur => {
    const matchesSearch = capteur.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         capteur.parcelleNom.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || capteur.type === filterType
    const matchesStatus = filterStatus === 'all' || capteur.statut === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const stats = {
    total: capteurs.length,
    actifs: capteurs.filter(c => c.statut === 'actif').length,
    alertes: capteurs.filter(c => c.statut === 'erreur' || c.batterie < 20).length,
    maintenance: capteurs.filter(c => c.statut === 'maintenance').length,
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Capteurs IoT
          </h1>
          <p className="text-gray-500 mt-1">
            Gérez vos capteurs connectés et surveillez leurs données
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Actualiser
          </Button>
          <Button onClick={() => setShowAddDialog(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-gray-500">Total capteurs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.actifs}</p>
                <p className="text-sm text-gray-500">Actifs</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.alertes}</p>
                <p className="text-sm text-gray-500">Alertes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Settings className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.maintenance}</p>
                <p className="text-sm text-gray-500">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Rechercher un capteur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
          title="Filtrer par type"
        >
          <option value="all">Tous les types</option>
          <option value="temperature">Température</option>
          <option value="humidite_sol">Humidité Sol</option>
          <option value="luminosite">Luminosité</option>
          <option value="ph">pH</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg bg-white"
          title="Filtrer par statut"
        >
          <option value="all">Tous les statuts</option>
          <option value="actif">Actif</option>
          <option value="inactif">Inactif</option>
          <option value="maintenance">Maintenance</option>
          <option value="erreur">Erreur</option>
        </select>
      </div>

      {/* Capteurs Grid */}
      {filteredCapteurs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-gray-500">
            <Activity className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="font-medium">Aucun capteur trouvé</p>
            <p className="text-sm mt-1">Modifiez vos filtres ou ajoutez un nouveau capteur</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCapteurs.map((capteur) => (
            <Card
              key={capteur.id}
              className={`hover:shadow-lg transition-shadow ${
                capteur.statut === 'erreur' ? 'border-red-200 bg-red-50/50' :
                capteur.statut === 'maintenance' ? 'border-orange-200 bg-orange-50/50' : ''
              }`}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      capteur.statut === 'actif' ? 'bg-primary/10 text-primary' :
                      capteur.statut === 'erreur' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {getTypeIcon(capteur.type)}
                    </div>
                    <div>
                      <CardTitle className="text-base">{capteur.nom}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {capteur.parcelleNom}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 hover:bg-gray-100 rounded" aria-label="Options">
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedCapteur(capteur)}>
                        <Settings className="h-4 w-4 mr-2" />
                        Configurer
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Power className="h-4 w-4 mr-2" />
                        {capteur.statut === 'actif' ? 'Désactiver' : 'Activer'}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Mesure actuelle */}
                <div className={`p-4 rounded-lg ${
                  isValueAlert(capteur) ? 'bg-red-100' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{getTypeLabel(capteur.type)}</span>
                    {isValueAlert(capteur) && (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <p className={`text-3xl font-bold ${
                    isValueAlert(capteur) ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {capteur.derniereMesure.valeur}
                    <span className="text-lg font-normal ml-1">
                      {capteur.derniereMesure.unite}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Seuils: {capteur.seuilMin} - {capteur.seuilMax} {capteur.derniereMesure.unite}
                  </p>
                </div>

                {/* Status & Battery */}
                <div className="flex items-center justify-between">
                  {getStatusBadge(capteur.statut)}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1" title={`Batterie: ${capteur.batterie}%`}>
                      <Battery className={`h-4 w-4 ${getBatteryColor(capteur.batterie)}`} />
                      <span className="text-xs">{capteur.batterie}%</span>
                    </div>
                    <div className="flex items-center gap-1" title={`Signal: ${capteur.signal}%`}>
                      {capteur.signal > 0 ? (
                        <Wifi className={`h-4 w-4 ${getSignalColor(capteur.signal)}`} />
                      ) : (
                        <WifiOff className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-xs">{capteur.signal}%</span>
                    </div>
                  </div>
                </div>

                {/* Last update */}
                <div className="flex items-center gap-2 text-xs text-gray-500 pt-2 border-t">
                  <Clock className="h-3 w-3" />
                  Dernière mesure: {new Date(capteur.derniereMesure.date).toLocaleString('fr-FR')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un capteur</DialogTitle>
            <DialogDescription>
              Configurez un nouveau capteur IoT pour votre exploitation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nom du capteur</label>
              <Input placeholder="Ex: Capteur Température Zone A" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Type de capteur</label>
              <select className="w-full px-4 py-2 border rounded-lg" title="Type de capteur">
                <option value="temperature">Température</option>
                <option value="humidite_sol">Humidité du sol</option>
                <option value="luminosite">Luminosité</option>
                <option value="ph">pH</option>
                <option value="humidite">Humidité de l&apos;air</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Parcelle associée</label>
              <select className="w-full px-4 py-2 border rounded-lg" title="Parcelle associée">
                <option value="1">Parcelle Cacao Nord</option>
                <option value="2">Parcelle Café Est</option>
                <option value="3">Parcelle Hévéa Sud</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Seuil minimum</label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Seuil maximum</label>
                <Input type="number" placeholder="100" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Identifiant appareil</label>
              <Input placeholder="Ex: SENSOR-001-ABC" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Annuler
            </Button>
            <Button onClick={() => {
              toast.success('Capteur ajouté avec succès')
              setShowAddDialog(false)
            }}>
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Config Dialog */}
      <Dialog open={!!selectedCapteur} onOpenChange={() => setSelectedCapteur(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configuration du capteur</DialogTitle>
            <DialogDescription>
              {selectedCapteur?.nom}
            </DialogDescription>
          </DialogHeader>
          {selectedCapteur && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Seuil minimum</label>
                  <Input type="number" defaultValue={selectedCapteur.seuilMin} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Seuil maximum</label>
                  <Input type="number" defaultValue={selectedCapteur.seuilMax} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fréquence de mesure</label>
                <select className="w-full px-4 py-2 border rounded-lg" title="Fréquence de mesure">
                  <option value="5">Toutes les 5 minutes</option>
                  <option value="15">Toutes les 15 minutes</option>
                  <option value="30">Toutes les 30 minutes</option>
                  <option value="60">Toutes les heures</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Alertes</label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="alertSms" defaultChecked />
                  <label htmlFor="alertSms" className="text-sm">SMS</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="alertPush" defaultChecked />
                  <label htmlFor="alertPush" className="text-sm">Notification push</label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedCapteur(null)}>
              Annuler
            </Button>
            <Button onClick={() => {
              toast.success('Configuration sauvegardée')
              setSelectedCapteur(null)
            }}>
              Sauvegarder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
