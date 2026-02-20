'use client'

import { AlertCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface MortalityAlertProps {
  batchId: string
  shedLocation: string
  mortalityRate: number
  affectedCount: number
  timeframe?: string
  onDismiss?: () => void
}

export function MortalityAlert({
  batchId,
  shedLocation,
  mortalityRate,
  affectedCount,
  timeframe = '24 hours',
  onDismiss,
}: MortalityAlertProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) return null

  const handleDismiss = () => {
    setIsDismissed(true)
    onDismiss?.()
  }

  const getAlertLevel = (rate: number) => {
    if (rate > 5) return 'critical'
    if (rate > 2) return 'high'
    return 'medium'
  }

  const alertLevel = getAlertLevel(mortalityRate)

  const getAlertStyles = (level: string) => {
    switch (level) {
      case 'critical':
        return {
          container: 'bg-error-50 border-error-200 border-l-4 border-l-error-600',
          icon: 'text-error-600',
          text: 'text-error-800',
          title: 'text-error-900',
          button: 'hover:bg-error-100',
        }
      case 'high':
        return {
          container: 'bg-warning-50 border-warning-200 border-l-4 border-l-warning-600',
          icon: 'text-warning-600',
          text: 'text-warning-800',
          title: 'text-warning-900',
          button: 'hover:bg-warning-100',
        }
      default:
        return {
          container: 'bg-primary-50 border-primary-200 border-l-4 border-l-primary-600',
          icon: 'text-primary-600',
          text: 'text-primary-800',
          title: 'text-primary-900',
          button: 'hover:bg-primary-100',
        }
    }
  }

  const styles = getAlertStyles(alertLevel)

  return (
    <div className={`rounded-lg p-4 mb-6 ${styles.container}`}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <AlertCircle className={`h-6 w-6 flex-shrink-0 mt-0.5 ${styles.icon}`} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-base mb-1 ${styles.title}`}>
            High Mortality Alert
          </h3>
          <div className={`space-y-1 text-sm ${styles.text}`}>
            <p>
              <strong>Batch:</strong> {batchId}
            </p>
            <p>
              <strong>Location:</strong> {shedLocation}
            </p>
            <p>
              <strong>Mortality Rate:</strong> {mortalityRate.toFixed(2)}% in {timeframe}
            </p>
            <p>
              <strong>Birds Affected:</strong> {affectedCount}
            </p>
          </div>
          <p className={`text-xs mt-3 ${styles.text}`}>
            Immediate investigation recommended. Consult veterinary team if rate exceeds 3%.
          </p>
        </div>

        {/* Dismiss Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className={`flex-shrink-0 mt-0.5 ${styles.button}`}
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
