"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Package, DollarSign, CreditCard, Wallet, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CreateAutomationForm() {
  const [frequency, setFrequency] = useState("weekly")
  const [autoApprove, setAutoApprove] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [step, setStep] = useState(1)

  const totalSteps = 3

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border z-10 p-4">
        <div className="flex items-center gap-4 mb-2">
          <Button variant="ghost" size="icon" onClick={() => (step > 1 ? setStep(step - 1) : window.history.back())}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Configurar compra automática</h1>
            <p className="text-sm text-muted-foreground">
              Paso {step} de {totalSteps}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted rounded-full -mx-4 mt-3">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-4">
        {step === 1 && (
          <>
            {/* Product Selection */}
            <Card>
              <CardContent className="p-4">
                <Label className="mb-3 block">Producto o catálogo</Label>
                <Card className="border-primary">
                  <CardContent className="p-3">
                    <div className="flex gap-3">
                      <img src="/placeholder.svg?key=hrrei" alt="Product" className="w-16 h-16 rounded object-cover" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">Industrial Steel Beams</h3>
                        <p className="text-xs text-muted-foreground">BuildCorp Industries</p>
                        <p className="text-sm font-bold text-primary mt-1">$2,450/ton</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Button variant="outline" className="w-full mt-3 bg-transparent">
                  Change Product
                </Button>
              </CardContent>
            </Card>

            {/* Frequency */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Label>Frecuencia de compra *</Label>
                <RadioGroup value={frequency} onValueChange={setFrequency}>
                  <Card className={frequency === "daily" ? "border-primary" : ""}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily" className="font-medium cursor-pointer flex-1">
                          Diario
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={frequency === "weekly" ? "border-primary" : ""}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly" className="font-medium cursor-pointer flex-1">
                          Semanal
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={frequency === "monthly" ? "border-primary" : ""}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly" className="font-medium cursor-pointer flex-1">
                          Mensual
                        </Label>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={frequency === "custom" ? "border-primary" : ""}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="custom" id="custom" />
                        <Label htmlFor="custom" className="font-medium cursor-pointer flex-1">
                          Programación personalizada
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </RadioGroup>

                {frequency === "custom" && (
                  <div className="pt-2">
                    <Label className="text-sm">Cada</Label>
                    <div className="flex gap-2 mt-2">
                      <Input type="number" placeholder="7" className="flex-1" />
                      <Select>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="días" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="days">Días</SelectItem>
                          <SelectItem value="weeks">Semanas</SelectItem>
                          <SelectItem value="months">Meses</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}

        {step === 2 && (
          <>
            {/* Quantity Rules */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Cantidad por pedido *</Label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="quantity" type="number" placeholder="100" className="pl-10 h-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unidad</Label>
                  <Select>
                    <SelectTrigger id="unit" className="h-12">
                      <SelectValue placeholder="Selecciona unidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tons">Toneladas</SelectItem>
                      <SelectItem value="units">Unidades</SelectItem>
                      <SelectItem value="boxes">Cajas</SelectItem>
                      <SelectItem value="pallets">Palés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Budget Limits */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="max-budget">Presupuesto máximo por pedido (opcional)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="max-budget" type="number" placeholder="50000" className="pl-10 h-12" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Los pedidos que superen esta cantidad requerirán aprobación manual
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Auto-Approve */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Switch id="auto-approve" checked={autoApprove} onCheckedChange={setAutoApprove} />
                  <div className="flex-1">
                    <Label htmlFor="auto-approve" className="cursor-pointer font-medium">
                      Aprobar pedidos automáticamente
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Aprobar y procesar pedidos automáticamente sin revisión manual
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {step === 3 && (
          <>
            {/* Delivery Preferences */}
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="delivery-address">Dirección de entrega *</Label>
                  <Input id="delivery-address" placeholder="Introduce la dirección de entrega" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="delivery-notes">Notas de entrega (opcional)</Label>
                  <Input id="delivery-notes" placeholder="Instrucciones especiales..." className="h-12" />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Label>Método de pago *</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <Card className={paymentMethod === "card" ? "border-primary bg-primary/5" : ""}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <Label htmlFor="card" className="font-medium cursor-pointer">
                            Tarjeta de crédito/débito
                          </Label>
                          <p className="text-xs text-muted-foreground">Visa •••• 4242</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className={paymentMethod === "crypto" ? "border-primary bg-primary/5" : ""}>
                    <CardContent className="p-3">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="crypto" id="crypto" />
                        <Wallet className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <Label htmlFor="crypto" className="font-medium cursor-pointer">
                            Monedero stablecoin
                          </Label>
                          <p className="text-xs text-muted-foreground">USDC / USDT</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </RadioGroup>

                <Button variant="outline" className="w-full bg-transparent">
                  Añadir nuevo método de pago
                </Button>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="bg-muted/50">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold">Resumen de la automatización</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frequency</span>
                    <span className="font-medium capitalize">{frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Auto-aprobar</span>
                    <span className="font-medium">{autoApprove ? "Enabled" : "Disabled"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment</span>
                    <span className="font-medium">{paymentMethod === "card" ? "Tarjeta" : "Stablecoin"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button
          size="lg"
          className="w-full h-14"
          onClick={() => {
            if (step < totalSteps) {
              setStep(step + 1)
            } else {
              window.location.href = "/dashboard?tab=automations"
            }
          }}
        >
          {step < totalSteps ? (
            "Continuar"
          ) : (
            <>
              <Check className="h-5 w-5 mr-2" />
              Crear automatización
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
