"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, Eye, EyeOff, X } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export function CreateProfileForm() {
  const [step, setStep] = useState(1)
  const [companyType, setCompanyType] = useState("both")
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type)) {
      setLogo(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveLogo = () => {
    setLogo(null)
    setLogoPreview("")
  }

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
                  <Label htmlFor="email">Correo de la Empresa *</Label>
                  <Input id="email" type="email" placeholder="contact@company.com" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 8 caracteres"
                      className="h-12 pr-10"
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono *</Label>
                  <Input id="phone" type="tel" placeholder="+34 600 000 000" className="h-12" />
                </div>

                <div className="space-y-2">
                  <Label>Logo de la empresa</Label>
                  <Card className="border-2 border-dashed">
                    <CardContent className="p-8">
                      {logoPreview ? (
                        <div className="flex flex-col items-center gap-4">
                          <div className="relative w-24 h-24">
                            <Image
                              src={logoPreview}
                              alt="Logo preview"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="file"
                              accept=".png,.jpg,.jpeg,.svg"
                              onChange={handleLogoUpload}
                              className="hidden"
                              id="logo-upload-2"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById("logo-upload-2")?.click()}
                            >
                              Cambiar
                            </Button>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={handleRemoveLogo}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium">Subir logo de la empresa</p>
                            <p className="text-sm text-muted-foreground">PNG, JPG, SVG hasta 5 MB</p>
                          </div>
                          <input
                            type="file"
                            accept=".png,.jpg,.jpeg,.svg"
                            onChange={handleLogoUpload}
                            className="hidden"
                            id="logo-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("logo-upload")?.click()}
                          >
                            Elegir archivo
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Términos de Servicio y Política de Privacidad</h3>
                    
                    <div className="bg-white border border-border rounded-lg mb-4 h-48 overflow-y-auto p-4">
                      <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Términos de Servicio</h4>
                          <p>
                            Al usar nuestra plataforma, aceptas estos términos y condiciones. Nos reservamos el derecho de modificar 
                            estos términos en cualquier momento. Tu uso continuado de la plataforma constituyará tu aceptación de 
                            cualquier cambio. Eres responsable de mantener la confidencialidad de tu cuenta y contraseña, y de todas 
                            las actividades que ocurran bajo tu cuenta. Aceptas no usar la plataforma para participar en actividades 
                            ilegales o que violen derechos de terceros.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Política de Privacidad</h4>
                          <p>
                            Recopilamos información que proporcionas directamente y a través de tu uso de nuestros servicios. Esta 
                            información puede incluir nombre, dirección de correo electrónico, número de teléfono e información de 
                            perfil de empresa. Usamos tus datos para proporcionar, mantener y mejorar nuestros servicios, así como 
                            para comunicarnos contigo. Tus datos se procesan de acuerdo con nuestras prácticas de privacidad y se 
                            protegen mediante medidas de seguridad estándar de la industria. No compartimos tu información personal 
                            con terceros sin tu consentimiento, excepto cuando sea requerido por ley.
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Limitación de Responsabilidad</h4>
                          <p>
                            La plataforma se proporciona "tal cual" sin garantías de ningún tipo. No seremos responsables por daños 
                            indirectos, incidentales, especiales, consecuentes o punitivos que resulten de tu uso o incapacidad para 
                            usar la plataforma. Tu uso de la plataforma es bajo tu propio riesgo.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-white border border-border rounded-lg">
                      <Checkbox 
                        id="accept-terms" 
                        checked={acceptedTerms}
                        onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                      />
                      <Label 
                        htmlFor="accept-terms" 
                        className="text-sm font-normal cursor-pointer pt-1"
                      >
                        Acepto los Términos de Servicio y Políticas de Privacidad *
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </form>
      </div>

      {/* Fixed bottom button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background border-t border-border flex justify-center">
        <Button
          className="w-[280px] h-10 text-base font-medium"
          onClick={() => (step < totalSteps ? setStep(step + 1) : (window.location.href = "/marketplace"))}
        >
          {step < totalSteps ? "Continuar" : "Crear perfil"}
        </Button>
      </div>
    </div>
  )
}
