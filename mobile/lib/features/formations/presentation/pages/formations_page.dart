import 'package:flutter/material.dart';

class FormationsPage extends StatefulWidget {
  const FormationsPage({super.key});

  @override
  State<FormationsPage> createState() => _FormationsPageState();
}

class _FormationsPageState extends State<FormationsPage> {
  String _selectedCategory = 'Toutes';

  final List<Formation> _formations = [
    Formation(
      id: '1',
      titre: 'Introduction à l\'agriculture connectée',
      description: 'Découvrez comment les capteurs IoT peuvent révolutionner votre exploitation',
      duree: '45 min',
      niveau: 'Débutant',
      categorie: 'IoT',
      imageUrl: null,
      modules: 5,
      progression: 0,
      isNew: true,
    ),
    Formation(
      id: '2',
      titre: 'Optimiser l\'irrigation avec les données',
      description: 'Apprenez à lire et interpréter les données d\'humidité du sol',
      duree: '1h 30',
      niveau: 'Intermédiaire',
      categorie: 'Irrigation',
      imageUrl: null,
      modules: 8,
      progression: 60,
      isNew: false,
    ),
    Formation(
      id: '3',
      titre: 'Détecter les maladies des tomates',
      description: 'Identifier visuellement les principales maladies affectant les tomates',
      duree: '2h',
      niveau: 'Intermédiaire',
      categorie: 'Maladies',
      imageUrl: null,
      modules: 10,
      progression: 0,
      isNew: false,
    ),
    Formation(
      id: '4',
      titre: 'Fertilisation raisonnée',
      description: 'Comprendre les besoins en nutriments de vos cultures',
      duree: '1h',
      niveau: 'Débutant',
      categorie: 'Sol',
      imageUrl: null,
      modules: 6,
      progression: 100,
      isNew: false,
    ),
    Formation(
      id: '5',
      titre: 'Cultiver le maïs en Côte d\'Ivoire',
      description: 'Guide complet de la culture du maïs adapté au climat ivoirien',
      duree: '3h',
      niveau: 'Tous niveaux',
      categorie: 'Cultures',
      imageUrl: null,
      modules: 15,
      progression: 25,
      isNew: true,
    ),
  ];

  final List<String> _categories = ['Toutes', 'IoT', 'Irrigation', 'Maladies', 'Sol', 'Cultures'];

