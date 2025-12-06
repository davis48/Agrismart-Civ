import 'package:flutter/material.dart';

class MessagesPage extends StatefulWidget {
  const MessagesPage({super.key});

  @override
  State<MessagesPage> createState() => _MessagesPageState();
}

class _MessagesPageState extends State<MessagesPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  final List<Conversation> _conversations = [
    Conversation(
      id: '1',
      nom: 'Konan Yao',
      avatar: null,
      dernierMessage: 'Merci pour les conseils sur le maïs !',
      dateMessage: DateTime.now().subtract(const Duration(minutes: 30)),
      nonLus: 2,
      isOnline: true,
    ),
    Conversation(
      id: '2',
      nom: 'Coopérative Yamoussoukro',
      avatar: null,
      dernierMessage: 'Votre commande de semences est prête',
      dateMessage: DateTime.now().subtract(const Duration(hours: 2)),
      nonLus: 1,
      isOnline: false,
      isGroup: true,
    ),
    Conversation(
      id: '3',
      nom: 'Conseiller AgriSmart',
      avatar: null,
      dernierMessage: 'N\'hésitez pas si vous avez des questions',
      dateMessage: DateTime.now().subtract(const Duration(days: 1)),
      nonLus: 0,
      isOnline: true,
      isSupport: true,
    ),
    Conversation(
      id: '4',
      nom: 'Groupe Producteurs Riz',
      avatar: null,
      dernierMessage: 'Kouassi: La récolte commence demain',
      dateMessage: DateTime.now().subtract(const Duration(days: 2)),
      nonLus: 5,
      isOnline: false,
      isGroup: true,
    ),
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        title: const Text('Messages'),
        backgroundColor: Colors.pink,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {},
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: Colors.white,
          labelColor: Colors.white,
          unselectedLabelColor: Colors.white70,
          tabs: const [
            Tab(text: 'Tous'),
            Tab(text: 'Groupes'),
            Tab(text: 'Support'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _buildConversationList(_conversations),
          _buildConversationList(_conversations.where((c) => c.isGroup).toList()),
          _buildConversationList(_conversations.where((c) => c.isSupport).toList()),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _showNewMessageDialog(),
        backgroundColor: Colors.pink,
        child: const Icon(Icons.edit, color: Colors.white),
      ),
    );
  }

  Widget _buildConversationList(List<Conversation> conversations) {
    if (conversations.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.chat_bubble_outline, size: 64, color: Colors.grey.shade400),
            const SizedBox(height: 16),
            Text(
              'Aucune conversation',
              style: TextStyle(color: Colors.grey.shade600),
            ),
          ],
        ),
      );
    }

    return ListView.builder(
      itemCount: conversations.length,
      itemBuilder: (context, index) => _buildConversationTile(conversations[index]),
    );
  }

  Widget _buildConversationTile(Conversation conv) {
    return Container(
      color: conv.nonLus > 0 ? Colors.pink.shade50 : Colors.white,
      child: ListTile(
        onTap: () => _openChat(conv),
        leading: Stack(
          children: [
            CircleAvatar(
              backgroundColor: conv.isGroup
                  ? Colors.blue.shade100
                  : conv.isSupport
                      ? Colors.green.shade100
                      : Colors.pink.shade100,
              radius: 24,
              child: Icon(
                conv.isGroup
                    ? Icons.group
                    : conv.isSupport
                        ? Icons.support_agent
                        : Icons.person,
                color: conv.isGroup
                    ? Colors.blue
                    : conv.isSupport
                        ? Colors.green
                        : Colors.pink,
              ),
            ),
            if (conv.isOnline && !conv.isGroup)
              Positioned(
                bottom: 0,
                right: 0,
                child: Container(
                  width: 14,
                  height: 14,
                  decoration: BoxDecoration(
                    color: Colors.green,
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white, width: 2),
                  ),
                ),
              ),
          ],
        ),
        title: Row(
          children: [
            Expanded(
              child: Text(
                conv.nom,
                style: TextStyle(
                  fontWeight: conv.nonLus > 0 ? FontWeight.bold : FontWeight.normal,
                ),
              ),
            ),
            Text(
              _formatTime(conv.dateMessage),
              style: TextStyle(
                fontSize: 12,
                color: conv.nonLus > 0 ? Colors.pink : Colors.grey,
              ),
            ),
          ],
        ),
        subtitle: Row(
          children: [
            Expanded(
              child: Text(
                conv.dernierMessage,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  color: conv.nonLus > 0 ? Colors.black87 : Colors.grey.shade600,
                ),
              ),
            ),
            if (conv.nonLus > 0)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                decoration: BoxDecoration(
                  color: Colors.pink,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '${conv.nonLus}',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  void _openChat(Conversation conv) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => ChatPage(conversation: conv),
      ),
    );
  }

  void _showNewMessageDialog() {
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
              'Nouvelle conversation',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            ListTile(
              leading: CircleAvatar(
                backgroundColor: Colors.pink.shade100,
                child: const Icon(Icons.person_add, color: Colors.pink),
              ),
              title: const Text('Nouveau message'),
              subtitle: const Text('Contacter un autre agriculteur'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: CircleAvatar(
                backgroundColor: Colors.blue.shade100,
                child: const Icon(Icons.group_add, color: Colors.blue),
              ),
              title: const Text('Créer un groupe'),
              subtitle: const Text('Discuter avec plusieurs personnes'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: CircleAvatar(
                backgroundColor: Colors.green.shade100,
                child: const Icon(Icons.support_agent, color: Colors.green),
              ),
              title: const Text('Contacter le support'),
              subtitle: const Text('Obtenir de l\'aide'),
              onTap: () => Navigator.pop(context),
            ),
          ],
        ),
      ),
    );
  }

  String _formatTime(DateTime time) {
    final diff = DateTime.now().difference(time);
    if (diff.inMinutes < 60) {
      return '${diff.inMinutes} min';
    } else if (diff.inHours < 24) {
      return '${diff.inHours}h';
    } else {
      return '${diff.inDays}j';
    }
  }
}

