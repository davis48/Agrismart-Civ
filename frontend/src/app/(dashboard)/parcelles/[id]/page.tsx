'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Droplets,
  Thermometer,
  Sun,
  Leaf,
  Calendar,
  Edit2,
  Trash2,
  Plus,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Wifi,
  WifiOff,
  MoreVertical,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

// Types
interface Parcelle {
  id: string;
  nom: string;
  superficie: number;
  unite_superficie: string;
  culture_actuelle: string;
  date_plantation?: string;
  localisation: {
    latitude: number;
    longitude: number;
    adresse?: string;
  };
  type_sol: string;
  type_irrigation: string;
  statut: 'active' | 'en_jachère' | 'en_préparation';
  sante_globale: number;
  derniere_activite: string;
}

interface Capteur {
  id: string;
  nom: string;
  type: string;
  statut: 'actif' | 'inactif' | 'maintenance';
  derniere_valeur: number;
  unite: string;
  derniere_mesure: string;
}

interface Alerte {
  id: string;
  titre: string;
  niveau: 'info' | 'warning' | 'danger';
  date: string;
  resolue: boolean;
}

interface Activite {
  id: string;
  type: string;
  description: string;
  date: string;
  utilisateur: string;
}

// Données simulées
const mockParcelle: Parcelle = {
  id: '1',
  nom: 'Parcelle Cacao Nord',
  superficie: 2.5,
  unite_superficie: 'hectares',
  culture_actuelle: 'Cacao',
  date_plantation: '2023-03-15',
  localisation: {
    latitude: 6.8276,
    longitude: -5.2893,
    adresse: 'Bouaké Nord, Région de la Vallée du Bandama',
  },
  type_sol: 'Argileux',
  type_irrigation: 'Goutte-à-goutte',
  statut: 'active',
  sante_globale: 85,
  derniere_activite: '2025-01-28T10:30:00',
};

const mockCapteurs: Capteur[] = [
  {
    id: '1',
    nom: 'Capteur Humidité Sol A1',
    type: 'humidite_sol',
    statut: 'actif',
    derniere_valeur: 65,
    unite: '%',
    derniere_mesure: '2025-01-28T14:30:00',
  },
  {
    id: '2',
    nom: 'Capteur Température A1',
    type: 'temperature',
    statut: 'actif',
    derniere_valeur: 28.5,
    unite: '°C',
    derniere_mesure: '2025-01-28T14:30:00',
  },
  {
    id: '3',
    nom: 'Capteur Luminosité A1',
    type: 'luminosite',
    statut: 'maintenance',
    derniere_valeur: 850,
    unite: 'lux',
    derniere_mesure: '2025-01-28T10:00:00',
  },
  {
    id: '4',
    nom: 'Capteur pH Sol A1',
    type: 'ph_sol',
    statut: 'actif',
    derniere_valeur: 6.2,
    unite: '',
    derniere_mesure: '2025-01-28T14:30:00',
  },
];

const mockAlertes: Alerte[] = [
  {
    id: '1',
    titre: 'Humidité du sol basse',
    niveau: 'warning',
    date: '2025-01-28T08:00:00',
    resolue: false,
  },
  {
    id: '2',
    titre: 'Température élevée détectée',
    niveau: 'info',
    date: '2025-01-27T14:00:00',
    resolue: true,
  },
  {
    id: '3',
    titre: 'Risque de maladie fongique',
    niveau: 'danger',
    date: '2025-01-26T10:00:00',
    resolue: false,
  },
];

const mockActivites: Activite[] = [
  {
    id: '1',
    type: 'irrigation',
    description: 'Irrigation automatique déclenchée',
    date: '2025-01-28T06:00:00',
    utilisateur: 'Système',
  },
  {
    id: '2',
    type: 'mesure',
    description: 'Relevé des capteurs effectué',
    date: '2025-01-28T05:00:00',
    utilisateur: 'Système',
  },
  {
    id: '3',
    type: 'intervention',
    description: 'Traitement préventif appliqué',
    date: '2025-01-27T09:00:00',
    utilisateur: 'Jean Kouassi',
  },
  {
    id: '4',
    type: 'inspection',
    description: 'Inspection visuelle des plants',
    date: '2025-01-26T15:00:00',
    utilisateur: 'Marie Konan',
  },
];

