// src/components/PropertyTabs.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import floor1 from '../../public/floor-1.jpg'
import floor2 from '../../public/floor-2.png'
import floor3 from '../../public/floor-3.jpg'


export default function PropertyTabs() {
  const [activeTab, setActiveTab] = useState<"overview" | "amenities" | "floor-plans">(
    "overview"
  );

  const overviewRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const floorPlansRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "overview", label: "Overview", ref: overviewRef },
    { id: "amenities", label: "Amenities", ref: amenitiesRef },
    { id: "floor-plans", label: "Floor Plans", ref: floorPlansRef },
  ];

  // Smooth scroll to section
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const offset = 100; // Space for sticky header
      const top = ref.current.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handleTabClick = (
  id: typeof activeTab,
  ref: React.RefObject<HTMLDivElement | null>
) => {
  setActiveTab(id);
  scrollToSection(ref);
};

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* ==================== STICKY TABS ==================== */}
        <div className="sticky top-0 z-40 bg-gray-50 border-b border-gray-200 -mt-16 pt-16 pb-4 backdrop-blur-md bg-opacity-90">
          <div className="flex justify-center gap-8 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as any, tab.ref)}
                className={`relative pb-3 px-2 font-medium text-lg transition-colors ${
                  activeTab === tab.id
                    ? "text-red-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-16 mt-12">

          {/* ==================== CARD 1: OVERVIEW ==================== */}
          <div
            ref={overviewRef}
            className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Overview
            </h2>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Dreamway Grand Aangan</strong> is a premium residential project
                located in the heart of Dhaka. This 2450 sq ft apartment offers spacious
                living with modern architecture and world-class amenities.
              </p>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  "3 Bedrooms + 1 Study",
                  "3 Bathrooms",
                  "2 Balconies",
                  "Living + Dining Area",
                  "Modern Kitchen",
                  "Servant Quarter",
                  "2 Car Parking",
                  "24/7 Power Backup",
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                The project is currently <strong>Under Construction</strong> and is
                scheduled for handover in <strong>Q3 2026</strong>. Book now to secure
                your dream home at pre-launch pricing.
              </p>
            </div>
          </div>

          {/* ==================== CARD 2: AMENITIES ==================== */}
          <div
            ref={amenitiesRef}
            className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Amenities
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: "Swimming Pool", label: "Rooftop Swimming Pool" },
                { icon: "Gym", label: "Fully Equipped Gymnasium" },
                { icon: "Security", label: "24/7 CCTV & Security" },
                { icon: "Parking", label: "Dedicated Covered Parking" },
                { icon: "Garden", label: "Landscaped Garden" },
                { icon: "Play Area", label: "Children’s Play Area" },
                { icon: "Lift", label: "High-Speed Elevators" },
                { icon: "Generator", label: "100% Power Backup" },
              ].map((a, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg"
                >
                  <div className="bg-orange-400 font-bold text-4xl p-3 rounded-full text-lg">
                    {a.icon}
                  </div>
                  <span className="font-medium">{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ==================== CARD 3: FLOOR PLANS ==================== */}
          <div
            ref={floorPlansRef}
            className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Floor Plans
            </h2>
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold mb-3">Typical Floor Plan (2450 sq ft)</h3>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={floor1}
                    alt="Typical Floor Plan"
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Ground Floor Layout</h3>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={floor2}
                    alt="Ground Floor Plan"
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Rooftop Amenities</h3>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={floor3}
                    alt="Rooftop Plan"
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}