"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["All", "Manufacturing", "Technology", "Office Supplies", "Raw Materials", "Services", "Equipment"]

const products = [
  {
    id: 1,
    title: "Industrial Steel Beams - Grade A",
    company: "BuildCorp Industries",
    price: "$2,450/ton",
    hasVideo: true,
    image: "/industrial-steel-beams.jpg",
    category: "Manufacturing",
  },
  {
    id: 2,
    title: "Cloud Server Hosting Package",
    company: "TechFlow Solutions",
    price: "Request Quote",
    hasVideo: false,
    image: "/cloud-servers-datacenter.jpg",
    category: "Technology",
  },
  {
    id: 3,
    title: "Office Furniture Bulk Set - 50 Units",
    company: "WorkSpace Pro",
    price: "$12,500",
    hasVideo: true,
    image: "/modern-office-furniture.png",
    category: "Office Supplies",
  },
  {
    id: 4,
    title: "Organic Cotton Fabric Rolls",
    company: "TextileMart Global",
    price: "$8.50/yard",
    hasVideo: false,
    image: "/cotton-fabric-rolls.jpg",
    category: "Raw Materials",
  },
  {
    id: 5,
    title: "Logistics & Freight Services",
    company: "QuickShip Logistics",
    price: "Request Quote",
    hasVideo: true,
    image: "/logistics-freight-truck.jpg",
    category: "Services",
  },
  {
    id: 6,
    title: "CNC Machining Equipment",
    company: "PrecisionTech Manufacturing",
    price: "$45,000",
    hasVideo: true,
    image: "/cnc-machine-industrial.jpg",
    category: "Equipment",
  },
]

export function MarketplaceView() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [activeTab, setActiveTab] = useState("home")

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory)

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
            <Input placeholder="Search products, services, companies..." className="pl-10 h-12 bg-muted/50" />
          </div>

          {/* Categories */}
          <div className="overflow-x-auto -mx-4 px-4">
            <div className="flex gap-2 pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
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

      {/* Product Grid */}
      <div className="p-4 space-y-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => (window.location.href = `/product/${product.id}`)}
          >
            <div className="relative">
              <img src={product.image || "/placeholder.svg"} alt={product.title} className="w-full h-48 object-cover" />
              {product.hasVideo && (
                <Badge className="absolute top-3 right-3 bg-primary">
                  <Video className="h-3 w-3 mr-1" />
                  Video
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{product.company}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{product.price}</span>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
                      <Bookmark className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={(e) => e.stopPropagation()}>
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
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around p-3">
          <Button
            variant="ghost"
            size="sm"
            className={cn("flex-col h-auto py-2 gap-1", activeTab === "home" && "text-primary")}
            onClick={() => setActiveTab("home")}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("flex-col h-auto py-2 gap-1", activeTab === "catalogs" && "text-primary")}
            onClick={() => {
              setActiveTab("catalogs")
              window.location.href = "/catalogs"
            }}
          >
            <Grid3x3 className="h-5 w-5" />
            <span className="text-xs">Catalogs</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("flex-col h-auto py-2 gap-1", activeTab === "orders" && "text-primary")}
            onClick={() => {
              setActiveTab("orders")
              window.location.href = "/dashboard"
            }}
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="text-xs">Orders</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn("flex-col h-auto py-2 gap-1", activeTab === "profile" && "text-primary")}
            onClick={() => {
              setActiveTab("profile")
              window.location.href = "/profile"
            }}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
