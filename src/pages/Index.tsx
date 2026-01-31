import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CollectionsSection from "@/components/CollectionsSection";
import CategoriesSection from "@/components/CategoriesSection";
import ElevateSection from "@/components/ElevateSection";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CollectionsSection />
      <CategoriesSection />
      <ElevateSection />
      <NewArrivalsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
