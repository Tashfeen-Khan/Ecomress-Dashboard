"use client"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const NavBar = () => {
  const { state } = useSidebar()

  return (
    <div
      className={cn(
        "fixed top-0 h-11 w-full bg-pink-500 flex items-center px-2 z-20 transition-all duration-300 ease-linear",
       state === "expanded"
  ? "md:ml-(--sidebar-width) w-[calc(100%-var(--sidebar-width))]"
  : "md:ml-(--sidebar-width-icon) w-[calc(100%-var(--sidebar-width-icon))]"

      )}
    >
      <SidebarTrigger />
      <h1 className="ml-2 text-white font-bold">My Dashboard</h1>
    </div>
  )
}

export default NavBar
