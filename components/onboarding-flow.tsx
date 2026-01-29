"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, ShoppingCart, Zap } from "lucide-react"

export function OnboardingFlow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      icon: ShoppingCart,
      title: "Buy and sell B2B without friction",
      description:
        "Connect with verified companies and streamline your procurement process with our enterprise marketplace.",
      color: "text-primary",
    },
    {
      icon: Zap,
      title: "Automated procurement",
      description: "Set up automatic purchasing rules and let Abasti handle recurring orders for you.",
      color: "text-primary",
    },
    {
      icon: Building2,
      title: "Private catalogs for your company",
      description: "Create exclusive product catalogs for your partners with custom pricing and terms.",
      color: "text-primary",
    },
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const handleSkip = () => {
    // Navigate to company profile creation
    window.location.href = "/create-profile"
  }

  const CurrentIcon = slides[currentSlide].icon

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Skip button */}
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
              <CurrentIcon className={`w-12 h-12 ${slides[currentSlide].color}`} />
            </div>
          </div>

          {/* Text content */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-balance">{slides[currentSlide].title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 pt-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="p-6 space-y-3">
        {currentSlide === slides.length - 1 ? (
          <>
            <Button
              size="lg"
              className="w-full text-base font-medium h-14"
              onClick={() => (window.location.href = "/create-profile")}
            >
              Create Company Profile
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full text-base font-medium h-14 bg-transparent"
              onClick={() => (window.location.href = "/signin")}
            >
              Sign In
            </Button>
          </>
        ) : (
          <Button size="lg" className="w-full text-base font-medium h-14" onClick={handleNext}>
            Next
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  )
}
