import 'package:dio/dio.dart';

final dioClient = Dio(BaseOptions(
      // Pour Android Emulator: 10.0.2.2 = localhost de la machine hôte
      baseUrl: 'http://10.0.2.2:3000/api/v1',
      // Pour macOS/iOS Simulator ou Web: 'http://localhost:3000/api/v1'
  connectTimeout: const Duration(seconds: 10),
  receiveTimeout: const Duration(seconds: 10),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
));

