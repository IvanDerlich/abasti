"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Lock } from "lucide-react"

export function SignInForm() {
  return (
    <div className="min-h-screen bg-background">
      <div className="p-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-primary mx-auto flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary-foreground">L</span>
            </div>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your Abasti account</p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@company.com" className="pl-10 h-12" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    Forgot password?
                  </Button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input id="password" type="password" placeholder="••••••••" className="pl-10 h-12" />
                </div>
              </div>

              <Button size="lg" className="w-full h-12" onClick={() => (window.location.href = "/marketplace")}>
                Sign In
              </Button>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold"
                onClick={() => (window.location.href = "/create-profile")}
              >
                Create one
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
