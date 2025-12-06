import 'package:dartz/dartz.dart';
import '../../../../core/error/failures.dart';
import '../../domain/entities/user.dart';
import '../../domain/repositories/auth_repository.dart';
import '../datasources/auth_remote_datasource.dart';

class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource remoteDataSource;

  AuthRepositoryImpl({required this.remoteDataSource});

  @override
  Future<Either<Failure, User>> login(String identifier, String password) async {
    try {
      final user = await remoteDataSource.login(identifier, password);
      return Right(user);
    } on ServerFailure catch (e) {
      return Left(e);
    } catch (e) {
      return const Left(ServerFailure('Erreur inattendue'));
    }
  }

  @override
  Future<Either<Failure, User>> verifyOtp(String identifier, String code) async {
    try {
      final user = await remoteDataSource.verifyOtp(identifier, code);
      return Right(user);
    } on ServerFailure catch (e) {
      return Left(e);
    } catch (e) {
      return const Left(ServerFailure('Erreur inattendue'));
    }
  }

  @override
  Future<Either<Failure, void>> logout() async {
    return const Right(null);
  }

  @override
  Future<Either<Failure, User?>> getCurrentUser() async {
    return const Right(null);
  }

  @override
  Future<Either<Failure, User>> register({
    required String nom,
    required String prenoms,
    required String telephone,
    required String password,
    String? email,
    String languePreferee = 'fr',
  }) async {
    try {
      final user = await remoteDataSource.register(
        nom: nom,
        prenoms: prenoms,
        telephone: telephone,
        password: password,
        email: email,
        languePreferee: languePreferee,
      );
      return Right(user);
    } on ServerFailure catch (e) {
      return Left(e);
    } catch (e) {
      return const Left(ServerFailure('Erreur lors de l\'inscription'));
    }
  }
}
