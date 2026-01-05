"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

const NavBar = () => {
  return (
    <div
      className={cn(
        "fixed top-0 z-20 h-11 w-full bg-white border-b border-gray-200 flex items-center px-2 transition-all duration-300 ease-linear",

        // default (collapsed)
        "md:ml-(--sidebar-width-icon) md:w-[calc(100%-var(--sidebar-width-icon))]",


        // when sidebar is expanded
        "peer-data-[state=expanded]:md:ml-(--sidebar-width)",

        "peer-data-[state=expanded]:md:w-[calc(100%-var(--sidebar-width))]"
      )}
    >
      <SidebarTrigger />
      <h1 className="ml-2 font-bold text-black">My Dashboard</h1>
    </div>
  )
}

export default NavBar
