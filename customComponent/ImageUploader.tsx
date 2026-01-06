// "use client";

// import React, { useCallback, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { Button } from "@/components/ui/button";
// import { Upload } from "lucide-react";

// export default function ImageUploader() {
//   const [files, setFiles] = useState<File[]>([]);

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setFiles(acceptedFiles);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
//     },
//     maxFiles: 5,
//     maxSize: 800 * 400, // roughly your size limit
//   });

//   return (
//     <div className="space-y-2">
//       <h3 className="text-sm font-medium">Products Images</h3>

//       <div
//         {...getRootProps()}
//         className={`border-2 border-dashed border-blue-500 rounded-md p-8 text-center cursor-pointer transition-colors ${
//           isDragActive ? "bg-blue-50" : "bg-white"
//         }`}
//       >
//         <input {...getInputProps()} />
//         <Upload className="mx-auto mb-2 text-gray-400" />
//         <p className="text-sm text-gray-500">
//           Click to upload or drag and drop SVG, PNG, JPG or GIF (MAX. 800x400px)
//         </p>
//       </div>

//       {files.length > 0 && (
//         <div className="flex flex-wrap gap-2">
//           {files.map((file, index) => (
//             <div key={index} className="w-24 h-24 border rounded-md overflow-hidden">
//               <img
//                 src={URL.createObjectURL(file)}
//                 alt={file.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import axios from "axios";

interface CarouselImage {
  url: string;
  fileName: string;
}

export default function ImageUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<CarouselImage[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch existing images
  const fetchImages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/carousel");
      const images: CarouselImage[] = res.data.images.map((url: string) => ({
        url,
        fileName: url.split("/").pop() || "",
      }));
      setExistingImages(images);
    } catch (error) {
      console.error("Error fetching carousel images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Delete existing image
  const handleDelete = async (fileName: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/carousel/${fileName}`);
      setExistingImages(existingImages.filter(img => img.fileName !== fileName));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  // Dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"] },
    maxFiles: 5,
  });

  // Submit new images
  const handleSubmit = async () => {
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach(file => formData.append("images", file));

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/carousel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Update existing images with response
      const images: CarouselImage[] = res.data.carousel.images.map((url: string) => ({
        url: `${window.location.origin}/${url.replace(/\\/g, "/")}`,
        fileName: url.split("/").pop() || "",
      }));
      setExistingImages(images);
      setFiles([]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Carousel Images</h3>

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {existingImages.map((img) => (
            <div key={img.fileName} className="relative w-24 h-24 border rounded-md overflow-hidden">
              <img src={img.url} alt={img.fileName} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleDelete(img.fileName)}
                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
              >
                <X className="w-4 h-4 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Dropzone for new images */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-blue-500 rounded-md p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "bg-blue-50" : "bg-white"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-2 text-gray-400" />
        <p className="text-sm text-gray-500">
          Click to upload or drag and drop images (MAX. 5 images)
        </p>
      </div>

      {/* Preview new images */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div key={index} className="w-24 h-24 border rounded-md overflow-hidden">
              <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Submit button */}
      <Button onClick={handleSubmit} disabled={files.length === 0 || loading}>
        {loading ? "Uploading..." : "Submit"}
      </Button>
    </div>
  );
}
