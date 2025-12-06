// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'dashboard_data_model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

DashboardDataModel _$DashboardDataModelFromJson(Map<String, dynamic> json) =>
    DashboardDataModel(
      weather: WeatherModel.fromJson(json['weather'] as Map<String, dynamic>),
      stats: StatsModel.fromJson(json['stats'] as Map<String, dynamic>),
      alerts: (json['alerts'] as List<dynamic>)
          .map((e) => AlertModel.fromJson(e as Map<String, dynamic>))
          .toList(),
    );

Map<String, dynamic> _$DashboardDataModelToJson(DashboardDataModel instance) =>
    <String, dynamic>{
      'weather': instance.weather,
      'stats': instance.stats,
      'alerts': instance.alerts,
    };

WeatherModel _$WeatherModelFromJson(Map<String, dynamic> json) => WeatherModel(
      temperature: (json['temperature'] as num).toDouble(),
      humidity: (json['humidity'] as num).toDouble(),
      description: json['description'] as String,
      icon: json['icon'] as String,
    );

Map<String, dynamic> _$WeatherModelToJson(WeatherModel instance) =>
    <String, dynamic>{
      'temperature': instance.temperature,
      'humidity': instance.humidity,
      'description': instance.description,
      'icon': instance.icon,
    };

StatsModel _$StatsModelFromJson(Map<String, dynamic> json) => StatsModel(
      yield: (json['yield'] as num).toDouble(),
      roi: (json['roi'] as num).toDouble(),
      soilHealth: (json['soilHealth'] as num).toDouble(),
    );

Map<String, dynamic> _$StatsModelToJson(StatsModel instance) =>
    <String, dynamic>{
      'yield': instance.yield,
      'roi': instance.roi,
      'soilHealth': instance.soilHealth,
    };

AlertModel _$AlertModelFromJson(Map<String, dynamic> json) => AlertModel(
      id: json['id'] as String,
      title: json['title'] as String,
      message: json['message'] as String,
      level: json['level'] as String,
    );

Map<String, dynamic> _$AlertModelToJson(AlertModel instance) =>
    <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'message': instance.message,
      'level': instance.level,
    };
