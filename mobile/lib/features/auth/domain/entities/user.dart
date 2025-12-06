import 'package:equatable/equatable.dart';

class User extends Equatable {
  final String id;
  final String nom;
  final String prenoms;
  final String telephone;
  final String role;
  final String? token;
  final String? refreshToken;

  const User({
    required this.id,
    required this.nom,
    required this.prenoms,
    required this.telephone,
    required this.role,
    this.token,
    this.refreshToken,
  });

  @override
  List<Object?> get props => [id, nom, prenoms, telephone, role, token, refreshToken];
}
