'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Lightbulb,
  Droplets,
  Bug,
  Leaf,
  Sun,
  ThermometerSun,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Filter,
  Sparkles,
  TrendingUp,
  Calendar,
  MapPin,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Star,
  Send,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Types
interface Feedback {
  utile: boolean | null;
  note: number;
  commentaire: string;
  date: string;
}

interface Recommendation {
  id: string;
  titre: string;
  description: string;
  categorie: 'irrigation' | 'fertilisation' | 'protection' | 'recolte' | 'entretien';
  priorite: 'haute' | 'moyenne' | 'basse';
  statut: 'en_attente' | 'en_cours' | 'terminee' | 'ignoree';
  parcelle: {
    id: string;
    nom: string;
    culture: string;
  };
  date_creation: string;
  date_echeance?: string;
  impact_estime?: string;
  source_ia: string;
  confiance: number;
  actions?: string[];
  feedback?: Feedback;
}

// Données simulées
const mockRecommandations: Recommendation[] = [
  {
    id: '1',
    titre: "Augmenter l'irrigation",
    description: "Les capteurs d'humidité indiquent un niveau bas (35%). Augmentez l'irrigation de 20% pour les prochaines 48h.",
    categorie: 'irrigation',
    priorite: 'haute',
    statut: 'en_attente',
    parcelle: { id: '1', nom: 'Parcelle Cacao Nord', culture: 'Cacao' },
    date_creation: '2025-01-28T08:00:00',
    date_echeance: '2025-01-30T08:00:00',
    impact_estime: '+15% rendement potentiel',
    source_ia: 'Analyse prédictive météo + capteurs',
    confiance: 92,
    actions: [
      "Programmer l'irrigation automatique",
      "Vérifier les goutteurs",
      "Contrôler le débit d'eau"
    ]
  },
  {
    id: '2',
    titre: 'Application de fertilisant NPK',
    description: "L'analyse du sol révèle un déficit en azote. Application recommandée: 150kg/ha de NPK 15-15-15.",
    categorie: 'fertilisation',
    priorite: 'haute',
    statut: 'en_cours',
    parcelle: { id: '2', nom: 'Parcelle Café Est', culture: 'Café' },
    date_creation: '2025-01-27T10:00:00',
    date_echeance: '2025-02-01T10:00:00',
    impact_estime: '+20% croissance végétative',
    source_ia: 'Analyse spectrale + historique',
    confiance: 88,
    actions: [
      "Acheter le fertilisant NPK",
      "Préparer l'épandeur",
      "Appliquer tôt le matin"
    ]
  },
  {
    id: '3',
    titre: 'Traitement préventif contre les pucerons',
    description: "Risque élevé d'infestation de pucerons détecté. Traitement bio recommandé dans les 5 prochains jours.",
    categorie: 'protection',
    priorite: 'moyenne',
    statut: 'en_attente',
    parcelle: { id: '3', nom: 'Parcelle Maïs Ouest', culture: 'Maïs' },
    date_creation: '2025-01-26T14:00:00',
    date_echeance: '2025-02-02T14:00:00',
    impact_estime: 'Éviter 30% de pertes',
    source_ia: 'Modèle prédictif ravageurs',
    confiance: 85,
    actions: [
      "Préparer solution de savon noir",
      "Pulvériser sur les feuilles",
      "Répéter dans 3 jours si nécessaire"
    ]
  },
  {
    id: '4',
    titre: 'Période optimale de récolte',
    description: "Les indicateurs de maturité suggèrent une récolte optimale dans 7-10 jours pour maximiser la qualité.",
    categorie: 'recolte',
    priorite: 'moyenne',
    statut: 'en_attente',
    parcelle: { id: '1', nom: 'Parcelle Cacao Nord', culture: 'Cacao' },
    date_creation: '2025-01-25T09:00:00',
    date_echeance: '2025-02-05T09:00:00',
    impact_estime: '+10% qualité des fèves',
    source_ia: 'Analyse de maturité IA',
    confiance: 90,
    actions: [
      "Préparer les outils de récolte",
      "Organiser la main d'oeuvre",
      "Préparer les bacs de fermentation"
    ]
  },
  {
    id: '5',
    titre: 'Taille des branches mortes',
    description: "Détection de branches mortes sur 15% des cacaoyers. Taille sanitaire recommandée pour éviter les maladies.",
    categorie: 'entretien',
    priorite: 'basse',
    statut: 'terminee',
    parcelle: { id: '1', nom: 'Parcelle Cacao Nord', culture: 'Cacao' },
    date_creation: '2025-01-20T11:00:00',
    impact_estime: 'Prévention maladies fongiques',
    source_ia: 'Analyse images drone',
    confiance: 95
  },
  {
    id: '6',
    titre: 'Ajuster le pH du sol',
    description: "pH du sol mesuré à 5.2. Recommandation: apport de chite chaux dolomitique (200kg/ha) pour atteindre pH 6.0.",
    categorie: 'fertilisation',
    priorite: 'basse',
    statut: 'ignoree',
    parcelle: { id: '2', nom: 'Parcelle Café Est', culture: 'Café' },
    date_creation: '2025-01-18T08:00:00',
    impact_estime: 'Meilleure absorption nutriments',
    source_ia: 'Analyse capteurs sol',
    confiance: 78
  }
];

