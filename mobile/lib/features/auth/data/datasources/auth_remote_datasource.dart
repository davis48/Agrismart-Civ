import 'package:dio/dio.dart';
import '../../../../core/error/failures.dart';
import '../models/user_model.dart';

abstract class AuthRemoteDataSource {
  Future<UserModel> login(String identifier, String password);
  Future<UserModel> verifyOtp(String identifier, String code);
  Future<UserModel> register({
    required String nom,
    required String prenoms,
    required String telephone,
    required String password,
    String? email,
    String languePreferee,
  });
}

class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  final Dio dio;

  AuthRemoteDataSourceImpl({required this.dio});

  @override
  Future<UserModel> login(String identifier, String password) async {
    try {
      final response = await dio.post('/auth/login', data: {
        'identifier': identifier,
        'password': password,
      });
      
      final data = response.data['data'];
      
      // En mode dev, le backend renvoie directement les tokens
      if (data['token'] != null) {
        print('[DEBUG] Token reçu lors de la connexion: ${data['token']}');
      }
      
      return UserModel.fromJson(data['user']);
    } on DioException catch (e) {
      final message = _extractErrorMessage(e);
      throw ServerFailure(message);
    } catch (e) {
      throw ServerFailure('Erreur inattendue: ${e.toString()}');
    }
  }

  @override
  Future<UserModel> verifyOtp(String identifier, String code) async {
    try {
      final response = await dio.post('/auth/verify-otp', data: {
        'identifier': identifier,
        'otp': code,
      });
      return UserModel.fromJson(response.data['data']['user']);
    } on DioException catch (e) {
      throw ServerFailure(e.response?.data['message'] ?? 'Code invalide');
    }
  }

  @override
  Future<UserModel> register({
    required String nom,
    required String prenoms,
    required String telephone,
    required String password,
    String? email,
    String languePreferee = 'fr',
  }) async {
    try {
      final response = await dio.post('/auth/register', data: {
        'nom': nom,
        'prenoms': prenoms,
        'telephone': telephone,
        'password': password,
        if (email != null && email.isNotEmpty) 'email': email,
        'langue_preferee': languePreferee,
      });
      
      final data = response.data['data'];
      
      // En mode dev, le backend renvoie directement les tokens
      // On les stocke pour les utiliser dans les prochaines requêtes
      if (data['token'] != null) {
        // Note: Le stockage sera géré par le BLoC/UseCase qui appellera cette méthode
        // Pour l'instant, on retourne juste l'utilisateur
        print('[DEBUG] Token reçu lors de l\'inscription: ${data['token']}');
      }
      
      return UserModel.fromJson(data['user']);
    } on DioException catch (e) {
      final message = _extractErrorMessage(e);
      throw ServerFailure(message);
    }
  }

  String _extractErrorMessage(DioException e) {
    if (e.response?.data != null) {
      final data = e.response!.data;
      // Check for specific error messages
      if (data['message'] != null) {
        final msg = data['message'].toString();
        // Handle duplicate user
        if (msg.contains('existe déjà')) {
          return 'Ce numéro de téléphone ou email est déjà utilisé';
        }
        // Handle validation errors with details
        if (data['errors'] != null && data['errors'] is List) {
          final errors = data['errors'] as List;
          final messages = errors.map((e) => e['message']?.toString() ?? '').where((m) => m.isNotEmpty).join('\n');
          if (messages.isNotEmpty) return messages;
        }
        return msg;
      }
    }
    return 'Erreur de connexion au serveur';
  }
}
