import { useState } from "react";
import { Menu, X } from "lucide-react";
import ScrollHero from "./ScrollHero";
import MarqueeImages from "./MarqueeImages";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import HorizontalServices from "./HorizontalServices";
import ProjectsSection from "./ProjectsSection";
import "./App.css";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4";

const NAV_ITEMS = ["Start", "Story", "Rates", "Benefits", "FAQ"] as const;

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-screen overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="relative h-full flex flex-col">
          <nav className="w-full">
            <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
              <a
                href="#"
                className="text-2xl font-semibold text-gray-900 tracking-tight"
              >
                SkyElite
              </a>

              <ul className="hidden md:flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-900 hover:text-gray-700 transition-colors text-sm font-medium"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
                className="md:hidden p-2 text-gray-900 hover:text-gray-700 transition-colors"
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden px-8 pb-4">
                <ul className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-4 flex flex-col gap-2">
                  {NAV_ITEMS.map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg text-gray-900 hover:bg-gray-100 transition-colors text-sm font-medium"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </nav>

          <main className="flex-1 flex items-center justify-center px-6">
            <div className="-mt-80 text-center flex flex-col items-center">
              <p className="text-sm font-semibold text-gray-600 tracking-wider mb-4 uppercase">
                Private Jets
              </p>

              <h1 className="flex flex-col items-center">
                <span className="text-6xl md:text-7xl lg:text-8xl font-normal text-gray-500 leading-none tracking-tighter">
                  Premium.
                </span>
                <span
                  className="text-6xl md:text-7xl lg:text-8xl font-normal leading-none tracking-tighter"
                  style={{ color: "#202A36", marginTop: "-12px" }}
                >
                  Accessible.
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mt-6 mb-6 max-w-2xl">
                Your dedication deserves recognition.
              </p>

              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition-colors"
                >
                  Discover
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full text-white font-medium transition-colors"
                  style={{ backgroundColor: "#202A36" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1a2229";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#202A36";
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>

      <ScrollHero />
      <MarqueeImages />
      <AboutSection />
      <ServicesSection />
      <HorizontalServices />
      <ProjectsSection />
    </div>
  );
}

export default App;
