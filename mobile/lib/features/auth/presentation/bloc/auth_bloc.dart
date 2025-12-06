import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import '../../domain/entities/user.dart';
import '../../domain/usecases/login.dart';
import '../../domain/usecases/verify_otp.dart';
import '../../domain/usecases/register.dart';

// Events
abstract class AuthEvent extends Equatable {
  @override
  List<Object?> get props => [];
}

class LoginRequested extends AuthEvent {
  final String identifier;
  final String password;
  LoginRequested(this.identifier, this.password);
  @override
  List<Object> get props => [identifier, password];
}

class VerifyOtpRequested extends AuthEvent {
  final String identifier;
  final String code;
  VerifyOtpRequested(this.identifier, this.code);
  @override
  List<Object> get props => [identifier, code];
}

class RegisterRequested extends AuthEvent {
  final String nom;
  final String prenoms;
  final String telephone;
  final String password;
  final String? email;
  final String languePreferee;

  RegisterRequested({
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

// States
abstract class AuthState extends Equatable {
  @override
  List<Object?> get props => [];
}

class AuthInitial extends AuthState {}
class AuthLoading extends AuthState {}
class AuthAuthenticated extends AuthState {
  final User user;
  AuthAuthenticated(this.user);
  @override
  List<Object> get props => [user];
}
class AuthRegistered extends AuthState {
  final User user;
  final bool requiresOtp;
  AuthRegistered(this.user, {this.requiresOtp = false});
  @override
  List<Object> get props => [user, requiresOtp];
}
class AuthError extends AuthState {
  final String message;
  AuthError(this.message);
  @override
  List<Object> get props => [message];
}

// Bloc
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final Login login;
  final VerifyOtp verifyOtp;
  final Register register;

  AuthBloc({
    required this.login,
    required this.verifyOtp,
    required this.register,
  }) : super(AuthInitial()) {
    on<LoginRequested>(_onLoginRequested);
    on<VerifyOtpRequested>(_onVerifyOtpRequested);
    on<RegisterRequested>(_onRegisterRequested);
  }

  Future<void> _onLoginRequested(LoginRequested event, Emitter<AuthState> emit) async {
    emit(AuthLoading());
    final result = await login(LoginParams(
      identifier: event.identifier,
      password: event.password,
    ));
    result.fold(
      (failure) => emit(AuthError(failure.message)),
      (user) => emit(AuthAuthenticated(user)),
    );
  }

  Future<void> _onVerifyOtpRequested(VerifyOtpRequested event, Emitter<AuthState> emit) async {
    emit(AuthLoading());
    final result = await verifyOtp(VerifyOtpParams(telephone: event.identifier, code: event.code));
    result.fold(
      (failure) => emit(AuthError(failure.message)),
      (user) => emit(AuthAuthenticated(user)),
    );
  }

  Future<void> _onRegisterRequested(RegisterRequested event, Emitter<AuthState> emit) async {
    emit(AuthLoading());
    final result = await register(RegisterParams(
      nom: event.nom,
      prenoms: event.prenoms,
      telephone: event.telephone,
      password: event.password,
      email: event.email,
      languePreferee: event.languePreferee,
    ));
    result.fold(
      (failure) => emit(AuthError(failure.message)),
      (user) => emit(AuthRegistered(user)),
    );
  }
}
