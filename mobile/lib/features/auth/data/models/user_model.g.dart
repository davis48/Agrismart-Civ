// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserModel _$UserModelFromJson(Map<String, dynamic> json) => UserModel(
      id: json['id'] as String,
      nom: json['nom'] as String,
      prenoms: json['prenoms'] as String,
      telephone: json['telephone'] as String,
      role: json['role'] as String,
      token: json['token'] as String?,
      refreshToken: json['refreshToken'] as String?,
    );

Map<String, dynamic> _$UserModelToJson(UserModel instance) => <String, dynamic>{
      'id': instance.id,
      'nom': instance.nom,
      'prenoms': instance.prenoms,
      'telephone': instance.telephone,
      'role': instance.role,
      'token': instance.token,
      'refreshToken': instance.refreshToken,
    };
