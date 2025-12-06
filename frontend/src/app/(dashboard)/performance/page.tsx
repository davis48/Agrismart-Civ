'use client'

import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Leaf,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Award,
  BarChart3,
  PieChart,
  Download,
  Filter,
  ChevronDown,
  Info,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Skeleton } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/lib/store'
import api from '@/lib/api'

// Types
interface ROIData {
  investissement: number
  revenus: number
  benefice: number
  roi: number
  variation: number
}

interface SeasonComparison {
  metric: string
  saisonActuelle: number
  saisonPrecedente: number
  variation: number
}

interface ProductionTrend {
  mois: string
  production: number
  objectif: number
  saisonPrecedente: number
}

interface CulturePerformance {
  culture: string
  superficie: number
  rendement: number
  revenus: number
  couts: number
  benefice: number
  roi: number
}

// Données de démonstration
const mockROI: ROIData = {
  investissement: 2500000,
  revenus: 4750000,
  benefice: 2250000,
  roi: 90,
  variation: 23,
}

const mockSeasonComparison: SeasonComparison[] = [
  { metric: 'Production (tonnes)', saisonActuelle: 45, saisonPrecedente: 38, variation: 18.4 },
  { metric: 'Rendement (t/ha)', saisonActuelle: 2.8, saisonPrecedente: 2.4, variation: 16.7 },
  { metric: 'Coûts (FCFA/ha)', saisonActuelle: 180000, saisonPrecedente: 195000, variation: -7.7 },
  { metric: 'Prix de vente moyen', saisonActuelle: 850, saisonPrecedente: 780, variation: 9.0 },
  { metric: 'Pertes (%)', saisonActuelle: 5, saisonPrecedente: 12, variation: -58.3 },
  { metric: 'Maladies détectées', saisonActuelle: 3, saisonPrecedente: 8, variation: -62.5 },
]

const mockProductionTrends: ProductionTrend[] = [
  { mois: 'Jan', production: 3.2, objectif: 3.5, saisonPrecedente: 2.8 },
  { mois: 'Fév', production: 3.5, objectif: 3.5, saisonPrecedente: 3.0 },
  { mois: 'Mar', production: 4.1, objectif: 4.0, saisonPrecedente: 3.5 },
  { mois: 'Avr', production: 4.8, objectif: 4.5, saisonPrecedente: 4.0 },
  { mois: 'Mai', production: 5.2, objectif: 5.0, saisonPrecedente: 4.2 },
  { mois: 'Juin', production: 4.9, objectif: 5.0, saisonPrecedente: 4.5 },
  { mois: 'Juil', production: 5.5, objectif: 5.5, saisonPrecedente: 4.8 },
  { mois: 'Août', production: 5.8, objectif: 5.5, saisonPrecedente: 5.0 },
  { mois: 'Sep', production: 6.2, objectif: 6.0, saisonPrecedente: 5.2 },
  { mois: 'Oct', production: 5.5, objectif: 5.5, saisonPrecedente: 4.8 },
  { mois: 'Nov', production: 4.2, objectif: 4.5, saisonPrecedente: 3.8 },
  { mois: 'Déc', production: 3.8, objectif: 4.0, saisonPrecedente: 3.2 },
]

const mockCulturePerformance: CulturePerformance[] = [
  { 
    culture: 'Cacao', 
    superficie: 8, 
    rendement: 2.5, 
    revenus: 2400000, 
    couts: 1200000, 
    benefice: 1200000, 
    roi: 100 
  },
  { 
    culture: 'Café', 
    superficie: 4, 
    rendement: 1.8, 
    revenus: 1080000, 
    couts: 600000, 
    benefice: 480000, 
    roi: 80 
  },
  { 
    culture: 'Palmier', 
    superficie: 3, 
    rendement: 3.2, 
    revenus: 864000, 
    couts: 450000, 
    benefice: 414000, 
    roi: 92 
  },
  { 
    culture: 'Riz', 
    superficie: 1, 
    rendement: 4.5, 
    revenus: 406000, 
    couts: 250000, 
    benefice: 156000, 
    roi: 62 
  },
]

const radarData = [
  { subject: 'Rendement', saisonActuelle: 85, saisonPrecedente: 70, fullMark: 100 },
  { subject: 'Qualité', saisonActuelle: 90, saisonPrecedente: 75, fullMark: 100 },
  { subject: 'Efficacité', saisonActuelle: 78, saisonPrecedente: 65, fullMark: 100 },
  { subject: 'Durabilité', saisonActuelle: 82, saisonPrecedente: 68, fullMark: 100 },
  { subject: 'Rentabilité', saisonActuelle: 88, saisonPrecedente: 72, fullMark: 100 },
  { subject: 'Innovation', saisonActuelle: 75, saisonPrecedente: 60, fullMark: 100 },
]

