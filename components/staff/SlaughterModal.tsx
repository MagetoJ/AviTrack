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
import { slaughterSchema, type SlaughterInput } from '@/lib/validation'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface SlaughterModalProps {
  batchId?: string
  onSuccess?: () => void
}

export function SlaughterModal({ batchId, onSuccess }: SlaughterModalProps) {
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
  } = useForm<SlaughterInput>({
    resolver: zodResolver(slaughterSchema),
    defaultValues: {
      batchId: batchId || '',
    },
  })

  const onSubmit = async (data: SlaughterInput) => {
    try {
      setSubmitStatus({ type: null, message: '' })
      
      // TODO: Replace with actual API call
      const response = await fetch('/api/staff/slaughter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to record slaughter')
      }

      setSubmitStatus({
        type: 'success',
        message: 'Slaughter record created successfully!',
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
        <Button variant="outline">Record Slaughter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Record Slaughter</DialogTitle>
          <DialogDescription>
            Document the slaughter details for this batch
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
          {/* Batch ID (readonly if provided) */}
          {batchId && (
            <div className="space-y-2">
              <Label>Batch ID</Label>
              <div className="rounded-md bg-muted px-3 py-2 text-foreground">
                {batchId}
              </div>
            </div>
          )}

          {/* Head Count */}
          <div className="space-y-2">
            <Label htmlFor="headCount">Head Count (birds slaughtered)</Label>
            <Input
              type="number"
              min="1"
              placeholder="Number of birds"
              {...register('headCount', { valueAsNumber: true })}
            />
            {errors.headCount && (
              <p className="text-sm text-error-600">{errors.headCount.message}</p>
            )}
          </div>

          {/* Live Weight */}
          <div className="space-y-2">
            <Label htmlFor="liveWeight">Total Live Weight (kg)</Label>
            <Input
              type="number"
              step="0.1"
              min="0.1"
              placeholder="Total live weight"
              {...register('liveWeight', { valueAsNumber: true })}
            />
            {errors.liveWeight && (
              <p className="text-sm text-error-600">{errors.liveWeight.message}</p>
            )}
          </div>

          {/* Dressed Weight */}
          <div className="space-y-2">
            <Label htmlFor="dressedWeight">Total Dressed Weight (kg)</Label>
            <Input
              type="number"
              step="0.1"
              min="0.1"
              placeholder="Total dressed weight"
              {...register('dressedWeight', { valueAsNumber: true })}
            />
            {errors.dressedWeight && (
              <p className="text-sm text-error-600">{errors.dressedWeight.message}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              placeholder="Any additional notes..."
              {...register('notes')}
              className="min-h-20"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? 'Recording...' : 'Record Slaughter'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
