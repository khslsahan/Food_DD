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
      <main className={hideSidebar ? "flex-1" : "flex-1 ml-64"}>
        {children}
      </main>
    </div>
  )
} 