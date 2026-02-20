'use client'

import { ReactNode } from 'react'
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface KPICardProps {
  icon: ReactNode
  label: string
  value: string | number
  unit?: string
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string | number
  trendLabel?: string
  status?: 'normal' | 'warning' | 'alert'
  onClick?: () => void
}

export function KPICard({
  icon,
  label,
  value,
  unit = '',
  trend,
  trendValue,
  trendLabel = '',
  status = 'normal',
  onClick,
}: KPICardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'warning':
        return 'border-warning-600 bg-warning-50'
      case 'alert':
        return 'border-error-600 bg-error-50'
      default:
        return 'border-border'
    }
  }

  const getTrendColor = () => {
    if (status === 'alert') return 'text-error-600'
    if (status === 'warning') return 'text-warning-600'
    return 'text-success-600'
  }

  return (
    <Card
      onClick={onClick}
      className={cn(
        'overflow-hidden border-2 transition-all duration-200 hover:shadow-md cursor-pointer',
        getStatusColor(status),
        onClick && 'hover:scale-105'
      )}
    >
      <div className="p-6">
        {/* Header with Icon and Status Indicator */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          {trend && (
            <div className="flex items-center gap-1">
              {trend === 'up' && <ArrowUp className="h-4 w-4 text-success-600" />}
              {trend === 'down' && <ArrowDown className="h-4 w-4 text-error-600" />}
              {trend === 'stable' && <Minus className="h-4 w-4 text-muted-foreground" />}
              {trendValue && (
                <span className={cn('text-sm font-semibold', getTrendColor())}>
                  {trend === 'up' ? '+' : ''}{trendValue}%
                </span>
              )}
            </div>
          )}
        </div>

        {/* Label */}
        <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>

        {/* Main Value */}
        <div className="flex items-baseline gap-2 mb-3">
          <h3 className="text-3xl font-bold text-foreground">{value}</h3>
          {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
        </div>

        {/* Trend Label */}
        {trendLabel && (
          <p className="text-xs text-muted-foreground">{trendLabel}</p>
        )}
      </div>
    </Card>
  )
}
