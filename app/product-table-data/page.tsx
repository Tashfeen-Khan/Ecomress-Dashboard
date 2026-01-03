"use client"

import { useState } from "react"
import { columns, Product } from "./columns"
import { DataTable } from "./data-table"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ContentWrapper } from "@/customComponent/contentwraper"

const data: Product[] = [
  {
    id: "1",
    name: "ASUS ROG Gaming Laptop",
    category: "Laptop",
    brand: "ASUS",
    price: 2199,
    stock: "Out of Stock",
    createdAt: "01 Dec, 2027",
  },
  {
    id: "2",
    name: "Macbook pro M4",
    category: "Laptop",
    brand: "Apple",
    price: 699,
    stock: "In Stock",
    createdAt: "12 Feb, 2027",
  },
  {
    id: "3",
    name: "iPhone 15 Pro",
    category: "Phone",
    brand: "Apple",
    price: 999,
    stock: "In Stock",
    createdAt: "15 Jan, 2027",
  },
  {
    id: "1",
    name: "ASUS ROG Gaming Laptop",
    category: "Laptop",
    brand: "ASUS",
    price: 2199,
    stock: "Out of Stock",
    createdAt: "01 Dec, 2027",
  },
  {
    id: "2",
    name: "Macbook pro M4",
    category: "Laptop",
    brand: "Apple",
    price: 699,
    stock: "In Stock",
    createdAt: "12 Feb, 2027",
  },
  {
    id: "3",
    name: "iPhone 15 Pro",
    category: "Phone",
    brand: "Apple",
    price: 999,
    stock: "In Stock",
    createdAt: "15 Jan, 2027",
  },
  {
    id: "1",
    name: "ASUS ROG Gaming Laptop",
    category: "Laptop",
    brand: "ASUS",
    price: 2199,
    stock: "Out of Stock",
    createdAt: "01 Dec, 2027",
  },
  {
    id: "2",
    name: "Macbook pro M4",
    category: "Laptop",
    brand: "Apple",
    price: 699,
    stock: "In Stock",
    createdAt: "12 Feb, 2027",
  },
  {
    id: "3",
    name: "iPhone 15 Pro",
    category: "Phone",
    brand: "Apple",
    price: 999,
    stock: "In Stock",
    createdAt: "15 Jan, 2027",
  },
  {
    id: "4",
    name: "Samsung Galaxy S24",
    category: "Phone",
    brand: "Samsung",
    price: 799,
    stock: "In Stock",
    createdAt: "20 Nov, 2027",
  },
  {
    id: "5",
    name: "Dell XPS 13",
    category: "Laptop",
    brand: "Dell",
    price: 1299,
    stock: "Out of Stock",
    createdAt: "05 Mar, 2027",
  },
  {
    id: "3",
    name: "iPhone 15 Pro",
    category: "Phone",
    brand: "Apple",
    price: 999,
    stock: "In Stock",
    createdAt: "15 Jan, 2027",
  },
  {
    id: "4",
    name: "Samsung Galaxy S24",
    category: "Phone",
    brand: "Samsung",
    price: 799,
    stock: "In Stock",
    createdAt: "20 Nov, 2027",
  },
  {
    id: "5",
    name: "Dell XPS 13",
    category: "Laptop",
    brand: "Dell",
    price: 1299,
    stock: "Out of Stock",
    createdAt: "05 Mar, 2027",
  },
  {
    id: "3",
    name: "iPhone 15 Pro",
    category: "Phone",
    brand: "Apple",
    price: 999,
    stock: "In Stock",
    createdAt: "15 Jan, 2027",
  },
  {
    id: "4",
    name: "Samsung Galaxy S24",
    category: "Phone",
    brand: "Samsung",
    price: 799,
    stock: "In Stock",
    createdAt: "20 Nov, 2027",
  },
  {
    id: "5",
    name: "Dell XPS 13",
    category: "Laptop",
    brand: "Dell",
    price: 1299,
    stock: "Out of Stock",
    createdAt: "05 Mar, 2027",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [brandFilter, setBrandFilter] = useState("all")
  const [priceFilter, setPriceFilter] = useState("all")

  // Get unique categories and brands for filter options
  const categories = Array.from(new Set(data.map(item => item.category)))
  const brands = Array.from(new Set(data.map(item => item.brand)))

  // Filter data
  const filteredData = data.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesBrand = brandFilter === "all" || product.brand === brandFilter
    const matchesPrice = priceFilter === "all" || 
      (priceFilter === "low" && product.price < 500) ||
      (priceFilter === "medium" && product.price >= 500 && product.price <= 1500) ||
      (priceFilter === "high" && product.price > 1500)
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice
  })

  return (
    // <ContentWrapper>
    <div className=" ">
      
      {/* Filters Row */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 border-b border-gray-200 pb-4">
  
  <div className="relative w-full sm:col-span-2 lg:col-span-2">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    <Input
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="pl-10 pr-4 w-full border-gray-300"
    />
  </div>
  <Select value={categoryFilter} onValueChange={setCategoryFilter}  >
    <SelectTrigger className="w-full bg-white border border-gray-300">
      <SelectValue placeholder="Category" />
    </SelectTrigger>
    <SelectContent className="bg-white border border-gray-300">
      <SelectItem value="all">All Categories</SelectItem>
      {categories.map((category) => (
        <SelectItem key={category} value={category} className="hover:bg-secondary ">
          {category}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  <Select value={brandFilter} onValueChange={setBrandFilter}>
    <SelectTrigger className="w-full bg-white border border-gray-300">
      <SelectValue placeholder="Brand" />
    </SelectTrigger>
    <SelectContent className="bg-white border border-gray-200">
      <SelectItem value="all">All Brands</SelectItem>
      {brands.map((brand) => (
        <SelectItem key={brand} value={brand} className="hover:bg-secondary">
          {brand}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  <Select value={priceFilter} onValueChange={setPriceFilter}>
    <SelectTrigger className="w-full bg-white border border-gray-300">
      <SelectValue placeholder="Price" />
    </SelectTrigger>
    <SelectContent className="bg-white border border-gray-200">
      <SelectItem value="all" className="hover:bg-secondary">All Prices</SelectItem>
      <SelectItem value="low" className="hover:bg-secondary">Under $500</SelectItem>
      <SelectItem value="medium" className="hover:bg-secondary">$500 - $1500</SelectItem>
      <SelectItem value="high" className="hover:bg-secondary">Above $1500</SelectItem>
    </SelectContent>
  </Select>

</div>


 {/* <Card className="p-6 bg-sky-700"> */}
        <DataTable columns={columns} data={filteredData} />
{/* </Card> */}


      <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
        <div>
          Showing {filteredData.length} of {data.length} products
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
    // </ContentWrapper>
  )
}