// Données graphiques
const generateChartData = () => {
  const data = [];
  for (let i = 23; i >= 0; i--) {
    const hour = new Date();
    hour.setHours(hour.getHours() - i);
    data.push({
      heure: hour.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      temperature: 25 + Math.random() * 8,
      humidite: 55 + Math.random() * 20,
    });
  }
  return data;
};

const chartData = generateChartData();

// Couleurs capteurs
const capteurIcons: Record<string, React.ElementType> = {
  humidite_sol: Droplets,
  temperature: Thermometer,
  luminosite: Sun,
  ph_sol: Leaf,
};

const capteurColors: Record<string, string> = {
  humidite_sol: 'text-blue-500',
  temperature: 'text-orange-500',
  luminosite: 'text-yellow-500',
  ph_sol: 'text-green-500',
};

// Couleurs alertes
const alerteColors = {
  info: 'bg-blue-100 text-blue-700 border-blue-200',
  warning: 'bg-orange-100 text-orange-700 border-orange-200',
  danger: 'bg-red-100 text-red-700 border-red-200',
};

export default function ParcelleDetailPage() {
  useTranslation();
  const params = useParams();
  const router = useRouter();
  const [parcelle, setParcelle] = useState<Parcelle | null>(null);
  const [capteurs, setCapteurs] = useState<Capteur[]>([]);
  const [alertes, setAlertes] = useState<Alerte[]>([]);
  const [activites, setActivites] = useState<Activite[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    // Simuler le chargement
    setTimeout(() => {
      setParcelle(mockParcelle);
      setCapteurs(mockCapteurs);
      setAlertes(mockAlertes);
      setActivites(mockActivites);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const handleDelete = () => {
    // Simuler la suppression
    router.push('/parcelles');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'en_jachère':
        return 'bg-yellow-100 text-yellow-700';
      case 'en_préparation':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getSanteColor = (sante: number) => {
    if (sante >= 80) return 'text-green-500';
    if (sante >= 60) return 'text-yellow-500';
    if (sante >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!parcelle) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Parcelle non trouvée</p>
        <Button asChild className="mt-4">
          <Link href="/parcelles">Retour aux parcelles</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/parcelles">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{parcelle.nom}</h1>
              <Badge className={getStatutColor(parcelle.statut)}>
                {parcelle.statut === 'active'
                  ? 'Active'
                  : parcelle.statut === 'en_jachère'
                  ? 'En jachère'
                  : 'En préparation'}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{parcelle.localisation.adresse}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href={`/parcelles/${parcelle.id}/edit`}>
              <Edit2 className="h-4 w-4 mr-2" />
              Modifier
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowDeleteDialog(true)} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Cartes d'informations principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Culture</p>
                <p className="font-semibold">{parcelle.culture_actuelle}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Superficie</p>
                <p className="font-semibold">
                  {parcelle.superficie} {parcelle.unite_superficie}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Santé globale</p>
                <p className={cn('font-semibold', getSanteColor(parcelle.sante_globale))}>
                  {parcelle.sante_globale}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Plantation</p>
                <p className="font-semibold">
                  {parcelle.date_plantation ? formatDate(parcelle.date_plantation) : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Onglets */}
      <Tabs defaultValue="apercu" className="space-y-6">
        <TabsList>
          <TabsTrigger value="apercu">Aperçu</TabsTrigger>
          <TabsTrigger value="capteurs">Capteurs ({capteurs.length})</TabsTrigger>
          <TabsTrigger value="alertes">Alertes ({alertes.filter((a) => !a.resolue).length})</TabsTrigger>
          <TabsTrigger value="activites">Activités</TabsTrigger>
        </TabsList>

        {/* Onglet Aperçu */}
        <TabsContent value="apercu" className="space-y-6">
          {/* Graphiques */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  Température (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="heure" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#f97316"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  Humidité du sol (24h)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="heure" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="humidite"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informations détaillées */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informations de la parcelle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Type de sol</p>
                    <p className="font-medium">{parcelle.type_sol}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Irrigation</p>
                    <p className="font-medium">{parcelle.type_irrigation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Latitude</p>
                    <p className="font-medium">{parcelle.localisation.latitude}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Longitude</p>
                    <p className="font-medium">{parcelle.localisation.longitude}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Alertes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alertes.slice(0, 3).map((alerte) => (
                    <div
                      key={alerte.id}
                      className={cn('flex items-center justify-between p-3 rounded-lg border', alerteColors[alerte.niveau])}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">{alerte.titre}</span>
                      </div>
                      {alerte.resolue ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Capteurs */}
        <TabsContent value="capteurs" className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">{capteurs.length} capteurs installés</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un capteur
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {capteurs.map((capteur) => {
              const Icon = capteurIcons[capteur.type] || Activity;
              const colorClass = capteurColors[capteur.type] || 'text-gray-500';

              return (
                <Card key={capteur.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-muted rounded-lg">
                          <Icon className={cn('h-6 w-6', colorClass)} />
                        </div>
                        <div>
                          <p className="font-medium">{capteur.nom}</p>
                          <p className="text-sm text-muted-foreground">
                            Dernière mesure: {formatDateTime(capteur.derniere_mesure)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {capteur.statut === 'actif' ? (
                          <Wifi className="h-4 w-4 text-green-500" />
                        ) : capteur.statut === 'maintenance' ? (
                          <Activity className="h-4 w-4 text-orange-500" />
                        ) : (
                          <WifiOff className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-bold">
                          {capteur.derniere_valeur}
                          <span className="text-lg font-normal text-muted-foreground ml-1">
                            {capteur.unite}
                          </span>
                        </p>
                      </div>
                      <Badge
                        variant={capteur.statut === 'actif' ? 'default' : 'secondary'}
                        className={
                          capteur.statut === 'actif'
                            ? 'bg-green-100 text-green-700'
                            : capteur.statut === 'maintenance'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {capteur.statut === 'actif'
                          ? 'Actif'
                          : capteur.statut === 'maintenance'
                          ? 'Maintenance'
                          : 'Inactif'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Onglet Alertes */}
        <TabsContent value="alertes" className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground">
              {alertes.filter((a) => !a.resolue).length} alertes actives sur {alertes.length} total
            </p>
          </div>

          <div className="space-y-4">
            {alertes.map((alerte) => (
              <Card key={alerte.id} className={cn(alerte.resolue && 'opacity-60')}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'p-2 rounded-lg',
                          alerte.niveau === 'danger'
                            ? 'bg-red-100'
                            : alerte.niveau === 'warning'
                            ? 'bg-orange-100'
                            : 'bg-blue-100'
                        )}
                      >
                        <AlertTriangle
                          className={cn(
                            'h-5 w-5',
                            alerte.niveau === 'danger'
                              ? 'text-red-600'
                              : alerte.niveau === 'warning'
                              ? 'text-orange-600'
                              : 'text-blue-600'
                          )}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{alerte.titre}</p>
                        <p className="text-sm text-muted-foreground">{formatDateTime(alerte.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={
                          alerte.resolue
                            ? 'bg-green-100 text-green-700'
                            : alerte.niveau === 'danger'
                            ? 'bg-red-100 text-red-700'
                            : alerte.niveau === 'warning'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }
                      >
                        {alerte.resolue ? 'Résolue' : 'Active'}
                      </Badge>
                      {!alerte.resolue && (
                        <Button size="sm" variant="outline">
                          Résoudre
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Onglet Activités */}
        <TabsContent value="activites" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historique des activités</CardTitle>
              <CardDescription>Les dernières actions effectuées sur cette parcelle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border"></div>
                <div className="space-y-6">
                  {activites.map((activite, index) => (
                    <div key={activite.id} className="relative pl-10">
                      <div
                        className={cn(
                          'absolute left-2 w-5 h-5 rounded-full border-2 border-background',
                          index === 0 ? 'bg-primary' : 'bg-muted'
                        )}
                      ></div>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <p className="font-medium">{activite.description}</p>
                          <p className="text-sm text-muted-foreground">Par {activite.utilisateur}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{activite.type}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {formatDateTime(activite.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de suppression */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer la parcelle</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer la parcelle &ldquo;{parcelle.nom}&rdquo; ? Cette action est
              irréversible et supprimera également tous les capteurs et données associés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
