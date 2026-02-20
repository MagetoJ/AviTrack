'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { dailyEntrySchema, type DailyEntryInput } from '@/lib/validation'
import { CheckCircle, AlertCircle } from 'lucide-react'

interface DailyEntryFormProps {
  batchId?: string
  onSuccess?: () => void
}

export function DailyEntryForm({ batchId, onSuccess }: DailyEntryFormProps) {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<DailyEntryInput>({
    resolver: zodResolver(dailyEntrySchema),
    defaultValues: {
      batchId: batchId || '',
      date: new Date(),
      mortalityReason: 'unknown',
    },
  })

  const currentBatchId = watch('batchId')
  const mortalityCount = watch('mortalityCount')

  const onSubmit = async (data: DailyEntryInput) => {
    try {
      setSubmitStatus({ type: null, message: '' })
      
      // TODO: Replace with actual API call
      const response = await fetch('/api/staff/daily-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit daily entry')
      }

      setSubmitStatus({
        type: 'success',
        message: 'Daily entry submitted successfully!',
      })
      reset()
      onSuccess?.()
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'An error occurred',
      })
    }
  }

  return (
    <Card className="w-full p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Daily Entry Form</h2>
        <p className="text-muted-foreground">
          Record daily operations for your assigned shed
        </p>
      </div>

      {/* Success/Error Messages */}
      {submitStatus.type === 'success' && (
        <Alert className="mb-6 border-success-200 bg-success-50">
          <CheckCircle className="h-4 w-4 text-success-600" />
          <AlertDescription className="text-success-800">
            {submitStatus.message}
          </AlertDescription>
        </Alert>
      )}

      {submitStatus.type === 'error' && (
        <Alert className="mb-6 border-error-200 bg-error-50">
          <AlertCircle className="h-4 w-4 text-error-600" />
          <AlertDescription className="text-error-800">
            {submitStatus.message}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Batch Selection */}
        <div className="space-y-2">
          <Label htmlFor="batchId">Batch ID</Label>
          <Select value={currentBatchId} onValueChange={(value) => setValue('batchId', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a batch..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BATCH-2024-001">BATCH-2024-001 (Shed A)</SelectItem>
              <SelectItem value="BATCH-2024-002">BATCH-2024-002 (Shed B)</SelectItem>
              <SelectItem value="BATCH-2024-003">BATCH-2024-003 (Shed C)</SelectItem>
            </SelectContent>
          </Select>
          {errors.batchId && (
            <p className="text-sm text-error-600">{errors.batchId.message}</p>
          )}
        </div>

        {/* Shed Selection */}
        <div className="space-y-2">
          <Label htmlFor="shedId">Shed/House</Label>
          <Select defaultValue="shed-a" onValueChange={(value) => setValue('shedId', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shed-a">Shed A</SelectItem>
              <SelectItem value="shed-b">Shed B</SelectItem>
              <SelectItem value="shed-c">Shed C</SelectItem>
            </SelectContent>
          </Select>
          {errors.shedId && (
            <p className="text-sm text-error-600">{errors.shedId.message}</p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            type="date"
            {...register('date', {
              setValueAs: (value) => new Date(value),
            })}
          />
          {errors.date && (
            <p className="text-sm text-error-600">{errors.date.message}</p>
          )}
        </div>

        {/* Feed Intake */}
        <div className="space-y-2">
          <Label htmlFor="feedIntake">Feed Intake (kg)</Label>
          <Input
            type="number"
            step="0.1"
            min="0"
            placeholder="Enter feed amount in kilograms"
            {...register('feedIntake', { valueAsNumber: true })}
          />
          {errors.feedIntake && (
            <p className="text-sm text-error-600">{errors.feedIntake.message}</p>
          )}
        </div>

        {/* Water Intake */}
        <div className="space-y-2">
          <Label htmlFor="waterIntake">Water Intake (liters)</Label>
          <Input
            type="number"
            step="0.1"
            min="0"
            placeholder="Enter water amount in liters"
            {...register('waterIntake', { valueAsNumber: true })}
          />
          {errors.waterIntake && (
            <p className="text-sm text-error-600">{errors.waterIntake.message}</p>
          )}
        </div>

        {/* Mortality Count */}
        <div className="space-y-2">
          <Label htmlFor="mortalityCount">Mortality Count</Label>
          <Input
            type="number"
            min="0"
            placeholder="Number of dead birds"
            {...register('mortalityCount', { valueAsNumber: true })}
          />
          {errors.mortalityCount && (
            <p className="text-sm text-error-600">{errors.mortalityCount.message}</p>
          )}
        </div>

        {/* Mortality Reason */}
        {mortalityCount > 0 && (
          <div className="space-y-2">
            <Label htmlFor="mortalityReason">Cause of Mortality</Label>
            <Select defaultValue="unknown" onValueChange={(value) => setValue('mortalityReason', value as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="disease">Disease</SelectItem>
                <SelectItem value="injury">Injury</SelectItem>
                <SelectItem value="weakness">Weakness</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
            {errors.mortalityReason && (
              <p className="text-sm text-error-600">{errors.mortalityReason.message}</p>
            )}
          </div>
        )}

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Additional Notes</Label>
          <Textarea
            placeholder="Any additional observations or notes..."
            {...register('notes')}
            className="min-h-24"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-medium"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Daily Entry'}
        </Button>
      </form>
    </Card>
  )
}
