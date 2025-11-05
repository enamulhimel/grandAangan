// src/components/PropertyDetails.tsx
"use client";

import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Property {
  name: string;
  address: string;
  price: string;
  landArea: string;
  flatSize: string;
  status: string;
  agentName: string;
  agentPhone: string;
}

const thumbnails = [
  "/thumb-1.jpg",
  "/thumb-2.jpg",
  "/thumb-3.jpg",
  "/thumb-4.jpg",
  "/thumb-5.jpg",
];

const property: Property = {
  name: "Dreamway Grand Aangan",
  address: "Dhaka, Bangladesh",
  price: "$250,000",
  landArea: "1 Acre",
  flatSize: "2450 Sq Ft",
  status: "Under Construction",
  agentName: "Sabrina Meraj Rumpa",
  agentPhone: "+880 1911-493434",
};

export default function PropertyDetails() {
  /* -------------------------------------------------
   * 1. Hero image state + auto-rotation
   * ------------------------------------------------- */
  const [heroSrc, setHeroSrc] = useState(thumbnails[0]);   // start with first thumb
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % thumbnails.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Sync hero image when activeIndex changes (auto or manual)
  useEffect(() => {
    setHeroSrc(thumbnails[activeIndex]);
  }, [activeIndex]);

  // Click a thumbnail → stop auto-rotate for a moment, then resume
  const selectThumbnail = (idx: number) => {
    setActiveIndex(idx);
    // optional: pause auto-rotation for 10 s after manual click
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % thumbnails.length);
    }, 5000);
  };

  /* -------------------------------------------------
   * 2. Embla carousel for thumbnails (mobile friendly)
   * ------------------------------------------------- */
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });

  /* -------------------------------------------------
   * 3. Render
   * ------------------------------------------------- */
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
        {/* ---------- LEFT: GALLERY ---------- */}
        <div className="space-y-4">
          {/* BIG HERO IMAGE */}
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={heroSrc}
              alt="Property hero"
              fill
              className="object-cover transition-opacity duration-500"
              priority
            />
          </div>

          {/* THUMBNAILS (desktop grid / mobile carousel) */}
          <div className="hidden md:grid md:grid-cols-5 gap-2">
            {thumbnails.map((src, i) => (
              <button
                key={i}
                onClick={() => selectThumbnail(i)}
                className={`relative rounded overflow-hidden border-2 transition-all ${
                  activeIndex === i ? "border-red-600" : "border-transparent"
                }`}
              >
                <Image
                  src={src}
                  alt={`Thumb ${i + 1}`}
                  width={150}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>

          {/* MOBILE THUMBNAIL CAROUSEL */}
          <div className="md:hidden overflow-hidden" ref={emblaRef}>
            <div className="flex gap-2">
              {thumbnails.map((src, i) => (
                <button
                  key={i}
                  onClick={() => selectThumbnail(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded overflow-hidden border-2 transition-all ${
                    activeIndex === i ? "border-red-600" : "border-transparent"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumb ${i + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- RIGHT: INFO ---------- */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{property.name}</h1>

          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin size={20} />
            <span>{property.address}</span>
          </div>

          <div className="text-2xl font-bold text-red-600">{property.price}</div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-100 p-3 rounded">
              <div className="font-medium">Land Area</div>
              <div>{property.landArea}</div>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <div className="font-medium">Flat Size</div>
              <div>{property.flatSize}</div>
            </div>
          </div>

          <div
            className={`px-4 py-2 rounded-full w-fit ${
              property.status === "Ready"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {property.status}
          </div>

          {/* Uncomment if you want the agent box back
          <div className="border p-4 rounded">
            <h3 className="font-bold mb-2">Contact Agent</h3>
            <div className="flex items-center space-x-3">
              <Image
                src="/agent.jpg"
                alt="Agent"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <div className="font-medium">{property.agentName}</div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <a href={`tel:${property.agentPhone.replace(/\s/g, "")}`}>
                    {property.agentPhone}
                  </a>
                </div>
              </div>
            </div>
          </div>
          */}

          <button className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition">
            Book a Visit
          </button>
        </div>
      </div>
    </section>
  );
}