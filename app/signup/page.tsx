'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Container, Col, Text, Input, Icon } from "citrica-ui-toolkit";
import { Card, CardBody } from "@heroui/card"
import { addToast } from "@heroui/toast"
import { UserAuth } from '@/shared/context/auth-context'
import { Checkbox, Link } from "@heroui/react"

const SignupPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { signUpWithPassword, userSession, isInitializing } = UserAuth()
  const router = useRouter()
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  // Redirigir a home si ya está autenticado
  useEffect(() => {
    if (!isInitializing && userSession) {
      router.push('/');
    }
  }, [userSession, isInitializing, router]);

  // Si está inicializando o ya hay sesión, no mostrar el formulario
  if (isInitializing || userSession) {
    return null;
  }

  const clearError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  const handleSignup = async () => {
    const newErrors: Record<string, string> = {}

    if (!firstName.trim()) newErrors.firstName = 'El nombre es obligatorio'
    if (!lastName.trim()) newErrors.lastName = 'El apellido es obligatorio'
    if (!email.trim()) {
      newErrors.email = 'El email es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingresa un email válido'
    }
    if (!password) {
      newErrors.password = 'La contraseña es obligatoria'
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsLoading(true)

    try {
      const { respData, respError } = await signUpWithPassword(
        email,
        password,
        { first_name: firstName, last_name: lastName }
      )

      if (respError) {
        addToast({
          title: "Error de registro",
          description: respError.message,
          color: "danger",
        })
      } else if (respData?.user) {
        if (respData.session) {
          addToast({
            title: "¡Registro exitoso!",
            description: "Bienvenido a Viajes y Destinos",
            color: "success",
          })
          router.push('/admin')
        } else {
          addToast({
            title: "Registro completado",
            description: "Verifica tu correo para activar tu cuenta",
            color: "success",
          })
          router.push('/login')
        }
      }
    } catch (error) {
      console.error('Signup error:', error)
      addToast({
        title: "Error",
        description: "Ocurrió un error inesperado",
        color: "danger",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container noPadding className="min-h-screen flex items-center justify-center !flex-nowrap">
      {/* Formulario */}
      <Col cols={{ lg: 12, md: 8, sm: 4 }} className="w-full max-w-[480px] flex justify-center">
        <Card className="p-4 bg-white/95 backdrop-blur-sm w-full">
          <CardBody className="space-y-6">
            <div className="flex flex-col text-center">
              <img className='w-[100px] mx-auto mb-3' src="/img/citrica-logo.png" alt="Citrica" />
              <Text variant="subtitle" weight='bold' textColor='color-secondary'>
                Crear Cuenta
              </Text>
              <Text variant="label" textColor="color-on-container">
                Completa los datos para registrarte
              </Text>
            </div>

            <form className="flex flex-col gap-4">
              <div className='flex flex-row gap-3'>
                <Input
                  type="text"
                  label="Nombre"
                  placeholder="Tu nombre"
                  value={firstName}
                  onValueChange={(v: string) => { setFirstName(v); clearError('firstName') }}
                  required
                  disabled={isLoading}
                  isInvalid={!!errors.firstName}
                  errorMessage={errors.firstName}
                  className="!p-0"
                  variant='secondary'
                />
                <Input
                  type="text"
                  label="Apellido"
                  placeholder="Tu apellido"
                  value={lastName}
                  onValueChange={(v: string) => { setLastName(v); clearError('lastName') }}
                  required
                  disabled={isLoading}
                  isInvalid={!!errors.lastName}
                  errorMessage={errors.lastName}
                  className='!p-0'
                  variant='secondary'
                />
              </div>
              <Input
                type="email"
                label="Correo electrónico"
                placeholder="tu@email.com"
                value={email}
                onValueChange={(v: string) => { setEmail(v); clearError('email') }}
                required
                disabled={isLoading}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                className='!p-0'
                variant='secondary'
              />

              <Input
                type={showPassword ? "text" : "password"}
                label="Contraseña"
                placeholder="Mínimo 6 caracteres"
                value={password}
                onValueChange={(v: string) => { setPassword(v); clearError('password') }}
                required
                disabled={isLoading}
                isInvalid={!!errors.password}
                errorMessage={errors.password}
                className='!p-0'
                variant='secondary'
                endContent={
                  <Icon
                    className="cursor-pointer"
                    color="#66666666"
                    name={showPassword ? "EyeOff" : "Eye"}
                    size={12}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                }
              />

              <Input
                type={showConfirmPassword ? "text" : "password"}
                label="Confirmar Contraseña"
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onValueChange={(v: string) => { setConfirmPassword(v); clearError('confirmPassword') }}
                required
                disabled={isLoading}
                isInvalid={!!errors.confirmPassword}
                errorMessage={errors.confirmPassword}
                className='!p-0'
                variant='secondary'
                endContent={
                  <Icon
                    className="cursor-pointer"
                    color="#66666666"
                    name={showConfirmPassword ? "EyeOff" : "Eye"}
                    size={12}
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  />
                }
              />

              <div className="flex flex-col gap-2">
                <div className="flex items-start">
                  <Checkbox
                    isSelected={acceptedPrivacy}
                    onValueChange={setAcceptedPrivacy}
                    classNames={{
                      wrapper: "border border-gray-300 before:border-0 after:bg-[#00226c]",
                      icon: "text-white"
                    }}
                  />
                  <Text variant="label" textColor="color-black" className="opacity-60">
                    Acepto los {" "}
                    <Link href="/terms" target="_blank" rel="noopener noreferrer">
                      <Text variant="label" textColor="color-secondary" weight="bold">Términos y Condiciones</Text>
                    </Link>.
                  </Text>
                </div>
              </div>

              <Button
                onClick={handleSignup}
                label={isLoading ? "Registrando..." : "Crear Cuenta"}
                variant="primary"
                fullWidth
                disabled={isLoading}
                className=" !mt-2"
              />
            </form>

            <div className="text-center">
              <Text variant="label" textColor="color-black">
                ¿Ya tienes una cuenta?{' '}
              </Text>
              <Link href="/login">
                <Text variant="body" textColor='color-primary' weight="bold">
                  Inicia sesión
                </Text>
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Container>
  )
}

export default SignupPage
