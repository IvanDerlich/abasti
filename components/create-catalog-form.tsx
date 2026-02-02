"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Lock, Globe, Users, Search, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const availableProducts = [
  { id: 1, name: "Industrial Steel Beams", price: "$2,450/ton", image: "/placeholder.svg?key=hrrei" },
  { id: 2, name: "Cloud Server Hosting", price: "Request Quote", image: "/placeholder.svg?key=duau3" },
  { id: 3, name: "Office Furniture Set", price: "$12,500", image: "/placeholder.svg?key=bntss" },
  { id: 4, name: "Cotton Fabric Rolls", price: "$8.50/yard", image: "/placeholder.svg?key=whhlu" },
]

export function CreateCatalogForm() {
  const [visibility, setVisibility] = useState("private")
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const [showProductSearch, setShowProductSearch] = useState(false)

  const toggleProduct = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10 p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Crear catálogo</h1>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        <form className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="catalog-name">Nombre del catálogo *</Label>
                <Input id="catalog-name" placeholder="ej.: Esenciales de manufactura" className="h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe what this catalog is for..." rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Visibility Settings */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <Label>Visibilidad *</Label>
              <RadioGroup value={visibility} onValueChange={setVisibility}>
                <Card className={visibility === "private" ? "border-primary" : ""}>
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="private" id="private" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Lock className="h-4 w-4" />
                          <Label htmlFor="private" className="font-medium cursor-pointer">
                            Privado
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Solo tú puedes ver este catálogo</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={visibility === "invite-only" ? "border-primary" : ""}>
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="invite-only" id="invite-only" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="h-4 w-4" />
                          <Label htmlFor="invite-only" className="font-medium cursor-pointer">
                            Invite Only
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Share with specific buyers via invite link</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={visibility === "public" ? "border-primary" : ""}>
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="public" id="public" className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Globe className="h-4 w-4" />
                          <Label htmlFor="public" className="font-medium cursor-pointer">
                            Público
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">Cualquiera puede ver este catálogo</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Bulk Pricing */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div>
                <Label>Cantidad mínima de pedido (opcional)</Label>
                <Input type="number" placeholder="ej.: 100" className="h-12 mt-2" />
              </div>

              <div>
                <Label>Descuento por volumen % (opcional)</Label>
                <Input type="number" placeholder="ej.: 15" className="h-12 mt-2" />
              </div>
            </CardContent>
          </Card>

          {/* Products */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label>Productos ({selectedProducts.length})</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowProductSearch(!showProductSearch)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Añadir productos
                </Button>
              </div>

              {showProductSearch && (
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar productos..." className="pl-10" />
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {availableProducts.map((product) => (
                      <Card
                        key={product.id}
                        className={`cursor-pointer transition-all ${
                          selectedProducts.includes(product.id) ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => toggleProduct(product.id)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                              <p className="text-xs text-muted-foreground">{product.price}</p>
                            </div>
                            {selectedProducts.includes(product.id) && <Badge className="bg-primary">Añadido</Badge>}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {selectedProducts.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Productos seleccionados</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProducts.map((productId) => {
                      const product = availableProducts.find((p) => p.id === productId)
                      return (
                        <Badge key={productId} variant="secondary" className="pl-3 pr-1 py-1">
                          {product?.name}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 ml-1"
                            onClick={() => toggleProduct(productId)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </form>
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button size="lg" className="w-full h-14" onClick={() => (window.location.href = "/catalogs")}>
          Crear catálogo
        </Button>
      </div>
    </div>
  )
}
