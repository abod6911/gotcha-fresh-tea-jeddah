import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/lib/i18n";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import { AuthModal } from "@/components/site/auth-modal";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Story } from "@/components/site/story";
import { MenuSection } from "@/components/site/menu-section";
import { Farms } from "@/components/site/farms";
import { Gallery } from "@/components/site/gallery";
import { Rewards } from "@/components/site/rewards";
import { Locations } from "@/components/site/locations";
import { Testimonials } from "@/components/site/testimonials";
import { Footer } from "@/components/site/footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { FloatingActions } from "@/components/site/floating-actions";
import { MouseGlow } from "@/components/site/mouse-glow";
import { Toaster } from "sonner";

const title = "Gotcha Fresh Tea Jeddah | قوتشا فريش تي جدة";
const description =
  "Handcrafted fresh tea, boba and collagen drinks in Jeddah — brewed fresh, never from powder. شاي طازج وبوبا ومشروبات كولاجين في جدة.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CafeOrCoffeeShop",
          name: "Gotcha Fresh Tea — Jeddah",
          servesCuisine: "Bubble tea",
          priceRange: "SAR 22–32",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jeddah",
            addressRegion: "Makkah Region",
            addressCountry: "SA",
          },
          geo: { "@type": "GeoCoordinates", latitude: 21.5657162, longitude: 39.153269 },
          openingHours: "Mo-Su 10:00-01:00",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <CartProvider>
          <MouseGlow />
          <Header />
          <main className="relative w-full max-w-full overflow-x-hidden">
            <Hero />
            <Story />
            <MenuSection />
            <Farms />
            <Gallery />
            <Rewards />
            <Testimonials />
            <Locations />
          </main>
          <Footer />
          <CartDrawer />
          <FloatingActions />
          <AuthModal />
          <Toaster position="top-center" richColors />
        </CartProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