const moisComparaison = [
  { mois: 'Jan', actuel: 280000, precedent: 220000 },
  { mois: 'Fév', actuel: 320000, precedent: 250000 },
  { mois: 'Mar', actuel: 410000, precedent: 340000 },
  { mois: 'Avr', actuel: 480000, precedent: 380000 },
  { mois: 'Mai', actuel: 520000, precedent: 420000 },
  { mois: 'Juin', actuel: 490000, precedent: 400000 },
  { mois: 'Juil', actuel: 550000, precedent: 450000 },
  { mois: 'Août', actuel: 580000, precedent: 480000 },
  { mois: 'Sep', actuel: 620000, precedent: 500000 },
  { mois: 'Oct', actuel: 550000, precedent: 460000 },
  { mois: 'Nov', actuel: 420000, precedent: 350000 },
  { mois: 'Déc', actuel: 380000, precedent: 300000 },
]

export default function PerformancePage() {
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('annee')
  const [selectedCulture, setSelectedCulture] = useState('all')
  const [roi, setRoi] = useState<ROIData>(mockROI)
  const [seasonComparison, setSeasonComparison] = useState<SeasonComparison[]>(mockSeasonComparison)
  const [productionTrends, setProductionTrends] = useState<ProductionTrend[]>(mockProductionTrends)
  const [culturePerformance, setCulturePerformance] = useState<CulturePerformance[]>(mockCulturePerformance)

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value) + ' FCFA'
  }

  const formatPercent = (value: number) => {
    const sign = value > 0 ? '+' : ''
    return `${sign}${value.toFixed(1)}%`
  }

  const getVariationColor = (value: number, inverse = false) => {
    const isPositive = inverse ? value < 0 : value > 0
    return isPositive ? 'text-green-600' : value < 0 ? 'text-red-600' : 'text-gray-500'
  }

  const getVariationIcon = (value: number, inverse = false) => {
    const isPositive = inverse ? value < 0 : value > 0
    return isPositive ? (
      <ArrowUpRight className="h-4 w-4" />
    ) : (
      <ArrowDownRight className="h-4 w-4" />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Performance & ROI
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Analysez vos performances et votre retour sur investissement
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
            title="Sélectionner la période"
            aria-label="Sélectionner la période d'analyse"
          >
            <option value="mois">Ce mois</option>
            <option value="trimestre">Ce trimestre</option>
            <option value="annee">Cette année</option>
            <option value="saison">Cette saison</option>
          </select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* ROI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">ROI Global</p>
                {loading ? (
                  <Skeleton className="h-10 w-24 mt-1 bg-green-400/50" />
                ) : (
                  <p className="text-4xl font-bold">{roi.roi}%</p>
                )}
              </div>
              <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
                <TrendingUp className="h-8 w-8" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-100">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span className="text-sm">+{roi.variation}% vs saison précédente</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Investissement</p>
                {loading ? (
                  <Skeleton className="h-8 w-32 mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(roi.investissement / 1000000).toFixed(1)}M
                  </p>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">FCFA investis cette saison</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Revenus</p>
                {loading ? (
                  <Skeleton className="h-8 w-32 mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(roi.revenus / 1000000).toFixed(1)}M
                  </p>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">FCFA générés cette saison</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Bénéfice Net</p>
                {loading ? (
                  <Skeleton className="h-8 w-32 mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    +{(roi.benefice / 1000000).toFixed(1)}M
                  </p>
                )}
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">FCFA de profit net</p>
          </CardContent>
        </Card>
      </div>

      {/* Comparaison de saisons */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Comparaison des Saisons</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Saison actuelle vs saison précédente
                </p>
              </div>
            </div>
            <Badge variant="success">
              Performance en hausse
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {seasonComparison.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{item.metric}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {typeof item.saisonActuelle === 'number' && item.saisonActuelle > 1000
                        ? formatCurrency(item.saisonActuelle)
                        : item.saisonActuelle}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      vs {typeof item.saisonPrecedente === 'number' && item.saisonPrecedente > 1000
                        ? formatCurrency(item.saisonPrecedente)
                        : item.saisonPrecedente}
                    </p>
                  </div>
                  <div className={cn(
                    "flex items-center text-sm font-medium",
                    getVariationColor(item.variation, item.metric.includes('Coûts') || item.metric.includes('Pertes') || item.metric.includes('Maladies'))
                  )}>
                    {getVariationIcon(item.variation, item.metric.includes('Coûts') || item.metric.includes('Pertes') || item.metric.includes('Maladies'))}
                    {formatPercent(item.variation)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Graphiques de tendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenus mensuels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Revenus Mensuels
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={moisComparaison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="mois" stroke="#6B7280" fontSize={12} />
                    <YAxis 
                      stroke="#6B7280" 
                      fontSize={12}
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="actuel"
                      name="Cette saison"
                      stroke="#10B981"
                      fill="#10B98133"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="precedent"
                      name="Saison précédente"
                      stroke="#6B7280"
                      fill="#6B728033"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Radar de performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-600" />
              Score de Performance Global
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-[300px] w-full" />
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#E5E7EB" />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Cette saison"
                      dataKey="saisonActuelle"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="Saison précédente"
                      dataKey="saisonPrecedente"
                      stroke="#6B7280"
                      fill="#6B7280"
                      fillOpacity={0.1}
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Production vs Objectifs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              Production vs Objectifs
            </CardTitle>
            <select
              value={selectedCulture}
              onChange={(e) => setSelectedCulture(e.target.value)}
              className="px-3 py-1 text-sm border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
              title="Filtrer par culture"
              aria-label="Sélectionner une culture"
            >
              <option value="all">Toutes les cultures</option>
              <option value="cacao">Cacao</option>
              <option value="cafe">Café</option>
              <option value="palmier">Palmier</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productionTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="mois" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} unit=" t" />
                  <Tooltip
                    formatter={(value: number) => `${value} tonnes`}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="production"
                    name="Production actuelle"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="objectif"
                    name="Objectif"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="saisonPrecedente"
                    name="Saison précédente"
                    stroke="#9CA3AF"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance par culture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-orange-600" />
            Performance par Culture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Culture</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Superficie</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Rendement</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Revenus</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Coûts</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">Bénéfice</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">ROI</th>
                </tr>
              </thead>
              <tbody>
                {culturePerformance.map((culture, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{culture.culture}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 text-gray-600 dark:text-gray-400">
                      {culture.superficie} ha
                    </td>
                    <td className="text-right py-4 px-4 text-gray-600 dark:text-gray-400">
                      {culture.rendement} t/ha
                    </td>
                    <td className="text-right py-4 px-4 text-gray-900 dark:text-white font-medium">
                      {formatCurrency(culture.revenus)}
                    </td>
                    <td className="text-right py-4 px-4 text-gray-600 dark:text-gray-400">
                      {formatCurrency(culture.couts)}
                    </td>
                    <td className="text-right py-4 px-4 text-green-600 dark:text-green-400 font-medium">
                      +{formatCurrency(culture.benefice)}
                    </td>
                    <td className="text-right py-4 px-4">
                      <Badge variant={culture.roi >= 80 ? 'success' : culture.roi >= 50 ? 'warning' : 'destructive'}>
                        {culture.roi}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">Total</td>
                  <td className="text-right py-4 px-4 font-bold text-gray-900 dark:text-white">
                    {culturePerformance.reduce((sum, c) => sum + c.superficie, 0)} ha
                  </td>
                  <td className="text-right py-4 px-4 text-gray-600 dark:text-gray-400">-</td>
                  <td className="text-right py-4 px-4 font-bold text-gray-900 dark:text-white">
                    {formatCurrency(culturePerformance.reduce((sum, c) => sum + c.revenus, 0))}
                  </td>
                  <td className="text-right py-4 px-4 font-bold text-gray-600 dark:text-gray-400">
                    {formatCurrency(culturePerformance.reduce((sum, c) => sum + c.couts, 0))}
                  </td>
                  <td className="text-right py-4 px-4 font-bold text-green-600 dark:text-green-400">
                    +{formatCurrency(culturePerformance.reduce((sum, c) => sum + c.benefice, 0))}
                  </td>
                  <td className="text-right py-4 px-4">
                    <Badge variant="success">
                      {roi.roi}%
                    </Badge>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Conseils d'amélioration */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
              <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                Conseils pour améliorer votre ROI
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 mt-0.5 text-green-600 shrink-0" />
                  <span>Augmentez le rendement du café en améliorant l'irrigation - potentiel de +15% ROI</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 mt-0.5 text-green-600 shrink-0" />
                  <span>Réduisez les coûts d'intrants en utilisant des engrais organiques - économie estimée de 120 000 FCFA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Target className="h-4 w-4 mt-0.5 text-green-600 shrink-0" />
                  <span>Diversifiez avec des cultures intercalaires pour maximiser l'utilisation du sol</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
