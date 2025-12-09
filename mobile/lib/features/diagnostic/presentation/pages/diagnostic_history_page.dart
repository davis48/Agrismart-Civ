import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class DiagnosticHistoryPage extends StatelessWidget {
  const DiagnosticHistoryPage({super.key});

  @override
  Widget build(BuildContext context) {
    // Données simulées
    final List<Map<String, dynamic>> history = [
      {
        'id': '1',
        'disease': 'Mildiou',
        'crop': 'Tomate',
        'confidence': '98',
        'date': '08/12/2024',
        'severity': 'critical',
        'location': 'Parcelle Nord',
        'image': 'assets/images/leaf_disease_1.jpg',
      },
      {
        'id': '2',
        'disease': 'Oïdium',
        'crop': 'Concombre',
        'confidence': '85',
        'date': '05/12/2024',
        'severity': 'warning',
        'location': 'Serre B',
        'image': 'assets/images/leaf_disease_2.jpg',
      },
      {
        'id': '3',
        'disease': 'Sain',
        'crop': 'Maïs',
        'confidence': '99',
        'date': '01/12/2024',
        'severity': 'healthy',
        'location': 'Parcelle Sud',
        'image': 'assets/images/corn_healthy.jpg',
      },
    ];

    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('Historique diagnostics'),
        backgroundColor: Colors.purple,
        foregroundColor: Colors.white,
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: history.length,
        itemBuilder: (context, index) {
          return _buildHistoryCard(context, history[index]);
        },
      ),
    );
  }

  Widget _buildHistoryCard(BuildContext context, Map<String, dynamic> item) {
    Color statusColor;
    String statusText;

    switch (item['severity']) {
      case 'critical':
        statusColor = Colors.red;
        statusText = 'Critique';
        break;
      case 'warning':
        statusColor = Colors.orange;
        statusText = 'Attention';
        break;
      default:
        statusColor = Colors.green;
        statusText = 'Sain';
    }

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () => context.pushNamed('diagnostic-detail', extra: item),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.purple.shade50,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      item['crop'],
                      style: TextStyle(
                        color: Colors.purple.shade700,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ),
                  Text(
                    item['date'],
                    style: TextStyle(
                      color: Colors.grey.shade500,
                      fontSize: 12,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Container(
                    width: 60,
                    height: 60,
                    decoration: BoxDecoration(
                      color: Colors.grey.shade200,
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Icon(Icons.image, color: Colors.grey),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          item['disease'],
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            Container(
                              width: 8,
                              height: 8,
                              decoration: BoxDecoration(
                                color: statusColor,
                                shape: BoxShape.circle,
                              ),
                            ),
                            const SizedBox(width: 6),
                            Text(
                              '$statusText (${item['confidence']}%)',
                              style: TextStyle(
                                color: statusColor,
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const Icon(Icons.chevron_right, color: Colors.grey),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
