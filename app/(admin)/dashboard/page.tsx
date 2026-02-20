'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { KPICard } from '@/components/admin/KPICard'
import { BatchCard } from '@/components/admin/BatchCard'
import { InventoryChart } from '@/components/admin/InventoryChart'
import { MortalityAlert } from '@/components/admin/MortalityAlert'
import { StaffPerformance } from '@/components/admin/StaffPerformance'
import { ProfitLossSummary } from '@/components/admin/ProfitLossSummary'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Activity,
  Layers,
  Clock,
  DollarSign,
  Users,
  ShieldAlert,
} from 'lucide-react'

// Mock data
const mockAlerts = [
  {
    batchId: 'BATCH-2024-001',
    shedLocation: 'Shed A',
    mortalityRate: 5.2,
    affectedCount: 25,
  },
]

const mockKPIs = [
  {
    icon: <Activity className="h-6 w-6" />,
    label: 'Live Stock',
    value: '45,230',
    unit: 'birds',
    trend: 'up' as const,
    trendValue: 3.2,
    trendLabel: 'vs last week',
    status: 'normal' as const,
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    label: 'Estimated Profit',
    value: '$124,500',
    unit: 'USD',
    trend: 'up' as const,
    trendValue: 8.4,
    trendLabel: 'vs last batch',
    status: 'normal' as const,
  },
  {
    icon: <Users className="h-6 w-6" />,
    label: 'Staff Efficiency',
    value: '94',
    unit: '%',
    trend: 'stable' as const,
    trendLabel: 'on-time check-ins',
    status: 'normal' as const,
  },
  {
    icon: <ShieldAlert className="h-6 w-6" />,
    label: 'Health Alerts',
    value: '1',
    unit: 'Active',
    trend: 'up' as const,
    trendValue: 100,
    trendLabel: 'Biosecurity Alert!',
    status: 'alert' as const,
  },
]

const mockBatches = [
  {
    batchId: 'BATCH-2024-001',
    breed: 'Broiler (Ross 308)',
    hatchDate: '2024-11-15',
    daysOld: 28,
    location: 'Shed A',
    liveCount: 15230,
    mortalityRate: 1.2,
    fcr: 1.85,
    status: 'active' as const,
  },
  {
    batchId: 'BATCH-2024-002',
    breed: 'Layer (Hy-Line Brown)',
    hatchDate: '2024-11-20',
    daysOld: 23,
    location: 'Shed B',
    liveCount: 18500,
    mortalityRate: 0.8,
    fcr: 1.72,
    status: 'active' as const,
  },
  {
    batchId: 'BATCH-2024-003',
    breed: 'Broiler (Ross 308)',
    hatchDate: '2024-10-20',
    daysOld: 48,
    location: 'Shed C',
    liveCount: 11500,
    mortalityRate: 2.1,
    fcr: 1.92,
    status: 'active' as const,
  },
]

const mockInventoryData = [
  {
    name: 'Shed A',
    live: 15230,
    ailing: 150,
    dressed: 850,
    processed: 200,
  },
  {
    name: 'Shed B',
    live: 18500,
    ailing: 120,
    dressed: 1200,
    processed: 350,
  },
  {
    name: 'Shed C',
    live: 11500,
    ailing: 72,
    dressed: 800,
    processed: 280,
  },
]

export default function AdminDashboard() {
  return (
    <MainLayout
      pageTitle="Admin Dashboard"
      userRole="admin"
      userName="John Supervisor"
    >
      {/* Alerts Section */}
      {mockAlerts.length > 0 && (
        <div className="mb-8">
          {mockAlerts.map((alert) => (
            <MortalityAlert
              key={`${alert.batchId}-${alert.shedLocation}`}
              {...alert}
            />
          ))}
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockKPIs.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Financial Overview */}
      <div className="mb-8">
        <ProfitLossSummary />
      </div>

      {/* Charts Section */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InventoryChart
          data={mockInventoryData}
          type="bar"
          title="Inventory by Shed (Bar Chart)"
          height={300}
        />
        <InventoryChart
          data={mockInventoryData}
          type="pie"
          title="Overall Inventory Distribution"
          height={300}
        />
      </div>

      {/* Batches Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Active Batches</h2>
            <p className="text-muted-foreground">Manage and monitor all poultry batches</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Layers className="mr-2 h-4 w-4" />
            New Batch
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {mockBatches.map((batch) => (
            <BatchCard
              key={batch.batchId}
              {...batch}
              onView={() => console.log('View batch:', batch.batchId)}
              onEdit={() => console.log('Edit batch:', batch.batchId)}
              onDelete={() => console.log('Delete batch:', batch.batchId)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Grid: Staff Performance & Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Staff Performance (Takes 2 columns) */}
        <div className="lg:col-span-2">
          <StaffPerformance />
        </div>

        {/* Recent Activity (Takes 1 column) */}
        <div className="lg:col-span-1">
          <Card className="p-6 h-full">
            <div className="mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
            </div>
            <div className="space-y-4">
              {[
                {
                  action: 'Slaughter Record',
                  batch: 'BATCH-2024-001',
                  details: '150 birds processed',
                  time: '2h ago',
                },
                {
                  action: 'Isolation Entry',
                  batch: 'BATCH-2024-002',
                  details: '5 birds isolated',
                  time: '4h ago',
                },
                {
                  action: 'Feed Intake Log',
                  batch: 'BATCH-2024-003',
                  details: '500kg recorded',
                  time: '6h ago',
                },
                {
                  action: 'Mortality Report',
                  batch: 'BATCH-2024-001',
                  details: '2 birds mortality',
                  time: '1d ago',
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-between border-b border-border pb-4 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.batch} • {activity.details}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
