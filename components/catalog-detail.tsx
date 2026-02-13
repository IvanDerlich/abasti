"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Share2, MoreVertical, Lock, Package } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

interface CatalogDetailProps {
  catalogId: string
}

const catalogProducts = [
  {
    id: 1,
    name: "Industrial Steel Beams",
    price: "$2,450/ton",
    stock: "En stock",
    image: "/placeholder.svg?key=hrrei",
  },
  {
    id: 2,
    name: "Cloud Server Hosting",
    price: "Solicitar presupuesto",
    stock: "Disponible",
    image: "/placeholder.svg?key=duau3",
  },
  { id: 3, name: "Office Furniture Set", price: "$12,500", stock: "En stock", image: "/placeholder.svg?key=bntss" },
]

export function CatalogDetail({ catalogId }: CatalogDetailProps) {
  const { toast } = useToast()
  
  const catalog = {
    id: catalogId,
    name: "Esenciales de manufactura",
    description: "Productos esenciales para operaciones de manufactura",
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
            <p className="text-sm text-muted-foreground">{catalog.productCount} productos</p>
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
              <DropdownMenuItem>Editar catálogo</DropdownMenuItem>
              <DropdownMenuItem>Gestionar productos</DropdownMenuItem>
              <DropdownMenuItem>Configuración de compartir</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
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
                Privado
              </Badge>
              <Badge variant="secondary">{catalog.sharedWith} compradores</Badge>
              {catalog.minOrder && <Badge variant="outline">Ped. mín.: {catalog.minOrder} unidades</Badge>}
              {catalog.bulkDiscount && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {catalog.bulkDiscount}% descuento por volumen
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Share Link Card */}
        <div className="flex justify-center">
          <Button
            size="icon"
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              toast({ title: "Enlace copiado", description: "El enlace del catálogo ha sido copiado al portapapeles" })
            }}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

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
