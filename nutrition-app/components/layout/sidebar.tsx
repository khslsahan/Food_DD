"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Apple, ChefHat, CookingPot, Home, Leaf, LogOut, Menu, Salad, Settings, User, X, Upload } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        toast({
          title: "Logged out successfully",
        })
        router.push("/login")
      } else {
        toast({
          variant: "destructive",
          title: "Logout failed",
          description: "An error occurred. Please try again.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "An error occurred. Please try again.",
      })
    }
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/upload", label: "Upload Recipes", icon: Upload },
    { href: "/meals", label: "Meals", icon: Salad },
    { href: "/components", label: "Components", icon: ChefHat },
    { href: "/portion-options", label: "Portion Options", icon: CookingPot },
    { href: "/ingredients", label: "Ingredients", icon: Apple },
    { href: "/recipe-ingredients", label: "Recipe Ingredients", icon: Leaf },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed top-2 left-2 z-50 md:hidden bg-white/90 backdrop-blur-sm border shadow-sm h-10 w-10" 
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-900 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-center p-4 md:p-6">
            <div className="flex items-center space-x-2">
              <div className="rounded-full bg-primary p-1.5">
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg md:text-xl font-bold">Nutrition App</span>
            </div>
          </div>

          <div className="flex-1 overflow-auto py-2">
            <nav className="grid gap-1 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 md:py-2 text-sm font-medium transition-colors min-h-[44px]",
                    pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-secondary",
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t p-4">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2 min-h-[44px]">
              <User className="h-5 w-5 flex-shrink-0" />
              <span className="text-sm font-medium truncate">Admin User</span>
            </div>
            <Button variant="ghost" className="mt-2 w-full justify-start gap-3 min-h-[44px]" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="truncate">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
