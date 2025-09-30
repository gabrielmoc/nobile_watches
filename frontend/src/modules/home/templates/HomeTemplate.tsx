import { Categories } from "../components//Categories/Categories";
import { FeaturedProducts } from "../components/FeaturedProducts/FeaturedProducts";
import { Hero } from "../components/Hero/Hero";
import { HowItWorks } from "../components/HowItWorks/HowItWorks";
import { Testimonials } from "../components/Testimonials/Testimonials";

export default function HomeTemplate() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProducts />
      <Categories />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
