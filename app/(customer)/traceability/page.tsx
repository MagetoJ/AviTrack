'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { TraceabilityTimeline } from '@/components/customer/TraceabilityTimeline'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Download, Share2 } from 'lucide-react'

interface Order {
  orderId: string
  date: string
  product: string
  batchId: string
  status: 'delivered' | 'pending' | 'shipped'
}

const mockOrders: Order[] = [
  {
    orderId: 'ORD-2024-001',
    date: '2024-12-13',
    product: 'Whole Chicken (2.5kg)',
    batchId: 'BATCH-2024-001',
    status: 'delivered',
  },
  {
    orderId: 'ORD-2024-002',
    date: '2024-12-10',
    product: 'Chicken Breast (0.35kg)',
    batchId: 'BATCH-2024-002',
    status: 'delivered',
  },
]

const mockTimelineEvents = [
  {
    date: '2024-11-15',
    title: 'Batch Hatched',
    description: 'BATCH-2024-001 hatched with 16,000 birds. Breed: Broiler (Ross 308)',
    status: 'completed' as const,
    icon: 'hatch' as const,
  },
  {
    date: '2024-11-17',
    title: 'Health Inspection & Vaccination',
    description: 'Complete health check performed. Routine vaccination (Newcastle) administered. 100% flock immunity target met.',
    status: 'completed' as const,
    icon: 'health' as const,
  },
  {
    date: '2024-11-25',
    title: 'Isolated Treatment',
    description: 'Minor respiratory symptoms detected in 15 birds. Isolated in Sick Bay. Treated with Tylosin (5 days). Withdrawal period cleared on Dec 5.',
    status: 'completed' as const,
    icon: 'health' as const,
  },
  {
    date: '2024-11-18 - 2024-12-10',
    title: 'Rearing Period',
    description:
      'Daily monitoring: Feed: 500kg/day, Water: 1200L/day. Mortality rate: 1.2% (Normal)',
    status: 'completed' as const,
    icon: 'feed' as const,
  },
  {
    date: '2024-12-10',
    title: 'Pre-Slaughter Health Check',
    description: 'Final health inspection before processing. All birds cleared for slaughter.',
    status: 'completed' as const,
    icon: 'health' as const,
  },
  {
    date: '2024-12-10',
    title: 'Slaughter & Processing',
    description: '1,500 birds processed. Live weight: 3,750kg. Dressed weight: 2,850kg (76% yield)',
    status: 'completed' as const,
    icon: 'slaughter' as const,
  },
  {
    date: '2024-12-11',
    title: 'Quality Assurance',
    description: 'Product tested for quality, hygiene, and microbial standards. All tests passed.',
    status: 'completed' as const,
    icon: 'location' as const,
  },
  {
    date: '2024-12-13',
    title: 'Delivery',
    description: 'Product delivered to customer. Cold chain maintained throughout.',
    status: 'completed' as const,
    icon: 'delivery' as const,
  },
]

export default function CustomerTraceability() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    mockOrders[0] || null
  )

  const filteredOrders = mockOrders.filter(
    (order) =>
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.batchId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <Badge className="bg-success-100 text-success-800 hover:bg-success-100">
            Delivered
          </Badge>
        )
      case 'shipped':
        return (
          <Badge className="bg-primary-100 text-primary-800 hover:bg-primary-100">
            Shipped
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-warning-100 text-warning-800 hover:bg-warning-100">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <MainLayout
      pageTitle="Traceability"
      userRole="customer"
      userName="Farmer Ahmed"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Product Traceability
        </h1>
        <p className="text-muted-foreground">
          View the complete lifecycle history of your purchased products
        </p>
      </div>

      {/* Search and Order Selection */}
      <Card className="mb-8 p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Select Order</h3>
        
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by Order ID or Batch ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-2">
          {filteredOrders.map((order) => (
            <button
              key={order.orderId}
              onClick={() => setSelectedOrder(order)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedOrder?.orderId === order.orderId
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{order.orderId}</p>
                  <p className="text-sm text-muted-foreground">{order.product}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Batch: {order.batchId} • Ordered: {order.date}
                  </p>
                </div>
                {getStatusBadge(order.status)}
              </div>
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        )}
      </Card>

      {/* Traceability Details */}
      {selectedOrder && (
        <div className="space-y-6">
          {/* Timeline */}
          <TraceabilityTimeline
            batchId={selectedOrder.batchId}
            breed="Broiler (Ross 308)"
            hatchDate="2024-11-15"
            slaughterDate="2024-12-10"
            events={mockTimelineEvents}
          />

          {/* Actions */}
          <Card className="p-6 flex flex-col sm:flex-row gap-3">
            <Button className="flex-1 bg-primary hover:bg-primary/90">
              <Download className="mr-2 h-4 w-4" />
              Download Report (PDF)
            </Button>
            <Button variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share Traceability
            </Button>
          </Card>

          {/* Certificate */}
          <Card className="p-6 bg-gradient-to-r from-success/5 to-success/10">
            <h3 className="text-lg font-bold text-foreground mb-3">
              Food Safety Certificate
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              This product has passed all quality and safety checks.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600 mb-1">✓</div>
                <p className="text-xs text-muted-foreground">Health Cleared</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600 mb-1">✓</div>
                <p className="text-xs text-muted-foreground">Quality Assured</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600 mb-1">✓</div>
                <p className="text-xs text-muted-foreground">Cold Chain</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600 mb-1">✓</div>
                <p className="text-xs text-muted-foreground">Fully Traceable</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </MainLayout>
  )
}
