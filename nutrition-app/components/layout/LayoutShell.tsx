"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import type React from "react"

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Hide sidebar on login page
  const hideSidebar = pathname.startsWith("/login")

  return (
    <div className="flex min-h-screen">
      {!hideSidebar && <Sidebar />}
      <main className={`
        flex-1 
        ${hideSidebar ? "" : "md:ml-64"} 
        transition-all duration-300 ease-in-out
        p-2 sm:p-4 md:p-6
        min-h-screen
        w-full
      `}>
        {children}
      </main>
    </div>
  )
} 