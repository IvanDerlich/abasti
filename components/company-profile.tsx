"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Building2,
  MapPin,
  Star,
  Edit3,
  Plus,
  Package,
  FolderOpen,
  ShoppingCart,
  Users,
  Phone,
  Mail,
  Globe,
  Clock,
  Award,
  CheckCircle2,
  PlayCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const mockCompany = {
  id: "1",
  name: "Global Steel Industries",
  logo: "/steel-company-logo.jpg",
  industry: "Manufacturing",
  location: "Houston, TX",
  rating: 4.8,
  followers: 1240,
  description:
    "Leading manufacturer and supplier of high-quality steel products for construction and industrial applications worldwide.",
  tags: ["Supplier", "Manufacturer", "Verified"],
  stats: {
    products: 156,
    catalogs: 12,
    orders: 3450,
    followers: 1240,
  },
  contact: {
    phone: "+1 (555) 123-4567",
    email: "contact@globalsteel.com",
    website: "www.globalsteel.com",
  },
  hours: "Mon-Fri: 8:00 AM - 6:00 PM",
  certifications: ["ISO 9001", "ISO 14001", "OSHA Certified"],
}

const mockProducts = [
  {
    id: "1",
    name: "Industrial Steel Beams",
    price: "$450/unit",
    image: "/industrial-steel-beams.jpg",
    hasVideo: true,
    category: "Construction Materials",
  },
  {
    id: "2",
    name: "Galvanized Steel Sheets",
    price: "$320/unit",
    image: "/steel-sheets.jpg",
    hasVideo: false,
    category: "Raw Materials",
  },
  {
    id: "3",
    name: "Custom Steel Fabrication",
    price: "Request Quote",
    image: "/custom-steel.jpg",
    hasVideo: true,
    category: "Services",
  },
]

export function CompanyProfile({ companyId }: { companyId: string }) {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Link href="/marketplace">
            <Button variant="ghost" size="icon">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Perfil de empresa</h1>
          <Button variant="ghost" size="icon">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Company Overview Card */}
        <Card className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="relative">
              <Image
                src={mockCompany.logo || "/placeholder.svg"}
                alt={mockCompany.name}
                width={80}
                height={80}
                className="rounded-xl border-2 border-border"
              />
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold mb-1">{mockCompany.name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Building2 className="w-4 h-4" />
                <span>{mockCompany.industry}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{mockCompany.location}</span>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(mockCompany.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{mockCompany.rating}</span>
            <span className="text-sm text-muted-foreground">({mockCompany.followers} valoraciones)</span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed">{mockCompany.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {mockCompany.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-full">
                {tag}
              </Badge>
            ))}
          </div>

        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          <Card className="p-4 text-center">
            <Package className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-xl font-bold">{mockCompany.stats.products}</div>
            <div className="text-xs text-muted-foreground">Productos</div>
          </Card>
          <Card className="p-4 text-center">
            <FolderOpen className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-xl font-bold">{mockCompany.stats.catalogs}</div>
            <div className="text-xs text-muted-foreground">Catálogos</div>
          </Card>
          <Card className="p-4 text-center">
            <ShoppingCart className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-xl font-bold">{mockCompany.stats.orders}</div>
            <div className="text-xs text-muted-foreground">Pedidos</div>
          </Card>
          <Card className="p-4 text-center">
            <Users className="w-5 h-5 mx-auto mb-2 text-primary" />
            <div className="text-xl font-bold">{mockCompany.stats.followers}</div>
            <div className="text-xs text-muted-foreground">Seguidores</div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Acciones rápidas</h3>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/publish-product">
              <Button variant="outline" size="sm" className="w-full flex flex-col h-auto py-3 bg-transparent">
                <Plus className="w-5 h-5 mb-1" />
                <span className="text-xs">Añadir producto</span>
              </Button>
            </Link>
            <Link href="/catalogs/create">
              <Button variant="outline" size="sm" className="w-full flex flex-col h-auto py-3 bg-transparent">
                <FolderOpen className="w-5 h-5 mb-1" />
                <span className="text-xs">Nuevo catálogo</span>
              </Button>
            </Link>
            <Link href={`/company/${companyId}/edit`}>
              <Button variant="outline" size="sm" className="w-full flex flex-col h-auto py-3 bg-transparent">
                <Edit3 className="w-5 h-5 mb-1" />
                <span className="text-xs">Editar perfil</span>
              </Button>
            </Link>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Información de contacto</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{mockCompany.contact.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{mockCompany.contact.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-primary">{mockCompany.contact.website}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{mockCompany.hours}</span>
            </div>
          </div>
        </Card>

        {/* Certifications */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Certificaciones y distintivos</h3>
          <div className="space-y-2">
            {mockCompany.certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-3">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm">{cert}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Products Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Productos y servicios</h3>
            <Link href={`/company/${companyId}/products`}>
              <Button variant="ghost" size="sm">
                Ver todo
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mockProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-square">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    {product.hasVideo && (
                      <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
                        <PlayCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                    <h4 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h4>
                    <p className="text-sm font-semibold text-primary">{product.price}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Reviews Preview */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Opiniones y valoraciones</h3>
            <Link href={`/company/${companyId}/reviews`}>
              <Button variant="ghost" size="sm">
                Ver todo
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">5.0</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                "Excellent supplier with reliable delivery and high-quality products. Highly recommend for bulk orders."
              </p>
              <p className="text-xs text-muted-foreground">- ABC Construction Co.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">4.0</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                "Buenos productos y atención al cliente. Respuesta rápida en pedidos a medida."
              </p>
              <p className="text-xs text-muted-foreground">- Industrial Solutions Inc.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
