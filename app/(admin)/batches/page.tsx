'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { BatchCard } from '@/components/admin/BatchCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Plus, Search } from 'lucide-react'
import { useState } from 'react'

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
  {
    batchId: 'BATCH-2024-004',
    breed: 'Layer (Hy-Line Brown)',
    hatchDate: '2024-09-15',
    daysOld: 77,
    location: 'Shed D',
    liveCount: 5200,
    mortalityRate: 3.5,
    fcr: 2.15,
    status: 'completed' as const,
  },
]

export default function BatchesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredBatches = mockBatches.filter((batch) => {
    const matchesSearch =
      batch.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      batch.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === 'all' || batch.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <MainLayout
      pageTitle="Batch Management"
      userRole="admin"
      userName="John Supervisor"
    >
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Batch Management</h1>
          <p className="text-muted-foreground">
            View and manage all poultry batches in the system
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create New Batch
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-8 p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by batch ID, breed, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="culled">Culled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredBatches.length} of {mockBatches.length} batches
        </div>
      </Card>

      {/* Batches Grid */}
      {filteredBatches.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filteredBatches.map((batch) => (
            <BatchCard
              key={batch.batchId}
              {...batch}
              onView={() => console.log('View batch:', batch.batchId)}
              onEdit={() => console.log('Edit batch:', batch.batchId)}
              onDelete={() => console.log('Delete batch:', batch.batchId)}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-lg text-muted-foreground">
            No batches found matching your criteria
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm('')
              setStatusFilter('all')
            }}
          >
            Clear Filters
          </Button>
        </Card>
      )}
    </MainLayout>
  )
}
