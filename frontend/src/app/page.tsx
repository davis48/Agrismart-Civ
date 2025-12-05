'use client'

import Link from 'next/link'
import { 
  Leaf, 
  Droplets, 
  Sun, 
  BarChart3, 
  Smartphone, 
  Shield, 
  Users, 
  TrendingUp,
  Cloud,
  Bell,
  ShoppingCart,
  GraduationCap,
  ChevronRight,
  Check,
  Star,
  ArrowRight,
  MapPin,
  Thermometer,
  Activity
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AgriSmart CI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">Fonctionnalités</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-green-600 transition-colors">Comment ça marche</a>
              <a href="#benefits" className="text-gray-600 hover:text-green-600 transition-colors">Avantages</a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost">Connexion</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-green-600 hover:bg-green-700">
                  S&apos;inscrire
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Leaf className="h-4 w-4" />
                Agriculture Intelligente en Côte d&apos;Ivoire
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Cultivez plus,
                <span className="text-green-600"> perdez moins</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                AgriSmart CI combine capteurs IoT et Intelligence Artificielle pour optimiser 
                votre irrigation, détecter les maladies et maximiser vos rendements agricoles.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/register">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6 w-full sm:w-auto">
                    Commencer gratuitement
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 w-full sm:w-auto">
                    Voir la démo
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>+25% de rendement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>-30% d&apos;eau</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  <span>-40% de pertes</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Tableau de bord</h3>
                    <span className="text-sm text-green-600 font-medium">En direct</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <Droplets className="h-6 w-6 text-blue-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">65%</p>
                      <p className="text-sm text-gray-600">Humidité sol</p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4">
                      <Thermometer className="h-6 w-6 text-orange-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">28°C</p>
                      <p className="text-sm text-gray-600">Température</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <Activity className="h-6 w-6 text-green-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">6.5</p>
                      <p className="text-sm text-gray-600">pH du sol</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <TrendingUp className="h-6 w-6 text-purple-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">+18%</p>
                      <p className="text-sm text-gray-600">Rendement</p>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Bell className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Conseil du jour</p>
                        <p className="text-sm text-gray-600">Irrigation recommandée à 6h demain</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-lg p-4 animate-bounce">
                <Sun className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-lg p-4">
                <Cloud className="h-8 w-8 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">10K+</p>
              <p className="text-green-100">Hectares connectés</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">5000+</p>
              <p className="text-green-100">Agriculteurs</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">25+</p>
              <p className="text-green-100">Cultures supportées</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold mb-2">94%</p>
              <p className="text-green-100">Précision IA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tout ce dont vous avez besoin pour une agriculture moderne
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des outils puissants et simples pour surveiller, analyser et optimiser vos exploitations agricoles.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Droplets className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Suivi en temps réel</h3>
              <p className="text-gray-600">Consultez instantanément l&apos;humidité, la température, le pH et les nutriments de vos sols.</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                <Cloud className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prévisions météo</h3>
              <p className="text-gray-600">Météo hyperlocale sur 10 jours avec alertes pour planifier vos activités.</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Alertes intelligentes</h3>
              <p className="text-gray-600">Notifications SMS et WhatsApp en cas de stress hydrique ou détection de maladies.</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyse IA</h3>
              <p className="text-gray-600">Détection automatique de 50+ maladies avec 94% de précision grâce à l&apos;IA.</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Marketplace</h3>
              <p className="text-gray-600">Achetez et vendez semences, engrais et équipements directement depuis l&apos;app.</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Formations</h3>
              <p className="text-gray-600">Accédez à des tutoriels vidéo et fiches pratiques pour améliorer vos techniques.</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Communauté</h3>
              <p className="text-gray-600">Échangez avec d&apos;autres agriculteurs, partagez conseils et signalements.</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Suivi économique</h3>
              <p className="text-gray-600">Calculez votre ROI, économies d&apos;eau et réduction d&apos;intrants en temps réel.</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiplateforme</h3>
              <p className="text-gray-600">Disponible sur Android, iOS et web. Interface en français et langues locales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600">
              Un système simple et efficace en 4 étapes
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Installation</h3>
              <p className="text-gray-600">Nos capteurs IoT sont installés dans vos parcelles (alimentés par énergie solaire).</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Collecte</h3>
              <p className="text-gray-600">Les données sont transmises automatiquement toutes les 15 minutes vers notre plateforme.</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyse</h3>
              <p className="text-gray-600">Notre IA analyse les données et génère des recommandations personnalisées.</p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Action</h3>
              <p className="text-gray-600">Recevez des alertes et conseils directement sur votre téléphone pour agir rapidement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Des résultats concrets pour votre exploitation
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-16 w-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-lg">+25%</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Augmentation des rendements</h3>
                    <p className="text-gray-600">Grâce à l&apos;optimisation de l&apos;irrigation et des nutriments</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-16 w-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-lg">-30%</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Économie d&apos;eau</h3>
                    <p className="text-gray-600">Irrigation de précision basée sur les besoins réels</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-16 w-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-lg">-40%</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Réduction des pertes</h3>
                    <p className="text-gray-600">Détection précoce des maladies par l&apos;IA</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-16 w-16 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-lg">300%</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Retour sur investissement</h3>
                    <p className="text-gray-600">En moyenne pour les producteurs utilisateurs</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                </div>
                <p className="text-lg text-gray-700 mb-6 italic">
                  &quot;Depuis que j&apos;utilise AgriSmart, j&apos;ai augmenté ma production de riz de 30% 
                  et j&apos;économise beaucoup d&apos;eau. L&apos;application est simple et les alertes 
                  m&apos;ont aidé à détecter une maladie avant qu&apos;elle ne se propage.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
                    KJ
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Kouassi Jean</p>
                    <p className="text-sm text-gray-600">Producteur de riz, Bouaké</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à transformer votre agriculture ?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Rejoignez les milliers d&apos;agriculteurs ivoiriens qui utilisent AgriSmart CI 
            pour améliorer leurs rendements et réduire leurs pertes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6">
                Créer un compte gratuit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-700 text-lg px-8 py-6">
                Se connecter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-400 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-10 w-10 bg-green-600 rounded-xl flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AgriSmart CI</span>
              </div>
              <p className="text-sm">
                Révolutionner l&apos;agriculture ivoirienne grâce à l&apos;intelligence artificielle et l&apos;IoT.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tarifs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Application mobile</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Capteurs IoT</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Formations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Abidjan, Côte d&apos;Ivoire
                </li>
                <li>contact@agrismart.ci</li>
                <li>+225 07 00 00 00 00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} AgriSmart CI. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
