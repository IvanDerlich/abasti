"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  SlidersHorizontal,
  Plus,
  Bookmark,
  Share2,
  MessageCircle,
  Video,
  Home,
  Grid3x3,
  User,
  ShoppingBag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "Todos",
  "Manufactura",
  "Tecnología",
  "Suministros de oficina",
  "Materias primas",
  "Servicios",
  "Equipamiento",
];

const products = [
  {
    id: 1,
    title: "Vigas de acero industrial - Grado A",
    company: "BuildCorp Industries",
    price: "2.450 €/ton",
    hasVideo: true,
    image: "/industrial-steel-beams.jpg",
    category: "Manufactura",
  },
  {
    id: 2,
    title: "Paquete de hosting en la nube",
    company: "TechFlow Solutions",
    price: "Solicitar presupuesto",
    hasVideo: false,
    image: "/cloud-servers-datacenter.jpg",
    category: "Tecnología",
  },
  {
    id: 3,
    title: "Lote de muebles de oficina - 50 unidades",
    company: "WorkSpace Pro",
    price: "12.500 €",
    hasVideo: true,
    image: "/modern-office-furniture.png",
    category: "Suministros de oficina",
  },
  {
    id: 4,
    title: "Rollos de tela de algodón orgánico",
    company: "TextileMart Global",
    price: "8,50 €/m",
    hasVideo: false,
    image: "/cotton-fabric-rolls.jpg",
    category: "Materias primas",
  },
  {
    id: 5,
    title: "Servicios de logística y transporte",
    company: "QuickShip Logistics",
    price: "Solicitar presupuesto",
    hasVideo: true,
    image: "/logistics-freight-truck.jpg",
    category: "Servicios",
  },
  {
    id: 6,
    title: "Equipo de mecanizado CNC",
    company: "PrecisionTech Manufacturing",
    price: "45.000 €",
    hasVideo: true,
    image: "/cnc-machine-industrial.jpg",
    category: "Equipamiento",
  },
];

export function MarketplaceView() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [activeTab, setActiveTab] = useState("home");

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Marketplace</h1>
            <Button size="icon" variant="outline">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar productos, servicios, empresas..."
              className="pl-10 h-12 bg-muted/50"
            />
          </div>

          {/* Categories */}
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid - cards con anchura 320px */}
      <div className="p-4 grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => (window.location.href = `/product/${product.id}`)}
          >
            <div className="relative">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-36 object-cover"
              />
              {product.hasVideo && (
                <Badge className="absolute top-3 right-3 bg-primary">
                  <Video className="h-3 w-3 mr-1" />
                  Vídeo
                </Badge>
              )}
            </div>
            <CardContent className="p-3">
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold text-base leading-tight line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {product.company}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    {product.price}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Bookmark className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MessageCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating Add Button (for sellers) */}
      <Button
        size="icon"
        className="fixed bottom-24 right-6 h-14 w-14 rounded-full shadow-lg"
        onClick={() => (window.location.href = "/create-listing")}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden">
        <div className="flex items-center justify-around p-3">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-col h-auto py-2 gap-1",
              activeTab === "home" && "text-primary",
            )}
            onClick={() => setActiveTab("home")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Inicio</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-col h-auto py-2 gap-1",
              activeTab === "catalogs" && "text-primary",
            )}
            onClick={() => {
              setActiveTab("catalogs");
              window.location.href = "/catalogs";
            }}
          >
            <Grid3x3 className="h-5 w-5" />
            <span className="text-xs">Catálogos</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-col h-auto py-2 gap-1",
              activeTab === "orders" && "text-primary",
            )}
            onClick={() => {
              setActiveTab("orders");
              window.location.href = "/dashboard";
            }}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs">Pedidos</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-col h-auto py-2 gap-1",
              activeTab === "profile" && "text-primary",
            )}
            onClick={() => {
              setActiveTab("profile");
              window.location.href = "/profile";
            }}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Perfil</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
