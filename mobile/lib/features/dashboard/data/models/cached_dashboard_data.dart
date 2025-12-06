import 'package:isar/isar.dart';

part 'cached_dashboard_data.g.dart';

@collection
class CachedDashboardData {
  @Id()
  int id = -9223372036854775808; // Isar.autoIncrement

  @Index(unique: true)
  String? key; // 'dashboard_summary'

  String? json; // Storing the full JSON response for simplicity
  
  DateTime? lastUpdated;
}
