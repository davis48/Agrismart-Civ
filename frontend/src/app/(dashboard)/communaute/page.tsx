'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Users,
  MessageSquare,
  Trophy,
  Award,
  Star,
  Medal,
  Target,
  TrendingUp,
  Search,
  Plus,
  ThumbsUp,
  MessageCircle,
  Eye,
  Clock,
  Filter,
  ChevronRight,
  Flame,
  Zap,
  Crown,
  Leaf,
  Droplets,
  Bug,
  Sun,
  BookOpen,
  Share2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Skeleton } from '@/components/ui'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/lib/store'

// Types
interface UserBadge {
  id: string
  nom: string
  description: string
  icon: string
  niveau: 'bronze' | 'argent' | 'or' | 'platine'
  dateObtenue: string
}

interface UserStats {
  score: number
  niveau: number
  rang: number
  badges: UserBadge[]
  questionsRepondues: number
  postsPublies: number
  likes: number
  streak: number
}

interface ForumPost {
  id: string
  titre: string
  contenu: string
  auteur: {
    id: string
    nom: string
    avatar?: string
    niveau: number
    badges: string[]
  }
  categorie: string
  tags: string[]
  vues: number
  likes: number
  reponses: number
  dateCreation: string
  dernierMessage?: string
  resolu: boolean
}

interface LeaderboardEntry {
  rang: number
  userId: string
  nom: string
  avatar?: string
  score: number
  niveau: number
  region: string
  badges: number
}

// Données de démonstration
const mockUserStats: UserStats = {
  score: 2450,
  niveau: 12,
  rang: 45,
  badges: [
    { id: '1', nom: 'Expert Cacao', description: '100 questions sur le cacao répondues', icon: '🍫', niveau: 'or', dateObtenue: '2025-01-15' },
    { id: '2', nom: 'Premier pas', description: 'A créé son premier post', icon: '🚀', niveau: 'bronze', dateObtenue: '2024-11-01' },
    { id: '3', nom: 'Aide communautaire', description: '50 réponses validées', icon: '🤝', niveau: 'argent', dateObtenue: '2024-12-20' },
    { id: '4', nom: 'Régulier', description: '30 jours consécutifs connecté', icon: '🔥', niveau: 'or', dateObtenue: '2025-01-10' },
    { id: '5', nom: 'Photographe', description: '20 photos de cultures partagées', icon: '📸', niveau: 'argent', dateObtenue: '2024-12-05' },
  ],
  questionsRepondues: 87,
  postsPublies: 23,
  likes: 456,
  streak: 14,
}

const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    titre: 'Comment lutter efficacement contre la pourriture brune du cacao ?',
    contenu: 'Mes cacaoyers sont touchés par la pourriture brune cette saison. Quelqu\'un a-t-il des conseils pour traiter et prévenir cette maladie ?',
    auteur: { id: '1', nom: 'Kouamé Jean', niveau: 15, badges: ['🍫', '🤝'] },
    categorie: 'Maladies',
    tags: ['cacao', 'pourriture-brune', 'traitement'],
    vues: 234,
    likes: 45,
    reponses: 12,
    dateCreation: '2025-01-27T14:00:00',
    dernierMessage: '2025-01-28T09:30:00',
    resolu: false,
  },
  {
    id: '2',
    titre: 'Meilleur calendrier d\'irrigation pour le café robusta',
    contenu: 'Je cherche à optimiser mon irrigation. Quel est le meilleur calendrier selon vos expériences ?',
    auteur: { id: '2', nom: 'Yao Marie', niveau: 8, badges: ['🚀'] },
    categorie: 'Irrigation',
    tags: ['café', 'irrigation', 'conseils'],
    vues: 156,
    likes: 28,
    reponses: 8,
    dateCreation: '2025-01-26T10:00:00',
    dernierMessage: '2025-01-28T08:15:00',
    resolu: true,
  },
  {
    id: '3',
    titre: 'Retour d\'expérience: utilisation des capteurs IoT',
    contenu: 'Après 6 mois d\'utilisation des capteurs AgriTech, voici mon bilan complet...',
    auteur: { id: '3', nom: 'Koné Ibrahim', niveau: 20, badges: ['🍫', '🤝', '🔥'] },
    categorie: 'Technologie',
    tags: ['capteurs', 'iot', 'retour-experience'],
    vues: 567,
    likes: 89,
    reponses: 34,
    dateCreation: '2025-01-25T16:00:00',
    dernierMessage: '2025-01-28T11:00:00',
    resolu: false,
  },
  {
    id: '4',
    titre: 'Prix du cacao en hausse: comment en profiter ?',
    contenu: 'Avec la montée des prix, quelles stratégies adoptez-vous pour maximiser vos revenus ?',
    auteur: { id: '4', nom: 'Touré Fatou', niveau: 11, badges: ['📸'] },
    categorie: 'Marché',
    tags: ['cacao', 'prix', 'vente'],
    vues: 423,
    likes: 67,
    reponses: 21,
    dateCreation: '2025-01-24T09:00:00',
    dernierMessage: '2025-01-27T18:00:00',
    resolu: false,
  },
]

