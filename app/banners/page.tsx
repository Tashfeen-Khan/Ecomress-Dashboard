"use client";

import React, { useEffect, useState, useRef } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious,
  CarouselApi
} from "@/components/ui/carousel";
import { ContentWrapper } from "@/customComponent/contentwraper";
import ImageUploader from "@/customComponent/ImageUploader";
import axios from "axios";

interface CarouselImage {
  url: string;
  fileName: string;
}

const Page = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/carousel");
      const fetchedImages: CarouselImage[] = res.data.images.map((url: string) => ({
        url,
        fileName: url.split("/").pop() || "",
      }));
      setImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching carousel images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle smooth loop transition
  const handleNextSlide = () => {
    if (!api) return;
    
    const currentIndex = api.selectedScrollSnap();
    const totalSlides = images.length;
    
    if (currentIndex === totalSlides - 1) {
      // Add a small delay before resetting to first slide
      setTimeout(() => {
        api.scrollTo(0, true); // Use true for smooth transition
      }, 100);
    } else {
      api.scrollNext();
    }
  };

  // Auto-slide every 3 seconds with smooth loop
  useEffect(() => {
    if (!api || images.length <= 1) return;

    const interval = setInterval(() => {
      handleNextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [api, images]);

  return (
    <ContentWrapper className="space-y-6">
      {/* Image Uploader */}
      <ImageUploader  />

      {/* Carousel */}
      {images.length > 0 ? (
        <div className="relative w-full max-w-3xl mx-auto">
          <Carousel 
            setApi={setApi} 
            className="relative w-full"
            opts={{
              align: "start",
              loop: false, // We'll handle loop manually for better control
            }}
          >
            <CarouselContent className="flex">
              {images.map((img) => (
                <CarouselItem key={img.fileName} className="w-full  basis-full">
                  <div className="p-1">
                    <img
                      src={img.url}
                      alt={img.fileName}
                      className="w-full h-64 object-cover rounded-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10" />
            <CarouselNext 
              onClick={handleNextSlide}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10" 
            />
          </Carousel>
        </div>
      ) : (
        <p className="text-center text-gray-500">No images uploaded yet.</p>
      )}
    </ContentWrapper>
  );
};

export default Page;