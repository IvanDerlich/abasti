"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Share2, Bookmark, Video, Building2, Package } from "lucide-react"

interface ProductDetailProps {
  productId: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const product = {
    id: productId,
    title: "Vigas de acero industrial - Grado A",
    company: "BuildCorp Industries",
    companyLogo: "/generic-company-logo.png",
    price: "2.450 €",
    unit: "por tonelada",
    stock: "En stock - 500 toneladas",
    hasVideo: true,
    images: ["/industrial-steel-beams.jpg", "/steel-construction-materials.jpg", "/steel-warehouse-storage.jpg"],
    specs: [
      { label: "Material", value: "Aleación de acero de alta calidad" },
      { label: "Dimensiones", value: "Tamaños a medida disponibles" },
      { label: "Pedido mínimo", value: "10 toneladas" },
      { label: "Plazo de entrega", value: "2-3 semanas" },
      { label: "Certificación", value: "ISO 9001, ASTM A36" },
    ],
    description:
      "Vigas de acero industrial premium fabricadas según especificaciones exactas. Ideales para construcción, fabricación e infraestructura. Todos los productos pasan controles de calidad e incluyen documentación de certificación.",
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10 p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold flex-1 line-clamp-1">Detalles del producto</h1>
        <Button variant="ghost" size="icon">
          <Share2 className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <div className="relative h-80 bg-muted">
          <img
            src={product.images[currentImage] || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          {product.hasVideo && (
            <Badge className="absolute top-4 right-4 bg-primary">
              <Video className="h-3 w-3 mr-1" />
              Video Available
            </Badge>
          )}
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentImage ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Title and Price */}
        <div className="space-y-3">
          <div>
            <h2 className="text-2xl font-bold leading-tight text-balance">{product.title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs">
                <Package className="h-3 w-3 mr-1" />
                {product.stock}
              </Badge>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">{product.price}</span>
            <span className="text-muted-foreground">{product.unit}</span>
          </div>
        </div>

        <Separator />

        {/* Company Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={product.companyLogo || "/placeholder.svg"} />
                <AvatarFallback>
                  <Building2 className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{product.company}</p>
                <p className="text-sm text-muted-foreground">Vendedor verificado</p>
              </div>
              <Button variant="outline" size="sm">
                Ver perfil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Specifications */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Especificaciones del producto</h3>
          <Card>
            <CardContent className="p-4 space-y-3">
              {product.specs.map((spec, index) => (
                <div key={index}>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium text-right">{spec.value}</span>
                  </div>
                  {index < product.specs.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Descripción</h3>
          <Card>
            <CardContent className="p-4">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border md:left-64">
        <div className="flex items-center justify-center max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Precio</div>
            <div className="font-bold text-lg">
              {product.price}/{product.unit}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
