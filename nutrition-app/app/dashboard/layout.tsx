import type React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { requireAuth } from "@/lib/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  await requireAuth()

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1">{children}</div>
    </div>
  )
}
