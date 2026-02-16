"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Plus, Search, Lock, Globe, Users, MoreVertical, Package } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const catalogs = [
  {
    id: 1,
    name: "Manufacturing Essentials",
    visibility: "private",
    productCount: 24,
    sharedWith: 8,
    lastUpdated: "2 days ago",
    image: "/placeholder.svg?key=9i52c",
  },
  {
    id: 2,
    name: "Suministros de oficina Q1 2025",
    visibility: "invite-only",
    productCount: 156,
    sharedWith: 3,
    lastUpdated: "Hace 1 semana",
    image: "/placeholder.svg?key=fuvgr",
  },
  {
    id: 3,
    name: "Catálogo público de equipamiento",
    visibility: "public",
    productCount: 89,
    sharedWith: 245,
    lastUpdated: "Hace 3 días",
    image: "/placeholder.svg?key=0y61x",
  },
]

const othersVendorsCatalogs = [
  {
    id: 101,
    name: "Componentes Electrónicos Premium",
    vendor: "TechSupply Corp",
    productCount: 234,
    image: "/placeholder.svg?key=vendor1",
  },
  {
    id: 102,
    name: "Materiales Construcción 2025",
    vendor: "BuildMaterial SA",
    productCount: 156,
    image: "/placeholder.svg?key=vendor2",
  },
  {
    id: 103,
    name: "Insumos Textiles Industrial",
    vendor: "TextilePro Global",
    productCount: 89,
    image: "/placeholder.svg?key=vendor3",
  },
]

export function CatalogsView() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10 p-4">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold flex-1">Mis catálogos</h1>
          <Button size="icon" onClick={() => (window.location.href = "/catalogs/create")}>
            <Plus className="h-5 w-5" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar catálogos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-muted/50"
          />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Info Card */}
        <Card className="bg-primary/5 border-primary/20 py-0">
          <CardContent className="p-4 px-4">
            <p className="text-sm leading-relaxed">
              Crea catálogos privados para organizar productos para compradores concretos. Define precios, pedidos mínimos y
              comparte mediante enlaces de invitación.
            </p>
          </CardContent>
        </Card>

        {/* Catalogs List */}
        {catalogs.map((catalog) => (
          <Card
            key={catalog.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => (window.location.href = `/catalogs/${catalog.id}`)}
          >
            <div className="flex">
              <div className="w-28 h-28 bg-muted flex-shrink-0">
                <img
                  src={catalog.image || "/placeholder.svg"}
                  alt={catalog.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold leading-tight line-clamp-1">{catalog.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{catalog.productCount} productos</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar catálogo</DropdownMenuItem>
                      <DropdownMenuItem>Compartir enlace</DropdownMenuItem>
                      <DropdownMenuItem>Gestionar productos</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <Badge variant="outline" className="text-xs">
                    {catalog.visibility === "private" && <Lock className="h-3 w-3 mr-1" />}
                    {catalog.visibility === "public" && <Globe className="h-3 w-3 mr-1" />}
                    {catalog.visibility === "invite-only" && <Users className="h-3 w-3 mr-1" />}
                    {catalog.visibility === "private"
                      ? "Privado"
                      : catalog.visibility === "public"
                        ? "Público"
                        : "Solo invitación"}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    {catalog.sharedWith} compradores
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground mt-2">Actualizado {catalog.lastUpdated}</p>
              </div>
            </div>
          </Card>
        ))}

        {/* Empty State */}
        {catalogs.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Aún no hay catálogos</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Crea tu primer catálogo para organizar productos para tus compradores
              </p>
              <Button onClick={() => (window.location.href = "/catalogs/create")}>
                <Plus className="h-4 w-4 mr-2" />
                Crear catálogo
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Other Vendors Catalogs Section */}
        <div className="pt-6">
          <h2 className="text-xl font-bold mb-4">Catálogos de otros vendedores</h2>
          <div className="space-y-3">
            {othersVendorsCatalogs.map((catalog) => (
              <Card
                key={catalog.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => (window.location.href = `/catalogs/${catalog.id}`)}
              >
                <div className="flex">
                  <div className="w-28 h-28 bg-muted flex-shrink-0">
                    <img
                      src={catalog.image || "/placeholder.svg"}
                      alt={catalog.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold leading-tight line-clamp-1">{catalog.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          <span className="font-medium">{catalog.vendor}</span> • {catalog.productCount} productos
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <Badge variant="secondary" className="text-xs">
                        <Globe className="h-3 w-3 mr-1" />
                        Público
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