class ChatPage extends StatefulWidget {
  final Conversation conversation;

  const ChatPage({super.key, required this.conversation});

  @override
  State<ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  final TextEditingController _messageController = TextEditingController();
  final List<Message> _messages = [];

  @override
  void initState() {
    super.initState();
    _messages.addAll([
      Message(
        id: '1',
        texte: 'Bonjour ! Comment va la culture du maïs ?',
        envoyeur: 'other',
        date: DateTime.now().subtract(const Duration(hours: 2)),
      ),
      Message(
        id: '2',
        texte: 'Très bien ! Les capteurs montrent une bonne humidité.',
        envoyeur: 'me',
        date: DateTime.now().subtract(const Duration(hours: 1, minutes: 45)),
      ),
      Message(
        id: '3',
        texte: 'C\'est super ! Tu as des conseils pour l\'irrigation ?',
        envoyeur: 'other',
        date: DateTime.now().subtract(const Duration(hours: 1)),
      ),
      Message(
        id: '4',
        texte: 'J\'utilise l\'app AgriSmart, elle me donne des recommandations précises basées sur les données des capteurs.',
        envoyeur: 'me',
        date: DateTime.now().subtract(const Duration(minutes: 45)),
      ),
      Message(
        id: '5',
        texte: 'Merci pour les conseils sur le maïs !',
        envoyeur: 'other',
        date: DateTime.now().subtract(const Duration(minutes: 30)),
      ),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.pink,
        foregroundColor: Colors.white,
        title: Row(
          children: [
            CircleAvatar(
              radius: 18,
              backgroundColor: Colors.white24,
              child: Icon(
                widget.conversation.isGroup ? Icons.group : Icons.person,
                size: 20,
                color: Colors.white,
              ),
            ),
            const SizedBox(width: 10),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.conversation.nom,
                  style: const TextStyle(fontSize: 16),
                ),
                if (widget.conversation.isOnline)
                  const Text(
                    'En ligne',
                    style: TextStyle(fontSize: 12, color: Colors.white70),
                  ),
              ],
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.call),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.more_vert),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: _messages.length,
              itemBuilder: (context, index) => _buildMessageBubble(_messages[index]),
            ),
          ),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.05),
                  offset: const Offset(0, -2),
                  blurRadius: 5,
                ),
              ],
            ),
            child: SafeArea(
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.attach_file),
                    onPressed: () {},
                    color: Colors.grey,
                  ),
                  IconButton(
                    icon: const Icon(Icons.camera_alt),
                    onPressed: () {},
                    color: Colors.grey,
                  ),
                  Expanded(
                    child: TextField(
                      controller: _messageController,
                      decoration: InputDecoration(
                        hintText: 'Écrire un message...',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(24),
                          borderSide: BorderSide.none,
                        ),
                        filled: true,
                        fillColor: Colors.grey.shade100,
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 8,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 8),
                  CircleAvatar(
                    backgroundColor: Colors.pink,
                    child: IconButton(
                      icon: const Icon(Icons.send, color: Colors.white, size: 20),
                      onPressed: _sendMessage,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildMessageBubble(Message message) {
    final isMe = message.envoyeur == 'me';
    return Align(
      alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: isMe ? Colors.pink : Colors.grey.shade200,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(16),
            topRight: const Radius.circular(16),
            bottomLeft: Radius.circular(isMe ? 16 : 4),
            bottomRight: Radius.circular(isMe ? 4 : 16),
          ),
        ),
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.75,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              message.texte,
              style: TextStyle(
                color: isMe ? Colors.white : Colors.black87,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              _formatMessageTime(message.date),
              style: TextStyle(
                fontSize: 10,
                color: isMe ? Colors.white70 : Colors.grey,
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _sendMessage() {
    if (_messageController.text.trim().isEmpty) return;

    setState(() {
      _messages.add(Message(
        id: DateTime.now().toString(),
        texte: _messageController.text.trim(),
        envoyeur: 'me',
        date: DateTime.now(),
      ));
    });
    _messageController.clear();
  }

  String _formatMessageTime(DateTime time) {
    return '${time.hour.toString().padLeft(2, '0')}:${time.minute.toString().padLeft(2, '0')}';
  }
}

class Conversation {
  final String id;
  final String nom;
  final String? avatar;
  final String dernierMessage;
  final DateTime dateMessage;
  final int nonLus;
  final bool isOnline;
  final bool isGroup;
  final bool isSupport;

  Conversation({
    required this.id,
    required this.nom,
    this.avatar,
    required this.dernierMessage,
    required this.dateMessage,
    required this.nonLus,
    this.isOnline = false,
    this.isGroup = false,
    this.isSupport = false,
  });
}

class Message {
  final String id;
  final String texte;
  final String envoyeur;
  final DateTime date;

  Message({
    required this.id,
    required this.texte,
    required this.envoyeur,
    required this.date,
  });
}