// Icônes par catégorie
const categorieIcons = {
  irrigation: Droplets,
  fertilisation: Leaf,
  protection: Bug,
  recolte: Sun,
  entretien: ThermometerSun,
};

// Couleurs par catégorie
const categorieColors = {
  irrigation: 'bg-blue-100 text-blue-700 border-blue-200',
  fertilisation: 'bg-green-100 text-green-700 border-green-200',
  protection: 'bg-red-100 text-red-700 border-red-200',
  recolte: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  entretien: 'bg-purple-100 text-purple-700 border-purple-200',
};

// Labels catégories
const categorieLabels = {
  irrigation: 'Irrigation',
  fertilisation: 'Fertilisation',
  protection: 'Protection',
  recolte: 'Récolte',
  entretien: 'Entretien',
};

// Couleurs priorité
const prioriteColors = {
  haute: 'bg-red-500',
  moyenne: 'bg-orange-500',
  basse: 'bg-green-500',
};

// Labels priorité
const prioriteLabels = {
  haute: 'Haute',
  moyenne: 'Moyenne',
  basse: 'Basse',
};

// Couleurs statut
const statutColors = {
  en_attente: 'bg-gray-100 text-gray-700',
  en_cours: 'bg-blue-100 text-blue-700',
  terminee: 'bg-green-100 text-green-700',
  ignoree: 'bg-red-100 text-red-700',
};

// Labels statut
const statutLabels = {
  en_attente: 'En attente',
  en_cours: 'En cours',
  terminee: 'Terminée',
  ignoree: 'Ignorée',
};

