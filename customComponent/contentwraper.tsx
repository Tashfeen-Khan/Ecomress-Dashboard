"use client"

import * as React from "react"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface ContentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function ContentWrapper({
  children,
  className,
  ...props
}: ContentWrapperProps) {
  const { state } = useSidebar()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className={cn(
        "relative flex-1 min-h-svh bg-secondary/30 p-4 pt-12 transition-all duration-300 ease-linear overflow-x-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
