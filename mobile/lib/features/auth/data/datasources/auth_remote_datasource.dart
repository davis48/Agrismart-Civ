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
      return UserModel.fromJson(response.data['data']['user']);
    } on DioException catch (e) {
      final message = _extractErrorMessage(e);
      throw ServerFailure(message);
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
      return UserModel.fromJson(response.data['data']['user']);
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
