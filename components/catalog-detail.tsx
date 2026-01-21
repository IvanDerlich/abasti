"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, MoreVertical, Lock, Package } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CatalogDetailProps {
  catalogId: string
}

const catalogProducts = [
  {
    id: 1,
    name: "Industrial Steel Beams",
    price: "$2,450/ton",
    stock: "In Stock",
    image: "/placeholder.svg?key=hrrei",
  },
  {
    id: 2,
    name: "Cloud Server Hosting",
    price: "Request Quote",
    stock: "Available",
    image: "/placeholder.svg?key=duau3",
  },
  { id: 3, name: "Office Furniture Set", price: "$12,500", stock: "In Stock", image: "/placeholder.svg?key=bntss" },
]

export function CatalogDetail({ catalogId }: CatalogDetailProps) {
  const catalog = {
    id: catalogId,
    name: "Manufacturing Essentials",
    description: "Essential products for manufacturing operations",
    visibility: "private",
    productCount: 24,
    sharedWith: 8,
    minOrder: 10,
    bulkDiscount: 15,
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10 p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold line-clamp-1">{catalog.name}</h1>
            <p className="text-sm text-muted-foreground">{catalog.productCount} products</p>
          </div>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Catalog</DropdownMenuItem>
              <DropdownMenuItem>Manage Products</DropdownMenuItem>
              <DropdownMenuItem>Share Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Catalog Info */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">{catalog.description}</p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                <Lock className="h-3 w-3 mr-1" />
                Private
              </Badge>
              <Badge variant="secondary">{catalog.sharedWith} buyers</Badge>
              {catalog.minOrder && <Badge variant="outline">Min. Order: {catalog.minOrder} units</Badge>}
              {catalog.bulkDiscount && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {catalog.bulkDiscount}% Bulk Discount
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Share Link Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Share2 className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Share this catalog</h3>
                <p className="text-sm text-muted-foreground mb-3">Generate a secure link to share with your buyers</p>
                <Button variant="outline" size="sm">
                  Generate Share Link
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Products</h2>
            <Button variant="outline" size="sm">
              Add More
            </Button>
          </div>

          {catalogProducts.map((product) => (
            <Card
              key={product.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => (window.location.href = `/product/${product.id}`)}
            >
              <div className="flex gap-4 p-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-20 h-20 rounded object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold line-clamp-2 mb-1">{product.name}</h3>
                  <Badge variant="secondary" className="text-xs mb-2">
                    <Package className="h-3 w-3 mr-1" />
                    {product.stock}
                  </Badge>
                  <p className="font-bold text-primary">{product.price}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
