"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ContentWrapper } from "@/customComponent/contentwraper"
import NavBar from "@/customComponent/navBar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import ProductsPage from "../product-table-data/page"

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  className="flex items-center gap-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              </div>
            </div>
          </Card>
          <ProductsPage/>
        </div>
      </ContentWrapper>

      {/* Modal at the end of the page */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
            
          </DialogHeader>

          {/* Your input fields */}
          <div className="mt-4 flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Product Name"
              className="border p-2 rounded"
            />
            <Input
              type="number"
              placeholder="Product Price"
              className="border p-2 rounded"
            />
            <Button className="self-end" onClick={() => setIsModalOpen(false)}>
              Save
            </Button>
          </div>
        </DialogContent>
        <DialogFooter>
          <DialogClose asChild>
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </DialogClose>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default Page
