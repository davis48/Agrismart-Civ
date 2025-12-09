import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class CapteursPage extends StatefulWidget {
  const CapteursPage({super.key});

  @override
  State<CapteursPage> createState() => _CapteursPageState();
}

class _CapteursPageState extends State<CapteursPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  String _selectedParcelle = 'Toutes';

  final List<Capteur> _capteurs = [
    Capteur(
      id: '1',
      nom: 'Humidité Sol 1',
      type: CapteurType.humidity,
      parcelle: 'Maïs Nord',
      valeur: 65,
      unite: '%',
      status: 'normal',
      batterie: 85,
      lastUpdate: DateTime.now().subtract(const Duration(minutes: 5)),
      historique: [60, 62, 65, 63, 65, 67, 65],
    ),
    Capteur(
      id: '2',
      nom: 'Température Sol 1',
      type: CapteurType.temperature,
      parcelle: 'Maïs Nord',
      valeur: 28,
      unite: '°C',
      status: 'normal',
      batterie: 78,
      lastUpdate: DateTime.now().subtract(const Duration(minutes: 5)),
      historique: [26, 27, 28, 29, 28, 28, 28],
    ),
    Capteur(
      id: '3',
      nom: 'pH Sol',
      type: CapteurType.ph,
      parcelle: 'Tomates Est',
      valeur: 6.5,
      unite: '',
      status: 'normal',
      batterie: 92,
      lastUpdate: DateTime.now().subtract(const Duration(minutes: 10)),
      historique: [6.4, 6.5, 6.5, 6.6, 6.5, 6.5, 6.5],
    ),
    Capteur(
      id: '4',
      nom: 'Humidité Sol 2',
      type: CapteurType.humidity,
      parcelle: 'Tomates Est',
      valeur: 35,
      unite: '%',
      status: 'warning',
      batterie: 45,
      lastUpdate: DateTime.now().subtract(const Duration(minutes: 15)),
      historique: [50, 48, 45, 42, 40, 38, 35],
    ),
    Capteur(
      id: '5',
      nom: 'NPK Sensor',
      type: CapteurType.npk,
      parcelle: 'Riz Sud',
      valeur: 85,
      unite: '%',
      status: 'normal',
      batterie: 67,
      lastUpdate: DateTime.now().subtract(const Duration(minutes: 20)),
      historique: [80, 82, 83, 84, 85, 85, 85],
    ),
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('Capteurs IoT'),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: Colors.white,
          labelColor: Colors.white,
          unselectedLabelColor: Colors.white70,
          tabs: const [
            Tab(text: 'Tous'),
            Tab(text: 'Humidité'),
            Tab(text: 'Temp.'),
            Tab(text: 'NPK'),
          ],
        ),
      ),
      body: Column(
        children: [
          // Filtre par parcelle
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.white,
            child: Row(
              children: [
                const Icon(Icons.filter_list, color: Colors.grey),
                const SizedBox(width: 8),
                Expanded(
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: Row(
                      children: ['Toutes', 'Maïs Nord', 'Tomates Est', 'Riz Sud']
                          .map((p) => Padding(
                                padding: const EdgeInsets.only(right: 8),
                                child: ChoiceChip(
                                  label: Text(p),
                                  selected: _selectedParcelle == p,
                                  selectedColor: Colors.blue.shade100,
                                  onSelected: (selected) {
                                    setState(() => _selectedParcelle = p);
                                  },
                                ),
                              ))
                          .toList(),
                    ),
                  ),
                ),
              ],
            ),
          ),
          
          // Liste des capteurs
          Expanded(
            child: TabBarView(
              controller: _tabController,
              children: [
                _buildCapteurList(null),
                _buildCapteurList(CapteurType.humidity),
                _buildCapteurList(CapteurType.temperature),
                _buildCapteurList(CapteurType.npk),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCapteurList(CapteurType? filterType) {
    var filteredCapteurs = _capteurs;
    
    if (filterType != null) {
      filteredCapteurs = filteredCapteurs.where((c) => c.type == filterType).toList();
    }
    
    if (_selectedParcelle != 'Toutes') {
      filteredCapteurs = filteredCapteurs.where((c) => c.parcelle == _selectedParcelle).toList();
    }

    if (filteredCapteurs.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.sensors_off, size: 64, color: Colors.grey.shade400),
            const SizedBox(height: 16),
            Text(
              'Aucun capteur trouvé',
              style: TextStyle(color: Colors.grey.shade600),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: filteredCapteurs.length,
      itemBuilder: (context, index) {
        return _buildCapteurCard(filteredCapteurs[index]);
      },
    );
  }

  Widget _buildCapteurCard(Capteur capteur) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        onTap: () => context.pushNamed('capteur-detail', extra: capteur),
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: _getTypeColor(capteur.type).withOpacity(0.1),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Icon(
                        _getTypeIcon(capteur.type),
                        color: _getTypeColor(capteur.type),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          capteur.nom,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 16,
                          ),
                        ),
                        Text(
                          capteur.parcelle,
                          style: TextStyle(
                            color: Colors.grey.shade600,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
                _buildStatusIndicator(capteur.status),
              ],
            ),
            const SizedBox(height: 16),
            
            // Valeur principale
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      '${capteur.valeur}',
                      style: TextStyle(
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                        color: _getStatusColor(capteur.status),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(bottom: 6),
                      child: Text(
                        capteur.unite,
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.grey.shade600,
                        ),
                      ),
                    ),
                  ],
                ),
                // Mini graphique
                SizedBox(
                  width: 100,
                  height: 40,
                  child: CustomPaint(
                    painter: SparklinePainter(
                      data: capteur.historique,
                      color: _getStatusColor(capteur.status),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            
            // Batterie et dernière mise à jour
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(
                      _getBatteryIcon(capteur.batterie),
                      size: 16,
                      color: capteur.batterie < 20 ? Colors.red : Colors.grey,
                    ),
                    const SizedBox(width: 4),
                    Text(
                      '${capteur.batterie}%',
                      style: TextStyle(
                        fontSize: 12,
                        color: capteur.batterie < 20 ? Colors.red : Colors.grey.shade600,
                      ),
                    ),
                  ],
                ),
                Text(
                  'Mis à jour: ${_formatTime(capteur.lastUpdate)}',
                  style: TextStyle(
                    fontSize: 11,
                    color: Colors.grey.shade500,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
      ),
    );
  }

  Widget _buildStatusIndicator(String status) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: _getStatusColor(status).withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: _getStatusColor(status),
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            _getStatusLabel(status),
            style: TextStyle(
              color: _getStatusColor(status),
              fontWeight: FontWeight.w500,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Color _getTypeColor(CapteurType type) {
    switch (type) {
      case CapteurType.humidity:
        return Colors.blue;
      case CapteurType.temperature:
        return Colors.orange;
      case CapteurType.ph:
        return Colors.purple;
      case CapteurType.npk:
        return Colors.green;
    }
  }

  IconData _getTypeIcon(CapteurType type) {
    switch (type) {
      case CapteurType.humidity:
        return Icons.water_drop;
      case CapteurType.temperature:
        return Icons.thermostat;
      case CapteurType.ph:
        return Icons.science;
      case CapteurType.npk:
        return Icons.eco;
    }
  }

  Color _getStatusColor(String status) {
    switch (status) {
      case 'warning':
        return Colors.orange;
      case 'critical':
        return Colors.red;
      default:
        return Colors.green;
    }
  }

  String _getStatusLabel(String status) {
    switch (status) {
      case 'warning':
        return 'Attention';
      case 'critical':
        return 'Critique';
      default:
        return 'Normal';
    }
  }

  IconData _getBatteryIcon(int level) {
    if (level <= 20) return Icons.battery_alert;
    if (level <= 50) return Icons.battery_3_bar;
    if (level <= 80) return Icons.battery_5_bar;
    return Icons.battery_full;
  }

  String _formatTime(DateTime time) {
    final diff = DateTime.now().difference(time);
    if (diff.inMinutes < 60) {
      return 'Il y a ${diff.inMinutes} min';
    } else {
      return 'Il y a ${diff.inHours}h';
    }
  }
}

