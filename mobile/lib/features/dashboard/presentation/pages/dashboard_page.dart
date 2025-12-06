import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../widgets/sensor_card.dart';
import '../widgets/weather_widget.dart';
import '../widgets/alerts_widget.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  // Données simulées pour les capteurs
  final List<SensorData> _sensors = [
    SensorData(
      title: 'Humidité Sol',
      value: '65',
      unit: '%',
      icon: Icons.water_drop,
      percentage: 0.65,
      color: Colors.blue,
      status: 'normal',
    ),
    SensorData(
      title: 'Température',
      value: '28',
      unit: '°C',
      icon: Icons.thermostat,
      percentage: 0.7,
      color: Colors.orange,
      status: 'normal',
    ),
    SensorData(
      title: 'pH Sol',
      value: '6.5',
      unit: '',
      icon: Icons.science,
      percentage: 0.65,
      color: Colors.purple,
      status: 'normal',
    ),
    SensorData(
      title: 'NPK',
      value: '85',
      unit: '%',
      icon: Icons.eco,
      percentage: 0.85,
      color: Colors.green,
      status: 'normal',
    ),
  ];

  // Données météo simulées
  final WeatherData _weather = WeatherData(
    location: 'Yamoussoukro, CI',
    temperature: 32,
    condition: 'Ensoleillé',
    humidity: 75,
    windSpeed: 12,
    rainChance: 20,
    alerts: [],
  );

  final List<DailyForecast> _forecast = [
    DailyForecast(dayName: 'Auj', condition: 'Ensoleillé', tempMax: 32, tempMin: 24),
    DailyForecast(dayName: 'Lun', condition: 'Nuageux', tempMax: 30, tempMin: 23),
    DailyForecast(dayName: 'Mar', condition: 'Pluie', tempMax: 28, tempMin: 22),
    DailyForecast(dayName: 'Mer', condition: 'Pluie', tempMax: 27, tempMin: 21),
    DailyForecast(dayName: 'Jeu', condition: 'Nuageux', tempMax: 29, tempMin: 22),
    DailyForecast(dayName: 'Ven', condition: 'Ensoleillé', tempMax: 31, tempMin: 23),
    DailyForecast(dayName: 'Sam', condition: 'Ensoleillé', tempMax: 33, tempMin: 24),
  ];

  // Alertes simulées
  final List<AlertItem> _alerts = [
    AlertItem(
      title: 'Stress hydrique détecté',
      message: 'Parcelle Maïs Nord nécessite irrigation',
      level: AlertLevel.critical,
      type: AlertType.water,
      time: 'Il y a 2h',
      parcelleName: 'Maïs Nord',
    ),
    AlertItem(
      title: 'Risque de maladie',
      message: 'Mildiou possible sur tomates',
      level: AlertLevel.warning,
      type: AlertType.disease,
      time: 'Il y a 5h',
      parcelleName: 'Tomates Est',
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('AgriSmart CI'),
        backgroundColor: Colors.green,
        foregroundColor: Colors.white,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () => context.push('/notifications'),
          ),
          IconButton(
            icon: const Icon(Icons.person_outline),
            onPressed: () => context.push('/profile'),
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          // TODO: Recharger les données
          await Future.delayed(const Duration(seconds: 1));
        },
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Météo
              WeatherWidget(weather: _weather),
              const SizedBox(height: 16),
              
              // Prévisions 7 jours
              WeatherForecastWidget(forecast: _forecast),
              const SizedBox(height: 24),
              
              // Alertes
              AlertsWidget(
                alerts: _alerts,
                onViewAll: () => context.push('/notifications'),
              ),
              const SizedBox(height: 24),
              
              // Capteurs
              const Text(
                'État des Capteurs',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 1.1,
                ),
                itemCount: _sensors.length,
                itemBuilder: (context, index) {
                  final sensor = _sensors[index];
                  return SensorCard(
                    title: sensor.title,
                    value: sensor.value,
                    unit: sensor.unit,
                    icon: sensor.icon,
                    percentage: sensor.percentage,
                    color: sensor.color,
                    status: sensor.status,
                    onTap: () => context.push('/capteurs'),
                  );
                },
              ),
              const SizedBox(height: 24),
              
              // Accès rapide
              const Text(
                'Accès Rapide',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 12),
              GridView.count(
                crossAxisCount: 3,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                children: [
                  _buildQuickAction(
                    icon: Icons.landscape,
                    label: 'Parcelles',
                    color: Colors.green,
                    onTap: () => context.push('/parcelles'),
                  ),
                  _buildQuickAction(
                    icon: Icons.camera_alt,
                    label: 'Diagnostic',
                    color: Colors.purple,
                    onTap: () => context.push('/diagnostic'),
                  ),
                  _buildQuickAction(
                    icon: Icons.lightbulb,
                    label: 'Conseils',
                    color: Colors.amber,
                    onTap: () => context.push('/recommandations'),
                  ),
                  _buildQuickAction(
                    icon: Icons.store,
                    label: 'Marketplace',
                    color: Colors.orange,
                    onTap: () => context.push('/marketplace'),
                  ),
                  _buildQuickAction(
                    icon: Icons.school,
                    label: 'Formations',
                    color: Colors.teal,
                    onTap: () => context.push('/formations'),
                  ),
                  _buildQuickAction(
                    icon: Icons.forum,
                    label: 'Communauté',
                    color: Colors.pink,
                    onTap: () => context.push('/messages'),
                  ),
                ],
              ),
              const SizedBox(height: 24),
              
              // Stats rapides
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.05),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Statistiques Globales',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildStatItem('3', 'Parcelles', Icons.landscape, Colors.green),
                        _buildStatItem('12', 'Capteurs', Icons.sensors, Colors.blue),
                        _buildStatItem('2', 'Alertes', Icons.warning, Colors.orange),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 100), // Espace pour la bottom nav
            ],
          ),
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: 0,
        selectedItemColor: Colors.green,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Accueil'),
          BottomNavigationBarItem(icon: Icon(Icons.landscape), label: 'Parcelles'),
          BottomNavigationBarItem(icon: Icon(Icons.camera_alt), label: 'Diagnostic'),
          BottomNavigationBarItem(icon: Icon(Icons.store), label: 'Marché'),
          BottomNavigationBarItem(icon: Icon(Icons.menu), label: 'Plus'),
        ],
        onTap: (index) {
          switch (index) {
            case 0:
              break;
            case 1:
              context.push('/parcelles');
              break;
            case 2:
              context.push('/diagnostic');
              break;
            case 3:
              context.push('/marketplace');
              break;
            case 4:
              _showMoreMenu(context);
              break;
          }
        },
      ),
    );
  }

  Widget _buildQuickAction({
    required IconData icon,
    required String label,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: color, size: 28),
            const SizedBox(height: 8),
            Text(
              label,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w500,
                color: color,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatItem(String value, String label, IconData icon, Color color) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            shape: BoxShape.circle,
          ),
          child: Icon(icon, color: color, size: 24),
        ),
        const SizedBox(height: 8),
        Text(
          value,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey.shade600,
          ),
        ),
      ],
    );
  }

  void _showMoreMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Container(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const SizedBox(height: 24),
            _buildMenuItem(Icons.analytics, 'Analytics', () {
              Navigator.pop(context);
              context.push('/analytics');
            }),
            _buildMenuItem(Icons.school, 'Formations', () {
              Navigator.pop(context);
              context.push('/formations');
            }),
            _buildMenuItem(Icons.message, 'Messages', () {
              Navigator.pop(context);
              context.push('/messages');
            }),
            _buildMenuItem(Icons.settings, 'Paramètres', () {
              Navigator.pop(context);
              context.push('/settings');
            }),
            _buildMenuItem(Icons.logout, 'Déconnexion', () {
              Navigator.pop(context);
              context.go('/onboarding');
            }),
          ],
        ),
      ),
    );
  }

  Widget _buildMenuItem(IconData icon, String label, VoidCallback onTap) {
    return ListTile(
      leading: Icon(icon, color: Colors.grey.shade700),
      title: Text(label),
      onTap: onTap,
    );
  }
}

class SensorData {
  final String title;
  final String value;
  final String unit;
  final IconData icon;
  final double percentage;
  final Color color;
  final String status;

  SensorData({
    required this.title,
    required this.value,
    required this.unit,
    required this.icon,
    required this.percentage,
    required this.color,
    required this.status,
  });
}
