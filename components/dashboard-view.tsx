"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Repeat,
  MessageSquare,
  TrendingUp,
  Eye,
  ShoppingCart,
  Grid3x3,
  MoreVertical,
  Play,
  Pause,
  Plus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const orders = [
  { id: "ORD-1024", product: "Vigas de acero industrial", status: "entregado", amount: "24.500 €", date: "Hace 2 días" },
  { id: "ORD-1023", product: "Lote muebles de oficina", status: "en tránsito", amount: "12.500 €", date: "Hace 1 semana" },
  { id: "ORD-1022", product: "Hosting en la nube", status: "procesando", amount: "3.200 €", date: "Hace 2 semanas" },
]

const automations = [
  {
    id: 1,
    name: "Vigas de acero - Semanal",
    product: "Vigas de acero industrial",
    frequency: "Semanal",
    status: "active",
    nextOrder: "En 3 días",
    totalOrders: 12,
  },
  {
    id: 2,
    name: "Suministros oficina - Mensual",
    product: "Pack suministros de oficina",
    frequency: "Mensual",
    status: "paused",
    nextOrder: "Pausado",
    totalOrders: 8,
  },
]

export function DashboardView() {
  const [activeTab, setActiveTab] = useState("orders")

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10 p-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Panel de control</h1>
          <div className="ml-auto">
            <Button size="sm" onClick={() => (window.location.href = "/publish-product")}>
              <Plus className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mx-auto w-full max-w-6xl space-y-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <ShoppingCart className="h-4 w-4" />
                <span className="text-xs">Total Orders</span>
              </div>
              <div className="text-2xl font-bold">156</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span>+12%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Repeat className="h-4 w-4" />
                <span className="text-xs">Automatizaciones</span>
              </div>
              <div className="text-2xl font-bold">8</div>
              <div className="text-xs text-muted-foreground mt-1">2 activas</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Grid3x3 className="h-4 w-4" />
                <span className="text-xs">Catálogos</span>
              </div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-xs text-muted-foreground mt-1">245 visitas</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Eye className="h-4 w-4" />
                <span className="text-xs">Total visitas</span>
              </div>
              <div className="text-2xl font-bold">2.4K</div>
              <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3" />
                <span>+24%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1">¿Listo para vender?</h3>
                <p className="text-sm opacity-90">Publica tus productos en minutos</p>
              </div>
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90"
                onClick={() => (window.location.href = "/publish-product")}
              >
                <Plus className="h-5 w-5 mr-2" />
                Publicar Producto
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="automations">Automatizaciones</TabsTrigger>
            <TabsTrigger value="messages">Mensajes</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-3 mt-4">
            {orders.map((order) => (
              <Card key={order.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-mono text-sm text-muted-foreground">{order.id}</p>
                      <h3 className="font-semibold mt-1">{order.product}</h3>
                    </div>
                    <Badge
                      variant={
                        order.status === "entregado"
                          ? "default"
                          : order.status === "en tránsito"
                            ? "secondary"
                            : "outline"
                      }
                      className="capitalize"
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-primary">{order.amount}</span>
                    <span className="text-sm text-muted-foreground">{order.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="automations" className="space-y-3 mt-4">
            {automations.map((automation) => (
              <Card key={automation.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{automation.name}</h3>
                        <Badge
                          variant={automation.status === "active" ? "default" : "secondary"}
                          className="capitalize"
                        >
                          {automation.status === "active" ? (
                            <>
                              <Play className="h-3 w-3 mr-1" />
                              Activa
                            </>
                          ) : (
                            <>
                              <Pause className="h-3 w-3 mr-1" />
                              Pausada
                            </>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{automation.product}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar automatización</DropdownMenuItem>
                        <DropdownMenuItem>{automation.status === "active" ? "Pausar" : "Reanudar"}</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Frecuencia</p>
                      <p className="font-medium text-sm">{automation.frequency}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Próximo pedido</p>
                      <p className="font-medium text-sm">{automation.nextOrder}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Completados</p>
                      <p className="font-medium text-sm">{automation.totalOrders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="outline"
              className="w-full h-12 bg-transparent"
              onClick={() => (window.location.href = "/automation/create")}
            >
              <Repeat className="h-4 w-4 mr-2" />
              Crear nueva automatización
            </Button>
          </TabsContent>

          <TabsContent value="messages" className="space-y-3 mt-4">
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Aún no hay mensajes</h3>
                <p className="text-sm text-muted-foreground">
                  Tus conversaciones con compradores y vendedores aparecerán aquí
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
  )
}
