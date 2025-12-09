import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class OrdersPage extends StatelessWidget {
  const OrdersPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('Mes Commandes'),
        backgroundColor: Colors.orange,
        foregroundColor: Colors.white,
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildOrderCard(
            context,
            orderId: 'CMD-20241209-001',
            vendeur: 'Banou Agrochimie',
            produit: 'Engrais NPK 15-15-15',
            quantite: '50 kg',
            prix: '45,000 FCFA',
            statut: 'En attente',
            statutColor: Colors.orange,
            date: '09/12/2024',
          ),
          _buildOrderCard(
            context,
            orderId: 'CMD-20241205-045',
            vendeur: 'Semences Yvoire',
            produit: 'Semences de Maïs',
            quantite: '10 kg',
            prix: '25,000 FCFA',
            statut: 'Livrée',
            statutColor: Colors.green,
            date: '05/12/2024',
          ),
          _buildOrderCard(
            context,
            orderId: 'CMD-20241201-028',
            vendeur: 'AgroPlus CI',
            produit: 'Pulvérisateur 16L',
            quantite: '1 unité',
            prix: '75,000 FCFA',
            statut: 'Livrée',
            statutColor: Colors.green,
            date: '01/12/2024',
          ),
        ],
      ),
    );
  }

  Widget _buildOrderCard(
    BuildContext context, {
    required String orderId,
    required String vendeur,
    required String produit,
    required String quantite,
    required String prix,
    required String statut,
    required Color statutColor,
    required String date,
  }) {
    return Card(
      margin: const EdgeInsets.only(bottom: 16),
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: () {
          final order = {
            'orderId': orderId,
            'vendeur': vendeur,
            'produit': produit,
            'quantite': quantite,
            'prix': prix,
            'statut': statut,
            // 'statutColor': statutColor, // On ne passe pas la couleur (objet complexe), on la déduira ou on passera le code
            'date': date,
          };
          // On reconstruit la couleur de l'autre côté ou on s'en fiche pour le détail
          // Pour faire simple, passons tout ce qui est string
          context.pushNamed('order-detail', extra: order);
        },
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    orderId,
                    style: const TextStyle(
                      fontSize: 12,
                      color: Colors.grey,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                    decoration: BoxDecoration(
                      color: statutColor.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      statut,
                      style: TextStyle(
                        color: statutColor,
                        fontWeight: FontWeight.w500,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Text(
                produit,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.store, size: 16, color: Colors.grey),
                  const SizedBox(width: 4),
                  Text(
                    vendeur,
                    style: TextStyle(color: Colors.grey.shade700),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Quantité: $quantite',
                    style: TextStyle(color: Colors.grey.shade600),
                  ),
                  Text(
                    prix,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: Colors.green,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                'Date: $date',
                style: TextStyle(color: Colors.grey.shade500, fontSize: 12),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
