
import { Button } from "@/components/ui/button"
import { ContentWrapper } from "@/customComponent/contentwraper"
import NavBar from "@/customComponent/navBar"

export default function Home() {
  return (
    <>
      <NavBar />
      <ContentWrapper>
        <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
        <Button>Click Me</Button>
        <p className="mt-2 text-gray-500">
          This content adjusts based on sidebar state and navbar height.
        </p>
      </ContentWrapper>
    </>
  )
}
