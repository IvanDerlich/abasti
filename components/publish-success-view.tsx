"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Share2, Eye, BarChart3, Package } from "lucide-react"
import Link from "next/link"
import Confetti from "react-confetti"
import { useState, useEffect } from "react"

export function PublishSuccessView() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background pb-20">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} />}

      <div className="px-4 py-12">
        <div className="max-w-md mx-auto text-center space-y-6">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">¡Producto Publicado!</h1>
            <p className="text-muted-foreground">
              Tu producto ya está disponible en Loop y los compradores pueden verlo ahora mismo
            </p>
          </div>

          {/* Product Summary Card */}
          <Card className="p-5 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Industrial Steel Beams</p>
                <p className="text-sm text-muted-foreground">ID: #PRD-2025-001</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t">
              <div className="text-center">
                <Eye className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Vistas</p>
                <p className="font-bold">0</p>
              </div>
              <div className="text-center">
                <BarChart3 className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Interés</p>
                <p className="font-bold">0%</p>
              </div>
              <div className="text-center">
                <Share2 className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Compartidos</p>
                <p className="font-bold">0</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-3">
            <Link href="/product/1">
              <Button size="lg" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Ver Producto Publicado
              </Button>
            </Link>

            <Button size="lg" variant="outline" className="w-full bg-transparent">
              <Share2 className="w-4 h-4 mr-2" />
              Compartir Producto
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/dashboard">
                <Button variant="outline" className="w-full bg-transparent">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/publish-product">
                <Button variant="outline" className="w-full bg-transparent">
                  <Package className="w-4 h-4 mr-2" />
                  Publicar Otro
                </Button>
              </Link>
            </div>
          </div>

          {/* Tips Card */}
          <Card className="p-4 bg-accent/30 text-left">
            <p className="font-medium text-sm mb-2">💡 Tips para aumentar ventas:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Comparte en redes sociales y con tus clientes</li>
              <li>• Agrega más imágenes de alta calidad</li>
              <li>• Responde rápido a las consultas</li>
              <li>• Actualiza el inventario regularmente</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
