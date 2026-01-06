"use client"

import {
  Home,
  Inbox,
  LogOut,
  ChevronUp,
  ChevronDown,
  LogIn,
  ImageUp,
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
  SidebarTrigger,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"

/* MENU */
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Products",
    url: "/products",
    icon: Inbox,
    children: [
      { title: "Product List", url: "/products" },
    ],
  },
{
    title: "Banners",
    url: "/banners",
    icon: ImageUp,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openMenu, setOpenMenu] = useState<string | null>(
    pathname.startsWith("/products") ? "Products" : null
  )
  const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false)
 const [error, setError] = useState("")
const router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setOpen } = useSidebar()

  const handleLinkClick = () => {
    // Open sidebar when any menu item is clicked (if it's collapsed)
    setOpen(true)
  }
 const handleLogin = async () => {
    try {
      setLoading(true)
      setError("")

      console.log("🔄 Logging in...")

      // ✅ CORRECT ENDPOINT: /api/auth/login
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )

      console.log("✅ Login response:", response.data)

      if (response.data.token) {
        // Save token to localStorage
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        
        // Close modal
        setIsModalOpen(false)
        
        // Clear form
        setEmail("")
        setPassword("")
        
        // Show success message
        alert("Login successful! 🎉")
        
        // Refresh the page or redirect
        window.location.reload()
      }
    } catch (err: any) {
      console.error("❌ Login error:", err)
      
      if (err.response) {
        // Server responded with error
        setError(err.response.data.message || "Login failed")
        alert(`Error: ${err.response.data.message}`)
      } else if (err.request) {
        // No response received
        setError("Server not responding. Check if backend is running.")
        alert("⚠️ Server not responding. Make sure backend is running on port 5000.")
      } else {
        // Other errors
        setError("An error occurred. Please try again.")
        alert("An unexpected error occurred.")
      }
    } finally {
      setLoading(false)
    }
  }
  const handleLogout = () => {
  localStorage.removeItem("token"); // ya cookie delete karo
  window.location.href = "/"; // redirect to login page
};

  return (
    <>
    <Sidebar collapsible="icon" className="border-r border-gray-200">
      <SidebarContent>
        <SidebarGroup>
          {/* LOGO */}
          <SidebarGroupLabel className="text-3xl font-bold flex  justify-between gap-2">
            <div className="flex gap-2">
            <Image src="/user/profile.jpg" alt="Logo" width={40} height={40} className="rounded-xl"/>
            <span className="group-data-[collapsible=icon]:hidden">TailAdmin</span>
            </div>
             <SidebarTrigger className="hidden max-[760px]:flex" />

          </SidebarGroupLabel>
          {/* <div className="flex justify-end">
          </div> */}

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
                            ? "bg-secondary text-primary"
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
                          ? "bg-secondary text-primary"
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
                                  ? "bg-secondary text-primary"
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
      <SidebarFooter className="border-t border-t-gray-400  ">
        <SidebarMenu >
          <SidebarMenuItem >
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="h-8 w-8 cursor-pointer">
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

              <DropdownMenuContent side="top" align="start" className="w-48 border border-gray-400">
                {/* <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem> */}
               <DropdownMenuItem
  className="cursor-pointer hover:bg-secondary"
  onClick={() => setIsModalOpen(true)}
>
  <LogIn className="mr-2 h-4 w-4 " />
  Login
</DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer hover:bg-secondary" onClick={()=>handleLogout()}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader className="flex justify-center items-center">
              <DialogTitle>Login</DialogTitle>
            </DialogHeader>

            <div className="mt-4 flex flex-col gap-4">
            <Input
  type="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<Input
  type="password"
  placeholder="Enter Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

              <Button
  className="self-end"
  onClick={handleLogin}
  disabled={loading}
>
  {loading ? "Logging in..." : "Submit"}
</Button>

            </div>
          </DialogContent>
        </Dialog>
    </>
  )
}