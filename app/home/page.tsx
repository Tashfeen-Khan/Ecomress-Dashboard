import { Card } from '@/components/ui/card'
import { ContentWrapper } from '@/customComponent/contentwraper'
import NavBar from '@/customComponent/navBar'
import { ArrowUp, ArrowDown, Users, Package } from 'lucide-react'

const DashboardPage = () => {
  return (
    <>
      {/* <NavBar /> */}
      <ContentWrapper>
        <div className="h-[calc(100vh-80px)]  p-4">
          {/* Main Grid Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column - Customers & Orders in nested div */}
            <div className="space-y-6">
              {/* Nested div for Customers & Orders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customers Card */}
                <Card className="gap-0 p-6 flex flex-col justify-between bg-white  border border-gray-200">
         <div className="flex flex-col gap-2 w-fit">
  <div className=" p-3 bg-gray-100 rounded-xl flex justify-center">
    <Users className="w-5 h-5 text-gray-600" />
  </div>
  <span className="text-sm text-gray-500">Customers</span>
</div>
                  <div className="mt-4 flex justify-between">
                    <h2 className="text-2xl font-bold">3,782</h2>
                    <span className="text-green-500 bg-green-100 px-2 rounded-3xl text-[10px] flex items-center gap-1">
                      <ArrowUp className="w-3 h-3" /> 11.01%
                    </span>
                  </div>
                </Card>

                {/* Orders Card */}
                <Card className="gap-0 p-6 flex flex-col justify-between bg-white border border-gray-200">
                    <div className="flex flex-col gap-2 w-fit">
  <div className="p-3 bg-gray-100 rounded-xl flex justify-center">
    <Package className="w-6 h-6 text-gray-600" />
  </div>
  <span className="text-sm text-gray-500">Orders</span>
</div>
                  <div className="mt-4 flex justify-between">
                    <h2 className="text-2xl font-bold">5,359</h2>
                    <span className="text-red-500 bg-red-100 rounded-2xl px-2 text-sm flex items-center gap-1">
                      <ArrowDown className="w-3 h-3" /> 9.05%
                    </span>
                  </div>
                </Card>
              </div>

              {/* Monthly Sales Chart - Below Customers & Orders */}
              <Card className="gap-0 p-6 border border-gray-200 bg-white">
                <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
                <div className="grid grid-cols-12 gap-2 h-40 items-end">
                  {[150, 350, 200, 280, 170, 180, 270, 100, 200, 360, 260, 100].map((value, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-md"
                      style={{ height: `${value / 4}px` }}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-12 text-xs text-gray-500 mt-4">
                  {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((month, idx) => (
                    <span key={idx} className="text-center">{month}</span>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column - Monthly Target Card */}
       <div>
  <Card className="py-0 bg-secondary/30 border border-gray-200 flex flex-col h-full">
    <div className="bg-white p-6 rounded-lg flex-1">
      <span className="text-lg font-semibold">Monthly Target</span>
      <p className="text-gray-500 text-sm mt-1">Target you've set for each month</p>
      <div className="mt-6 flex flex-col items-center">
        <div className="w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              stroke="#e5e7eb" 
              strokeWidth="8" 
              fill="none" 
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              stroke="#6366F1" 
              strokeWidth="8" 
              fill="none" 
              strokeDasharray="283" 
              strokeDashoffset="70" 
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mt-4">75.55%</h2>
        <span className="text-green-500 text-sm mt-1">+10%</span>
        <p className="text-gray-500 text-center mt-3 text-sm max-w-xs">
          You earn $3287 today, it's higher than last month. Keep up your good work!
        </p>
      </div>
    </div>
    
    {/* Footer section */}
    <div className="mt-auto pt-2  ">
      <div className="grid grid-cols-3 gap-4 text-sm px-4 pb-2">
        <div className="text-center border-r border-gray-400">
          <div className="font-medium text-gray-700">Target</div>
          <div className="text-gray-500 mt-1">$20K ↓</div>
        </div>
        <div className="text-center border-r border-gray-400">
          <div className="font-medium text-gray-700">Revenue</div>
          <div className="text-gray-500 mt-1">$20K ↑</div>
        </div>
        <div className="text-center">
          <div className="font-medium text-gray-700">Today</div>
          <div className="text-gray-500 mt-1">$20K ↑</div>
        </div>
      </div>
    </div>
  </Card>
</div>

          </div>
        </div>
      </ContentWrapper>
    </>
  )
}

export default DashboardPage