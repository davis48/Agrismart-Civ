import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import '../../../../core/error/failures.dart';
import '../../../../core/usecases/usecase.dart';
import '../entities/user.dart';
import '../repositories/auth_repository.dart';

class Register implements UseCase<User, RegisterParams> {
  final AuthRepository repository;

  Register(this.repository);

  @override
  Future<Either<Failure, User>> call(RegisterParams params) async {
    return await repository.register(
      nom: params.nom,
      prenoms: params.prenoms,
      telephone: params.telephone,
      password: params.password,
      email: params.email,
      languePreferee: params.languePreferee,
    );
  }
}

class RegisterParams extends Equatable {
  final String nom;
  final String prenoms;
  final String telephone;
  final String password;
  final String? email;
  final String languePreferee;

  const RegisterParams({
    required this.nom,
    required this.prenoms,
    required this.telephone,
    required this.password,
    this.email,
    this.languePreferee = 'fr',
  });

  @override
  List<Object?> get props => [nom, prenoms, telephone, password, email, languePreferee];
}
