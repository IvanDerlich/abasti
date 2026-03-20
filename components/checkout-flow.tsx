"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Wallet, Shield, Check, Copy, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CheckoutFlow() {
  const [paymentMethod, setPaymentMethod] = useState<"qr">("qr")
  const [step, setStep] = useState<"method" | "qr-payment" | "success">("method")
  const [cryptoNetwork, setCryptoNetwork] = useState("polygon")
  const [cryptoStatus, setCryptoStatus] = useState<"pending" | "confirmed" | "completed">("pending")

  const orderSummary = {
    product: "Vigas de acero industrial - Grado A",
    quantity: "100 toneladas",
    unitPrice: "2.450 €",
    subtotal: "245.000 €",
    tax: "24.500 €",
    total: "269.500 €",
  }

  const handleQrPayment = () => {
    setStep("qr-payment")
    // Simulate payment confirmation
    setTimeout(() => setCryptoStatus("confirmed"), 2000)
    setTimeout(() => setCryptoStatus("completed"), 4000)
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">¡Pago realizado!</h1>
            <p className="text-muted-foreground">Tu pedido ha sido confirmado y se procesará en breve.</p>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID de pedido</span>
                  <span className="font-mono font-medium">ORD-1025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Importe</span>
                  <span className="font-bold">{orderSummary.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Método de pago</span>
                  <span className="capitalize">Pago con QR</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            <Button size="lg" className="w-full h-14" onClick={() => (window.location.href = "/dashboard")}>
              Ver estado del pedido
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full h-14 bg-transparent"
              onClick={() => (window.location.href = "/marketplace")}
            >
              Seguir comprando
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (step === "qr-payment") {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 bg-background border-b border-border z-10 p-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setStep("method")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Pago con stablecoin</h1>
        </div>

        <div className="p-4 max-w-2xl mx-auto space-y-6">
          {/* QR Payment Only */}
          <Card className="border-primary">
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Escanea el QR para pagar</p>
                <div className="w-full flex justify-center">
                  <img src="/qr-placeholder.png" alt="QR de pago" className="w-72 h-72" />
                </div>
                <p className="text-xs text-muted-foreground">Monto: {orderSummary.total} USDC</p>
              </div>
            </CardContent>
          </Card>
          {/* Status */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    cryptoStatus === "completed" ? "bg-green-500/10" : "bg-primary/10"
                  }`}
                >
                  {cryptoStatus === "completed" ? (
                    <Check className="h-6 w-6 text-green-600" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">
                    {cryptoStatus === "pending" && "Esperando el pago..."}
                    {cryptoStatus === "confirmed" && "¡Pago detectado!"}
                    {cryptoStatus === "completed" && "Pago confirmado"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {cryptoStatus === "pending" && "Escanea el QR y realiza el pago"}
                    {cryptoStatus === "confirmed" && "Confirmando en la blockchain..."}
                    {cryptoStatus === "completed" && "Transacción completada con éxito"}
                  </p>
                </div>
                {cryptoStatus === "completed" && <Badge className="bg-green-500">Confirmado</Badge>}
              </div>
            </CardContent>
          </Card>
          {cryptoStatus === "completed" && (
            <Button size="lg" className="w-full h-14" onClick={() => setStep("success")}>Finalizar pedido</Button>
          )}
        </div>
      </div>
    )
  }

  // Eliminado el flujo de tarjeta

  // Payment Method Selection (like automation)
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 bg-background border-b border-border z-10 p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Checkout</h1>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-4">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resumen del pedido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-3">
              <img
                src="/placeholder.svg?key=hrrei"
                alt={orderSummary.product}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-sm line-clamp-2">{orderSummary.product}</h3>
                <p className="text-sm text-muted-foreground">Cant.: {orderSummary.quantity}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{orderSummary.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IVA (10%)</span>
                <span className="font-medium">{orderSummary.tax}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary">{orderSummary.total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <Label>Método de pago *</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <Card className={paymentMethod === "qr" ? "border-primary bg-primary/5" : ""}>
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="qr" id="qr" />
                    <img
                      src="/qr-placeholder.png"
                      alt="QR para pago"
                      className="h-36 w-36 text-muted-foreground border rounded"
                    />
                    <div className="flex-1">
                      <Label htmlFor="qr" className="font-medium cursor-pointer">
                        Pago con QR
                      </Label>
                      <p className="text-xs text-muted-foreground">Escanea para pagar</p>
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
            <h3 className="font-semibold">Resumen del checkout</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Producto</span>
                <span className="font-medium">{orderSummary.product}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cantidad</span>
                <span className="font-medium">{orderSummary.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-medium">{orderSummary.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pago</span>
                <span className="font-medium">
                  {paymentMethod === "qr" ? (
                    <>
                      Pago con QR
                      <img
                        src="/qr-placeholder.png"
                        alt="QR para pago"
                        className="w-24 h-24 inline-block ml-2 align-middle border rounded"
                      />
                    </>
                  ) : (
                    'Stablecoin'
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fixed Bottom Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
          <Button
            size="lg"
            className="w-full h-14"
            onClick={() => {
              if (paymentMethod === "qr") {
                setStep("qr-payment")
              } else {
                setStep("success")
              }
            }}
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  )
}
