import 'package:dartz/dartz.dart';
import '../../../../core/error/failures.dart';
import '../entities/user.dart';

abstract class AuthRepository {
  Future<Either<Failure, User>> login(String identifier, String password);
  Future<Either<Failure, User>> verifyOtp(String identifier, String code);
  Future<Either<Failure, void>> logout();
  Future<Either<Failure, User?>> getCurrentUser();
  Future<Either<Failure, User>> register({
    required String nom,
    required String prenoms,
    required String telephone,
    required String password,
    String? email,
    String languePreferee = 'fr',
  });
}