const mockLeaderboard: LeaderboardEntry[] = [
  { rang: 1, userId: '1', nom: 'Koné Ibrahim', score: 5680, niveau: 20, region: 'San-Pédro', badges: 12 },
  { rang: 2, userId: '2', nom: 'Yao Sylvie', score: 4920, niveau: 18, region: 'Abidjan', badges: 10 },
  { rang: 3, userId: '3', nom: 'Kouamé Jean', score: 4350, niveau: 15, region: 'Daloa', badges: 8 },
  { rang: 4, userId: '4', nom: 'Bamba Moussa', score: 3890, niveau: 14, region: 'Soubré', badges: 7 },
  { rang: 5, userId: '5', nom: 'Traoré Aminata', score: 3560, niveau: 13, region: 'Gagnoa', badges: 7 },
  { rang: 6, userId: '6', nom: 'Diallo Oumar', score: 3200, niveau: 12, region: 'Bouaké', badges: 6 },
  { rang: 7, userId: '7', nom: 'Konan Ange', score: 2980, niveau: 12, region: 'Divo', badges: 5 },
  { rang: 8, userId: '8', nom: 'Esso Patricia', score: 2750, niveau: 11, region: 'San-Pédro', badges: 5 },
  { rang: 9, userId: '9', nom: 'Coulibaly Adama', score: 2580, niveau: 11, region: 'Man', badges: 4 },
  { rang: 10, userId: '10', nom: 'N\'Guessan Koffi', score: 2400, niveau: 10, region: 'Yamoussoukro', badges: 4 },
]

const categories = [
  { id: 'all', nom: 'Toutes', icon: MessageSquare },
  { id: 'maladies', nom: 'Maladies', icon: Bug },
  { id: 'irrigation', nom: 'Irrigation', icon: Droplets },
  { id: 'cultures', nom: 'Cultures', icon: Leaf },
  { id: 'marche', nom: 'Marché', icon: TrendingUp },
  { id: 'technologie', nom: 'Technologie', icon: Zap },
  { id: 'formations', nom: 'Formations', icon: BookOpen },
]

const badgeNiveauColors = {
  bronze: 'bg-orange-100 text-orange-700 border-orange-300',
  argent: 'bg-gray-100 text-gray-700 border-gray-300',
  or: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  platine: 'bg-purple-100 text-purple-700 border-purple-300',
}

