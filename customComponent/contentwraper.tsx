"use client"

import * as React from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface ContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ContentWrapper({ children, className, ...props }: ContentWrapperProps) {
  const { state } = useSidebar()

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-linear min-h-screen w-full bg-gray-600 p-4 pt-12",
        // state === "expanded" ? "md:ml-[var(--sidebar-width)]" : "md:ml-[var(--sidebar-width-icon)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
