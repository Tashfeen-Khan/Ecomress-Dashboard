"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ContentWrapper } from "@/customComponent/contentwraper"
import NavBar from "@/customComponent/navBar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import ProductsPage from "../product-table-data/page"

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // 🔐 AUTH GUARD
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      setError("❌ Please login to access products page")
      setTimeout(() => {
        router.push("/")
      }, 2000)
    }
  }, [router])

  // ❌ Show error UI if not logged in
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    )
  }

  return (
    <>
      <NavBar />
      <ContentWrapper>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Products</h1>

          <Card className="p-6 border border-gray-300 shadow-none">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
              <div>
                <h2 className="text-xl font-semibold">Products List</h2>
                <p className="text-gray-500 mt-1">
                  Track your store's progress to boost your sales.
                </p>
              </div>

              <Button
                className="flex items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>
          </Card>

          {/* ✅ Protected data component */}
          <ProductsPage />
        </div>

        {/* Add Product Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
            </DialogHeader>

            <div className="mt-4 flex flex-col gap-4">
              <Input type="text" placeholder="Product Name" />
              <Input type="number" placeholder="Product Price" />
              <Button
                className="self-end"
                onClick={() => setIsModalOpen(false)}
              >
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </ContentWrapper>
    </>
  )
}

export default Page
