'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface BatchCardProps {
  batchId: string
  breed: string
  hatchDate: string
  daysOld: number
  location: string
  liveCount: number
  mortalityRate: number
  fcr?: number
  status?: 'active' | 'completed' | 'culled'
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function BatchCard({
  batchId,
  breed,
  hatchDate,
  daysOld,
  location,
  liveCount,
  mortalityRate,
  fcr,
  status = 'active',
  onView,
  onEdit,
  onDelete,
}: BatchCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800'
      case 'completed':
        return 'bg-primary-100 text-primary-800'
      case 'culled':
        return 'bg-error-100 text-error-800'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getMortalityColor = (rate: number) => {
    if (rate > 2) return 'text-error-600'
    if (rate > 1) return 'text-warning-600'
    return 'text-success-600'
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-border">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-border bg-muted/30 p-4">
        <div>
          <h3 className="font-semibold text-foreground text-lg">{batchId}</h3>
          <p className="text-sm text-muted-foreground">{breed}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(status)} variant="outline">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onView && <DropdownMenuItem onClick={onView}>View Details</DropdownMenuItem>}
              {onEdit && <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>}
              {onDelete && <DropdownMenuItem onClick={onDelete} className="text-error">Delete</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Hatch Date</p>
            <p className="text-sm font-medium text-foreground">{hatchDate}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Days Old</p>
            <p className="text-sm font-medium text-foreground">{daysOld} days</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Location</p>
            <p className="text-sm font-medium text-foreground">{location}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Live Count</p>
            <p className="text-sm font-medium text-foreground">{liveCount.toLocaleString()}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="border-t border-border pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Mortality Rate</span>
            <span className={`text-sm font-semibold ${getMortalityColor(mortalityRate)}`}>
              {mortalityRate.toFixed(2)}%
            </span>
          </div>
          {fcr !== undefined && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Feed Conversion Ratio</span>
              <span className="text-sm font-semibold text-foreground">{fcr.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
