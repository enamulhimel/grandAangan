"use client"

import Image from "next/image";
import Link from "next/link";

export default function SimilarProperties() {
  const properties = [
    { name: "Similar 1", image: "/thumb-1.jpg", slug: "similar-1" },
    { name: "Similar 2", image: "/thumb-2.jpg", slug: "similar-2" },
    { name: "Similar 3", image: "/thumb-3.jpg", slug: "similar-3" },
    { name: "Similar 2", image: "/thumb-4.jpg", slug: "similar-4" },
    { name: "Similar 3", image: "/thumb-5.jpg", slug: "similar-5" },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Similar Properties</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {properties.map((prop) => (
            <Link key={prop.slug} href={`/properties/${prop.slug}`} className="block">
              <Image src={prop.image} alt={prop.name} width={400} height={250} className="rounded mb-2" />
              <h3 className="font-bold">{prop.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}