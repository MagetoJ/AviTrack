'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { sickBirdSchema, type SickBirdInput } from '@/lib/validation'
import { AlertCircle, CheckCircle, HeartPulse } from 'lucide-react'

interface SickBayModalProps {
  batchId?: string
  onSuccess?: () => void
}

export function SickBayModal({ batchId, onSuccess }: SickBayModalProps) {
  const [open, setOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SickBirdInput>({
    resolver: zodResolver(sickBirdSchema),
    defaultValues: {
      batchId: batchId || '',
      count: 1,
      withdrawalPeriodDays: 7,
    },
  })

  const onSubmit = async (data: SickBirdInput) => {
    try {
      setSubmitStatus({ type: null, message: '' })
      
      // TODO: Replace with actual API call
      const response = await fetch('/api/staff/quarantine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to record isolation')
      }

      setSubmitStatus({
        type: 'success',
        message: 'Bird(s) successfully moved to Sick Bay!',
      })
      
      setTimeout(() => {
        reset()
        setOpen(false)
        onSuccess?.()
      }, 2000)
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'An error occurred',
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-warning-600 text-warning-700 hover:bg-warning-50">
          <HeartPulse className="mr-2 h-4 w-4" />
          Isolate Sick Birds
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Move to Sick Bay (Quarantine)</DialogTitle>
          <DialogDescription>
            Isolate ailing birds from the main flock to prevent spread and start treatment.
          </DialogDescription>
        </DialogHeader>

        {submitStatus.type === 'success' && (
          <Alert className="border-success-200 bg-success-50">
            <CheckCircle className="h-4 w-4 text-success-600" />
            <AlertDescription className="text-success-800">
              {submitStatus.message}
            </AlertDescription>
          </Alert>
        )}

        {submitStatus.type === 'error' && (
          <Alert className="border-error-200 bg-error-50">
            <AlertCircle className="h-4 w-4 text-error-600" />
            <AlertDescription className="text-error-800">
              {submitStatus.message}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Batch ID */}
          {batchId && (
            <div className="space-y-2">
              <Label>Batch ID</Label>
              <div className="rounded-md bg-muted px-3 py-2 text-foreground">
                {batchId}
              </div>
            </div>
          )}

          {/* Count */}
          <div className="space-y-2">
            <Label htmlFor="count">Number of Birds to Isolate</Label>
            <Input
              type="number"
              min="1"
              placeholder="e.g., 5"
              {...register('count', { valueAsNumber: true })}
            />
            {errors.count && (
              <p className="text-sm text-error-600">{errors.count.message}</p>
            )}
          </div>

          {/* Symptoms */}
          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms Observed</Label>
            <Textarea
              placeholder="Describe symptoms (e.g., coughing, lethargy, diarrhea)"
              {...register('symptoms')}
              className="min-h-20"
            />
            {errors.symptoms && (
              <p className="text-sm text-error-600">{errors.symptoms.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Medication */}
            <div className="space-y-2">
              <Label htmlFor="medicationName">Medication</Label>
              <Input
                placeholder="e.g., Tylosin"
                {...register('medicationName')}
              />
              {errors.medicationName && (
                <p className="text-sm text-error-600">{errors.medicationName.message}</p>
              )}
            </div>

            {/* Dosage */}
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                placeholder="e.g., 0.5ml/bird"
                {...register('dosage')}
              />
              {errors.dosage && (
                <p className="text-sm text-error-600">{errors.dosage.message}</p>
              )}
            </div>
          </div>

          {/* Withdrawal Period */}
          <div className="space-y-2">
            <Label htmlFor="withdrawalPeriodDays">Withdrawal Period (Days)</Label>
            <Input
              type="number"
              min="0"
              placeholder="e.g., 7"
              {...register('withdrawalPeriodDays', { valueAsNumber: true })}
            />
            <p className="text-[10px] text-muted-foreground">
              Number of days to wait before slaughter after last dose.
            </p>
            {errors.withdrawalPeriodDays && (
              <p className="text-sm text-error-600">{errors.withdrawalPeriodDays.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-warning-600 hover:bg-warning-700 text-white"
          >
            {isSubmitting ? 'Recording...' : 'Record Isolation & Treatment'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
