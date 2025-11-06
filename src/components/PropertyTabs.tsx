"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import floor from '../../publiC/floor-plan1.jpg';

export default function PropertyTabs() {
  const [activeTab, setActiveTab] = useState<"overview" | "amenities" | "floor-plans">("overview");

  const refs = {
    overview: useRef<HTMLDivElement>(null),
    amenities: useRef<HTMLDivElement>(null),
    "floor-plans": useRef<HTMLDivElement>(null),
  };

  // Scroll to section
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll Spy: Auto-activate tab when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as "overview" | "amenities" | "floor-plans";
            setActiveTab(id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    Object.values(refs).forEach((ref) => {
      if (ref.current) {
        ref.current.id = Object.keys(refs).find((key) => refs[key as keyof typeof refs] === ref) || "";
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Floating Tab Bar - Responsive */}
        <div className="sticky top-4 z-50 mx-auto max-w-fit">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-2 border border-white/30 flex flex-wrap gap-2 justify-center">
            {[
              { id: "overview", label: "Overview" },
              { id: "amenities", label: "Amenities" },
              { id: "floor-plans", label: "Floor Plans" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  scrollTo(refs[tab.id as keyof typeof refs]);
                }}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tabBubble"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 sm:mt-16 space-y-16 sm:space-y-20">

          {/* Overview Card */}
          <motion.div
            ref={refs.overview}
            id="overview"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/40"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-5 sm:mb-6">Overview</h2>
            <p className="text-sm sm:text-base text-slate-600 mb-5 sm:mb-6 leading-relaxed">
              <strong>Dreamway Grand Aangan</strong> is a masterpiece of modern living in Dhaka. This 2450 sq ft residence blends elegance, functionality, and sustainability.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                "3 Bedrooms + Study", "3 Bathrooms", "2 Balconies", "Open Living & Dining",
                "Gourmet Kitchen", "Servant Quarter", "2 Car Parking", "Smart Home Ready"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                >
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 flex-shrink-0" />
                  <span className="text-slate-700">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Amenities */}
          <motion.div
            ref={refs.amenities}
            id="amenities"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/40"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 sm:mb-8">Luxury Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: "Pool", label: "Infinity Rooftop Pool" },
                { icon: "Gym", label: "State-of-the-Art Gym" },
                { icon: "Security", label: "Biometric Security" },
                { icon: "Parking", label: "Valet Parking" },
                { icon: "Garden", label: "Sky Garden" },
                { icon: "Play", label: "Kids Zone" },
              ].map((a, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-amber-50 to-orange-50 p-4 sm:p-5 rounded-xl sm:rounded-2xl"
                >
                  <div className="bg-amber-500 text-white text-xl sm:text-2xl w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm">
                    {a.icon}
                  </div>
                  <span className="font-medium text-sm sm:text-base text-slate-700">{a.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Floor Plans */}
          <motion.div
            ref={refs["floor-plans"]}
            id="floor-plans"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/40"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 sm:mb-8">Floor Plans</h2>
            <div className="space-y-10 sm:space-y-12">
              {[
                { title: "Typical Unit (2450 sq ft)", img: floor },
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="group"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-slate-700">{plan.title}</h3>
                  <div className="relative aspect-video sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                    <Image
                      src={plan.img}
                      alt={plan.title}
                      fill
                      className="object-contain group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}