enum CapteurType { humidity, temperature, ph, npk }

class Capteur {
  final String id;
  final String nom;
  final CapteurType type;
  final String parcelle;
  final num valeur;
  final String unite;
  final String status;
  final int batterie;
  final DateTime lastUpdate;
  final List<num> historique;

  Capteur({
    required this.id,
    required this.nom,
    required this.type,
    required this.parcelle,
    required this.valeur,
    required this.unite,
    required this.status,
    required this.batterie,
    required this.lastUpdate,
    required this.historique,
  });
}

// Simple sparkline painter
class SparklinePainter extends CustomPainter {
  final List<num> data;
  final Color color;

  SparklinePainter({required this.data, required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    if (data.isEmpty) return;

    final paint = Paint()
      ..color = color
      ..strokeWidth = 2
      ..style = PaintingStyle.stroke;

    final fillPaint = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter,
        colors: [color.withOpacity(0.3), color.withOpacity(0.0)],
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));

    final maxVal = data.reduce((a, b) => a > b ? a : b);
    final minVal = data.reduce((a, b) => a < b ? a : b);
    final range = maxVal - minVal == 0 ? 1 : maxVal - minVal;

    final path = Path();
    final fillPath = Path();

    for (int i = 0; i < data.length; i++) {
      final x = (i / (data.length - 1)) * size.width;
      final y = size.height - ((data[i] - minVal) / range) * size.height;

      if (i == 0) {
        path.moveTo(x, y);
        fillPath.moveTo(x, size.height);
        fillPath.lineTo(x, y);
      } else {
        path.lineTo(x, y);
        fillPath.lineTo(x, y);
      }
    }

    fillPath.lineTo(size.width, size.height);
    fillPath.close();

    canvas.drawPath(fillPath, fillPaint);
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}
