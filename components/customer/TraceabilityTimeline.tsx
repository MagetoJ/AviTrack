'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2,
  AlertCircle,
  MapPin,
  Heart,
  Leaf,
  ShoppingCart,
} from 'lucide-react'

interface TimelineEvent {
  date: string
  title: string
  description: string
  status: 'completed' | 'alert' | 'info'
  icon?: 'hatch' | 'health' | 'feed' | 'location' | 'slaughter' | 'delivery'
}

interface TraceabilityTimelineProps {
  batchId: string
  breed: string
  hatchDate: string
  slaughterDate: string
  events: TimelineEvent[]
}

export function TraceabilityTimeline({
  batchId,
  breed,
  hatchDate,
  slaughterDate,
  events,
}: TraceabilityTimelineProps) {
  const getIcon = (icon?: string) => {
    switch (icon) {
      case 'hatch':
        return <Heart className="h-5 w-5" />
      case 'health':
        return <AlertCircle className="h-5 w-5" />
      case 'feed':
        return <Leaf className="h-5 w-5" />
      case 'location':
        return <MapPin className="h-5 w-5" />
      case 'slaughter':
        return <ShoppingCart className="h-5 w-5" />
      case 'delivery':
        return <CheckCircle2 className="h-5 w-5" />
      default:
        return <CheckCircle2 className="h-5 w-5" />
    }
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'alert':
        return {
          bg: 'bg-error-50',
          border: 'border-error-200',
          text: 'text-error-800',
          badge: 'bg-error-100 text-error-800',
        }
      case 'info':
        return {
          bg: 'bg-primary-50',
          border: 'border-primary-200',
          text: 'text-primary-800',
          badge: 'bg-primary-100 text-primary-800',
        }
      default:
        return {
          bg: 'bg-success-50',
          border: 'border-success-200',
          text: 'text-success-800',
          badge: 'bg-success-100 text-success-800',
        }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Traceability Report
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase">Batch ID</p>
            <p className="text-sm font-semibold text-foreground">{batchId}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Breed</p>
            <p className="text-sm font-semibold text-foreground">{breed}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Hatch Date</p>
            <p className="text-sm font-semibold text-foreground">{hatchDate}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Slaughter Date</p>
            <p className="text-sm font-semibold text-foreground">{slaughterDate}</p>
          </div>
        </div>
      </Card>

      {/* Timeline */}
      <div className="space-y-4">
        {events.map((event, index) => {
          const styles = getStatusStyles(event.status)
          const isLast = index === events.length - 1

          return (
            <div key={index} className="flex gap-4">
              {/* Timeline Connector */}
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full ${styles.bg} border-2 ${styles.border}`}>
                  {getIcon(event.icon)}
                </div>
                {!isLast && (
                  <div className="w-0.5 h-12 bg-border mt-2"></div>
                )}
              </div>

              {/* Event Card */}
              <Card className={`flex-1 p-4 ${styles.bg} border ${styles.border}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-semibold ${styles.text}`}>{event.title}</h3>
                  <Badge className={styles.badge} variant="outline">
                    {event.status === 'completed' && '✓ Completed'}
                    {event.status === 'alert' && '⚠ Alert'}
                    {event.status === 'info' && 'ℹ Info'}
                  </Badge>
                </div>
                <p className={`text-sm ${styles.text} mb-2`}>{event.description}</p>
                <p className="text-xs text-muted-foreground">{event.date}</p>
              </Card>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <Card className="p-6 bg-muted/30">
        <h3 className="font-bold text-foreground mb-3">Food Safety Summary</h3>
        <ul className="space-y-2 text-sm text-foreground">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success-600" />
            <span>All health checks passed</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success-600" />
            <span>Withdrawal period compliance verified</span>
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success-600" />
            <span>Slaughter and processing protocols followed</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
