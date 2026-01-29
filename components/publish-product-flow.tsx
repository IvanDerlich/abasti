"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  Upload,
  X,
  DollarSign,
  Eye,
  FolderOpen,
  Bot,
  CheckCircle2,
  ChevronLeft,
  Video,
  Plus,
  Boxes,
  RefreshCw,
  Sparkles,
  TrendingUp,
  Globe,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function PublishProductFlow() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Información Básica
    name: "",
    sku: "",
    category: "",
    subcategory: "",
    description: "",
    specifications: "",
    tags: [] as string[],

    // Media
    images: [] as string[],
    video: "",

    // Precios e Inventario
    priceType: "fixed",
    price: "",
    currency: "USD",
    stock: "",
    minOrder: "",
    maxOrder: "",
    tierPricing: [{ quantity: "1-99", price: "" }],

    // Envío y Logística
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    shippingRegions: [] as string[],
    leadTime: "",

    // Catálogo y Visibilidad
    catalogId: "",
    visibility: "public",
    featuredInCatalog: false,

    // Automatización
    automationEnabled: false,

    // IA Auto-Respuesta
    aiAutoReply: true,
    aiInstructions: "",
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      updateFormData("tags", [...formData.tags, tag])
    }
  }

  const removeTag = (tag: string) => {
    updateFormData(
      "tags",
      formData.tags.filter((t) => t !== tag),
    )
  }

  const toggleShippingRegion = (region: string) => {
    if (formData.shippingRegions.includes(region)) {
      updateFormData(
        "shippingRegions",
        formData.shippingRegions.filter((r) => r !== region),
      )
    } else {
      updateFormData("shippingRegions", [...formData.shippingRegions, region])
    }
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 8))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const progressPercentage = (step / 8) * 100

  // Step 1: Información Básica
  if (step === 1) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-lg font-semibold">Publicar Producto</h1>
              <span className="text-sm text-muted-foreground font-medium">1/8</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div className="text-center mb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-1">Información del Producto</h2>
            <p className="text-sm text-muted-foreground">Comencemos con los detalles básicos</p>
          </div>

          <div>
            <Label htmlFor="name">Nombre del Producto *</Label>
            <Input
              id="name"
              placeholder="Ej: Vigas de Acero Industrial Grado A"
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="sku">SKU / Código del Producto</Label>
            <Input
              id="sku"
              placeholder="Ej: STL-BEAM-001"
              value={formData.sku}
              onChange={(e) => updateFormData("sku", e.target.value)}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">Código único para identificar tu producto</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="category">Categoría *</Label>
              <Select value={formData.category} onValueChange={(val) => updateFormData("category", val)}>
                <SelectTrigger id="category" className="mt-2">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="construction">Materiales de Construcción</SelectItem>
                  <SelectItem value="electronics">Electrónica & Tech</SelectItem>
                  <SelectItem value="industrial">Equipo Industrial</SelectItem>
                  <SelectItem value="textiles">Textiles & Telas</SelectItem>
                  <SelectItem value="chemicals">Químicos & Materias Primas</SelectItem>
                  <SelectItem value="logistics">Logística & Transporte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subcategory">Subcategoría</Label>
              <Select value={formData.subcategory} onValueChange={(val) => updateFormData("subcategory", val)}>
                <SelectTrigger id="subcategory" className="mt-2">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="steel">Acero & Metal</SelectItem>
                  <SelectItem value="lumber">Madera & Tablones</SelectItem>
                  <SelectItem value="concrete">Concreto & Cemento</SelectItem>
                  <SelectItem value="tools">Herramientas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descripción del Producto *</Label>
            <Textarea
              id="description"
              placeholder="Describe las características principales, beneficios y aplicaciones de tu producto..."
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              rows={5}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">Mínimo 50 caracteres recomendado</p>
          </div>

          <div>
            <Label htmlFor="specifications">Especificaciones Técnicas</Label>
            <Textarea
              id="specifications"
              placeholder="Dimensiones, material, peso, capacidad, certificaciones, etc."
              value={formData.specifications}
              onChange={(e) => updateFormData("specifications", e.target.value)}
              rows={4}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Etiquetas del Producto</Label>
            <p className="text-xs text-muted-foreground mb-2">Ayuda a los compradores a encontrar tu producto</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1 text-sm">
                  {tag}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Agregar etiqueta (presiona Enter)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTag(e.currentTarget.value)
                    e.currentTarget.value = ""
                  }
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Nuevo", "Popular", "Envío Rápido", "Eco-Friendly", "Certificado"].map((suggestion) => (
                <Badge
                  key={suggestion}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => addTag(suggestion)}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={nextStep} disabled={!formData.name || !formData.description}>
            Continuar
          </Button>
        </div>
      </div>
    )
  }

  // Step 2: Imágenes y Videos
  if (step === 2) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="icon" onClick={prevStep}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold">Imágenes y Videos</h1>
              <span className="text-sm text-muted-foreground font-medium">2/8</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div className="text-center mb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-1">Multimedia del Producto</h2>
            <p className="text-sm text-muted-foreground">
              Las imágenes de alta calidad aumentan las ventas hasta un 40%
            </p>
          </div>

          <Card className="border-2 border-dashed bg-accent/20">
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm mb-1">Tips para mejores fotos</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Usa fondo blanco o neutral</li>
                    <li>• Muestra el producto desde múltiples ángulos</li>
                    <li>• Incluye fotos de escala y dimensiones</li>
                    <li>• Iluminación natural o profesional</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          <div>
            <div className="flex items-center justify-between mb-3">
              <Label>Imágenes del Producto *</Label>
              <span className="text-xs text-muted-foreground">{formData.images.length}/10</span>
            </div>

            <Card className="p-8 border-dashed cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium mb-1">Arrastra imágenes o haz clic para subir</p>
                <p className="text-sm text-muted-foreground">PNG, JPG hasta 10MB cada una</p>
              </div>
            </Card>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square group">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Upload ${idx + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    {idx === 0 && <Badge className="absolute top-2 left-2 text-xs">Principal</Badge>}
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        updateFormData(
                          "images",
                          formData.images.filter((_, i) => i !== idx),
                        )
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <Label>Video del Producto (Opcional)</Label>
            <p className="text-xs text-muted-foreground mb-3">Los productos con video reciben 80% más consultas</p>

            <Card className="p-6 border-dashed cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Subir Video</p>
                  <p className="text-xs text-muted-foreground">MP4, MOV hasta 100MB • Duración máx: 2 min</p>
                </div>
              </div>
            </Card>

            {formData.video && (
              <Card className="mt-3 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                      <Video className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">product-demo.mp4</p>
                      <p className="text-xs text-muted-foreground">2.4 MB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => updateFormData("video", "")}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )}
          </div>

          <Button size="lg" className="w-full" onClick={nextStep}>
            Continuar
          </Button>
        </div>
      </div>
    )
  }

  // Step 3: Precios e Inventario
  if (step === 3) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="icon" onClick={prevStep}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold">Precios e Inventario</h1>
              <span className="text-sm text-muted-foreground font-medium">3/8</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div className="text-center mb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-1">Configuración de Precios</h2>
            <p className="text-sm text-muted-foreground">Define cómo quieres vender tu producto</p>
          </div>

          <div>
            <Label>Tipo de Precio *</Label>
            <div className="grid gap-3 mt-2">
              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  formData.priceType === "fixed" ? "border-primary border-2 bg-primary/5" : ""
                }`}
                onClick={() => updateFormData("priceType", "fixed")}
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Precio Fijo</p>
                    <p className="text-sm text-muted-foreground">Un precio estándar para todos los compradores</p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  formData.priceType === "tiered" ? "border-primary border-2 bg-primary/5" : ""
                }`}
                onClick={() => updateFormData("priceType", "tiered")}
              >
                <div className="flex items-center gap-3">
                  <Boxes className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Precio por Volumen</p>
                    <p className="text-sm text-muted-foreground">Descuentos por compras al mayoreo</p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  formData.priceType === "quote" ? "border-primary border-2 bg-primary/5" : ""
                }`}
                onClick={() => updateFormData("priceType", "quote")}
              >
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Cotización Personalizada</p>
                    <p className="text-sm text-muted-foreground">Precio definido caso por caso</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {formData.priceType === "fixed" && (
            <>
              <div>
                <Label htmlFor="price">Precio por Unidad *</Label>
                <div className="flex gap-3 mt-2">
                  <Select value={formData.currency} onValueChange={(val) => updateFormData("currency", val)}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD $</SelectItem>
                      <SelectItem value="EUR">EUR €</SelectItem>
                      <SelectItem value="MXN">MXN $</SelectItem>
                      <SelectItem value="GBP">GBP £</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => updateFormData("price", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="stock">Inventario Disponible *</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="Cantidad de unidades disponibles"
                  value={formData.stock}
                  onChange={(e) => updateFormData("stock", e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">Se actualizará automáticamente con cada venta</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="minOrder">Pedido Mínimo</Label>
                  <Input
                    id="minOrder"
                    type="number"
                    placeholder="1"
                    value={formData.minOrder}
                    onChange={(e) => updateFormData("minOrder", e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="maxOrder">Pedido Máximo</Label>
                  <Input
                    id="maxOrder"
                    type="number"
                    placeholder="Ilimitado"
                    value={formData.maxOrder}
                    onChange={(e) => updateFormData("maxOrder", e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>
            </>
          )}

          {formData.priceType === "tiered" && (
            <div>
              <Label>Niveles de Precio por Volumen</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Ofrece mejores precios a compradores de mayores cantidades
              </p>
              <div className="space-y-3">
                {formData.tierPricing.map((tier, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Rango de Cantidad</Label>
                        <Input
                          placeholder="Ej: 1-99"
                          value={tier.quantity}
                          onChange={(e) => {
                            const newTiers = [...formData.tierPricing]
                            newTiers[idx].quantity = e.target.value
                            updateFormData("tierPricing", newTiers)
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Precio por Unidad</Label>
                        <Input
                          placeholder="$0.00"
                          value={tier.price}
                          onChange={(e) => {
                            const newTiers = [...formData.tierPricing]
                            newTiers[idx].price = e.target.value
                            updateFormData("tierPricing", newTiers)
                          }}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => {
                    updateFormData("tierPricing", [...formData.tierPricing, { quantity: "", price: "" }])
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Agregar Nivel de Precio
                </Button>
              </div>
            </div>
          )}

          {formData.priceType === "quote" && (
            <Card className="p-6 bg-accent/50">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium mb-2">Cotización Personalizada</p>
                  <p className="text-sm text-muted-foreground">
                    Los compradores interesados te contactarán para solicitar una cotización. Podrás negociar el precio
                    basado en la cantidad, especificaciones y otros factores.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Button size="lg" className="w-full" onClick={nextStep}>
            Continuar
          </Button>
        </div>
      </div>
    )
  }

  // Step 4: Envío y Logística
  if (step === 4) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="icon" onClick={prevStep}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold">Envío y Logística</h1>
              <span className="text-sm text-muted-foreground font-medium">4/8</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div className="text-center mb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Package className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-1">Información de Envío</h2>
            <p className="text-sm text-muted-foreground">Ayuda a los compradores a planificar sus pedidos</p>
          </div>

          <div>
            <Label htmlFor="weight">Peso del Producto</Label>
            <div className="flex gap-3 mt-2">
              <Input
                id="weight"
                type="number"
                placeholder="0.00"
                value={formData.weight}
                onChange={(e) => updateFormData("weight", e.target.value)}
                className="flex-1"
              />
              <Select defaultValue="kg">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="lb">lb</SelectItem>
                  <SelectItem value="ton">ton</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Dimensiones del Paquete</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              <div>
                <Input
                  type="number"
                  placeholder="Largo"
                  value={formData.dimensions.length}
                  onChange={(e) => updateFormData("dimensions", { ...formData.dimensions, length: e.target.value })}
                />
                <p className="text-xs text-muted-foreground text-center mt-1">cm</p>
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Ancho"
                  value={formData.dimensions.width}
                  onChange={(e) => updateFormData("dimensions", { ...formData.dimensions, width: e.target.value })}
                />
                <p className="text-xs text-muted-foreground text-center mt-1">cm</p>
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Alto"
                  value={formData.dimensions.height}
                  onChange={(e) => updateFormData("dimensions", { ...formData.dimensions, height: e.target.value })}
                />
                <p className="text-xs text-muted-foreground text-center mt-1">cm</p>
              </div>
            </div>
          </div>

          <div>
            <Label>Regiones de Envío</Label>
            <p className="text-xs text-muted-foreground mb-3">Selecciona dónde puedes enviar este producto</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "local", name: "Local", icon: "🏢" },
                { id: "national", name: "Nacional", icon: "🇲🇽" },
                { id: "northamerica", name: "Norteamérica", icon: "🌎" },
                { id: "latam", name: "Latinoamérica", icon: "🌎" },
                { id: "europe", name: "Europa", icon: "🇪🇺" },
                { id: "global", name: "Global", icon: "🌍" },
              ].map((region) => (
                <Card
                  key={region.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    formData.shippingRegions.includes(region.id) ? "border-primary border-2 bg-primary/5" : ""
                  }`}
                  onClick={() => toggleShippingRegion(region.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{region.icon}</span>
                    <p className="font-medium text-sm">{region.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="leadTime">Tiempo de Preparación</Label>
            <Select value={formData.leadTime} onValueChange={(val) => updateFormData("leadTime", val)}>
              <SelectTrigger id="leadTime" className="mt-2">
                <SelectValue placeholder="Selecciona tiempo de preparación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-2days">1-2 días hábiles</SelectItem>
                <SelectItem value="3-5days">3-5 días hábiles</SelectItem>
                <SelectItem value="1week">1 semana</SelectItem>
                <SelectItem value="2weeks">2 semanas</SelectItem>
                <SelectItem value="1month">1 mes</SelectItem>
                <SelectItem value="custom">Tiempo personalizado</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">Tiempo desde la confirmación del pedido hasta el envío</p>
          </div>

          <Card className="p-4 bg-accent/30">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-1">Tip: Envío rápido</p>
                <p className="text-xs text-muted-foreground">
                  Los productos con envío rápido y cobertura amplia tienen 60% más probabilidad de venta
                </p>
              </div>
            </div>
          </Card>

          <Button size="lg" className="w-full" onClick={nextStep}>
            Continuar
          </Button>
        </div>
      </div>
    )
  }

  // Step 5: Catálogo y Visibilidad
  if (step === 5) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="icon" onClick={prevStep}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold">Catálogo y Visibilidad</h1>
              <span className="text-sm text-muted-foreground font-medium">5/8</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div className="text-center mb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <FolderOpen className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-1">Organización y Alcance</h2>
            <p className="text-sm text-muted-foreground">Define quién puede ver tu producto</p>
          </div>

          <div>
            <Label htmlFor="catalog">Agregar a Catálogo (Opcional)</Label>
            <Select value={formData.catalogId} onValueChange={(val) => updateFormData("catalogId", val)}>
              <SelectTrigger id="catalog" className="mt-2">
                <SelectValue placeholder="Selecciona un catálogo existente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">
                  <span className="text-muted-foreground">Sin catálogo</span>
                </SelectItem>
                <SelectItem value="cat1">📦 Productos Industriales 2025</SelectItem>
                <SelectItem value="cat2">⭐ Colección Premium de Acero</SelectItem>
                <SelectItem value="cat3">🏗️ Catálogo de Materiales al Mayoreo</SelectItem>
                <SelectItem value="new">
                  <span className="text-primary font-medium">+ Crear nuevo catálogo</span>
                </SelectItem>
              </SelectContent>
            </Select>

            {formData.catalogId && formData.catalogId !== "none" && (
              <div className="flex items-center gap-2 mt-3">
                <Switch
                  id="featured"
                  checked={formData.featuredInCatalog}
                  onCheckedChange={(checked) => updateFormData("featuredInCatalog", checked)}
                />
                <Label htmlFor="featured" className="text-sm font-normal cursor-pointer">
                  Destacar en catálogo
                </Label>
              </div>
            )}
          </div>

          <div>
            <Label>Configuración de Visibilidad *</Label>
            <div className="grid gap-3 mt-2">
              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  formData.visibility === "public" ? "border-primary border-2 bg-primary/5" : ""
                }`}
                onClick={() => updateFormData("visibility", "public")}
              >
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium flex items-center gap-2">
                      Marketplace Público
                      <Badge variant="secondary" className="text-xs">
                        Recomendado
                      </Badge>
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Visible para todos los usuarios de Abasti. Máximo alcance.
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  formData.visibility === "private" ? "border-primary border-2 bg-primary/5" : ""
                }`}
                onClick={() => updateFormData("visibility", "private")}
              >
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">Solo Compradores Invitados</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Solo empresas específicas podrán ver y comprar este producto.
                    </p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  formData.visibility === "catalog" ? "border-primary border-2 bg-primary/5" : ""
                }`}
                onClick={() => updateFormData("visibility", "catalog")}
              >
                <div className="flex items-start gap-3">
                  <FolderOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">Solo en Mi Catálogo</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Visible únicamente a través de enlaces compartidos de catálogo.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {formData.visibility === "public" && (
            <Card className="p-4 bg-green-500/10 border-green-500/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-green-900 dark:text-green-100 mb-1">Máxima Visibilidad</p>
                  <p className="text-xs text-green-700 dark:text-green-200">
                    Tu producto aparecerá en el marketplace, búsquedas y recomendaciones personalizadas de Abasti.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Button size="lg" className="w-full" onClick={nextStep}>
            Continuar
          </Button>
        </div>
      </div>
    )
  }

  // Step 6: Automatización
  if (step === 6) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="icon" onClick={prevStep}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold">Compras Automáticas</h1>
              <span className="text-sm text-muted-foreground font-medium">6/8</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div className="text-center mb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <RefreshCw className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-1">Habilitar Automatización</h2>
            <p className="text-sm text-muted-foreground">Permite que los compradores configuren pedidos recurrentes</p>
          </div>

          <Card className="p-5 bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">¿Qué es la automatización?</h3>
                <p className="text-sm text-muted-foreground">
                  Los compradores pueden configurar pedidos automáticos recurrentes (semanales, mensuales, etc.) para
                  productos que necesitan regularmente. Esto genera ventas consistentes y reduce el trabajo manual.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Aumenta ventas recurrentes hasta 3x</span>
            </div>
          </Card>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Permitir compras automáticas</p>
              <p className="text-sm text-muted-foreground">Los compradores pueden configurar pedidos recurrentes</p>
            </div>
            <Switch
              checked={formData.automationEnabled}
              onCheckedChange={(checked) => updateFormData("automationEnabled", checked)}
            />
          </div>

          {formData.automationEnabled && (
            <Card className="p-4 space-y-4">
              <div>
                <p className="font-medium text-sm mb-3">Frecuencias disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  {["Semanal", "Quincenal", "Mensual", "Trimestral", "Anual"].map((freq) => (
                    <Badge key={freq} variant="secondary" className="text-sm">
                      {freq}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t">
                <p className="text-xs text-muted-foreground">
                  Los compradores podrán configurar la frecuencia, cantidad y método de pago para pedidos automáticos de
                  este producto.
                </p>
              </div>
            </Card>
          )}

          <Button size="lg" className="w-full" onClick={nextStep}>
            Continuar
          </Button>
        </div>
      </div>
    )
  }

  // Step 7: IA Auto-Respuesta
  if (step === 7) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="icon" onClick={prevStep}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold">Asistente de IA</h1>
              <span className="text-sm text-muted-foreground font-medium">7/8</span>
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div className="text-center mb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-1">Asistente IA 24/7</h2>
            <p className="text-sm text-muted-foreground">Responde automáticamente preguntas sobre tu producto</p>
          </div>

          <Card className="p-5 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">IA entrenada en tu producto</h3>
                <p className="text-sm text-muted-foreground">
                  Nuestro asistente de IA aprende de la información de tu producto para responder preguntas sobre
                  especificaciones, precios, disponibilidad y envío automáticamente.
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Respuestas instantáneas 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Reduce tiempo de respuesta en 90%</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>Aumenta tasa de conversión</span>
              </div>
            </div>
          </Card>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Activar Asistente de IA</p>
              <p className="text-sm text-muted-foreground">Responde automáticamente a consultas</p>
            </div>
            <Switch
              checked={formData.aiAutoReply}
              onCheckedChange={(checked) => updateFormData("aiAutoReply", checked)}
            />
          </div>

          {formData.aiAutoReply && (
            <>
              <div>
                <Label htmlFor="aiInstructions">Instrucciones Personalizadas (Opcional)</Label>
                <Textarea
                  id="aiInstructions"
                  placeholder="Ej: Siempre mencionar que ofrecemos envío express. Para pedidos mayores a 1000 unidades, indicar que contacten directamente para descuentos especiales..."
                  value={formData.aiInstructions}
                  onChange={(e) => updateFormData("aiInstructions", e.target.value)}
                  rows={5}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Agrega contexto adicional o reglas específicas para que la IA responda mejor
                </p>
              </div>

              <Card className="p-4 bg-accent/30">
                <p className="font-medium text-sm mb-2">La IA responderá preguntas como:</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• "¿Cuáles son las especificaciones técnicas?"</li>
                  <li>• "¿Cuánto cuesta para pedidos de 500 unidades?"</li>
                  <li>• "¿Tienen disponibilidad inmediata?"</li>
                  <li>• "¿Envían a Europa?"</li>
                  <li>• "¿Puedo configurar pedidos automáticos?"</li>
                </ul>
              </Card>
            </>
          )}

          <Button size="lg" className="w-full" onClick={nextStep}>
            Continuar
          </Button>
        </div>
      </div>
    )
  }

  // Step 8: Revisión y Publicación
  if (step === 8) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <Button variant="ghost" size="icon" onClick={prevStep}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-lg font-semibold">Revisión Final</h1>
              <span className="text-sm text-muted-foreground font-medium">8/8</span>
            </div>
            <Progress value={100} className="h-1.5" />
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div className="text-center mb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-1">¡Casi listo!</h2>
            <p className="text-sm text-muted-foreground">Revisa tu producto antes de publicar</p>
          </div>

          {/* Preview Card */}
          <Card className="overflow-hidden">
            <div className="relative aspect-square bg-accent">
              <Image
                src={formData.images[0] || "/placeholder.svg?height=400&width=400&query=industrial product"}
                alt={formData.name}
                fill
                className="object-cover"
              />
              {formData.video && (
                <Badge className="absolute top-3 right-3">
                  <Video className="w-3 h-3 mr-1" />
                  Video
                </Badge>
              )}
            </div>
            <div className="p-4">
              <Badge variant="secondary" className="mb-2">
                {formData.category || "Categoría"}
              </Badge>
              <h3 className="font-bold text-lg mb-2">{formData.name || "Nombre del Producto"}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {formData.description || "Descripción del producto..."}
              </p>
              {formData.priceType === "fixed" && (
                <p className="text-xl font-bold text-primary">
                  {formData.currency} ${formData.price || "0.00"}
                  <span className="text-sm text-muted-foreground font-normal ml-1">/unidad</span>
                </p>
              )}
              {formData.priceType === "quote" && (
                <p className="text-lg font-semibold text-primary">Cotización Personalizada</p>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-4 space-y-3">
            <h3 className="font-semibold">Resumen de Configuración</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo de precio:</span>
                <span className="font-medium">
                  {formData.priceType === "fixed"
                    ? "Precio Fijo"
                    : formData.priceType === "tiered"
                      ? "Por Volumen"
                      : "Cotización"}
                </span>
              </div>

              {formData.stock && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Inventario:</span>
                  <span className="font-medium">{formData.stock} unidades</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Visibilidad:</span>
                <span className="font-medium capitalize">
                  {formData.visibility === "public"
                    ? "Público"
                    : formData.visibility === "private"
                      ? "Privado"
                      : "Solo Catálogo"}
                </span>
              </div>

              {formData.shippingRegions.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío a:</span>
                  <span className="font-medium">{formData.shippingRegions.length} regiones</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Automatización:</span>
                <span className="font-medium">{formData.automationEnabled ? "Habilitada" : "Deshabilitada"}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Asistente IA:</span>
                <span className="font-medium">{formData.aiAutoReply ? "Activo" : "Inactivo"}</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-blue-500/10 border-blue-500/20">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm text-blue-900 dark:text-blue-100 mb-1">
                  Próximos pasos después de publicar
                </p>
                <ul className="text-xs text-blue-700 dark:text-blue-200 space-y-1">
                  <li>• Comparte tu producto en redes sociales</li>
                  <li>• Agrega a catálogos para organizar mejor</li>
                  <li>• Monitorea preguntas y analytics en tu dashboard</li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Button size="lg" variant="outline" onClick={() => setStep(1)} className="bg-transparent">
              Editar
            </Button>
            <Button
              size="lg"
              onClick={() => {
                // Simulate publish success
                window.location.href = "/publish-success"
              }}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Publicar Producto
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
