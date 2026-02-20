'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  BarChart3,
  ClipboardList,
  ShoppingCart,
  LogOut,
  LogIn,
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default function HomePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
      } catch (error) {
        console.error('Failed to parse user data:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
    router.push('/login')
  }

  const getDashboardLink = () => {
    if (!user) return '/login'
    switch (user.role) {
      case 'admin':
        return '/dashboard'
      case 'staff':
        return '/daily-entry'
      case 'customer':
        return '/catalog'
      default:
        return '/login'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-border border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              AT
            </div>
            <span className="font-bold text-foreground hidden sm:inline">AviTrack 2026</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <LogIn className="mr-2 h-4 w-4" />
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4">
            AviTrack 2026
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Comprehensive Poultry & Lifecycle Enterprise Resource Planning System
          </p>
          {user ? (
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => router.push(getDashboardLink())}
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90"
              onClick={() => router.push('/login')}
            >
              Get Started
            </Button>
          )}
        </div>

        {/* Role-Based Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Admin Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-200 border-2 border-border">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h3>
            <p className="text-muted-foreground mb-6">
              High-level analytics, batch management, mortality tracking, and performance reports for supervisors.
            </p>
            {user?.role === 'admin' ? (
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => router.push('/dashboard')}
              >
                Open Dashboard
              </Button>
            ) : (
              <Button variant="outline" className="w-full" disabled>
                Admin Only
              </Button>
            )}
          </Card>

          {/* Staff Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-200 border-2 border-border">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
              <ClipboardList className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Staff Dashboard
            </h3>
            <p className="text-muted-foreground mb-6">
              Mobile-optimized daily entry form for feed intake, water, mortality, and sick bird isolation.
            </p>
            {user?.role === 'staff' ? (
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => router.push('/daily-entry')}
              >
                Open Dashboard
              </Button>
            ) : (
              <Button variant="outline" className="w-full" disabled>
                Staff Only
              </Button>
            )}
          </Card>

          {/* Customer Card */}
          <Card className="p-6 hover:shadow-lg transition-shadow duration-200 border-2 border-border">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
              <ShoppingCart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Customer Portal
            </h3>
            <p className="text-muted-foreground mb-6">
              Browse products, manage cart, place orders, and view complete product traceability reports.
            </p>
            {user?.role === 'customer' ? (
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => router.push('/catalog')}
              >
                Open Portal
              </Button>
            ) : (
              <Button variant="outline" className="w-full" disabled>
                Customer Only
              </Button>
            )}
          </Card>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Batch Management',
                description: 'Track poultry batches from day-old chicks to processed meat with complete lifecycle monitoring.',
              },
              {
                title: 'Inventory Tracking',
                description: 'Real-time inventory management for live stock, ailing birds, and dressed products.',
              },
              {
                title: 'Health Monitoring',
                description: 'Track sick birds, medications, withdrawal periods, and prevent antibiotic-contaminated sales.',
              },
              {
                title: 'Mortality Alerts',
                description: 'Automatic alerts when mortality exceeds 2% in 24 hours with immediate notifications.',
              },
              {
                title: 'Staff Operations',
                description: 'Mobile-friendly forms for daily feed, water, mortality, and slaughter record entry.',
              },
              {
                title: 'Product Traceability',
                description: 'Complete lifecycle traceability for customers from batch to delivered product.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200"
              >
                <h4 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Accounts */}
        <Card className="p-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Demo Accounts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                role: 'Admin',
                email: 'admin@avitrack.com',
                password: 'password123',
              },
              {
                role: 'Staff',
                email: 'staff@avitrack.com',
                password: 'password123',
              },
              {
                role: 'Customer',
                email: 'customer@avitrack.com',
                password: 'password123',
              },
            ].map((account) => (
              <div
                key={account.role}
                className="p-4 rounded-lg bg-background border border-border"
              >
                <p className="text-sm font-semibold text-foreground mb-2">
                  {account.role}
                </p>
                <p className="text-xs text-muted-foreground mb-1">
                  <span className="font-mono">{account.email}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-mono">{account.password}</span>
                </p>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 AviTrack. Comprehensive Poultry ERP System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
