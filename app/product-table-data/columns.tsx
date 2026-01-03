"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export type Product = {
  id: string
  name: string
  category: string
  brand: string
  price: number
  stock: "In Stock" | "Out of Stock"
  createdAt: string
}

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Products",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const stock = row.getValue("stock") as string
      return (
        <Badge
          variant={stock === "In Stock" ? "default" : "destructive"}
          className={stock === "In Stock" ? "bg-green-100 text-green-800 " : "text-red-800 bg-red-100"}
        >
          {stock}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original
      return (
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white border border-gray-200">
            <DropdownMenuLabel className="bg-secondary">Actions</DropdownMenuLabel>
            <DropdownMenuItem className="hover:bg-secondary">Edit</DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-secondary">Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 hover:bg-secondary">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]