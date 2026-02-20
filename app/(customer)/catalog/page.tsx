'use client'

import { useState } from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { ProductCard } from '@/components/customer/ProductCard'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, Filter, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

const mockProducts = [
  {
    id: 'PROD-001',
    name: 'Whole Chicken (Dressed)',
    breed: 'Broiler (Ross 308)',
    batchId: 'BATCH-2024-001',
    hatchDate: '2024-11-15',
    daysOld: 28,
    weight: 2.5,
    weightUnit: 'kg',
    price: 3.50,
    availability: 850,
  },
  {
    id: 'PROD-007',
    name: 'Live Bird (Farm Gate)',
    breed: 'Broiler (Ross 308)',
    batchId: 'BATCH-2024-001',
    hatchDate: '2024-11-15',
    daysOld: 28,
    weight: 2.8,
    weightUnit: 'kg',
    price: 8.50,
    availability: 14500,
  },
  {
    id: 'PROD-002',
    name: 'Chicken Breast',
    breed: 'Broiler (Ross 308)',
    batchId: 'BATCH-2024-002',
    hatchDate: '2024-11-20',
    daysOld: 23,
    weight: 0.35,
    weightUnit: 'kg',
    price: 5.80,
    availability: 450,
  },
  {
    id: 'PROD-003',
    name: 'Chicken Wings',
    breed: 'Broiler (Ross 308)',
    batchId: 'BATCH-2024-003',
    hatchDate: '2024-10-20',
    daysOld: 48,
    weight: 0.2,
    weightUnit: 'kg',
    price: 2.50,
    availability: 320,
  },
  {
    id: 'PROD-004',
    name: 'Chicken Thighs',
    breed: 'Broiler (Ross 308)',
    batchId: 'BATCH-2024-001',
    hatchDate: '2024-11-15',
    daysOld: 28,
    weight: 0.15,
    weightUnit: 'kg',
    price: 3.20,
    availability: 15,
  },
  {
    id: 'PROD-005',
    name: 'Ground Chicken',
    breed: 'Broiler (Ross 308)',
    batchId: 'BATCH-2024-002',
    hatchDate: '2024-11-20',
    daysOld: 23,
    weight: 1.0,
    weightUnit: 'kg',
    price: 4.50,
    availability: 200,
  },
  {
    id: 'PROD-006',
    name: 'Chicken Drumstick',
    breed: 'Broiler (Ross 308)',
    batchId: 'BATCH-2024-003',
    hatchDate: '2024-10-20',
    daysOld: 48,
    weight: 0.12,
    weightUnit: 'kg',
    price: 2.80,
    availability: 0,
  },
]

export default function CustomerCatalog() {
  const [searchTerm, setSearchTerm] = useState('')
  const [productType, setProductType] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [cart, setCart] = useState<{ productId: string; quantity: number }[]>([])

  const filteredProducts = mockProducts
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.batchId.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = productType === 'all' || product.name.includes(productType)
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'availability':
          return b.availability - a.availability
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

  const handleAddToCart = (productId: string, quantity: number) => {
    setCart([...cart, { productId, quantity }])
    toast.success('Product added to cart!')
  }

  const handleViewDetails = (productId: string) => {
    // Navigate to product details page
    console.log('View details for:', productId)
  }

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <MainLayout
      pageTitle="Product Catalog"
      userRole="customer"
      userName="Farmer Ahmed"
    >
      {/* Hero Section */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Fresh Poultry Products
        </h1>
        <p className="text-lg text-muted-foreground">
          Premium quality poultry from AviTrack - Fully traceable from farm to table
        </p>
      </div>

      {/* Filters and Search */}
      <Card className="mb-8 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {/* Search */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Search Products
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or batch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Product Type Filter */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Product Type
            </label>
            <Select value={productType} onValueChange={setProductType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="Whole">Whole Chicken</SelectItem>
                <SelectItem value="Breast">Chicken Breast</SelectItem>
                <SelectItem value="Wings">Chicken Wings</SelectItem>
                <SelectItem value="Thighs">Chicken Thighs</SelectItem>
                <SelectItem value="Ground">Ground Chicken</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Sort By
            </label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Product Name</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="availability">Availability</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action */}
          <div className="flex items-end">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSearchTerm('')
                setProductType('all')
                setSortBy('name')
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {mockProducts.length} products
          </p>
          <Button className="bg-primary hover:bg-primary/90">
            <ShoppingCart className="mr-2 h-4 w-4" />
            View Cart ({cartCount})
          </Button>
        </div>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <p className="text-lg text-muted-foreground">
            No products found matching your criteria
          </p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => {
              setSearchTerm('')
              setProductType('all')
            }}
          >
            Clear Filters
          </Button>
        </Card>
      )}
    </MainLayout>
  )
}
