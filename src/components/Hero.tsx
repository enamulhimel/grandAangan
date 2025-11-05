import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/hero.jpg"
        alt="Property Hero"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Dreamway Grand Aangan</h1>
        <p className="text-xl md:text-2xl mb-6">2450 Sq Ft | Dhaka, Bangladesh</p>
        {/* <div className="bg-red-600 px-6 py-3 rounded-full text-sm font-medium">
          Under Construction
        </div> */}
      </div>
    </section>
  );
}