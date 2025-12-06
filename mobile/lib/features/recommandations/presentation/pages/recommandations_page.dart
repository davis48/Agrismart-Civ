import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class RecommandationsPage extends StatelessWidget {
  const RecommandationsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Recommandation> recommandations = [
      Recommandation(
        id: '1',
        titre: 'Irrigation recommandée',
        description: 'Le sol de la parcelle Maïs Nord est sec. Nous recommandons une irrigation de 25mm.',
        type: RecommandationType.irrigation,
        priorite: 'haute',
        parcelle: 'Maïs Nord',
        dateCreation: DateTime.now().subtract(const Duration(hours: 2)),
        details: {
          'Quantité': '25 litres/m²',
          'Durée': '2 heures',
          'Meilleur moment': 'Tôt le matin (6h-8h)',
        },
      ),
      Recommandation(
        id: '2',
        titre: 'Fertilisation azotée',
        description: 'Les niveaux d\'azote sont faibles. Appliquez un engrais azoté pour optimiser la croissance.',
        type: RecommandationType.fertilisation,
        priorite: 'moyenne',
        parcelle: 'Riz Sud',
        dateCreation: DateTime.now().subtract(const Duration(days: 1)),
        details: {
          'Type d\'engrais': 'Urée ou NPK',
          'Dosage': '100 kg/ha',
          'Application': 'En bandes le long des rangées',
        },
      ),
      Recommandation(
        id: '3',
        titre: 'Culture adaptée au sol',
        description: 'Votre sol argileux est idéal pour le riz. Considérez d\'augmenter la surface cultivée.',
        type: RecommandationType.culture,
        priorite: 'basse',
        parcelle: 'Parcelle Ouest',
        dateCreation: DateTime.now().subtract(const Duration(days: 3)),
        details: {
          'Culture recommandée': 'Riz paddy',
          'Rendement estimé': '4 t/ha',
          'Période de plantation': 'Avril-Mai',
        },
      ),
      Recommandation(
        id: '4',
        titre: 'Traitement préventif',
        description: 'Les conditions météo favorisent l\'apparition du mildiou. Traitement préventif conseillé.',
        type: RecommandationType.phytosanitaire,
        priorite: 'haute',
        parcelle: 'Tomates Est',
        dateCreation: DateTime.now().subtract(const Duration(hours: 6)),
        details: {
          'Produit': 'Bouillie bordelaise',
          'Dosage': '20g/litre',
          'Fréquence': 'Tous les 10 jours',
        },
      ),
    ];

    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('Recommandations IA'),
        backgroundColor: Colors.amber.shade700,
        foregroundColor: Colors.white,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: recommandations.length,
        itemBuilder: (context, index) {
          final rec = recommandations[index];
          return _buildRecommandationCard(context, rec);
        },
      ),
    );
  }

  Widget _buildRecommandationCard(BuildContext context, Recommandation rec) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: _getTypeColor(rec.type).withOpacity(0.1),
              borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
            ),
            child: Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: _getTypeColor(rec.type).withOpacity(0.2),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    _getTypeIcon(rec.type),
                    color: _getTypeColor(rec.type),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Expanded(
                            child: Text(
                              rec.titre,
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                          ),
                          _buildPriorityBadge(rec.priorite),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(
                        rec.parcelle,
                        style: TextStyle(
                          color: Colors.grey.shade600,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          
          // Content
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(rec.description),
                const SizedBox(height: 16),
                
                // Détails
                ...rec.details.entries.map((e) => Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(
                        width: 120,
                        child: Text(
                          '${e.key}:',
                          style: TextStyle(
                            color: Colors.grey.shade600,
                            fontSize: 13,
                          ),
                        ),
                      ),
                      Expanded(
                        child: Text(
                          e.value,
                          style: const TextStyle(
                            fontWeight: FontWeight.w500,
                            fontSize: 13,
                          ),
                        ),
                      ),
                    ],
                  ),
                )),
                
                const SizedBox(height: 12),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      _formatTime(rec.dateCreation),
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey.shade500,
                      ),
                    ),
                    Row(
                      children: [
                        OutlinedButton.icon(
                          onPressed: () {},
                          icon: const Icon(Icons.thumb_down, size: 16),
                          label: const Text('Pas utile'),
                          style: OutlinedButton.styleFrom(
                            foregroundColor: Colors.grey,
                            side: BorderSide(color: Colors.grey.shade300),
                          ),
                        ),
                        const SizedBox(width: 8),
                        ElevatedButton.icon(
                          onPressed: () {
                            ScaffoldMessenger.of(context).showSnackBar(
                              SnackBar(
                                content: Text('Recommandation "${rec.titre}" appliquée'),
                                backgroundColor: Colors.green,
                              ),
                            );
                          },
                          icon: const Icon(Icons.check, size: 16),
                          label: const Text('Appliquer'),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: _getTypeColor(rec.type),
                            foregroundColor: Colors.white,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPriorityBadge(String priorite) {
    Color color;
    switch (priorite) {
      case 'haute':
        color = Colors.red;
        break;
      case 'moyenne':
        color = Colors.orange;
        break;
      default:
        color = Colors.green;
    }
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(
        priorite.toUpperCase(),
        style: TextStyle(
          color: color,
          fontSize: 10,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }

  Color _getTypeColor(RecommandationType type) {
    switch (type) {
      case RecommandationType.irrigation:
        return Colors.blue;
      case RecommandationType.fertilisation:
        return Colors.green;
      case RecommandationType.culture:
        return Colors.purple;
      case RecommandationType.phytosanitaire:
        return Colors.orange;
    }
  }

  IconData _getTypeIcon(RecommandationType type) {
    switch (type) {
      case RecommandationType.irrigation:
        return Icons.water_drop;
      case RecommandationType.fertilisation:
        return Icons.eco;
      case RecommandationType.culture:
        return Icons.grass;
      case RecommandationType.phytosanitaire:
        return Icons.bug_report;
    }
  }

  String _formatTime(DateTime time) {
    final diff = DateTime.now().difference(time);
    if (diff.inHours < 24) {
      return 'Il y a ${diff.inHours}h';
    } else {
      return 'Il y a ${diff.inDays} jour(s)';
    }
  }
}

enum RecommandationType { irrigation, fertilisation, culture, phytosanitaire }

class Recommandation {
  final String id;
  final String titre;
  final String description;
  final RecommandationType type;
  final String priorite;
  final String parcelle;
  final DateTime dateCreation;
  final Map<String, String> details;

  Recommandation({
    required this.id,
    required this.titre,
    required this.description,
    required this.type,
    required this.priorite,
    required this.parcelle,
    required this.dateCreation,
    required this.details,
  });
}
