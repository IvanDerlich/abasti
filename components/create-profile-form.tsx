"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CreateProfileForm() {
  const [step, setStep] = useState(1)
  const [companyType, setCompanyType] = useState("both")

  const totalSteps = 3

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => (step > 1 ? setStep(step - 1) : window.history.back())}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold">Crear perfil de empresa</h1>
          <p className="text-sm text-muted-foreground">
            Paso {step} de {totalSteps}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        />
      </div>

      <div className="p-6 max-w-2xl mx-auto pb-24">
        <form className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nombre de la empresa *</Label>
                  <Input id="company-name" placeholder="Introduce el nombre de la empresa" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Sector *</Label>
                  <Select>
                    <SelectTrigger id="industry" className="h-12">
                      <SelectValue placeholder="Selecciona el sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">Manufactura</SelectItem>
                      <SelectItem value="technology">Tecnología</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Sanidad</SelectItem>
                      <SelectItem value="finance">Finanzas</SelectItem>
                      <SelectItem value="construction">Construcción</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tax-id">CUIT / Tax ID *</Label>
                  <Input id="tax-id" placeholder="Enter tax identification number" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación *</Label>
                  <Input id="location" placeholder="Ciudad, País" className="h-12" />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email *</Label>
                  <Input id="email" type="email" placeholder="contact@company.com" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input id="phone" type="tel" placeholder="+34 600 000 000" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label>Logo de la empresa</Label>
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-8">
                      <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                          <Upload className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">Subir logo de la empresa</p>
                          <p className="text-sm text-muted-foreground">PNG, JPG hasta 5 MB</p>
                        </div>
                        <Button type="button" variant="outline">
                          Elegir archivo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Tipo de empresa *</Label>
                  <RadioGroup value={companyType} onValueChange={setCompanyType}>
                    <Card className={companyType === "buyer" ? "border-primary" : ""}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="buyer" id="buyer" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="buyer" className="font-medium cursor-pointer">
                              Comprador
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Comprar productos y servicios a otras empresas
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={companyType === "seller" ? "border-primary" : ""}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="seller" id="seller" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="seller" className="font-medium cursor-pointer">
                              Vendedor
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              Vender productos y servicios a otras empresas
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className={companyType === "both" ? "border-primary" : ""}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <RadioGroupItem value="both" id="both" className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor="both" className="font-medium cursor-pointer">
                              Ambos
                            </Label>
                            <p className="text-sm text-muted-foreground">Comprar y vender en el marketplace</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </div>

                <Card className="bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Checkbox id="terms" />
                      <div className="space-y-1">
                        <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                          Acepto los Términos de Servicio y la Política de Privacidad
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Al crear una cuenta, aceptas nuestros términos y condiciones
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </form>
      </div>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border">
        <Button
          size="lg"
          className="w-full text-base font-medium h-14"
          onClick={() => (step < totalSteps ? setStep(step + 1) : (window.location.href = "/marketplace"))}
        >
          {step < totalSteps ? "Continuar" : "Crear perfil"}
        </Button>
      </div>
    </div>
  )
}
