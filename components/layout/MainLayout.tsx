'use client'

import { useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface MainLayoutProps {
  children: React.ReactNode
  pageTitle: string
  userRole?: 'admin' | 'staff' | 'customer'
  userName?: string
}

export function MainLayout({
  children,
  pageTitle,
  userRole = 'admin',
  userName = 'User',
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        userRole={userRole}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <Header
          title={pageTitle}
          userRole={userRole}
          userName={userName}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
