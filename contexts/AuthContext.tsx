'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type UserRole = 'admin' | 'staff' | 'customer' | null

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser({ ...parsedUser, createdAt: new Date(parsedUser.createdAt) })
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const userData = await response.json()
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      })

      if (!response.ok) {
        throw new Error('Signup failed')
      }

      const userData = await response.json()
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      // TODO: Replace with actual API call
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      localStorage.removeItem('user')
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: user !== null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
