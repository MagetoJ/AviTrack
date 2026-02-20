'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Heart, Info } from 'lucide-react'
import { useState } from 'react'

interface ProductCardProps {
  id: string
  name: string
  breed: string
  batchId: string
  hatchDate: string
  daysOld: number
  weight: number
  weightUnit: string
  price: number
  availability: number
  image?: string
  onAddToCart?: (productId: string, quantity: number) => void
  onViewDetails?: (productId: string) => void
}

export function ProductCard({
  id,
  name,
  breed,
  batchId,
  hatchDate,
  daysOld,
  weight,
  weightUnit,
  price,
  availability,
  image,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    onAddToCart?.(id, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const isOutOfStock = availability <= 0

  return (
    <Card className="overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      {/* Product Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative group">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-2">🐔</div>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
          aria-label="Add to favorites"
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? 'fill-error-600 text-error-600' : 'text-muted-foreground'
            }`}
          />
        </button>

        {/* Stock Badge */}
        {availability > 0 && (
          <Badge className="absolute bottom-2 left-2 bg-success-100 text-success-800">
            {availability} {weightUnit} Available
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Product Name and Batch */}
        <div className="mb-3">
          <h3 className="font-bold text-foreground text-lg">{name}</h3>
          <p className="text-xs text-muted-foreground">{breed}</p>
        </div>

        {/* Product Details Grid */}
        <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
          <div>
            <p className="text-muted-foreground">Batch ID</p>
            <p className="font-medium text-foreground">{batchId}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Hatch Date</p>
            <p className="font-medium text-foreground">{hatchDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Days Old</p>
            <p className="font-medium text-foreground">{daysOld}d</p>
          </div>
          <div>
            <p className="text-muted-foreground">Weight</p>
            <p className="font-medium text-foreground">{weight} {weightUnit}</p>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-4 p-3 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Price per {weightUnit}</p>
          <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Total: ${(price * weight).toFixed(2)}
          </p>
        </div>

        {/* Quantity Selector */}
        {!isOutOfStock && (
          <div className="mb-4">
            <label className="text-xs text-muted-foreground block mb-2">
              Quantity ({weightUnit})
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-1 border border-border rounded hover:bg-muted text-sm"
              >
                −
              </button>
              <input
                type="number"
                min="1"
                max={availability}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="flex-1 border border-border rounded px-2 py-1 text-center text-sm"
              />
              <button
                onClick={() => setQuantity(Math.min(availability, quantity + 1))}
                className="px-2 py-1 border border-border rounded hover:bg-muted text-sm"
              >
                +
              </button>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto space-y-2">
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={`w-full ${
              isAdded
                ? 'bg-success-600 hover:bg-success-700'
                : 'bg-primary hover:bg-primary/90'
            }`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAdded ? 'Added to Cart!' : 'Add to Cart'}
          </Button>

          {onViewDetails && (
            <Button
              variant="outline"
              onClick={() => onViewDetails(id)}
              className="w-full"
            >
              <Info className="mr-2 h-4 w-4" />
              View Details
            </Button>
          )}
        </div>

        {isOutOfStock && (
          <div className="mt-auto p-3 bg-muted rounded text-center">
            <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
          </div>
        )}
      </div>
    </Card>
  )
}
