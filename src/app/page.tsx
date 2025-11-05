import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyTabs from "@/components/PropertyTabs";

export default function Home() {
  return (
    <div>
      {/* <Navbar/> */}
      <Hero/>
      <PropertyDetails/>
      <PropertyTabs/>
      <Footer/>
    </div>
  );
}
