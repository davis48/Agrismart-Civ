import 'package:flutter/material.dart';
import '../pages/capteurs_page.dart'; // To access Capteur model

class CapteurDetailPage extends StatelessWidget {
  final Capteur capteur;

  const CapteurDetailPage({super.key, required this.capteur});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(capteur.nom),
        backgroundColor: Colors.blue,
        foregroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            // Header Card
            Card(
              elevation: 4,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  children: [
                    Icon(
                      _getTypeIcon(capteur.type),
                      size: 64,
                      color: _getTypeColor(capteur.type),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      '${capteur.valeur} ${capteur.unite}',
                      style: TextStyle(
                        fontSize: 48,
                        fontWeight: FontWeight.bold,
                        color: _getTypeColor(capteur.type),
                      ),
                    ),
                    Text(
                      capteur.nom,
                      style: const TextStyle(fontSize: 20, color: Colors.grey),
                    ),
                     const SizedBox(height: 8),
                     _buildStatusBadge(capteur.status),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            
            // History Chart Placeholder
             const Align(
              alignment: Alignment.centerLeft,
              child: Text('Historique (7 derniers jours)', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            ),
            const SizedBox(height: 12),
            Container(
              height: 200,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: Center(
                child: CustomPaint(
                    size: const Size(300, 150),
                    painter: SparklinePainter(data: capteur.historique, color: _getTypeColor(capteur.type)),
                ),
              ),
            ),

            const SizedBox(height: 24),
            // Info Grid
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                childAspectRatio: 1.5,
                crossAxisSpacing: 16,
                mainAxisSpacing: 16,
                children: [
                   _buildGridItem(Icons.battery_full, '${capteur.batterie}%', 'Batterie'),
                   _buildGridItem(Icons.location_on, capteur.parcelle, 'Localisation'),
                   _buildGridItem(Icons.update, '5 min', 'Mise à jour'),
                   _buildGridItem(Icons.wifi, 'Fort', 'Signal'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusBadge(String status) {
     Color color = status == 'normal' ? Colors.green : (status == 'warning' ? Colors.orange : Colors.red);
     return Container(
       padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
       decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(20)),
       child: Text(status.toUpperCase(), style: TextStyle(color: color, fontWeight: FontWeight.bold)),
     );
  }

  Widget _buildGridItem(IconData icon, String value, String label) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.grey.shade50,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: Colors.grey.shade600),
          const SizedBox(height: 8),
          Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          Text(label, style: const TextStyle(fontSize: 12, color: Colors.grey)),
        ],
      ),
    );
  }

  Color _getTypeColor(CapteurType type) {
    switch (type) {
      case CapteurType.humidity: return Colors.blue;
      case CapteurType.temperature: return Colors.orange;
      case CapteurType.ph: return Colors.purple;
      case CapteurType.npk: return Colors.green;
    }
  }

  IconData _getTypeIcon(CapteurType type) {
    switch (type) {
      case CapteurType.humidity: return Icons.water_drop;
      case CapteurType.temperature: return Icons.thermostat;
      case CapteurType.ph: return Icons.science;
      case CapteurType.npk: return Icons.eco;
    }
  }
}
