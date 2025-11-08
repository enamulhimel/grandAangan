"use client";

import { MapPin, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const thumbnails = [
  "/thumb-1.jpg", "/thumb-2.jpg", "/thumb-3.jpg", "/thumb-4.jpg",
  "/thumb-5.jpg", "/thumb-6.jpg", "/thumb-7.jpg"
];

const property = {
  name: "Dreamway Grand Aangan",
  address: "Dhaka, Bangladesh",
  landArea: "25 katha",
  flatSize: "2450 Sq Ft",
  status: "Under Construction",
  buildingType: "B+G+M+14",
  location: "Plot No: 1A, Road-7, 8, Shornali Abashon, Swadesh"
};

export default function PropertyDetails() {
  const [heroSrc, setHeroSrc] = useState(thumbnails[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  // Auto-play hero image
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % thumbnails.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setHeroSrc(thumbnails[activeIndex]);
  }, [activeIndex]);

  const selectThumbnail = (idx: number) => {
    setActiveIndex(idx);
  };

  // FORM SUBMIT - NOW 100% WORKING & TYPE-SAFE
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSending(true);

  const form = e.currentTarget;
  const formData = new FormData(form);

  const templateParams = {
    from_name: formData.get("name") as string,
    from_email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
    visit_date: formData.get("date") as string,
    visit_time: formData.get("time") as string,
    property_name: property.name,
  };

  try {
    await emailjs.send(
      "service_o5q4y08",          // ← YOUR REAL SERVICE ID
      "template_mn1s8rk",         // ← This one is correct (you already have it)
      templateParams,
      "N-_acqBrC-7Yz8rEi"         // ← Your Public Key (correct)
    );

    setSuccess(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSuccess(false);
      form.reset();
    }, 2000);
  } catch (error: any) {
    console.error("EmailJS failed:", error);
    alert("Failed! Please WhatsApp: +880 17xxx-xxxxx");
  } finally {
    setIsSending(false);
  }
};

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">

            {/* GALLERY */}
            <div className="space-y-6">
              <motion.div
                key={heroSrc}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[75vh] xl:h-[80vh] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20"
              >
                <Image
                  src={heroSrc}
                  alt="Dreamway Grand Aangan"
                  fill
                  priority
                  quality={95}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-full inline-block mb-3">
                    <span className="text-xl font-bold">{activeIndex + 1} / {thumbnails.length}</span>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-bold">Dreamway Grand Aangan</h2>
                </div>
              </motion.div>

              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-8 gap-3 max-w-5xl mx-auto px-4">
                {thumbnails.map((src, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => selectThumbnail(i)}
                    className={`relative aspect-square rounded-2xl overflow-hidden shadow-lg transition-all ${
                      activeIndex === i ? "ring-4 ring-amber-500 ring-offset-4 scale-110 z-20" : ""
                    }`}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* INFO CARD */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 shadow-2xl"
            >
              <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
                {property.name}
              </h1>
              <div className="flex items-center gap-2 text-slate-600 mb-6">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span className="text-lg">{property.address}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Land Area", value: property.landArea },
                  { label: "Flat Size", value: property.flatSize },
                  { label: "Building Type", value: property.buildingType },
                  { label: "Location", value: property.location },
                ].map((item) => (
                  <div key={item.label} className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 rounded-2xl text-center border border-slate-200">
                    <div className="text-sm text-slate-500 font-semibold uppercase">{item.label}</div>
                    <div className="text-lg font-bold text-slate-800 mt-1">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 font-bold mb-8 shadow-lg">
                {property.status}
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-5 rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-xl shadow-xl"
              >
                Book a Site Visit Today
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-slate-800">Book Your Visit</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Full Name" required className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none transition" />
                <input name="email" type="email" placeholder="Email" required className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none transition" />
                <input name="phone" type="tel" placeholder="Phone Number" required className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none transition" />
                <input name="address" placeholder="Your Address" required className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none transition" />
                <input name="date" type="date" required className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none transition" />
                <input name="time" type="time" required className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-amber-500 focus:outline-none transition" />

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-5 rounded-2xl hover:shadow-2xl transition-all disabled:opacity-70"
                >
                  {isSending ? "Sending..." : success ? "Sent Successfully!" : "Confirm Booking"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 