import 'package:json_annotation/json_annotation.dart';
import '../../domain/entities/user.dart';

part 'user_model.g.dart';

@JsonSerializable()
class UserModel extends User {
  const UserModel({
    required super.id,
    required super.nom,
    required super.prenoms,
    required super.telephone,
    required super.role,
    super.token,
    super.refreshToken,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'] as String,
      nom: json['nom'] as String,
      // Backend returns 'prenom' but we use 'prenoms' internally
      prenoms: (json['prenom'] ?? json['prenoms'] ?? '') as String,
      telephone: json['telephone'] as String,
      role: json['role'] as String,
      token: json['token'] as String?,
      refreshToken: json['refreshToken'] as String?,
    );
  }

  Map<String, dynamic> toJson() => _$UserModelToJson(this);
}

