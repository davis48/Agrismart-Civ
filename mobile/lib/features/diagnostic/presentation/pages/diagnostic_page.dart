import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class DiagnosticPage extends StatefulWidget {
  const DiagnosticPage({super.key});

  @override
  State<DiagnosticPage> createState() => _DiagnosticPageState();
}

class _DiagnosticPageState extends State<DiagnosticPage> {
  final ImagePicker _picker = ImagePicker();
  XFile? _selectedImage;
  bool _isAnalyzing = false;
  DiagnosticResult? _result;

  // Historique des diagnostics
  final List<DiagnosticHistory> _history = [
    DiagnosticHistory(
      id: '1',
      maladie: 'Mildiou',
      culture: 'Tomate',
      date: DateTime.now().subtract(const Duration(days: 2)),
      confiance: 94,
      imagePath: null,
    ),
    DiagnosticHistory(
      id: '2',
      maladie: 'Carence en azote',
      culture: 'Maïs',
      date: DateTime.now().subtract(const Duration(days: 5)),
      confiance: 87,
      imagePath: null,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('Diagnostic IA'),
        backgroundColor: Colors.purple,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.history),
            onPressed: () => _showHistory(),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Zone de capture
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.05),
                    blurRadius: 10,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                children: [
                  if (_selectedImage == null) ...[
                    Container(
                      width: 100,
                      height: 100,
                      decoration: BoxDecoration(
                        color: Colors.purple.shade50,
                        shape: BoxShape.circle,
                      ),
                      child: Icon(
                        Icons.camera_alt,
                        size: 48,
                        color: Colors.purple.shade300,
                      ),
                    ),
                    const SizedBox(height: 16),
                    const Text(
                      'Scanner une plante',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Prenez une photo d\'une feuille ou plante pour détecter les maladies et carences',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.grey.shade600,
                      ),
                    ),
                    const SizedBox(height: 24),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        _buildActionButton(
                          icon: Icons.camera_alt,
                          label: 'Caméra',
                          color: Colors.purple,
                          onTap: () => _pickImage(ImageSource.camera),
                        ),
                        const SizedBox(width: 16),
                        _buildActionButton(
                          icon: Icons.photo_library,
                          label: 'Galerie',
                          color: Colors.blue,
                          onTap: () => _pickImage(ImageSource.gallery),
                        ),
                      ],
                    ),
                  ] else ...[
                    ClipRRect(
                      borderRadius: BorderRadius.circular(16),
                      child: Image.file(
                        File(_selectedImage!.path),
                        height: 200,
                        width: double.infinity,
                        fit: BoxFit.cover,
                      ),
                    ),
                    const SizedBox(height: 16),
                    if (_isAnalyzing)
                      Column(
                        children: [
                          const CircularProgressIndicator(color: Colors.purple),
                          const SizedBox(height: 16),
                          Text(
                            'Analyse en cours...',
                            style: TextStyle(color: Colors.grey.shade600),
                          ),
                        ],
                      )
                    else if (_result != null)
                      _buildResultCard(_result!)
                    else
                      Column(
                        children: [
                          ElevatedButton.icon(
                            onPressed: _analyzeImage,
                            icon: const Icon(Icons.search),
                            label: const Text('Analyser'),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.purple,
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(
                                horizontal: 32,
                                vertical: 12,
                              ),
                            ),
                          ),
                          const SizedBox(height: 8),
                          TextButton(
                            onPressed: _resetImage,
                            child: const Text('Choisir une autre image'),
                          ),
                        ],
                      ),
                  ],
                ],
              ),
            ),
            const SizedBox(height: 24),
            
            // Maladies détectables
            const Text(
              'Maladies Détectables',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 12),
            SizedBox(
              height: 120,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  _buildDiseaseCard('Mildiou', Icons.bug_report, Colors.red),
                  _buildDiseaseCard('Rouille', Icons.warning, Colors.orange),
                  _buildDiseaseCard('Oïdium', Icons.cloud, Colors.grey),
                  _buildDiseaseCard('Carence N', Icons.eco, Colors.green),
                  _buildDiseaseCard('Anthracnose', Icons.coronavirus, Colors.brown),
                ],
              ),
            ),
            const SizedBox(height: 24),
            
            // Conseils
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                borderRadius: BorderRadius.circular(12),
                border: Border.all(color: Colors.blue.shade200),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.lightbulb, color: Colors.blue.shade700),
                      const SizedBox(width: 8),
                      const Text(
                        'Conseils pour de meilleurs résultats',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  _buildTip('📷 Prenez la photo en lumière naturelle'),
                  _buildTip('🌿 Centrez la feuille ou partie malade'),
                  _buildTip('🔍 Assurez-vous que l\'image est nette'),
                  _buildTip('📐 Gardez une distance de 20-30 cm'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionButton({
    required IconData icon,
    required String label,
    required Color color,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withOpacity(0.3)),
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 32),
            const SizedBox(height: 8),
            Text(
              label,
              style: TextStyle(
                color: color,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildResultCard(DiagnosticResult result) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: result.isHealthy ? Colors.green.shade50 : Colors.red.shade50,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: result.isHealthy ? Colors.green.shade200 : Colors.red.shade200,
        ),
      ),
      child: Column(
        children: [
          Icon(
            result.isHealthy ? Icons.check_circle : Icons.warning,
            size: 48,
            color: result.isHealthy ? Colors.green : Colors.red,
          ),
          const SizedBox(height: 12),
          Text(
            result.maladie,
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: result.isHealthy ? Colors.green.shade700 : Colors.red.shade700,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Confiance: ${result.confiance}%',
            style: TextStyle(color: Colors.grey.shade600),
          ),
          const SizedBox(height: 16),
          Text(
            result.description,
            textAlign: TextAlign.center,
            style: TextStyle(color: Colors.grey.shade700),
          ),
          if (!result.isHealthy) ...[
            const SizedBox(height: 16),
            const Divider(),
            const SizedBox(height: 12),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Traitement recommandé:',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
            ),
            const SizedBox(height: 8),
            ...result.traitements.map((t) => Padding(
              padding: const EdgeInsets.only(bottom: 4),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Icon(Icons.check, size: 16, color: Colors.green),
                  const SizedBox(width: 8),
                  Expanded(child: Text(t)),
                ],
              ),
            )),
          ],
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              OutlinedButton(
                onPressed: _resetImage,
                child: const Text('Nouveau scan'),
              ),
              const SizedBox(width: 12),
              ElevatedButton(
                onPressed: () {
                  // TODO: Sauvegarder le diagnostic
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Diagnostic sauvegardé'),
                      backgroundColor: Colors.green,
                    ),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.purple,
                  foregroundColor: Colors.white,
                ),
                child: const Text('Sauvegarder'),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildDiseaseCard(String name, IconData icon, Color color) {
    return Container(
      width: 100,
      margin: const EdgeInsets.only(right: 12),
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05),
            blurRadius: 5,
          ),
        ],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: color, size: 32),
          const SizedBox(height: 8),
          Text(
            name,
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTip(String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Text(text, style: const TextStyle(fontSize: 13)),
    );
  }

  Future<void> _pickImage(ImageSource source) async {
    try {
      final XFile? image = await _picker.pickImage(
        source: source,
        maxWidth: 1024,
        maxHeight: 1024,
        imageQuality: 85,
      );
      if (image != null) {
        setState(() {
          _selectedImage = image;
          _result = null;
        });
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erreur: $e')),
      );
    }
  }

  Future<void> _analyzeImage() async {
    setState(() => _isAnalyzing = true);

    // Simulation d'analyse IA
    await Future.delayed(const Duration(seconds: 2));

    // Résultat simulé (en production, appeler l'API IA)
    setState(() {
      _isAnalyzing = false;
      _result = DiagnosticResult(
        maladie: 'Mildiou probable',
        confiance: 94,
        isHealthy: false,
        description: 'Des taches brunes et un flétrissement ont été détectés, caractéristiques du mildiou.',
        traitements: [
          'Appliquer un fongicide à base de cuivre',
          'Retirer les feuilles infectées',
          'Améliorer la circulation d\'air',
          'Réduire l\'arrosage par le haut',
        ],
      );
    });
  }

  void _resetImage() {
    setState(() {
      _selectedImage = null;
      _result = null;
    });
  }

  void _showHistory() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => DraggableScrollableSheet(
        initialChildSize: 0.6,
        minChildSize: 0.4,
        maxChildSize: 0.9,
        expand: false,
        builder: (context, scrollController) => Column(
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  Container(
                    width: 40,
                    height: 4,
                    decoration: BoxDecoration(
                      color: Colors.grey.shade300,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Historique des diagnostics',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            Expanded(
              child: ListView.builder(
                controller: scrollController,
                padding: const EdgeInsets.symmetric(horizontal: 16),
                itemCount: _history.length,
                itemBuilder: (context, index) {
                  final item = _history[index];
                  return Card(
                    margin: const EdgeInsets.only(bottom: 12),
                    child: ListTile(
                      leading: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: Colors.purple.shade50,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Icon(Icons.bug_report, color: Colors.purple.shade400),
                      ),
                      title: Text(item.maladie),
                      subtitle: Text('${item.culture} • ${item.confiance}% confiance'),
                      trailing: Text(
                        _formatDate(item.date),
                        style: TextStyle(color: Colors.grey.shade500, fontSize: 12),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _formatDate(DateTime date) {
    final diff = DateTime.now().difference(date);
    if (diff.inDays == 0) return 'Aujourd\'hui';
    if (diff.inDays == 1) return 'Hier';
    return 'Il y a ${diff.inDays} jours';
  }
}

class DiagnosticResult {
  final String maladie;
  final int confiance;
  final bool isHealthy;
  final String description;
  final List<String> traitements;

  DiagnosticResult({
    required this.maladie,
    required this.confiance,
    required this.isHealthy,
    required this.description,
    this.traitements = const [],
  });
}

class DiagnosticHistory {
  final String id;
  final String maladie;
  final String culture;
  final DateTime date;
  final int confiance;
  final String? imagePath;

  DiagnosticHistory({
    required this.id,
    required this.maladie,
    required this.culture,
    required this.date,
    required this.confiance,
    this.imagePath,
  });
}
