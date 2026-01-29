"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, FolderOpen, ShoppingCart, User, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AppShellProps {
  children: React.ReactNode
}

const navItems = [
  { href: "/marketplace", label: "Home", icon: Home },
  { href: "/catalogs", label: "Catalogs", icon: FolderOpen },
  { href: "/dashboard", label: "Orders", icon: ShoppingCart },
  { href: "/company/my-profile", label: "Profile", icon: User },
]

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()

  // Pages that should not show the navigation shell
  const hideNavPages = ["/", "/signin", "/create-profile"]
  const shouldHideNav = hideNavPages.some((page) => pathname === page || pathname.startsWith("/onboarding"))

  if (shouldHideNav) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-sidebar border-r border-sidebar-border">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-sidebar-border">
          <Link href="/marketplace" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-sidebar-foreground">Abasti</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Publish Button */}
        <div className="p-4 border-t border-sidebar-border">
          <Button asChild className="w-full">
            <Link href="/publish-product">
              <Plus className="h-4 w-4 mr-2" />
              Publish Product
            </Link>
          </Button>
        </div>
      </aside>

      <main className="lg:pl-64 pb-20 lg:pb-0">{children}</main>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