export default function CommunautePage() {
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'forum' | 'classement' | 'badges'>('forum')
  const [selectedCategorie, setSelectedCategorie] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [userStats, setUserStats] = useState<UserStats>(mockUserStats)
  const [posts, setPosts] = useState<ForumPost[]>(mockForumPosts)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(mockLeaderboard)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const heures = Math.floor(diff / (1000 * 60 * 60))
    const jours = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (heures < 1) return 'À l\'instant'
    if (heures < 24) return `Il y a ${heures}h`
    if (jours < 7) return `Il y a ${jours}j`
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }

  const getRangIcon = (rang: number) => {
    if (rang === 1) return <Crown className="h-5 w-5 text-yellow-500" />
    if (rang === 2) return <Medal className="h-5 w-5 text-gray-400" />
    if (rang === 3) return <Medal className="h-5 w-5 text-orange-400" />
    return null
  }

  const filteredPosts = posts.filter(post => {
    if (selectedCategorie !== 'all' && post.categorie.toLowerCase() !== selectedCategorie) return false
    if (searchQuery && !post.titre.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="h-7 w-7 text-green-600" />
            Communauté
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Échangez, apprenez et progressez avec d'autres agriculteurs
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle discussion
        </Button>
      </div>

      {/* Stats utilisateur avec gamification */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="col-span-2 md:col-span-1 bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-bold">{userStats.score}</p>
                <p className="text-green-100 text-sm">Points XP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.niveau}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Niveau</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">#{userStats.rang}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Classement</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <Flame className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.streak}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Jours de suite</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Award className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{userStats.badges.length}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Badges</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('forum')}
          className={cn(
            'px-4 py-2 font-medium text-sm border-b-2 -mb-px transition-colors',
            activeTab === 'forum'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          )}
        >
          <MessageSquare className="h-4 w-4 inline-block mr-2" />
          Forum
        </button>
        <button
          onClick={() => setActiveTab('classement')}
          className={cn(
            'px-4 py-2 font-medium text-sm border-b-2 -mb-px transition-colors',
            activeTab === 'classement'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          )}
        >
          <Trophy className="h-4 w-4 inline-block mr-2" />
          Classement
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={cn(
            'px-4 py-2 font-medium text-sm border-b-2 -mb-px transition-colors',
            activeTab === 'badges'
              ? 'border-green-600 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          )}
        >
          <Award className="h-4 w-4 inline-block mr-2" />
          Mes Badges
        </button>
      </div>

      {/* Contenu des onglets */}
      {activeTab === 'forum' && (
        <div className="space-y-4">
          {/* Barre de recherche et filtres */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une discussion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategorie(cat.id)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-colors',
                      selectedCategorie === cat.id
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.nom}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Liste des posts */}
          <div className="space-y-4">
            {loading ? (
              <>
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-32 w-full" />
              </>
            ) : filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Aucune discussion trouvée</p>
                </CardContent>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {/* Avatar */}
                      <div className="hidden sm:block">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                          {post.auteur.nom.charAt(0)}
                        </div>
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white hover:text-green-600 transition-colors">
                              {post.titre}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-gray-500">{post.auteur.nom}</span>
                              <Badge variant="outline" className="text-xs">
                                Nv. {post.auteur.niveau}
                              </Badge>
                              {post.auteur.badges.map((badge, i) => (
                                <span key={i} className="text-sm">{badge}</span>
                              ))}
                            </div>
                          </div>
                          {post.resolu && (
                            <Badge variant="success" className="shrink-0">
                              ✓ Résolu
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                          {post.contenu}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <Badge variant="outline">{post.categorie}</Badge>
                          {post.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.vues}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {post.reponses}
                          </span>
                          <span className="flex items-center gap-1 ml-auto">
                            <Clock className="h-4 w-4" />
                            {formatDate(post.dernierMessage || post.dateCreation)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'classement' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top 3 */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Podium du mois
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-end gap-4 sm:gap-8">
                {/* 2ème place */}
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xl font-bold mb-2">
                    {leaderboard[1]?.nom.charAt(0)}
                  </div>
                  <Medal className="h-6 w-6 text-gray-400 mb-1" />
                  <p className="font-semibold text-sm text-center">{leaderboard[1]?.nom}</p>
                  <p className="text-xs text-gray-500">{leaderboard[1]?.score} pts</p>
                  <div className="h-24 w-20 bg-gray-200 dark:bg-gray-700 rounded-t-lg mt-2 flex items-end justify-center pb-2">
                    <span className="text-2xl font-bold text-gray-500">2</span>
                  </div>
                </div>

                {/* 1ère place */}
                <div className="flex flex-col items-center -mt-8">
                  <Crown className="h-8 w-8 text-yellow-500 mb-1" />
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white text-2xl font-bold mb-2 ring-4 ring-yellow-300">
                    {leaderboard[0]?.nom.charAt(0)}
                  </div>
                  <p className="font-bold text-center">{leaderboard[0]?.nom}</p>
                  <p className="text-sm text-yellow-600 font-semibold">{leaderboard[0]?.score} pts</p>
                  <div className="h-32 w-24 bg-yellow-100 dark:bg-yellow-900/30 rounded-t-lg mt-2 flex items-end justify-center pb-2">
                    <span className="text-3xl font-bold text-yellow-600">1</span>
                  </div>
                </div>

                {/* 3ème place */}
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-300 to-orange-400 flex items-center justify-center text-white text-xl font-bold mb-2">
                    {leaderboard[2]?.nom.charAt(0)}
                  </div>
                  <Medal className="h-6 w-6 text-orange-400 mb-1" />
                  <p className="font-semibold text-sm text-center">{leaderboard[2]?.nom}</p>
                  <p className="text-xs text-gray-500">{leaderboard[2]?.score} pts</p>
                  <div className="h-16 w-20 bg-orange-100 dark:bg-orange-900/30 rounded-t-lg mt-2 flex items-end justify-center pb-2">
                    <span className="text-2xl font-bold text-orange-500">3</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Classement complet */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Classement général</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.userId}
                    className={cn(
                      'flex items-center gap-4 p-3 rounded-lg transition-colors',
                      entry.rang <= 3 ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                    )}
                  >
                    <div className="w-8 flex justify-center">
                      {getRangIcon(entry.rang) || (
                        <span className="text-lg font-bold text-gray-500">{entry.rang}</span>
                      )}
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                      {entry.nom.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">
                        {entry.nom}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {entry.region} · Nv. {entry.niveau}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900 dark:text-white">{entry.score}</p>
                      <p className="text-xs text-gray-500">{entry.badges} badges</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Votre position */}
          <Card>
            <CardHeader>
              <CardTitle>Votre position</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-4xl font-bold text-green-600">#{userStats.rang}</p>
                <p className="text-sm text-gray-500 mt-1">sur 1 247 agriculteurs</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Prochain niveau</span>
                  <span className="font-medium">250 pts</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '72%' }} />
                </div>
                <p className="text-xs text-center text-gray-500">
                  Encore 250 points pour atteindre le niveau {userStats.niveau + 1}
                </p>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">Comment gagner des points ?</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>• +10 pts par réponse validée</li>
                  <li>• +5 pts par like reçu</li>
                  <li>• +20 pts par question résolue</li>
                  <li>• +50 pts par badge obtenu</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="space-y-6">
          {/* Badges obtenus */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Mes Badges ({userStats.badges.length})
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {userStats.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={cn(
                      'p-4 rounded-lg border-2 text-center transition-transform hover:scale-105',
                      badgeNiveauColors[badge.niveau]
                    )}
                  >
                    <span className="text-4xl mb-2 block">{badge.icon}</span>
                    <p className="font-semibold text-sm">{badge.nom}</p>
                    <p className="text-xs opacity-75 mt-1">{badge.description}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {badge.niveau.charAt(0).toUpperCase() + badge.niveau.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Badges à débloquer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-600" />
                Badges à débloquer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {[
                  { icon: '🌟', nom: 'Super Star', description: '1000 likes reçus', progress: 45 },
                  { icon: '🎯', nom: 'Objectif atteint', description: '100% des recommandations suivies', progress: 78 },
                  { icon: '🏆', nom: 'Champion', description: 'Top 10 du classement', progress: 60 },
                  { icon: '📚', nom: 'Érudit', description: '50 formations complétées', progress: 32 },
                  { icon: '🌍', nom: 'Ambassadeur', description: 'Parrainer 10 agriculteurs', progress: 20 },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-center opacity-75"
                  >
                    <span className="text-4xl mb-2 block grayscale">{badge.icon}</span>
                    <p className="font-semibold text-sm text-gray-600 dark:text-gray-400">{badge.nom}</p>
                    <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${badge.progress}%` }} 
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{badge.progress}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
