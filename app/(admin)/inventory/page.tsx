'use client'

import { MainLayout } from '@/components/layout/MainLayout'
import { InventoryChart } from '@/components/admin/InventoryChart'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ArrowDownLeft, Package } from 'lucide-react'

const inventoryData = [
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

const inventoryItems = [
  {
    id: 'PROD-001',
    type: 'Whole Chicken',
    batch: 'BATCH-2024-001',
    quantity: 850,
    unit: 'kg',
    price: 3.50,
    status: 'available' as const,
  },
  {
    id: 'PROD-002',
    type: 'Chicken Breast',
    batch: 'BATCH-2024-002',
    quantity: 450,
    unit: 'kg',
    price: 5.80,
    status: 'available' as const,
  },
  {
    id: 'PROD-003',
    type: 'Chicken Wings',
    batch: 'BATCH-2024-003',
    quantity: 320,
    unit: 'kg',
    price: 2.50,
    status: 'low_stock' as const,
  },
  {
    id: 'PROD-004',
    type: 'Chicken Thighs',
    batch: 'BATCH-2024-001',
    quantity: 15,
    unit: 'kg',
    price: 3.20,
    status: 'low_stock' as const,
  },
  {
    id: 'PROD-005',
    type: 'Ground Chicken',
    batch: 'BATCH-2024-002',
    quantity: 200,
    unit: 'kg',
    price: 4.50,
    status: 'available' as const,
  },
]

const totalStats = {
  live: 45230,
  ailing: 342,
  dressed: 2850,
  processed: 830,
}

export default function InventoryPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return (
          <Badge className="bg-success-100 text-success-800 hover:bg-success-100">
            Available
          </Badge>
        )
      case 'low_stock':
        return (
          <Badge className="bg-warning-100 text-warning-800 hover:bg-warning-100">
            Low Stock
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <MainLayout
      pageTitle="Inventory Management"
      userRole="admin"
      userName="John Supervisor"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Inventory Overview</h1>
        <p className="text-muted-foreground">
          Track live stock, ailing birds, and dressed products across all sheds
        </p>
      </div>

      {/* Summary Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Live Stock</p>
          <p className="mt-2 text-2xl font-bold text-foreground">
            {totalStats.live.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-success-600 flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3" />
            +320 today
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Ailing/Quarantine</p>
          <p className="mt-2 text-2xl font-bold text-foreground">
            {totalStats.ailing.toLocaleString()}
          </p>
          <p className="mt-1 text-xs text-success-600 flex items-center gap-1">
            <ArrowDownLeft className="h-3 w-3" />
            -45 today
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Dressed Stock</p>
          <p className="mt-2 text-2xl font-bold text-foreground">
            {totalStats.dressed.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">kg</p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Processed</p>
          <p className="mt-2 text-2xl font-bold text-foreground">
            {totalStats.processed.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground mt-1">kg</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InventoryChart
          data={inventoryData}
          type="bar"
          title="Inventory Status by Shed"
          height={300}
        />
        <InventoryChart
          data={inventoryData}
          type="pie"
          title="Overall Inventory Distribution"
          height={300}
        />
      </div>

      {/* Products Table */}
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Dressed Products</h2>
            <p className="text-sm text-muted-foreground">
              Available products from active batches
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Package className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price/Unit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.batch}</TableCell>
                  <TableCell className="text-right">
                    {item.quantity} {item.unit}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${(item.quantity * item.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Inventory Value</p>
            <p className="mt-2 text-3xl font-bold text-foreground">
              $
              {inventoryItems
                .reduce((total, item) => total + item.quantity * item.price, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </MainLayout>
  )
}
