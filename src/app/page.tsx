import { FriedChickenSequence } from "@/components/FriedChickenSequence";
import { OrderSection } from "../components/OrderSection";
import MenuGallery from "../components/MenuGallery";
import OffersGallery from "../components/OffersGallery";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { CoffeeFinale } from "../components/CoffeeFinale";

export default function Home() {
  return (
    <main className="bg-[#050505]">
      {/* Cinematic Sequence Section (0 - 70% of total scroll experience roughly) */}
      {/* <FriedChickenSequence frameCount={192} /> */}
      <FriedChickenSequence />
      {/* <FriedChickenSequence frameCount={899} /> */}
      {/* <FriedChickenSequence frameCount={210} /> */}

      {/* Transition spacer - optional but helps with section separation */}
      <div className="h-[20vh] bg-[#050505]" />

      {/* Functional Interface / Order Engine */}
      <OrderSection />

      {/* Menu & Offers */}
      <MenuGallery />
      <OffersGallery />

      {/* Social Proof */}
      <TestimonialsSection />

      {/* The Finale */}
      <CoffeeFinale />
    </main>
  );
}

