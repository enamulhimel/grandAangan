"use client";

import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";

const thumbnails = ["/thumb-1.jpg", "/thumb-2.jpg", "/thumb-3.jpg", "/thumb-4.jpg", "/thumb-5.jpg"];

const property = {
  name: "Dreamway Grand Aangan",
  address: "Dhaka, Bangladesh",
  price: "$250,000",
  landArea: "1 Acre",
  flatSize: "2450 Sq Ft",
  status: "Under Construction",
};

export default function PropertyDetails() {
  const [heroSrc, setHeroSrc] = useState(thumbnails[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start" });

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % thumbnails.length);
    }, 5000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  useEffect(() => setHeroSrc(thumbnails[activeIndex]), [activeIndex]);

  const selectThumbnail = (idx: number) => {
    setActiveIndex(idx);
    clearInterval(intervalRef.current!);
    intervalRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % thumbnails.length);
    }, 5000);
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* GALLERY */}
        <div className="space-y-4 sm:space-y-5">
          <motion.div
            key={heroSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video overflow-hidden rounded-xl sm:rounded-2xl shadow-xl"
          >
            <Image src={heroSrc} alt="" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-50" />
          </motion.div>

          {/* Desktop Thumbs */}
          <div className="hidden md:flex gap-2 sm:gap-3 justify-center flex-wrap">
            {thumbnails.map((src, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectThumbnail(i)}
                className={`relative rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                  activeIndex === i ? "border-amber-500 shadow-md" : "border-transparent"
                }`}
              >
                <Image src={src} alt="" width={100} height={70} className="object-cover w-full h-full" />
                {activeIndex === i && <div className="absolute inset-0 bg-amber-500/20" />}
              </motion.button>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden overflow-hidden" ref={emblaRef}>
            <div className="flex gap-2">
              {thumbnails.map((src, i) => (
                <button
                  key={i}
                  onClick={() => selectThumbnail(i)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                    activeIndex === i ? "border-amber-500 shadow-md" : "border-gray-300"
                  }`}
                >
                  <Image src={src} alt="" width={80} height={80} className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* INFO CARD */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-2">{property.name}</h1>
          <div className="flex items-center gap-2 text-slate-600 mb-3 text-sm sm:text-base">
            <MapPin size={16} />
            <span>{property.address}</span>
          </div>

          <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-5">{property.price}</div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">
            {[
              { label: "Land Area", value: property.landArea },
              { label: "Flat Size", value: property.flatSize },
            ].map((item, i) => (
              <div key={i} className="bg-slate-50 p-3 sm:p-4 rounded-lg sm:rounded-xl text-center text-sm sm:text-base">
                <div className="text-slate-500">{item.label}</div>
                <div className="font-semibold text-slate-700">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 font-medium text-xs sm:text-sm mb-5">
            {property.status}
          </div>

          <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3.5 sm:py-4 rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base">
            Book a Visit
          </button>
        </motion.div>
      </div>
    </section>
  );
}