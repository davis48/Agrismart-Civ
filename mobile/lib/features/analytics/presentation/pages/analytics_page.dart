import 'package:flutter/material.dart';

class AnalyticsPage extends StatefulWidget {
  const AnalyticsPage({super.key});

  @override
  State<AnalyticsPage> createState() => _AnalyticsPageState();
}

class _AnalyticsPageState extends State<AnalyticsPage> {
  String _selectedPeriod = 'Cette saison';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('Analytics'),
        backgroundColor: Colors.indigo,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.file_download),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Export Excel en cours...')),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Période
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
              ),
              child: DropdownButtonHideUnderline(
                child: DropdownButton<String>(
                  value: _selectedPeriod,
                  isExpanded: true,
                  items: ['Cette saison', 'Saison précédente', '12 derniers mois', 'Tout']
                      .map((p) => DropdownMenuItem(value: p, child: Text(p)))
                      .toList(),
                  onChanged: (v) => setState(() => _selectedPeriod = v!),
                ),
              ),
            ),
            const SizedBox(height: 16),
            
            // ROI Card
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.indigo.shade400, Colors.indigo.shade700],
                ),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text(
                        'Retour sur Investissement',
                        style: TextStyle(color: Colors.white70),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.green.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Row(
                          children: [
                            Icon(Icons.trending_up, color: Colors.greenAccent, size: 16),
                            SizedBox(width: 4),
                            Text('+23%', style: TextStyle(color: Colors.greenAccent)),
                          ],
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    '285%',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 42,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const Text(
                    'ROI cette saison',
                    style: TextStyle(color: Colors.white70),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            
            // Stats Grid
            Row(
              children: [
                Expanded(child: _buildStatCard(
                  title: 'Rendement',
                  value: '+32%',
                  subtitle: 'vs tradition',
                  icon: Icons.trending_up,
                  color: Colors.green,
                )),
                const SizedBox(width: 12),
                Expanded(child: _buildStatCard(
                  title: 'Eau économisée',
                  value: '-28%',
                  subtitle: 'vs tradition',
                  icon: Icons.water_drop,
                  color: Colors.blue,
                )),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(child: _buildStatCard(
                  title: 'Engrais',
                  value: '-22%',
                  subtitle: 'réduction',
                  icon: Icons.science,
                  color: Colors.orange,
                )),
                const SizedBox(width: 12),
                Expanded(child: _buildStatCard(
                  title: 'Pertes maladies',
                  value: '-45%',
                  subtitle: 'réduction',
                  icon: Icons.bug_report,
                  color: Colors.red,
                )),
              ],
            ),
            const SizedBox(height: 24),
            
            // Rendements par culture
            const Text(
              'Rendements par Culture',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            _buildYieldCard('Maïs', 4.2, 2.8, Colors.amber),
            _buildYieldCard('Riz', 3.8, 2.5, Colors.green),
            _buildYieldCard('Tomate', 25.0, 18.0, Colors.red),
            const SizedBox(height: 24),
            
            // Économies détaillées
            const Text(
              'Économies Générées',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                children: [
                  _buildSavingsRow('Eau d\'irrigation', '1,250,000', 'FCFA'),
                  const Divider(),
                  _buildSavingsRow('Engrais', '850,000', 'FCFA'),
                  const Divider(),
                  _buildSavingsRow('Pertes évitées', '2,100,000', 'FCFA'),
                  const Divider(thickness: 2),
                  _buildSavingsRow('TOTAL ÉCONOMISÉ', '4,200,000', 'FCFA', isTotal: true),
                ],
              ),
            ),
            const SizedBox(height: 24),
            
            // Comparaison parcelles
            const Text(
              'Performance par Parcelle',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                children: [
                  _buildParcellePerformance('Maïs Nord', 92, true),
                  const SizedBox(height: 12),
                  _buildParcellePerformance('Tomates Est', 78, false),
                  const SizedBox(height: 12),
                  _buildParcellePerformance('Riz Sud', 85, true),
                ],
              ),
            ),
            const SizedBox(height: 100),
          ],
        ),
      ),
    );
  }

  Widget _buildStatCard({
    required String title,
    required String value,
    required String subtitle,
    required IconData icon,
    required Color color,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color),
          const SizedBox(height: 12),
          Text(
            value,
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: color,
            ),
          ),
          Text(title, style: const TextStyle(fontWeight: FontWeight.w500)),
          Text(
            subtitle,
            style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
          ),
        ],
      ),
    );
  }

  Widget _buildYieldCard(String culture, double actual, double traditional, Color color) {
    final improvement = ((actual - traditional) / traditional * 100).round();
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: color.withOpacity(0.1),
              borderRadius: BorderRadius.circular(8),
            ),
            child: Icon(Icons.grass, color: color),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(culture, style: const TextStyle(fontWeight: FontWeight.bold)),
                Text(
                  '${actual.toStringAsFixed(1)} t/ha vs ${traditional.toStringAsFixed(1)} t/ha (trad.)',
                  style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.green.shade100,
              borderRadius: BorderRadius.circular(8),
            ),
            child: Text(
              '+$improvement%',
              style: TextStyle(
                color: Colors.green.shade700,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSavingsRow(String label, String value, String unit, {bool isTotal = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              fontWeight: isTotal ? FontWeight.bold : FontWeight.normal,
            ),
          ),
          Text(
            '$value $unit',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: isTotal ? Colors.green : null,
              fontSize: isTotal ? 18 : 14,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildParcellePerformance(String name, int score, bool aboveAverage) {
    return Row(
      children: [
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(name, style: const TextStyle(fontWeight: FontWeight.w500)),
              const SizedBox(height: 6),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: score / 100,
                  backgroundColor: Colors.grey.shade200,
                  valueColor: AlwaysStoppedAnimation<Color>(
                    score >= 80 ? Colors.green : Colors.orange,
                  ),
                  minHeight: 8,
                ),
              ),
            ],
          ),
        ),
        const SizedBox(width: 12),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(
            color: (aboveAverage ? Colors.green : Colors.orange).withOpacity(0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            children: [
              Icon(
                aboveAverage ? Icons.arrow_upward : Icons.arrow_downward,
                size: 14,
                color: aboveAverage ? Colors.green : Colors.orange,
              ),
              Text(
                '$score%',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: aboveAverage ? Colors.green : Colors.orange,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
