'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, LogOut, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface HeaderProps {
  title: string
  userRole?: 'admin' | 'staff' | 'customer'
  userName?: string
  onMenuToggle?: () => void
}

export function Header({
  title,
  userRole = 'admin',
  userName = 'User',
  onMenuToggle,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
    onMenuToggle?.()
  }

  const getRoleLabel = () => {
    const labels: Record<string, string> = {
      admin: 'Administrator',
      staff: 'Staff',
      customer: 'Customer',
    }
    return labels[userRole] || 'User'
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left - Logo and Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleMenuToggle}
            className="inline-flex lg:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              AT
            </div>
            <span className="hidden font-bold text-foreground sm:inline">
              AviTrack
            </span>
          </Link>
        </div>

        {/* Center - Page Title */}
        <h1 className="text-lg font-semibold text-foreground hidden sm:block">
          {title}
        </h1>

        {/* Right - User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="relative h-10 w-10 rounded-full bg-primary/10 hover:bg-primary/20"
            >
              <User className="h-5 w-5 text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex flex-col gap-1 px-2 py-1.5">
              <p className="text-sm font-medium text-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">{getRoleLabel()}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-error">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
