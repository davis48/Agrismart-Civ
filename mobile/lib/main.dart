import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'features/auth/presentation/bloc/auth_bloc.dart';
import 'features/auth/presentation/pages/onboarding_page.dart';
import 'features/auth/presentation/pages/login_page.dart';
import 'features/auth/presentation/pages/register_page.dart';
import 'features/auth/presentation/pages/otp_page.dart';
import 'features/dashboard/presentation/pages/dashboard_page.dart';
import 'features/parcelles/presentation/pages/parcelles_page.dart';
import 'features/capteurs/presentation/pages/capteurs_page.dart';
import 'features/diagnostic/presentation/pages/diagnostic_page.dart';
import 'features/marketplace/presentation/pages/marketplace_page.dart';
import 'features/formations/presentation/pages/formations_page.dart';
import 'features/messages/presentation/pages/messages_page.dart';
import 'features/profile/presentation/pages/profile_page.dart';
import 'features/profile/presentation/pages/edit_profile_page.dart';
import 'features/settings/presentation/pages/settings_page.dart';
import 'features/analytics/presentation/pages/analytics_page.dart';
import 'features/notifications/presentation/pages/notifications_page.dart';
import 'features/recommandations/presentation/pages/recommandations_page.dart';
import 'features/orders/presentation/pages/orders_page.dart';
import 'features/diagnostic/presentation/pages/diagnostic_history_page.dart';
import 'features/diagnostic/presentation/pages/diagnostic_detail_page.dart';
import 'features/support/presentation/pages/support_page.dart';
import 'features/about/presentation/pages/about_page.dart';
import 'features/orders/presentation/pages/orders_page.dart';
import 'features/orders/presentation/pages/order_detail_page.dart';
import 'features/parcelles/presentation/pages/parcelle_detail_page.dart';
import 'features/capteurs/presentation/pages/capteur_detail_page.dart';
import 'features/capteurs/presentation/pages/capteurs_page.dart'; 
import 'features/parcelles/presentation/pages/parcelles_page.dart'; // Ensure models are available if needed or just use page imports

import 'injection_container.dart' as di;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await di.init();
  runApp(const MyApp());
}

final _router = GoRouter(
  initialLocation: '/onboarding',
  routes: [
    // Auth routes
    GoRoute(
      path: '/onboarding',
      builder: (context, state) => const OnboardingPage(),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginPage(),
    ),
    GoRoute(
      path: '/register',
      builder: (context, state) => const RegisterPage(),
    ),
    GoRoute(
      path: '/otp',
      builder: (context, state) {
        final telephone = state.extra as String;
        return OtpPage(telephone: telephone);
      },
    ),
    
    // Main app routes
    GoRoute(
      path: '/dashboard',
      builder: (context, state) => const DashboardPage(),
    ),
    GoRoute(
      path: '/parcelles',
      builder: (context, state) => const ParcellesPage(),
    ),
    GoRoute(
      path: '/capteurs',
      builder: (context, state) => const CapteursPage(),
    ),
    GoRoute(
      path: '/diagnostic',
      builder: (context, state) => const DiagnosticPage(),
    ),
    GoRoute(
      path: '/marketplace',
      builder: (context, state) => const MarketplacePage(),
    ),
    GoRoute(
      path: '/formations',
      builder: (context, state) => const FormationsPage(),
    ),
    GoRoute(
      path: '/messages',
      builder: (context, state) => const MessagesPage(),
    ),
    
    // Profile & Settings
    GoRoute(
      path: '/profile',
      builder: (context, state) => const ProfilePage(),
    ),
    GoRoute(
      path: '/edit-profile',
      builder: (context, state) => const EditProfilePage(),
    ),
    GoRoute(
      path: '/settings',
      builder: (context, state) => const SettingsPage(),
    ),
    
    // Analytics & Notifications
    GoRoute(
      path: '/analytics',
      name: 'analytics',
      builder: (context, state) => const AnalyticsPage(),
    ),
    GoRoute(
      path: '/notifications',
      builder: (context, state) => const NotificationsPage(),
    ),
    GoRoute(
      path: '/recommandations',
      builder: (context, state) => const RecommandationsPage(),
    ),
    
    // Additional pages
    GoRoute(
      path: '/orders',
      name: 'orders',
      builder: (context, state) => const OrdersPage(),
    ),
    GoRoute(
      path: '/diagnostic-history',
      name: 'diagnostic-history',
      builder: (context, state) => const DiagnosticHistoryPage(),
    ),
    GoRoute(
      path: '/support',
      name: 'support',
      builder: (context, state) => const SupportPage(),
    ),
    GoRoute(
      path: '/about',
      name: 'about',
      builder: (context, state) => const AboutPage(),
    ),
    GoRoute(
      path: '/diagnostic-detail',
      name: 'diagnostic-detail',
      builder: (context, state) {
        final diagnostic = state.extra as Map<String, dynamic>;
        return DiagnosticDetailPage(diagnostic: diagnostic);
      },
    ),
    GoRoute(
      path: '/order-detail',
      name: 'order-detail',
      builder: (context, state) {
        final order = state.extra as Map<String, dynamic>;
        return OrderDetailPage(order: order);
      },
    ),
    GoRoute(
      path: '/parcelle-detail',
      name: 'parcelle-detail',
      builder: (context, state) {
        final parcelle = state.extra as Parcelle; // Need to import Parcelle model or make dynamic
        return ParcelleDetailPage(parcelle: parcelle);
      },
    ),
    GoRoute(
      path: '/capteur-detail',
      name: 'capteur-detail',
      builder: (context, state) {
        final capteur = state.extra as Capteur; // Need Capteur model
        return CapteurDetailPage(capteur: capteur);
      },
    ),
  ],
);

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(create: (_) => di.sl<AuthBloc>()),
      ],
      child: MaterialApp.router(
        title: 'AgriSmart CI',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.green,
            brightness: Brightness.light,
          ),
          useMaterial3: true,
          appBarTheme: const AppBarTheme(
            centerTitle: true,
            elevation: 0,
          ),
          cardTheme: CardThemeData(
            elevation: 2,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          inputDecorationTheme: InputDecorationTheme(
            filled: true,
            fillColor: Colors.grey.shade50,
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
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 24),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
        ),
        darkTheme: ThemeData(
          colorScheme: ColorScheme.fromSeed(
            seedColor: Colors.green,
            brightness: Brightness.dark,
          ),
          useMaterial3: true,
          appBarTheme: const AppBarTheme(
            centerTitle: true,
            elevation: 0,
          ),
          cardTheme: CardThemeData(
            elevation: 2,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          inputDecorationTheme: InputDecorationTheme(
            filled: true,
            fillColor: Colors.grey.shade900,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: Colors.grey.shade700),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: BorderSide(color: Colors.grey.shade700),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: Colors.green, width: 2),
            ),
          ),
          elevatedButtonTheme: ElevatedButtonThemeData(
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 24),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
          ),
        ),
        themeMode: ThemeMode.system,
        routerConfig: _router,
      ),
    );
  }
}
