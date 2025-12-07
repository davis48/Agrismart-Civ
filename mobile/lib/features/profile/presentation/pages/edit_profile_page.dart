import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class EditProfilePage extends StatefulWidget {
  const EditProfilePage({super.key});

  @override
  State<EditProfilePage> createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  final _formKey = GlobalKey<FormState>();
  
  // Contrôleurs pour les champs
  final _nomController = TextEditingController(text: 'Kouassi');
  final _prenomsController = TextEditingController(text: 'Jean');
  final _telephoneController = TextEditingController(text: '0712345678');
  final _emailController = TextEditingController(text: 'kouassi.jean@email.com');
  final _adresseController = TextEditingController(text: 'Yamoussoukro, Côte d\'Ivoire');
  
  String _selectedRegion = 'Centre';
  String _selectedTypeProducteur = 'Producteur individuel';
  
  final List<String> _regions = [
    'Abidjan',
    'Centre',
    'Nord',
    'Sud',
    'Est',
    'Ouest',
  ];
  
  final List<String> _typesProducteur = [
    'Producteur individuel',
    'Coopérative',
    'Entreprise agricole',
    'Exploitant familial',
  ];

  @override
  void dispose() {
    _nomController.dispose();
    _prenomsController.dispose();
    _telephoneController.dispose();
    _emailController.dispose();
    _adresseController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('Informations personnelles'),
        backgroundColor: Colors.green,
        foregroundColor: Colors.white,
        actions: [
          TextButton(
            onPressed: _saveProfile,
            child: const Text(
              'Enregistrer',
              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Photo de profil
              Center(
                child: Stack(
                  children: [
                    CircleAvatar(
                      radius: 50,
                      backgroundColor: Colors.green.shade100,
                      child: Icon(
                        Icons.person,
                        size: 50,
                        color: Colors.green.shade700,
                      ),
                    ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: GestureDetector(
                        onTap: _changePhoto,
                        child: Container(
                          padding: const EdgeInsets.all(8),
                          decoration: const BoxDecoration(
                            color: Colors.green,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.camera_alt,
                            size: 20,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 8),
              Center(
                child: TextButton(
                  onPressed: _changePhoto,
                  child: const Text('Changer la photo'),
                ),
              ),
              const SizedBox(height: 24),
              
              // Section: Identité
              _buildSectionTitle('Identité'),
              const SizedBox(height: 12),
              
              _buildTextField(
                controller: _nomController,
                label: 'Nom',
                icon: Icons.person_outline,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Le nom est requis';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              
              _buildTextField(
                controller: _prenomsController,
                label: 'Prénoms',
                icon: Icons.person_outline,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Les prénoms sont requis';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              
              // Section: Contact
              _buildSectionTitle('Contact'),
              const SizedBox(height: 12),
              
              _buildTextField(
                controller: _telephoneController,
                label: 'Téléphone',
                icon: Icons.phone,
                keyboardType: TextInputType.phone,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Le téléphone est requis';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              
              _buildTextField(
                controller: _emailController,
                label: 'Email (optionnel)',
                icon: Icons.email,
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 16),
              
              _buildTextField(
                controller: _adresseController,
                label: 'Adresse',
                icon: Icons.location_on,
                maxLines: 2,
              ),
              const SizedBox(height: 24),
              
              // Section: Exploitation
              _buildSectionTitle('Exploitation'),
              const SizedBox(height: 12),
              
              // Région
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade300),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButtonFormField<String>(
                    value: _selectedRegion,
                    decoration: const InputDecoration(
                      border: InputBorder.none,
                      labelText: 'Région',
                      icon: Icon(Icons.map),
                    ),
                    items: _regions.map((r) => DropdownMenuItem(
                      value: r,
                      child: Text(r),
                    )).toList(),
                    onChanged: (value) {
                      setState(() => _selectedRegion = value!);
                    },
                  ),
                ),
              ),
              const SizedBox(height: 16),
              
              // Type de producteur
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: Colors.grey.shade300),
                ),
                child: DropdownButtonHideUnderline(
                  child: DropdownButtonFormField<String>(
                    value: _selectedTypeProducteur,
                    decoration: const InputDecoration(
                      border: InputBorder.none,
                      labelText: 'Type de producteur',
                      icon: Icon(Icons.agriculture),
                    ),
                    items: _typesProducteur.map((t) => DropdownMenuItem(
                      value: t,
                      child: Text(t),
                    )).toList(),
                    onChanged: (value) {
                      setState(() => _selectedTypeProducteur = value!);
                    },
                  ),
                ),
              ),
              const SizedBox(height: 32),
              
              // Bouton de sauvegarde
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _saveProfile,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: const Text(
                    'Enregistrer les modifications',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              
              // Bouton annuler
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: () => Navigator.pop(context),
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: const Text('Annuler'),
                ),
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.bold,
        color: Colors.grey.shade700,
      ),
    );
  }

  Widget _buildTextField({
    required TextEditingController controller,
    required String label,
    required IconData icon,
    TextInputType? keyboardType,
    String? Function(String?)? validator,
    int maxLines = 1,
  }) {
    return TextFormField(
      controller: controller,
      keyboardType: keyboardType,
      maxLines: maxLines,
      validator: validator,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon),
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: Colors.green, width: 2),
        ),
      ),
    );
  }

  void _changePhoto() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Padding(
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
            const Text(
              'Changer la photo de profil',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ListTile(
              leading: CircleAvatar(
                backgroundColor: Colors.green.shade100,
                child: const Icon(Icons.camera_alt, color: Colors.green),
              ),
              title: const Text('Prendre une photo'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Implémenter la prise de photo
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Ouverture de la caméra...')),
                );
              },
            ),
            ListTile(
              leading: CircleAvatar(
                backgroundColor: Colors.blue.shade100,
                child: const Icon(Icons.photo_library, color: Colors.blue),
              ),
              title: const Text('Choisir dans la galerie'),
              onTap: () {
                Navigator.pop(context);
                // TODO: Implémenter la sélection depuis galerie
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Ouverture de la galerie...')),
                );
              },
            ),
            ListTile(
              leading: CircleAvatar(
                backgroundColor: Colors.red.shade100,
                child: const Icon(Icons.delete, color: Colors.red),
              ),
              title: const Text('Supprimer la photo'),
              onTap: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text('Photo supprimée')),
                );
              },
            ),
          ],
        ),
      ),
    );
  }

  void _saveProfile() {
    if (_formKey.currentState!.validate()) {
      // TODO: Sauvegarder les données via l'API
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Profil mis à jour avec succès'),
          backgroundColor: Colors.green,
        ),
      );
      Navigator.pop(context);
    }
  }
}