export default function RecommandationsPage() {
  const { t } = useTranslation();
  const [recommandations, setRecommandations] = useState<Recommendation[]>([]);
  const [filtreCategorie, setFiltreCategorie] = useState<string>('all');
  const [filtrePriorite, setFiltrePriorite] = useState<string>('all');
  const [filtreStatut, setFiltreStatut] = useState<string>('all');
  const [selectedRecommandation, setSelectedRecommandation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackNote, setFeedbackNote] = useState(0);
  const [feedbackCommentaire, setFeedbackCommentaire] = useState('');

  useEffect(() => {
    // Simuler le chargement
    setTimeout(() => {
      setRecommandations(mockRecommandations);
      setLoading(false);
    }, 1000);
  }, []);

  // Filtrer les recommandations
  const recommandationsFiltrees = recommandations.filter((rec) => {
    if (filtreCategorie !== 'all' && rec.categorie !== filtreCategorie) return false;
    if (filtrePriorite !== 'all' && rec.priorite !== filtrePriorite) return false;
    if (filtreStatut !== 'all' && rec.statut !== filtreStatut) return false;
    return true;
  });

  // Statistiques
  const stats = {
    total: recommandations.length,
    enAttente: recommandations.filter((r) => r.statut === 'en_attente').length,
    enCours: recommandations.filter((r) => r.statut === 'en_cours').length,
    terminees: recommandations.filter((r) => r.statut === 'terminee').length,
    hautesPriorites: recommandations.filter((r) => r.priorite === 'haute').length,
  };

  // Changer le statut d'une recommandation
  const changerStatut = (id: string, nouveauStatut: Recommendation['statut']) => {
    setRecommandations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, statut: nouveauStatut } : rec))
    );
    if (selectedRecommandation?.id === id) {
      setSelectedRecommandation((prev) => prev ? { ...prev, statut: nouveauStatut } : null);
    }
  };

  // Envoyer le feedback
  const envoyerFeedback = (id: string, utile: boolean) => {
    const feedback: Feedback = {
      utile,
      note: feedbackNote,
      commentaire: feedbackCommentaire,
      date: new Date().toISOString(),
    };
    
    setRecommandations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, feedback } : rec))
    );
    if (selectedRecommandation?.id === id) {
      setSelectedRecommandation((prev) => prev ? { ...prev, feedback } : null);
    }
    setShowFeedbackForm(false);
    setFeedbackNote(0);
    setFeedbackCommentaire('');
  };

  // Vote rapide (utile ou non)
  const voteRapide = (id: string, utile: boolean) => {
    const feedback: Feedback = {
      utile,
      note: utile ? 5 : 1,
      commentaire: '',
      date: new Date().toISOString(),
    };
    
    setRecommandations((prev) =>
      prev.map((rec) => (rec.id === id ? { ...rec, feedback } : rec))
    );
    if (selectedRecommandation?.id === id) {
      setSelectedRecommandation((prev) => prev ? { ...prev, feedback } : null);
    }
  };

  // Formater la date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Calculer le temps restant
  const tempsRestant = (dateEcheance?: string) => {
    if (!dateEcheance) return null;
    const now = new Date();
    const echeance = new Date(dateEcheance);
    const diff = echeance.getTime() - now.getTime();
    const jours = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (jours < 0) return 'Échue';
    if (jours === 0) return "Aujourd'hui";
    if (jours === 1) return 'Demain';
    return `${jours} jours`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            {t('recommandations.title', 'Recommandations IA')}
          </h1>
          <p className="text-muted-foreground">
            {t('recommandations.subtitle', 'Conseils personnalisés basés sur vos données')}
          </p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.enAttente}</p>
                <p className="text-xs text-muted-foreground">En attente</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.enCours}</p>
                <p className="text-xs text-muted-foreground">En cours</p>
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
                <p className="text-2xl font-bold">{stats.terminees}</p>
                <p className="text-xs text-muted-foreground">Terminées</p>
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
                <p className="text-2xl font-bold">{stats.hautesPriorites}</p>
                <p className="text-xs text-muted-foreground">Priorités hautes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtres:</span>
            </div>

            <Select value={filtreCategorie} onValueChange={setFiltreCategorie}>
              <SelectTrigger className="w-[150px]" title="Filtrer par catégorie">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="irrigation">Irrigation</SelectItem>
                <SelectItem value="fertilisation">Fertilisation</SelectItem>
                <SelectItem value="protection">Protection</SelectItem>
                <SelectItem value="recolte">Récolte</SelectItem>
                <SelectItem value="entretien">Entretien</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtrePriorite} onValueChange={setFiltrePriorite}>
              <SelectTrigger className="w-[150px]" title="Filtrer par priorité">
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="haute">Haute</SelectItem>
                <SelectItem value="moyenne">Moyenne</SelectItem>
                <SelectItem value="basse">Basse</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtreStatut} onValueChange={setFiltreStatut}>
              <SelectTrigger className="w-[150px]" title="Filtrer par statut">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="en_attente">En attente</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
                <SelectItem value="terminee">Terminée</SelectItem>
                <SelectItem value="ignoree">Ignorée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des recommandations et détails */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Liste */}
        <div className="space-y-4">
          {recommandationsFiltrees.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucune recommandation trouvée</p>
              </CardContent>
            </Card>
          ) : (
            recommandationsFiltrees.map((rec) => {
              const Icon = categorieIcons[rec.categorie];
              const isSelected = selectedRecommandation?.id === rec.id;

              return (
                <Card
                  key={rec.id}
                  className={cn(
                    'cursor-pointer transition-all hover:shadow-md',
                    isSelected && 'ring-2 ring-primary'
                  )}
                  onClick={() => setSelectedRecommandation(rec)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icône catégorie */}
                      <div className={cn('p-3 rounded-lg border', categorieColors[rec.categorie])}>
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold truncate">{rec.titre}</h3>
                          <div className={cn('w-2 h-2 rounded-full shrink-0 mt-2', prioriteColors[rec.priorite])} />
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {rec.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          <Badge variant="outline" className={statutColors[rec.statut]}>
                            {statutLabels[rec.statut]}
                          </Badge>
                          <Badge variant="outline">
                            <MapPin className="h-3 w-3 mr-1" />
                            {rec.parcelle.nom}
                          </Badge>
                          {rec.date_echeance && (
                            <Badge variant="outline">
                              <Calendar className="h-3 w-3 mr-1" />
                              {tempsRestant(rec.date_echeance)}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Détails */}
        <div className="md:sticky md:top-4">
          {selectedRecommandation ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = categorieIcons[selectedRecommandation.categorie];
                      return (
                        <div className={cn('p-3 rounded-lg border', categorieColors[selectedRecommandation.categorie])}>
                          <Icon className="h-6 w-6" />
                        </div>
                      );
                    })()}
                    <div>
                      <Badge className={cn('mb-2', categorieColors[selectedRecommandation.categorie])}>
                        {categorieLabels[selectedRecommandation.categorie]}
                      </Badge>
                      <CardTitle>{selectedRecommandation.titre}</CardTitle>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn('w-3 h-3 rounded-full', prioriteColors[selectedRecommandation.priorite])} />
                    <span className="text-sm font-medium">
                      Priorité {prioriteLabels[selectedRecommandation.priorite]}
                    </span>
                  </div>
                </div>
                <CardDescription className="mt-2">{selectedRecommandation.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Informations */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Parcelle</p>
                    <p className="font-medium">{selectedRecommandation.parcelle.nom}</p>
                    <p className="text-sm text-muted-foreground">{selectedRecommandation.parcelle.culture}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Impact estimé</p>
                    <p className="font-medium text-primary">{selectedRecommandation.impact_estime || 'Non défini'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Créée le</p>
                    <p className="font-medium">{formatDate(selectedRecommandation.date_creation)}</p>
                  </div>
                  {selectedRecommandation.date_echeance && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Échéance</p>
                      <p className="font-medium">{formatDate(selectedRecommandation.date_echeance)}</p>
                    </div>
                  )}
                </div>

                {/* Confiance IA */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Confiance IA</p>
                    <span className="text-sm font-bold text-primary">{selectedRecommandation.confiance}%</span>
                  </div>
                  <Progress value={selectedRecommandation.confiance} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Source: {selectedRecommandation.source_ia}
                  </p>
                </div>

                {/* Actions recommandées */}
                {selectedRecommandation.actions && selectedRecommandation.actions.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Actions recommandées</p>
                    <div className="space-y-2">
                      {selectedRecommandation.actions.map((action, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                            {index + 1}
                          </div>
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Boutons d'action */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  {selectedRecommandation.statut === 'en_attente' && (
                    <>
                      <Button onClick={() => changerStatut(selectedRecommandation.id, 'en_cours')}>
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Démarrer
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => changerStatut(selectedRecommandation.id, 'ignoree')}
                      >
                        Ignorer
                      </Button>
                    </>
                  )}
                  {selectedRecommandation.statut === 'en_cours' && (
                    <Button onClick={() => changerStatut(selectedRecommandation.id, 'terminee')}>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Marquer terminée
                    </Button>
                  )}
                  {(selectedRecommandation.statut === 'terminee' || selectedRecommandation.statut === 'ignoree') && (
                    <Button
                      variant="outline"
                      onClick={() => changerStatut(selectedRecommandation.id, 'en_attente')}
                    >
                      Réouvrir
                    </Button>
                  )}
                </div>

                {/* Section Feedback */}
                <div className="pt-4 border-t space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Votre avis sur cette recommandation
                    </p>
                  </div>
                  
                  {selectedRecommandation.feedback ? (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {selectedRecommandation.feedback.utile ? (
                            <ThumbsUp className="h-5 w-5 text-green-500" />
                          ) : (
                            <ThumbsDown className="h-5 w-5 text-red-500" />
                          )}
                          <span className="font-medium">
                            {selectedRecommandation.feedback.utile ? 'Recommandation utile' : 'Recommandation non utile'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={cn(
                                'h-4 w-4',
                                star <= selectedRecommandation.feedback!.note
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              )}
                            />
                          ))}
                        </div>
                      </div>
                      {selectedRecommandation.feedback.commentaire && (
                        <p className="text-sm text-muted-foreground italic">
                          "{selectedRecommandation.feedback.commentaire}"
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Feedback envoyé le {new Date(selectedRecommandation.feedback.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  ) : (
                    <>
                      {!showFeedbackForm ? (
                        <div className="flex items-center gap-3">
                          <p className="text-sm text-muted-foreground">Cette recommandation était-elle utile ?</p>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => voteRapide(selectedRecommandation.id, true)}
                              className="hover:bg-green-50 hover:border-green-500 hover:text-green-600"
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              Oui
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => voteRapide(selectedRecommandation.id, false)}
                              className="hover:bg-red-50 hover:border-red-500 hover:text-red-600"
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              Non
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowFeedbackForm(true)}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Détaillé
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Note globale</p>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => setFeedbackNote(star)}
                                  className="focus:outline-none"
                                  title={`Note ${star} étoile${star > 1 ? 's' : ''}`}
                                  aria-label={`Donner ${star} étoile${star > 1 ? 's' : ''}`}
                                >
                                  <Star
                                    className={cn(
                                      'h-6 w-6 transition-colors',
                                      star <= feedbackNote
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300 hover:text-yellow-300'
                                    )}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Commentaire (optionnel)</label>
                            <textarea
                              value={feedbackCommentaire}
                              onChange={(e) => setFeedbackCommentaire(e.target.value)}
                              placeholder="Partagez votre expérience avec cette recommandation..."
                              className="w-full p-3 text-sm border rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:bg-gray-900 dark:border-gray-700"
                              rows={3}
                            />
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              onClick={() => envoyerFeedback(selectedRecommandation.id, feedbackNote >= 3)}
                              disabled={feedbackNote === 0}
                            >
                              <Send className="h-4 w-4 mr-2" />
                              Envoyer
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setShowFeedbackForm(false);
                                setFeedbackNote(0);
                                setFeedbackCommentaire('');
                              }}
                            >
                              Annuler
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Lightbulb className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Sélectionnez une recommandation pour voir les détails
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
