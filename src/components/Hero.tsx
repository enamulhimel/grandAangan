"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/thumb-3.jpg"
        alt="Dreamway Grand Aangan"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl mb-3 sm:mb-4 leading-tight"
        >
          Dreamway <span className="text-amber-400">Grand Aangan</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl text-amber-100 font-light tracking-wide"
        >
          2450 Sq Ft • Dhaka, Bangladesh
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="h-1 w-24 sm:w-32 bg-amber-400 mt-5 sm:mt-6 rounded-full origin-left"
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/80 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}