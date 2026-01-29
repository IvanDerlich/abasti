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
import {
  Package,
  Wrench,
  Upload,
  X,
  DollarSign,
  Eye,
  FolderOpen,
  RefreshCw,
  Bot,
  CheckCircle2,
  Share2,
  ChevronLeft,
  ImageIcon,
  Video,
  Plus,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function PublishArticleFlow() {
  const [step, setStep] = useState(1)
  const [articleType, setArticleType] = useState<"product" | "service" | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    description: "",
    tags: [] as string[],
    images: [] as string[],
    video: "",
    priceType: "fixed",
    price: "",
    currency: "USD",
    stock: "",
    tierPricing: [{ quantity: "", price: "" }],
    catalogId: "",
    visibility: "public",
    minOrder: "",
    region: "",
    automationEnabled: false,
    automationRules: {
      frequency: "monthly",
      quantity: "",
      deliveryPrefs: "",
    },
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

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 9))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  // Step 1: Choose Type
  if (step === 1) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <Link href="/marketplace">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Create Article</h1>
            <div className="w-10" />
          </div>
        </div>

        <div className="px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">What are you publishing?</h2>
            <p className="text-muted-foreground">Choose the type of article to create</p>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            <Card
              className="p-6 cursor-pointer hover:border-primary transition-colors"
              onClick={() => {
                setArticleType("product")
                nextStep()
              }}
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <Package className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">Create Product</h3>
                  <p className="text-sm text-muted-foreground">Physical goods, materials, or inventory items</p>
                </div>
              </div>
            </Card>

            <Card
              className="p-6 cursor-pointer hover:border-primary transition-colors"
              onClick={() => {
                setArticleType("service")
                nextStep()
              }}
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-xl">
                  <Wrench className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">Create Service</h3>
                  <p className="text-sm text-muted-foreground">Professional services, consulting, or labor</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Basic Info
  if (step === 2) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prevStep}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Basic Information</h1>
            <span className="text-sm text-muted-foreground">1/8</span>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div>
            <Label htmlFor="name">{articleType === "product" ? "Product" : "Service"} Name *</Label>
            <Input
              id="name"
              placeholder={`Enter ${articleType} name`}
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(val) => updateFormData("category", val)}>
              <SelectTrigger id="category" className="mt-2">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="construction">Construction Materials</SelectItem>
                <SelectItem value="electronics">Electronics & Tech</SelectItem>
                <SelectItem value="industrial">Industrial Equipment</SelectItem>
                <SelectItem value="textiles">Textiles & Fabrics</SelectItem>
                <SelectItem value="chemicals">Chemicals & Raw Materials</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="subcategory">Subcategory</Label>
            <Select value={formData.subcategory} onValueChange={(val) => updateFormData("subcategory", val)}>
              <SelectTrigger id="subcategory" className="mt-2">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="steel">Steel & Metal</SelectItem>
                <SelectItem value="lumber">Lumber & Wood</SelectItem>
                <SelectItem value="concrete">Concrete & Cement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe your product or service..."
              value={formData.description}
              onChange={(e) => updateFormData("description", e.target.value)}
              rows={5}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTag(e.currentTarget.value)
                    e.currentTarget.value = ""
                  }
                }}
              />
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={nextStep}>
            Continue
          </Button>
        </div>
      </div>
    )
  }

  // Step 3: Media Upload
  if (step === 3) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prevStep}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Media Upload</h1>
            <span className="text-sm text-muted-foreground">2/8</span>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div>
            <Label>Images *</Label>
            <p className="text-sm text-muted-foreground mb-4">Add up to 10 images</p>

            <Card className="p-8 border-dashed cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="text-center">
                <Upload className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="font-medium mb-1">Click to upload images</p>
                <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB each</p>
              </div>
            </Card>

            {formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-4">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative aspect-square">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Upload ${idx + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
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
            <Label>Video (Optional)</Label>
            <p className="text-sm text-muted-foreground mb-4">Add a product demo or showcase video</p>

            <Card className="p-6 border-dashed cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6 text-muted-foreground" />
                <div>
                  <p className="font-medium text-sm">Upload Video</p>
                  <p className="text-xs text-muted-foreground">MP4, MOV up to 100MB</p>
                </div>
              </div>
            </Card>
          </div>

          <Button size="lg" className="w-full" onClick={nextStep}>
            Continue
          </Button>
        </div>
      </div>
    )
  }

  // Step 4: Pricing
  if (step === 4) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prevStep}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Pricing</h1>
            <span className="text-sm text-muted-foreground">3/8</span>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div>
            <Label>Pricing Type *</Label>
            <div className="grid gap-3 mt-2">
              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  formData.priceType === "fixed" ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => updateFormData("priceType", "fixed")}
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Fixed Price</p>
                    <p className="text-sm text-muted-foreground">Set one price for all buyers</p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  formData.priceType === "tiered" ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => updateFormData("priceType", "tiered")}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Tiered Pricing</p>
                    <p className="text-sm text-muted-foreground">Bulk discounts based on quantity</p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  formData.priceType === "quote" ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => updateFormData("priceType", "quote")}
              >
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Request Quote</p>
                    <p className="text-sm text-muted-foreground">Custom pricing for each order</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {formData.priceType === "fixed" && (
            <>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => updateFormData("price", e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={formData.currency} onValueChange={(val) => updateFormData("currency", val)}>
                    <SelectTrigger id="currency" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="Available units"
                  value={formData.stock}
                  onChange={(e) => updateFormData("stock", e.target.value)}
                  className="mt-2"
                />
              </div>
            </>
          )}

          {formData.priceType === "tiered" && (
            <div>
              <Label>Bulk Pricing Tiers</Label>
              <p className="text-sm text-muted-foreground mb-3">Set prices based on order quantity</p>
              <div className="space-y-3">
                <Card className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Min Quantity</Label>
                      <Input placeholder="1-99" className="mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Price per Unit</Label>
                      <Input placeholder="$100" className="mt-1" />
                    </div>
                  </div>
                </Card>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  <Upload className="w-4 h-4 mr-2" />
                  Add Tier
                </Button>
              </div>
            </div>
          )}

          <Button size="lg" className="w-full" onClick={nextStep}>
            Continue
          </Button>
        </div>
      </div>
    )
  }

  // Step 5: Catalog & Visibility
  if (step === 5) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prevStep}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Catalog & Visibility</h1>
            <span className="text-sm text-muted-foreground">4/8</span>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div>
            <Label htmlFor="catalog">Add to Catalog (Optional)</Label>
            <Select value={formData.catalogId} onValueChange={(val) => updateFormData("catalogId", val)}>
              <SelectTrigger id="catalog" className="mt-2">
                <SelectValue placeholder="Select catalog" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="cat1">Industrial Products 2025</SelectItem>
                <SelectItem value="cat2">Premium Steel Collection</SelectItem>
                <SelectItem value="cat3">Bulk Materials Catalog</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Visibility Settings *</Label>
            <div className="grid gap-3 mt-2">
              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  formData.visibility === "public" ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => updateFormData("visibility", "public")}
              >
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Public Marketplace</p>
                    <p className="text-sm text-muted-foreground">Visible to all Abasti users</p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  formData.visibility === "private" ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => updateFormData("visibility", "private")}
              >
                <div className="flex items-start gap-3">
                  <FolderOpen className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Private</p>
                    <p className="text-sm text-muted-foreground">Only invited companies can view</p>
                  </div>
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  formData.visibility === "catalog" ? "border-primary bg-primary/5" : ""
                }`}
                onClick={() => updateFormData("visibility", "catalog")}
              >
                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Catalog Only</p>
                    <p className="text-sm text-muted-foreground">Only visible in selected catalog</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <Label htmlFor="minOrder">Minimum Order Quantity</Label>
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
            <Label htmlFor="region">Region Availability</Label>
            <Select value={formData.region} onValueChange={(val) => updateFormData("region", val)}>
              <SelectTrigger id="region" className="mt-2">
                <SelectValue placeholder="Select regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="na">North America</SelectItem>
                <SelectItem value="eu">Europe</SelectItem>
                <SelectItem value="asia">Asia Pacific</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button size="lg" className="w-full" onClick={nextStep}>
            Continue
          </Button>
        </div>
      </div>
    )
  }

  // Step 6: Automation Compatibility
  if (step === 6) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prevStep}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Automation</h1>
            <span className="text-sm text-muted-foreground">5/8</span>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <Card className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Enable Procurement Automation</h3>
                  <p className="text-sm text-muted-foreground">
                    Allow customers to set up recurring automated purchases
                  </p>
                </div>
              </div>
              <Switch
                checked={formData.automationEnabled}
                onCheckedChange={(checked) => updateFormData("automationEnabled", checked)}
              />
            </div>
          </Card>

          {formData.automationEnabled && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="frequency">Default Frequency</Label>
                <Select
                  value={formData.automationRules.frequency}
                  onValueChange={(val) =>
                    updateFormData("automationRules", { ...formData.automationRules, frequency: val })
                  }
                >
                  <SelectTrigger id="frequency" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="autoQuantity">Suggested Quantity per Order</Label>
                <Input
                  id="autoQuantity"
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.automationRules.quantity}
                  onChange={(e) =>
                    updateFormData("automationRules", { ...formData.automationRules, quantity: e.target.value })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="deliveryPrefs">Delivery Preferences</Label>
                <Textarea
                  id="deliveryPrefs"
                  placeholder="Special delivery instructions or preferences..."
                  value={formData.automationRules.deliveryPrefs}
                  onChange={(e) =>
                    updateFormData("automationRules", { ...formData.automationRules, deliveryPrefs: e.target.value })
                  }
                  rows={3}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          <Button size="lg" className="w-full" onClick={nextStep}>
            Continue
          </Button>
        </div>
      </div>
    )
  }

  // Step 7: AI Auto-Reply Settings
  if (step === 7) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prevStep}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">AI Settings</h1>
            <span className="text-sm text-muted-foreground">6/8</span>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <Card className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <Bot className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">AI Auto-Reply</h3>
                  <p className="text-sm text-muted-foreground">Automatically respond to common product questions</p>
                </div>
              </div>
              <Switch
                checked={formData.aiAutoReply}
                onCheckedChange={(checked) => updateFormData("aiAutoReply", checked)}
              />
            </div>
          </Card>

          {formData.aiAutoReply && (
            <div className="space-y-6">
              <div>
                <Label>Suggested Replies</Label>
                <p className="text-sm text-muted-foreground mb-3">
                  AI will respond to these common questions automatically
                </p>
                <div className="space-y-2">
                  {[
                    "What's the minimum order quantity?",
                    "Do you offer bulk discounts?",
                    "What's the lead time for delivery?",
                    "Can I request a custom quote?",
                  ].map((question, idx) => (
                    <Card key={idx} className="p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">{question}</p>
                        <Switch defaultChecked />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="aiInstructions">Custom AI Instructions</Label>
                <Textarea
                  id="aiInstructions"
                  placeholder="e.g., 'Prioritize technical specifications', 'Always mention sustainability certifications'..."
                  value={formData.aiInstructions}
                  onChange={(e) => updateFormData("aiInstructions", e.target.value)}
                  rows={4}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Guide how the AI should respond to customer inquiries
                </p>
              </div>
            </div>
          )}

          <Button size="lg" className="w-full" onClick={nextStep}>
            Continue
          </Button>
        </div>
      </div>
    )
  }

  // Step 8: Final Review
  if (step === 8) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="bg-card border-b sticky top-0 z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={prevStep}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">Review</h1>
            <span className="text-sm text-muted-foreground">7/8</span>
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">Review Your Article</h2>
            <p className="text-sm text-muted-foreground">Make sure everything looks good before publishing</p>
          </div>

          {/* Preview Card */}
          <Card className="overflow-hidden">
            <div className="aspect-square bg-muted relative">
              <ImageIcon className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
            <div className="p-4">
              <Badge variant="secondary" className="mb-2">
                {formData.category || "Category"}
              </Badge>
              <h3 className="font-bold text-lg mb-2">{formData.name || "Product Name"}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {formData.description || "Product description will appear here"}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-primary">
                  {formData.priceType === "quote"
                    ? "Request Quote"
                    : `$${formData.price || "0.00"} ${formData.currency}`}
                </p>
                {formData.stock && <p className="text-sm text-muted-foreground">{formData.stock} in stock</p>}
              </div>
            </div>
          </Card>

          {/* Details Summary */}
          <div className="space-y-3">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Visibility</span>
                <span className="text-sm font-medium capitalize">{formData.visibility}</span>
              </div>
            </Card>

            {formData.catalogId && formData.catalogId !== "none" && (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Catalog</span>
                  <span className="text-sm font-medium">Industrial Products 2025</span>
                </div>
              </Card>
            )}

            {formData.automationEnabled && (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Automation</span>
                  <Badge variant="secondary" className="gap-1">
                    <RefreshCw className="w-3 h-3" />
                    Enabled
                  </Badge>
                </div>
              </Card>
            )}

            {formData.aiAutoReply && (
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">AI Auto-Reply</span>
                  <Badge variant="secondary" className="gap-1">
                    <Bot className="w-3 h-3" />
                    Active
                  </Badge>
                </div>
              </Card>
            )}
          </div>

          <Button size="lg" className="w-full" onClick={nextStep}>
            Publish Article
          </Button>
        </div>
      </div>
    )
  }

  // Step 9: Success
  if (step === 9) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="px-4 py-8 text-center max-w-md">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>

          <h2 className="text-2xl font-bold mb-3">Article Published!</h2>
          <p className="text-muted-foreground mb-8">Your {articleType} is now live and visible to buyers on Abasti.</p>

          <div className="space-y-3">
            <Link href="/product/1">
              <Button size="lg" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View Article
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => {
                setStep(1)
                setArticleType(null)
                setFormData({
                  name: "",
                  category: "",
                  subcategory: "",
                  description: "",
                  tags: [],
                  images: [],
                  video: "",
                  priceType: "fixed",
                  price: "",
                  currency: "USD",
                  stock: "",
                  tierPricing: [{ quantity: "", price: "" }],
                  catalogId: "",
                  visibility: "public",
                  minOrder: "",
                  region: "",
                  automationEnabled: false,
                  automationRules: {
                    frequency: "monthly",
                    quantity: "",
                    deliveryPrefs: "",
                  },
                  aiAutoReply: true,
                  aiInstructions: "",
                })
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Another Article
            </Button>
            <Button size="lg" variant="ghost" className="w-full">
              <Share2 className="w-4 h-4 mr-2" />
              Share Link
            </Button>
          </div>

          <Link href="/marketplace">
            <Button variant="link" className="mt-6">
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return null
}
