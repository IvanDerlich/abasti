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
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card")
  const [step, setStep] = useState<"method" | "card-details" | "crypto-payment" | "success">("method")
  const [cryptoNetwork, setCryptoNetwork] = useState("polygon")
  const [cryptoStatus, setCryptoStatus] = useState<"pending" | "confirmed" | "completed">("pending")

  const orderSummary = {
    product: "Industrial Steel Beams - Grade A",
    quantity: "100 tons",
    unitPrice: "$2,450",
    subtotal: "$245,000",
    tax: "$24,500",
    total: "$269,500",
  }

  const handleCardPayment = () => {
    setStep("success")
  }

  const handleCryptoPayment = () => {
    setStep("crypto-payment")
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
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="text-muted-foreground">Your order has been confirmed and will be processed shortly.</p>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Order ID</span>
                  <span className="font-mono font-medium">ORD-1025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-bold">{orderSummary.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="capitalize">{paymentMethod === "card" ? "Card" : "Stablecoin"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            <Button size="lg" className="w-full h-14" onClick={() => (window.location.href = "/dashboard")}>
              View Order Status
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full h-14 bg-transparent"
              onClick={() => (window.location.href = "/marketplace")}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (step === "crypto-payment") {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 bg-background border-b border-border z-10 p-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setStep("method")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Stablecoin Payment</h1>
        </div>

        <div className="p-4 max-w-2xl mx-auto space-y-6">
          {/* Network Selector */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <Label>Select Network</Label>
              <Select value={cryptoNetwork} onValueChange={setCryptoNetwork}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="polygon">Polygon (MATIC)</SelectItem>
                  <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                  <SelectItem value="solana">Solana (SOL)</SelectItem>
                  <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Lower fees on Polygon and BSC. Choose based on your wallet.
              </p>
            </CardContent>
          </Card>

          {/* Payment Amount */}
          <Card className="border-primary">
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Amount to Pay</p>
                <div className="text-3xl font-bold">269,500 USDC</div>
                <p className="text-xs text-muted-foreground">≈ {orderSummary.total} USD</p>
              </div>
            </CardContent>
          </Card>

          {/* QR Code */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
                  <div className="w-48 h-48 bg-white rounded-lg p-4">
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded flex items-center justify-center">
                      <Wallet className="h-16 w-16 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Wallet Address</Label>
                  <div className="flex gap-2">
                    <Input value="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb" readOnly className="font-mono text-xs" />
                    <Button size="icon" variant="outline">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
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
                    {cryptoStatus === "pending" && "Waiting for payment..."}
                    {cryptoStatus === "confirmed" && "Payment detected!"}
                    {cryptoStatus === "completed" && "Payment confirmed"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {cryptoStatus === "pending" && "Send USDC to the address above"}
                    {cryptoStatus === "confirmed" && "Confirming on blockchain..."}
                    {cryptoStatus === "completed" && "Transaction completed successfully"}
                  </p>
                </div>
                {cryptoStatus === "completed" && <Badge className="bg-green-500">Confirmed</Badge>}
              </div>
            </CardContent>
          </Card>

          {cryptoStatus === "completed" && (
            <>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">Payment Verified</p>
                      <p className="text-xs text-muted-foreground mb-2">Transaction hash: 0x7d3e...9f2a</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                        View on Explorer
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button size="lg" className="w-full h-14" onClick={() => setStep("success")}>
                Complete Order
              </Button>
            </>
          )}
        </div>
      </div>
    )
  }

  if (step === "card-details") {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 bg-background border-b border-border z-10 p-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setStep("method")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Card Payment</h1>
        </div>

        <div className="p-4 max-w-2xl mx-auto space-y-6">
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number *</Label>
                <div className="relative">
                  <Input id="card-number" placeholder="1234 5678 9012 3456" className="h-12 pr-12" />
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date *</Label>
                  <Input id="expiry" placeholder="MM/YY" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input id="cvv" type="password" placeholder="123" maxLength={4} className="h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardholder">Cardholder Name *</Label>
                <Input id="cardholder" placeholder="John Doe" className="h-12" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Billing Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input id="address" placeholder="123 Main St" className="h-12" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" placeholder="San Francisco" className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code *</Label>
                  <Input id="zip" placeholder="94102" className="h-12" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm mb-1">Secure Payment</p>
                  <p className="text-xs text-muted-foreground">
                    Your payment information is encrypted and secure. We never store your full card details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
          <Button size="lg" className="w-full h-14" onClick={handleCardPayment}>
            Pay {orderSummary.total}
          </Button>
        </div>
      </div>
    )
  }

  // Payment Method Selection
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 bg-background border-b border-border z-10 p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Checkout</h1>
      </div>

      <div className="p-4 max-w-2xl mx-auto space-y-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Order Summary</CardTitle>
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
                <p className="text-sm text-muted-foreground">Qty: {orderSummary.quantity}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{orderSummary.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (10%)</span>
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
          <CardHeader>
            <CardTitle className="text-base">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "card" | "crypto")}>
              <Card className={paymentMethod === "card" ? "border-primary bg-primary/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="card" id="card" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="h-5 w-5" />
                        <Label htmlFor="card" className="font-semibold cursor-pointer">
                          Credit / Debit Card
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Pay securely with your credit or debit card</p>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Visa
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Mastercard
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Amex
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={paymentMethod === "crypto" ? "border-primary bg-primary/5" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <RadioGroupItem value="crypto" id="crypto" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Wallet className="h-5 w-5" />
                        <Label htmlFor="crypto" className="font-semibold cursor-pointer">
                          Stablecoin Payment
                        </Label>
                        <Badge className="bg-green-500 text-xs">Lower Fees</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Pay with USDC or USDT on multiple networks</p>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          USDC
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          USDT
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Polygon
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          Ethereum
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="bg-muted/50 border-dashed">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm mb-1">Safe and Secure</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All transactions are encrypted and processed through secure payment gateways. Your financial
                  information is protected.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
        <Button
          size="lg"
          className="w-full h-14"
          onClick={() => {
            if (paymentMethod === "card") {
              setStep("card-details")
            } else {
              handleCryptoPayment()
            }
          }}
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  )
}
