'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Users,
  ClipboardList,
  ShoppingCart,
  FileText,
  AlertCircle,
  Activity,
  Layers,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarItem {
  label: string
  href: string
  icon: React.ReactNode
  roles?: ('admin' | 'staff' | 'customer')[]
}

interface SidebarProps {
  userRole?: 'admin' | 'staff' | 'customer'
  isOpen?: boolean
  onClose?: () => void
}

const adminItems: SidebarItem[] = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: 'Batches',
    href: '/admin/batches',
    icon: <Layers className="h-5 w-5" />,
  },
  {
    label: 'Inventory',
    href: '/admin/inventory',
    icon: <Package className="h-5 w-5" />,
  },
  {
    label: 'Staff',
    href: '/admin/staff',
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: 'Alerts',
    href: '/admin/alerts',
    icon: <AlertCircle className="h-5 w-5" />,
  },
  {
    label: 'Reports',
    href: '/admin/reports',
    icon: <FileText className="h-5 w-5" />,
  },
]

const staffItems: SidebarItem[] = [
  {
    label: 'Daily Entry',
    href: '/staff/daily-entry',
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    label: 'My Submissions',
    href: '/staff/submissions',
    icon: <FileText className="h-5 w-5" />,
  },
]

const customerItems: SidebarItem[] = [
  {
    label: 'Catalog',
    href: '/customer/catalog',
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    label: 'Cart',
    href: '/customer/cart',
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    label: 'Orders',
    href: '/customer/orders',
    icon: <Package className="h-5 w-5" />,
  },
  {
    label: 'Traceability',
    href: '/customer/traceability',
    icon: <Activity className="h-5 w-5" />,
  },
]

export function Sidebar({ userRole = 'admin', isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()

  const items =
    userRole === 'admin'
      ? adminItems
      : userRole === 'staff'
        ? staffItems
        : customerItems

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-background transition-all duration-300 ease-in-out lg:static lg:z-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <nav className="space-y-2 overflow-y-auto px-4 py-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
                isActive(item.href)
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  )
}
