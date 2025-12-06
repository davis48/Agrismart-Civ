import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('Mon Profil'),
        backgroundColor: Colors.green,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () => context.push('/settings'),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // Header profil
            Container(
              padding: const EdgeInsets.all(24),
              color: Colors.white,
              child: Column(
                children: [
                  Stack(
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
                        child: Container(
                          padding: const EdgeInsets.all(4),
                          decoration: const BoxDecoration(
                            color: Colors.green,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.camera_alt,
                            size: 16,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Kouassi Jean',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '+225 07 12 34 56 78',
                    style: TextStyle(
                      color: Colors.grey.shade600,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.green.shade100,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Text(
                      'Producteur vérifié ✓',
                      style: TextStyle(
                        color: Colors.green,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),

            // Stats
            Container(
              padding: const EdgeInsets.all(16),
              color: Colors.white,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _buildStat('3', 'Parcelles'),
                  _buildStat('6.5', 'Hectares'),
                  _buildStat('12', 'Capteurs'),
                ],
              ),
            ),
            const SizedBox(height: 8),

            // Menu
            Container(
              color: Colors.white,
              child: Column(
                children: [
                  _buildMenuItem(
                    context,
                    icon: Icons.person_outline,
                    title: 'Informations personnelles',
                    onTap: () {},
                  ),
                  _buildMenuItem(
                    context,
                    icon: Icons.landscape,
                    title: 'Mes parcelles',
                    onTap: () => context.push('/parcelles'),
                  ),
                  _buildMenuItem(
                    context,
                    icon: Icons.sensors,
                    title: 'Mes capteurs',
                    onTap: () => context.push('/capteurs'),
                  ),
                  _buildMenuItem(
                    context,
                    icon: Icons.analytics,
                    title: 'Mes statistiques',
                    onTap: () => context.push('/analytics'),
                  ),
                  _buildMenuItem(
                    context,
                    icon: Icons.history,
                    title: 'Historique diagnostics',
                    onTap: () {},
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),

            Container(
              color: Colors.white,
              child: Column(
                children: [
                  _buildMenuItem(
                    context,
                    icon: Icons.store,
                    title: 'Mes annonces',
                    onTap: () => context.push('/marketplace'),
                  ),
                  _buildMenuItem(
                    context,
                    icon: Icons.shopping_bag,
                    title: 'Mes commandes',
                    onTap: () {},
                  ),
                  _buildMenuItem(
                    context,
                    icon: Icons.school,
                    title: 'Mes formations',
                    onTap: () => context.push('/formations'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 8),

            Container(
              color: Colors.white,
              child: Column(
                children: [
                  _buildMenuItem(
                    context,
                    icon: Icons.help_outline,
                    title: 'Aide et support',
                    onTap: () {},
                  ),
                  _buildMenuItem(
                    context,
                    icon: Icons.info_outline,
                    title: 'À propos',
                    onTap: () {},
                  ),
                  _buildMenuItem(
                    context,
                    icon: Icons.logout,
                    title: 'Déconnexion',
                    color: Colors.red,
                    onTap: () => context.go('/onboarding'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _buildStat(String value, String label) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: Colors.green,
          ),
        ),
        Text(
          label,
          style: TextStyle(
            color: Colors.grey.shade600,
          ),
        ),
      ],
    );
  }

  Widget _buildMenuItem(
    BuildContext context, {
    required IconData icon,
    required String title,
    required VoidCallback onTap,
    Color? color,
  }) {
    return ListTile(
      leading: Icon(icon, color: color ?? Colors.grey.shade700),
      title: Text(
        title,
        style: TextStyle(color: color),
      ),
      trailing: const Icon(Icons.chevron_right),
      onTap: onTap,
    );
  }
}
