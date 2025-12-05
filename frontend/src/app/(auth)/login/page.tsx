'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Leaf, Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { Button, Input, Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui'
import { authApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store'
import toast from 'react-hot-toast'

const loginSchema = z.object({
  telephone: z.string().min(10, 'Numéro de téléphone invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [requiresOtp, setRequiresOtp] = useState(false)
  const [otpCode, setOtpCode] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // Debug: log validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('Validation errors:', errors)
    }
  }, [errors])

  const [debugMessage, setDebugMessage] = useState<string>('')

  const onSubmit = async (data: LoginFormData) => {
    setDebugMessage('Soumission en cours...')
    setIsLoading(true)
    try {
      const response = await authApi.login({ telephone: data.telephone, password: data.password })
      
      if (response.data.success) {
        if (response.data.data.requiresOtp) {
          setRequiresOtp(true)
          toast.success('Code OTP envoyé par SMS')
        } else {
          setDebugMessage('Connexion réussie! Redirection...')
          login(response.data.data.user, response.data.data.token)
          toast.success('Connexion réussie!')
          router.push('/dashboard')
        }
      } else {
        setDebugMessage('Échec: ' + response.data.message)
        toast.error(response.data.message || 'Erreur de connexion')
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      const errorMessage = err.response?.data?.message || 'Erreur de connexion'
      setDebugMessage('Erreur: ' + errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (otpCode.length !== 6) {
      toast.error('Le code OTP doit contenir 6 chiffres')
      return
    }

    setIsLoading(true)
    try {
      const response = await authApi.verifyOtp({ telephone: getValues('telephone'), otp: otpCode })
      
      if (response.data.success) {
        login(response.data.data.user, response.data.data.token)
        toast.success('Connexion réussie!')
        router.push('/dashboard')
      } else {
        toast.error(response.data.message || 'Code OTP invalide')
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } }
      toast.error(err.response?.data?.message || 'Erreur de vérification')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-600 shadow-lg">
          <Leaf className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AgriTech CI</h1>
          <p className="text-sm text-gray-500">Surveillance Agricole Intelligente</p>
        </div>
      </div>

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            {requiresOtp ? 'Vérification OTP' : 'Connexion'}
          </CardTitle>
          <CardDescription>
            {requiresOtp 
              ? 'Entrez le code reçu par SMS' 
              : 'Connectez-vous à votre compte agriculteur'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!requiresOtp ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                <Input
                  label="Numéro de téléphone"
                  type="tel"
                  placeholder="+225 XX XX XX XX XX"
                  className="pl-10"
                  error={errors.telephone?.message}
                  {...register('telephone')}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-9 h-5 w-5 text-gray-400" />
                <Input
                  label="Mot de passe"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-gray-600">Se souvenir de moi</span>
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-green-600 hover:text-green-700"
                >
                  Mot de passe oublié?
                </Link>
              </div>

              {/* Afficher les erreurs de validation */}
              {Object.keys(errors).length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                  {errors.telephone && <p>• {errors.telephone.message}</p>}
                  {errors.password && <p>• {errors.password.message}</p>}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Connexion...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Se connecter
                    <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              {/* Info de test */}
              <div className="mt-4 p-3 bg-gray-100 rounded-lg text-sm text-gray-600">
                <p className="font-medium mb-1">Compte de test :</p>
                <p>Téléphone : <code className="bg-gray-200 px-1 rounded">0700000001</code></p>
                <p>Mot de passe : <code className="bg-gray-200 px-1 rounded">password123</code></p>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  Code envoyé au <strong>{getValues('telephone')}</strong>
                </p>
              </div>

              <Input
                label="Code OTP"
                type="text"
                placeholder="000000"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="text-center text-2xl tracking-widest"
                maxLength={6}
              />

              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading || otpCode.length !== 6}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Vérification...
                  </span>
                ) : (
                  'Vérifier le code'
                )}
              </Button>

              <button
                type="button"
                onClick={() => setRequiresOtp(false)}
                className="w-full text-sm text-gray-600 hover:text-gray-800"
              >
                ← Retour à la connexion
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Pas encore de compte? </span>
            <Link 
              href="/register" 
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Créer un compte
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Demo credentials */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200 text-sm text-center max-w-md">
        <p className="font-medium text-gray-700 mb-2">Compte de démonstration:</p>
        <p className="text-gray-600">Téléphone: <code className="bg-gray-100 px-2 py-0.5 rounded">+2250707070707</code></p>
        <p className="text-gray-600">Mot de passe: <code className="bg-gray-100 px-2 py-0.5 rounded">password123</code></p>
      </div>
    </div>
  )
}
