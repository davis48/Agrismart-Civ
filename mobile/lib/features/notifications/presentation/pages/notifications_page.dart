import 'package:flutter/material.dart';

class NotificationsPage extends StatefulWidget {
  const NotificationsPage({super.key});

  @override
  State<NotificationsPage> createState() => _NotificationsPageState();
}

class _NotificationsPageState extends State<NotificationsPage> {
  String _filter = 'Toutes';

  final List<NotificationItem> _notifications = [
    NotificationItem(
      id: '1',
      title: 'Stress hydrique détecté',
      message: 'La parcelle Maïs Nord nécessite une irrigation urgente. Humidité du sol à 28%.',
      level: NotificationLevel.critical,
      type: NotificationType.water,
      date: DateTime.now().subtract(const Duration(hours: 2)),
      isRead: false,
    ),
    NotificationItem(
      id: '2',
      title: 'Risque de maladie',
      message: 'Conditions favorables au mildiou détectées sur la parcelle Tomates Est.',
      level: NotificationLevel.warning,
      type: NotificationType.disease,
      date: DateTime.now().subtract(const Duration(hours: 5)),
      isRead: false,
    ),
    NotificationItem(
      id: '3',
      title: 'Température élevée',
      message: 'La température du sol a atteint 35°C sur Riz Sud. Risque de stress thermique.',
      level: NotificationLevel.warning,
      type: NotificationType.temperature,
      date: DateTime.now().subtract(const Duration(hours: 8)),
      isRead: true,
    ),
    NotificationItem(
      id: '4',
      title: 'Nouvelle formation disponible',
      message: 'Découvrez notre nouvelle formation sur l\'agriculture connectée.',
      level: NotificationLevel.info,
      type: NotificationType.general,
      date: DateTime.now().subtract(const Duration(days: 1)),
      isRead: true,
    ),
    NotificationItem(
      id: '5',
      title: 'Commande confirmée',
      message: 'Votre commande de semences de maïs a été confirmée par le vendeur.',
      level: NotificationLevel.info,
      type: NotificationType.order,
      date: DateTime.now().subtract(const Duration(days: 2)),
      isRead: true,
    ),
    NotificationItem(
      id: '6',
      title: 'Capteur hors ligne',
      message: 'Le capteur d\'humidité #3 sur Riz Sud ne répond plus depuis 6 heures.',
      level: NotificationLevel.warning,
      type: NotificationType.sensor,
      date: DateTime.now().subtract(const Duration(days: 3)),
      isRead: true,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final unreadCount = _notifications.where((n) => !n.isRead).length;
    final filtered = _filter == 'Toutes'
        ? _notifications
        : _filter == 'Critiques'
            ? _notifications.where((n) => n.level == NotificationLevel.critical).toList()
            : _filter == 'Alertes'
                ? _notifications.where((n) => n.level == NotificationLevel.warning).toList()
                : _notifications.where((n) => n.isRead == false).toList();

    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('Notifications'),
        backgroundColor: Colors.deepOrange,
        foregroundColor: Colors.white,
        actions: [
          if (unreadCount > 0)
            TextButton(
              onPressed: _markAllAsRead,
              child: const Text(
                'Tout lire',
                style: TextStyle(color: Colors.white),
              ),
            ),
        ],
      ),
      body: Column(
        children: [
          // Filtres
          Container(
            height: 50,
            color: Colors.white,
            child: ListView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              children: [
                _buildFilterChip('Toutes', _notifications.length),
                _buildFilterChip('Non lues', unreadCount),
                _buildFilterChip(
                  'Critiques',
                  _notifications.where((n) => n.level == NotificationLevel.critical).length,
                ),
                _buildFilterChip(
                  'Alertes',
                  _notifications.where((n) => n.level == NotificationLevel.warning).length,
                ),
              ],
            ),
          ),

          // Liste
          Expanded(
            child: filtered.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.notifications_off, size: 64, color: Colors.grey.shade400),
                        const SizedBox(height: 16),
                        Text(
                          'Aucune notification',
                          style: TextStyle(color: Colors.grey.shade600),
                        ),
                      ],
                    ),
                  )
                : ListView.builder(
                    itemCount: filtered.length,
                    itemBuilder: (context, index) => _buildNotificationTile(filtered[index]),
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChip(String label, int count) {
    final isSelected = _filter == label;
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 8),
      child: FilterChip(
        label: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(label),
            if (count > 0) ...[
              const SizedBox(width: 4),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(
                  color: isSelected ? Colors.white : Colors.grey.shade300,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '$count',
                  style: TextStyle(
                    fontSize: 10,
                    color: isSelected ? Colors.deepOrange : Colors.grey.shade700,
                  ),
                ),
              ),
            ],
          ],
        ),
        selected: isSelected,
        selectedColor: Colors.deepOrange.shade100,
        onSelected: (sel) => setState(() => _filter = label),
      ),
    );
  }

  Widget _buildNotificationTile(NotificationItem notification) {
    return Dismissible(
      key: Key(notification.id),
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 20),
        color: Colors.red,
        child: const Icon(Icons.delete, color: Colors.white),
      ),
      onDismissed: (direction) {
        setState(() {
          _notifications.removeWhere((n) => n.id == notification.id);
        });
      },
      child: Container(
        color: notification.isRead ? Colors.white : _getLevelColor(notification.level).withOpacity(0.05),
        child: ListTile(
          onTap: () => _showNotificationDetail(notification),
          leading: Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: _getLevelColor(notification.level).withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(
              _getTypeIcon(notification.type),
              color: _getLevelColor(notification.level),
              size: 20,
            ),
          ),
          title: Row(
            children: [
              if (!notification.isRead)
                Container(
                  width: 8,
                  height: 8,
                  margin: const EdgeInsets.only(right: 8),
                  decoration: BoxDecoration(
                    color: _getLevelColor(notification.level),
                    shape: BoxShape.circle,
                  ),
                ),
              Expanded(
                child: Text(
                  notification.title,
                  style: TextStyle(
                    fontWeight: notification.isRead ? FontWeight.normal : FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
          subtitle: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 4),
              Text(
                notification.message,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontSize: 13,
                  color: Colors.grey.shade600,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                _formatTime(notification.date),
                style: TextStyle(
                  fontSize: 11,
                  color: Colors.grey.shade500,
                ),
              ),
            ],
          ),
          isThreeLine: true,
        ),
      ),
    );
  }

  void _showNotificationDetail(NotificationItem notification) {
    setState(() {
      notification.isRead = true;
    });

    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (context) => Padding(
        padding: const EdgeInsets.all(24),
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
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: _getLevelColor(notification.level).withOpacity(0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    _getTypeIcon(notification.type),
                    color: _getLevelColor(notification.level),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        notification.title,
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(
                        _formatTime(notification.date),
                        style: TextStyle(color: Colors.grey.shade600),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            Text(notification.message),
            const SizedBox(height: 24),
            if (notification.level != NotificationLevel.info)
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pop(context);
                    // TODO: Action selon le type
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _getLevelColor(notification.level),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: Text(_getActionLabel(notification.type)),
                ),
              ),
          ],
        ),
      ),
    );
  }

  void _markAllAsRead() {
    setState(() {
      for (var n in _notifications) {
        n.isRead = true;
      }
    });
  }

  Color _getLevelColor(NotificationLevel level) {
    switch (level) {
      case NotificationLevel.critical:
        return Colors.red;
      case NotificationLevel.warning:
        return Colors.orange;
      case NotificationLevel.info:
        return Colors.blue;
    }
  }

  IconData _getTypeIcon(NotificationType type) {
    switch (type) {
      case NotificationType.water:
        return Icons.water_drop;
      case NotificationType.disease:
        return Icons.bug_report;
      case NotificationType.temperature:
        return Icons.thermostat;
      case NotificationType.sensor:
        return Icons.sensors_off;
      case NotificationType.order:
        return Icons.shopping_bag;
      case NotificationType.general:
        return Icons.info;
    }
  }

  String _getActionLabel(NotificationType type) {
    switch (type) {
      case NotificationType.water:
        return 'Voir les recommandations';
      case NotificationType.disease:
        return 'Voir le diagnostic';
      case NotificationType.temperature:
        return 'Voir les capteurs';
      case NotificationType.sensor:
        return 'Gérer les capteurs';
      case NotificationType.order:
        return 'Voir la commande';
      case NotificationType.general:
        return 'En savoir plus';
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
}

enum NotificationLevel { critical, warning, info }

enum NotificationType { water, disease, temperature, sensor, order, general }

class NotificationItem {
  final String id;
  final String title;
  final String message;
  final NotificationLevel level;
  final NotificationType type;
  final DateTime date;
  bool isRead;

  NotificationItem({
    required this.id,
    required this.title,
    required this.message,
    required this.level,
    required this.type,
    required this.date,
    required this.isRead,
  });
}