  @override
  Widget build(BuildContext context) {
    final filtered = _selectedCategory == 'Toutes'
        ? _formations
        : _formations.where((f) => f.categorie == _selectedCategory).toList();

    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('Formations'),
        backgroundColor: Colors.teal,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.bookmark_border),
            onPressed: () {
              // TODO: Formations sauvegardées
            },
          ),
        ],
      ),
      body: Column(
        children: [
          // Stats progression
          Container(
            padding: const EdgeInsets.all(16),
            color: Colors.white,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStat('5', 'Formations', Icons.school),
                _buildStat('1', 'Terminée', Icons.check_circle),
                _buildStat('3', 'En cours', Icons.play_circle),
              ],
            ),
          ),

          // Catégories
          Container(
            height: 50,
            color: Colors.white,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              itemCount: _categories.length,
              itemBuilder: (context, index) {
                final cat = _categories[index];
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
                  child: ChoiceChip(
                    label: Text(cat),
                    selected: _selectedCategory == cat,
                    selectedColor: Colors.teal.shade100,
                    onSelected: (sel) => setState(() => _selectedCategory = cat),
                  ),
                );
              },
            ),
          ),

          // Liste des formations
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: filtered.length,
              itemBuilder: (context, index) => _buildFormationCard(filtered[index]),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStat(String value, String label, IconData icon) {
    return Column(
      children: [
        Icon(icon, color: Colors.teal, size: 24),
        const SizedBox(height: 4),
        Text(
          value,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        Text(
          label,
          style: TextStyle(fontSize: 12, color: Colors.grey.shade600),
        ),
      ],
    );
  }

  Widget _buildFormationCard(Formation formation) {
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: InkWell(
        onTap: () => _showFormationDetail(formation),
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      color: Colors.teal.shade50,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(
                      _getCategoryIcon(formation.categorie),
                      size: 36,
                      color: Colors.teal,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            if (formation.isNew)
                              Container(
                                margin: const EdgeInsets.only(right: 8),
                                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                decoration: BoxDecoration(
                                  color: Colors.green,
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: const Text(
                                  'NOUVEAU',
                                  style: TextStyle(color: Colors.white, fontSize: 10),
                                ),
                              ),
                            if (formation.progression == 100)
                              const Icon(Icons.verified, color: Colors.green, size: 16),
                          ],
                        ),
                        Text(
                          formation.titre,
                          style: const TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 15,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          formation.description,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: TextStyle(
                            fontSize: 12,
                            color: Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  _buildChip(Icons.access_time, formation.duree),
                  const SizedBox(width: 8),
                  _buildChip(Icons.signal_cellular_alt, formation.niveau),
                  const SizedBox(width: 8),
                  _buildChip(Icons.play_lesson, '${formation.modules} modules'),
                ],
              ),
              if (formation.progression > 0) ...[
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(4),
                        child: LinearProgressIndicator(
                          value: formation.progression / 100,
                          backgroundColor: Colors.grey.shade200,
                          valueColor: AlwaysStoppedAnimation<Color>(
                            formation.progression == 100 ? Colors.green : Colors.teal,
                          ),
                          minHeight: 6,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      '${formation.progression}%',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: formation.progression == 100 ? Colors.green : Colors.teal,
                      ),
                    ),
                  ],
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildChip(IconData icon, String label) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.grey.shade100,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 14, color: Colors.grey.shade600),
          const SizedBox(width: 4),
          Text(
            label,
            style: TextStyle(fontSize: 11, color: Colors.grey.shade700),
          ),
        ],
      ),
    );
  }

  void _showFormationDetail(Formation formation) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.8,
        minChildSize: 0.5,
        maxChildSize: 0.95,
        expand: false,
        builder: (context, scrollController) => SingleChildScrollView(
          controller: scrollController,
          padding: const EdgeInsets.all(24),
          child: Column(
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

              // Header
              Container(
                height: 150,
                width: double.infinity,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Colors.teal.shade400, Colors.teal.shade700],
                  ),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      _getCategoryIcon(formation.categorie),
                      size: 48,
                      color: Colors.white,
                    ),
                    const SizedBox(height: 8),
                    Text(
                      formation.categorie,
                      style: const TextStyle(color: Colors.white70),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              Text(
                formation.titre,
                style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 8),
              Text(formation.description),
              const SizedBox(height: 16),

              // Infos
              Row(
                children: [
                  _buildInfoItem(Icons.access_time, formation.duree),
                  _buildInfoItem(Icons.signal_cellular_alt, formation.niveau),
                  _buildInfoItem(Icons.play_lesson, '${formation.modules} modules'),
                ],
              ),
              const SizedBox(height: 24),

              // Modules
              const Text(
                'Contenu de la formation',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
              ),
              const SizedBox(height: 12),
              ...List.generate(formation.modules, (i) {
                final completed = formation.progression > (i + 1) / formation.modules * 100;
                return ListTile(
                  contentPadding: EdgeInsets.zero,
                  leading: CircleAvatar(
                    backgroundColor: completed ? Colors.green : Colors.grey.shade200,
                    radius: 16,
                    child: completed
                        ? const Icon(Icons.check, size: 16, color: Colors.white)
                        : Text('${i + 1}', style: const TextStyle(fontSize: 12)),
                  ),
                  title: Text('Module ${i + 1}'),
                  subtitle: Text(
                    completed ? 'Terminé' : 'Non démarré',
                    style: TextStyle(
                      color: completed ? Colors.green : Colors.grey,
                      fontSize: 12,
                    ),
                  ),
                  trailing: Icon(
                    completed ? Icons.play_circle : Icons.lock,
                    color: completed ? Colors.teal : Colors.grey,
                  ),
                );
              }),
              const SizedBox(height: 24),

              // Bouton
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () {
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Formation démarrée !'),
                        backgroundColor: Colors.teal,
                      ),
                    );
                  },
                  icon: Icon(formation.progression == 0 ? Icons.play_arrow : Icons.play_circle),
                  label: Text(formation.progression == 0 ? 'Commencer' : 'Continuer'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.teal,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoItem(IconData icon, String text) {
    return Expanded(
      child: Row(
        children: [
          Icon(icon, size: 16, color: Colors.grey),
          const SizedBox(width: 4),
          Text(text, style: TextStyle(color: Colors.grey.shade700, fontSize: 12)),
        ],
      ),
    );
  }

  IconData _getCategoryIcon(String category) {
    switch (category) {
      case 'IoT':
        return Icons.sensors;
      case 'Irrigation':
        return Icons.water_drop;
      case 'Maladies':
        return Icons.bug_report;
      case 'Sol':
        return Icons.terrain;
      case 'Cultures':
        return Icons.grass;
      default:
        return Icons.school;
    }
  }
}

class Formation {
  final String id;
  final String titre;
  final String description;
  final String duree;
  final String niveau;
  final String categorie;
  final String? imageUrl;
  final int modules;
  final int progression;
  final bool isNew;

  Formation({
    required this.id,
    required this.titre,
    required this.description,
    required this.duree,
    required this.niveau,
    required this.categorie,
    this.imageUrl,
    required this.modules,
    required this.progression,
    required this.isNew,
  });
}
