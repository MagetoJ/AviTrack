'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { loginSchema, type LoginInput } from '@/lib/validation'
import { AlertCircle, CheckCircle, LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<'admin' | 'staff' | 'customer'>('admin')
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      // Simulate API call - In production, replace with real authentication
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock authentication - In production, verify credentials against database
      const mockCredentials: Record<string, { email: string; password: string; role: string }> = {
        admin: { email: 'admin@avitrack.com', password: 'password123', role: 'admin' },
        staff: { email: 'staff@avitrack.com', password: 'password123', role: 'staff' },
        customer: { email: 'customer@avitrack.com', password: 'password123', role: 'customer' },
      }

      const user = mockCredentials[selectedRole]
      if (!user || user.email !== data.email || user.password !== data.password) {
        throw new Error('Invalid credentials')
      }

      // Store user data (in production, use secure session management)
      const userData = {
        id: `${selectedRole}-001`,
        name: selectedRole === 'admin' ? 'John Supervisor' : selectedRole === 'staff' ? 'Ahmed Hassan' : 'Farmer Ahmed',
        email: data.email,
        role: selectedRole,
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem('user', JSON.stringify(userData))

      setSubmitStatus({
        type: 'success',
        message: 'Login successful! Redirecting...',
      })

      // Redirect based on role
      setTimeout(() => {
        switch (selectedRole) {
          case 'admin':
            router.push('/dashboard')
            break
          case 'staff':
            router.push('/daily-entry')
            break
          case 'customer':
            router.push('/catalog')
            break
          default:
            router.push('/')
        }
      }, 1000)
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Login failed. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-2xl mx-auto mb-4">
            AT
          </div>
          <h1 className="text-3xl font-bold text-foreground">AviTrack 2026</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive Poultry & Lifecycle ERP
          </p>
        </div>

        {/* Card */}
        <Card className="p-8 shadow-lg">
          {/* Role Selection */}
          <div className="mb-6">
            <Label htmlFor="role" className="mb-3 block text-sm font-semibold">
              Select Your Role
            </Label>
            <Select
              value={selectedRole}
              onValueChange={(value) =>
                setSelectedRole(value as 'admin' | 'staff' | 'customer')
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="staff">Staff Member</SelectItem>
                <SelectItem value="customer">Customer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Demo Credentials Info */}
          <Alert className="mb-6 border-primary-200 bg-primary-50">
            <AlertCircle className="h-4 w-4 text-primary-600" />
            <AlertDescription className="text-primary-800 text-xs">
              Demo Mode: Use{' '}
              <span className="font-semibold">
                {selectedRole}@avitrack.com
              </span>{' '}
              and password{' '}
              <span className="font-semibold">password123</span>
            </AlertDescription>
          </Alert>

          {/* Status Messages */}
          {submitStatus.type === 'success' && (
            <Alert className="mb-6 border-success-200 bg-success-50">
              <CheckCircle className="h-4 w-4 text-success-600" />
              <AlertDescription className="text-success-800">
                {submitStatus.message}
              </AlertDescription>
            </Alert>
          )}

          {submitStatus.type === 'error' && (
            <Alert className="mb-6 border-error-200 bg-error-50">
              <AlertCircle className="h-4 w-4 text-error-600" />
              <AlertDescription className="text-error-800">
                {submitStatus.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={`${selectedRole}@avitrack.com`}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-xs text-error-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-xs text-error-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 bg-primary hover:bg-primary/90 h-11 text-base font-medium"
            >
              <LogIn className="mr-2 h-4 w-4" />
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Demo Version - For Testing Purposes Only</p>
          <p className="mt-2">© 2026 AviTrack. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
