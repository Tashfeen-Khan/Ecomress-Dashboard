import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table } from '@/components/ui/table'
import { ContentWrapper } from '@/customComponent/contentwraper'
import NavBar from '@/customComponent/navBar'
import { Download, Filter, Plus, Search } from 'lucide-react'
import DemoPage from '../product-table-data/page'

const page = () => {
  return (
    <>
    <NavBar/>
       <ContentWrapper>
  <div className="space-y-6 ">
    <h1 className="text-2xl font-bold">Products</h1>
    
    <Card className="p-6 border border-gray-300 shadow-none">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl font-semibold">Products List</h2>
          <p className="text-gray-500 mt-1">Track your store's progress to boost your sales.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" className="flex items-center gap-2 cursor-pointer">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2 cursor-pointer">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </div>
<div className=''>
 <DemoPage/>
</div>
    </Card>
  </div>
</ContentWrapper>
    </>
  )
}

export default page