import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ParcellesPage extends StatefulWidget {
  const ParcellesPage({super.key});

  @override
  State<ParcellesPage> createState() => _ParcellesPageState();
}

class _ParcellesPageState extends State<ParcellesPage> {
  // Données simulées
  final List<Parcelle> _parcelles = [
    Parcelle(
      id: '1',
      nom: 'Maïs Nord',
      superficie: 2.5,
      culture: 'Maïs',
      typeSol: 'Argileux',
      status: 'healthy',
      humidite: 65,
      temperature: 28,
      lastUpdate: DateTime.now().subtract(const Duration(minutes: 15)),
    ),
    Parcelle(
      id: '2',
      nom: 'Tomates Est',
      superficie: 1.0,
      culture: 'Tomate',
      typeSol: 'Sablonneux',
      status: 'warning',
      humidite: 35,
      temperature: 32,
      lastUpdate: DateTime.now().subtract(const Duration(minutes: 30)),
    ),
    Parcelle(
      id: '3',
      nom: 'Riz Sud',
      superficie: 3.0,
      culture: 'Riz',
      typeSol: 'Limono-argileux',
      status: 'healthy',
      humidite: 80,
      temperature: 27,
      lastUpdate: DateTime.now().subtract(const Duration(hours: 1)),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('Mes Parcelles'),
        backgroundColor: Colors.green,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.map),
            onPressed: () {
              // TODO: Vue carte
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Stats résumé
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.white,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStat('${_parcelles.length}', 'Parcelles'),
                _buildStat('${_totalSuperficie.toStringAsFixed(1)} ha', 'Surface'),
                _buildStat('${_healthyCount}', 'En santé'),
              ],
            ),
          ),
          const SizedBox(height: 8),
          
          // Liste des parcelles
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _parcelles.length,
              itemBuilder: (context, index) {
                final parcelle = _parcelles[index];
                return _buildParcelleCard(parcelle);
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () => _showAddParcelleDialog(),
        backgroundColor: Colors.green,
        icon: const Icon(Icons.add, color: Colors.white),
        label: const Text('Nouvelle', style: TextStyle(color: Colors.white)),
      ),
    );
  }

  double get _totalSuperficie =>
      _parcelles.fold(0.0, (sum, p) => sum + p.superficie);

  int get _healthyCount =>
      _parcelles.where((p) => p.status == 'healthy').length;

  Widget _buildStat(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.green,
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

  Widget _buildParcelleCard(Parcelle parcelle) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        onTap: () => context.push('/parcelles/${parcelle.id}'),
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
                          color: Colors.green.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Icon(
                          _getCultureIcon(parcelle.culture),
                          color: Colors.green,
                          size: 24,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            parcelle.nom,
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 16,
                            ),
                          ),
                          Text(
                            '${parcelle.culture} • ${parcelle.superficie} ha',
                            style: TextStyle(
                              color: Colors.grey.shade600,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  _buildStatusBadge(parcelle.status),
                ],
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildMetric(
                    Icons.water_drop,
                    '${parcelle.humidite}%',
                    'Humidité',
                    Colors.blue,
                  ),
                  _buildMetric(
                    Icons.thermostat,
                    '${parcelle.temperature}°C',
                    'Température',
                    Colors.orange,
                  ),
                  _buildMetric(
                    Icons.terrain,
                    parcelle.typeSol,
                    'Type sol',
                    Colors.brown,
                  ),
                ],
              ),
              const Divider(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Dernière mise à jour: ${_formatTime(parcelle.lastUpdate)}',
                    style: TextStyle(
                      fontSize: 11,
                      color: Colors.grey.shade500,
                    ),
                  ),
                  Row(
                    children: [
                      TextButton.icon(
                        onPressed: () => context.push('/capteurs'),
                        icon: const Icon(Icons.sensors, size: 16),
                        label: const Text('Capteurs'),
                        style: TextButton.styleFrom(
                          foregroundColor: Colors.blue,
                        ),
                      ),
                      TextButton.icon(
                        onPressed: () => context.push('/diagnostic'),
                        icon: const Icon(Icons.camera_alt, size: 16),
                        label: const Text('Scanner'),
                        style: TextButton.styleFrom(
                          foregroundColor: Colors.purple,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStatusBadge(String status) {
    Color color;
    String label;
    switch (status) {
      case 'healthy':
        color = Colors.green;
        label = 'Bon';
        break;
      case 'warning':
        color = Colors.orange;
        label = 'Attention';
        break;
      case 'critical':
        color = Colors.red;
        label = 'Critique';
        break;
      default:
        color = Colors.grey;
        label = 'Inconnu';
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 8,
            height: 8,
            decoration: BoxDecoration(
              color: color,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            label,
            style: TextStyle(
              color: color,
              fontWeight: FontWeight.w500,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMetric(IconData icon, String value, String label, Color color) {
    return Column(
      children: [
        Icon(icon, color: color, size: 20),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(fontWeight: FontWeight.bold),
        ),
        Text(
          label,
          style: TextStyle(fontSize: 10, color: Colors.grey.shade600),
        ),
      ],
    );
  }

  IconData _getCultureIcon(String culture) {
    switch (culture.toLowerCase()) {
      case 'maïs':
        return Icons.grass;
      case 'riz':
        return Icons.rice_bowl;
      case 'tomate':
        return Icons.local_florist;
      case 'manioc':
        return Icons.nature;
      default:
        return Icons.eco;
    }
  }

  String _formatTime(DateTime time) {
    final diff = DateTime.now().difference(time);
    if (diff.inMinutes < 60) {
      return 'Il y a ${diff.inMinutes} min';
    } else if (diff.inHours < 24) {
      return 'Il y a ${diff.inHours}h';
    } else {
      return 'Il y a ${diff.inDays} jour(s)';
    }
  }

  void _showAddParcelleDialog() {
    final nomController = TextEditingController();
    final superficieController = TextEditingController();
    String selectedCulture = 'Maïs';
    String selectedTypeSol = 'Argileux';

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Padding(
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
          left: 24,
          right: 24,
          top: 24,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                decoration: BoxDecoration(
                  color: Colors.grey.shade300,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'Nouvelle Parcelle',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            TextField(
              controller: nomController,
              decoration: InputDecoration(
                labelText: 'Nom de la parcelle',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                prefixIcon: const Icon(Icons.landscape),
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: superficieController,
              keyboardType: TextInputType.number,
              decoration: InputDecoration(
                labelText: 'Superficie (hectares)',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                prefixIcon: const Icon(Icons.square_foot),
              ),
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: selectedCulture,
              decoration: InputDecoration(
                labelText: 'Culture',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                prefixIcon: const Icon(Icons.eco),
              ),
              items: ['Maïs', 'Riz', 'Tomate', 'Manioc', 'Arachide']
                  .map((c) => DropdownMenuItem(value: c, child: Text(c)))
                  .toList(),
              onChanged: (value) => selectedCulture = value!,
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: selectedTypeSol,
              decoration: InputDecoration(
                labelText: 'Type de sol',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                prefixIcon: const Icon(Icons.terrain),
              ),
              items: ['Argileux', 'Sablonneux', 'Limono-argileux']
                  .map((s) => DropdownMenuItem(value: s, child: Text(s)))
                  .toList(),
              onChanged: (value) => selectedTypeSol = value!,
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () {
                  // TODO: Sauvegarder la parcelle
                  Navigator.pop(context);
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Parcelle créée avec succès'),
                      backgroundColor: Colors.green,
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: const Text('Créer la parcelle'),
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}

class Parcelle {
  final String id;
  final String nom;
  final double superficie;
  final String culture;
  final String typeSol;
  final String status;
  final int humidite;
  final int temperature;
  final DateTime lastUpdate;

  Parcelle({
    required this.id,
    required this.nom,
    required this.superficie,
    required this.culture,
    required this.typeSol,
    required this.status,
    required this.humidite,
    required this.temperature,
    required this.lastUpdate,
  });
}
