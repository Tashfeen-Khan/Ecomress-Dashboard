"use client"

import {
  Home,
  Inbox,
  LogOut,
  Settings,
  User,
  ChevronUp,
  ChevronDown,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

/* MENU */
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Products",
    url: "/products",
    icon: Inbox,
    children: [
      { title: "Product List", url: "/products" },
      { title: "Create Product", url: "/products/create" },
    ],
  }
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(
    pathname.startsWith("/products") ? "Products" : null
  )
  const { setOpen } = useSidebar()

  const handleLinkClick = () => {
    // Open sidebar when any menu item is clicked (if it's collapsed)
    setOpen(true)
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      <SidebarContent>
        <SidebarGroup>
          {/* LOGO */}
          <SidebarGroupLabel className="text-3xl font-bold flex items-center gap-2">
            <Image src="/user/profile.jpg" alt="Logo" width={30} height={30} />
            <span className="group-data-[collapsible=icon]:hidden">TailAdmin</span>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="mt-4">
              {items.map((item) => {
                const isActive =
                  pathname === item.url ||
                  pathname.startsWith(item.url + "/")

                /* SIMPLE ROUTE (HOME) */
                if (!item.children) {
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        className={`h-12 flex items-center gap-2 px-3 rounded-md cursor-pointer
                          ${isActive
                            ? "bg-primary text-white"
                            : "bg-white text-black hover:bg-secondary hover:text-primary"}
                        `}
                      >
                        <Link 
                          href={item.url} 
                          className="flex items-center gap-2"
                          onClick={handleLinkClick}
                        >
                          <item.icon />
                          <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }

                /* PARENT WITH CHILDREN (PRODUCTS) */
                return (
                  <SidebarMenuItem key={item.title}>
                    <div
                      className={`h-12 flex items-center justify-between px-1 rounded-md cursor-pointer
                        ${isActive
                          ? "bg-primary text-white"
                          : "bg-white text-black hover:bg-secondary hover:text-primary"}
                      `}
                    >
                      <Link
                        href={item.url}
                        className={`${isActive ? "pl-2" : "pl-0"} flex items-center gap-2 flex-1`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleLinkClick()
                          setOpenMenu(openMenu === item.title ? null : item.title)
                        }}
                      >
                        <item.icon />
                        <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          e.preventDefault()
                          handleLinkClick()
                          setOpenMenu(openMenu === item.title ? null : item.title)
                        }}
                        className="ml-2 group-data-[collapsible=icon]:hidden"
                      >
                        {openMenu === item.title ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* NESTED */}
                    {openMenu === item.title && (
                      <div className="ml-8 mt-1 space-y-1 group-data-[collapsible=icon]:hidden">
                        {item.children.map((child) => {
                          const childActive = pathname === child.url

                          return (
                            <Link
                              key={child.title}
                              href={child.url}
                              className={`block rounded-md px-3 py-2 text-sm
                                ${childActive
                                  ? "bg-primary text-white"
                                  : "text-black hover:bg-secondary hover:text-primary"}
                              `}
                              onClick={handleLinkClick}
                            >
                              {child.title}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/user/profile.jpg" />
                    <AvatarFallback>TK</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-medium">Tashfeen</span>
                    <span className="text-xs text-muted-foreground">Admin</span>
                  </div>

                  <ChevronUp className="ml-auto h-4 w-4 group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="top" align="start" className="w-48">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}