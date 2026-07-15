import Navbar from "@/components/shared/navbar/Navbar";
import FooterSection from "@/components/shared/footer/FooterSection";
import HeroSection from "@/components/sections/heroSection/HeroSection";
import Overview from "@/components/sections/overviewSection/Overview";
import MarqueeSection from "@/components/sections/marquee/MarqueeSection";
import TrendingToy from "@/components/sections/trendingToy/TrendingToy";
import OfferCategories from "@/components/sections/offerCategories/OfferCategories";
import TopBar from "@/components/shared/topBar/TopBar";
import FeaturedCategories from "@/components/sections/featuredCategories/FeaturedCategories";
import OfferBanner from "@/components/sections/offerBanner/OfferBanner";
import CustomerReviewSection from "@/components/sections/customerReviewSection/CustomerReviewSection";

export default function Home() {
  return (
    <div>
      <header>
        <TopBar />
      </header>
      <main>
        <Navbar />
        <HeroSection />
        <Overview />
        <MarqueeSection />
        <TrendingToy />
        <OfferCategories />
        <FeaturedCategories />
        <OfferBanner />
        <CustomerReviewSection />
      </main>
      <footer>
        <FooterSection />
      </footer>
    </div>
  );
}
