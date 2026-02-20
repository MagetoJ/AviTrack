'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { DailyEntryForm } from '@/components/staff/DailyEntryForm'
import { SlaughterModal } from '@/components/staff/SlaughterModal'
import { SickBayModal } from '@/components/staff/SickBayModal'
import { RecentSubmissions } from '@/components/staff/RecentSubmissions'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, AlertCircle } from 'lucide-react'

const today = new Date()
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
})

export default function StaffDailyEntry() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <MainLayout
      pageTitle="Daily Operations"
      userRole="staff"
      userName="Ahmed Hassan"
    >
      {/* Header with greeting and date */}
      <div className="mb-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Good {today.getHours() < 12 ? 'Morning' : 'Afternoon'}, Ahmed
            </h1>
            <div className="mt-2 flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <p>{dateFormatter.format(today)}</p>
            </div>
          </div>
          <div className="text-right">
            <Badge className="bg-success-100 text-success-800 hover:bg-success-100">
              Shed A Assigned
            </Badge>
          </div>
        </div>
      </div>

      {/* Current Batch Info */}
      <Card className="mb-8 border-primary/20 bg-primary/5 p-4">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Batch</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              BATCH-2024-001
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Breed</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              Broiler (Ross 308)
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Days Old</p>
            <p className="mt-1 text-lg font-semibold text-foreground">28</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Live Count</p>
            <p className="mt-1 text-lg font-semibold text-foreground">
              15,230
            </p>
          </div>
        </div>
      </Card>

      {/* Alert if high mortality */}
      <Card className="mb-8 border-l-4 border-l-warning-600 bg-warning-50 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-warning-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-warning-900">
              Monitor Mortality Today
            </p>
            <p className="text-sm text-warning-800 mt-1">
              Yesterday's mortality rate was 1.2%. Please report any unusual deaths immediately.
            </p>
          </div>
        </div>
      </Card>

      {/* Main Form Section - Full width on mobile, more readable on desktop */}
      <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form Column */}
        <div className="lg:col-span-2">
          <DailyEntryForm
            batchId="BATCH-2024-001"
            onSuccess={() => setRefreshKey((prev) => prev + 1)}
          />
        </div>

        {/* Quick Actions Sidebar */}
        <div className="flex flex-col gap-4">
          <Card className="p-6">
            <h3 className="mb-4 text-lg font-bold text-foreground">Quick Actions</h3>
            <div className="space-y-3">
              <SlaughterModal
                batchId="BATCH-2024-001"
                onSuccess={() => setRefreshKey((prev) => prev + 1)}
              />
              <SickBayModal
                batchId="BATCH-2024-001"
                onSuccess={() => setRefreshKey((prev) => prev + 1)}
              />
              {/* Additional quick action buttons could go here */}
            </div>
          </Card>

          <Card className="p-4 bg-primary/5">
            <p className="text-sm font-medium text-foreground mb-3">Need Help?</p>
            <p className="text-xs text-muted-foreground mb-4">
              Report issues or ask questions to your supervisor immediately.
            </p>
            <button className="text-xs font-semibold text-primary hover:underline">
              Contact Supervisor
            </button>
          </Card>
        </div>
      </div>

      {/* Recent Submissions */}
      <RecentSubmissions
        key={refreshKey}
        onEdit={(id) => console.log('Edit submission:', id)}
        onDelete={(id) => console.log('Delete submission:', id)}
      />
    </MainLayout>
  )
}
