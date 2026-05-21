import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Pos =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center"
  | "center-left"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type Style = "serif-lg" | "serif-md" | "bold-upper" | "sans-md" | "sans-sm";

type AviationTile = {
  src: string;
  kicker?: string;
  title: string;
  pos: Pos;
  style: Style;
  tint?: "light" | "dark";
};

const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const ROW1: AviationTile[] = [
  {
    src: IMG("photo-1436491865332-7a61a109cc05"),
    kicker: "Skyelite",
    title: "Own the\nsky above.",
    pos: "top-left",
    style: "serif-lg",
    tint: "light",
  },
  {
    src: IMG("photo-1542296332-2e4473faf563"),
    title: "Built for\nthe pilots",
    pos: "top-center",
    style: "serif-md",
    tint: "light",
  },
  {
    src: IMG("photo-1569154941061-e231b4725ef1"),
    kicker: "Career-ready aviation",
    title: "LAUNCH YOUR\nFLYING CAREER.",
    pos: "center-left",
    style: "bold-upper",
    tint: "light",
  },
  {
    src: IMG("photo-1488493858816-b6c50b9e7f43"),
    title: "Long\nHaul.",
    pos: "top-right",
    style: "sans-md",
    tint: "light",
  },
  {
    src: IMG("photo-1474302770737-173ee21bab63"),
    title: "Terminal Services",
    pos: "bottom-left",
    style: "sans-sm",
    tint: "light",
  },
  {
    src: IMG("photo-1540979388789-6cee28a1cdc9"),
    kicker: "Window seat",
    title: "Above the clouds.",
    pos: "center",
    style: "serif-md",
    tint: "light",
  },
  {
    src: IMG("photo-1502920917128-1aa500764cbd"),
    title: "Sunset\nTakeoff",
    pos: "bottom-right",
    style: "bold-upper",
    tint: "light",
  },
  {
    src: IMG("photo-1556388158-158ea5ccacbd"),
    kicker: "ATC tower",
    title: "Clear for\ndeparture.",
    pos: "top-left",
    style: "serif-md",
    tint: "light",
  },
  {
    src: IMG("photo-1576419263661-3a39fd1cae87"),
    title: "TACTICAL\nAVIATION",
    pos: "center",
    style: "bold-upper",
    tint: "light",
  },
  {
    src: IMG("photo-1521727857535-28d2047619b5"),
    kicker: "Rotor wing",
    title: "Helicopter\nservices.",
    pos: "bottom-left",
    style: "serif-md",
    tint: "light",
  },
];

const ROW2: AviationTile[] = [
  {
    src: IMG("photo-1540962351504-03099e0a754b"),
    kicker: "Evolve responsible ventures",
    title: "Navigating the\nroute to private\naviation.",
    pos: "bottom-left",
    style: "serif-md",
    tint: "light",
  },
  {
    src: IMG("photo-1542296140-47fd7d838e76"),
    title: "VIP\nTransport",
    pos: "top-right",
    style: "bold-upper",
    tint: "light",
  },
  {
    src: IMG("photo-1597436290537-cdda3a82dfa1"),
    kicker: "Cargo logistics",
    title: "Freight, fast.",
    pos: "center-left",
    style: "serif-md",
    tint: "light",
  },
  {
    src: IMG("photo-1497302347632-904729bc24aa"),
    title: "The ultimate\npilot crew.",
    pos: "center",
    style: "sans-md",
    tint: "light",
  },
  {
    src: IMG("photo-1530521954074-e64f6810b32d"),
    kicker: "Executive travel",
    title: "Move quickly.",
    pos: "top-left",
    style: "serif-md",
    tint: "light",
  },
  {
    src: IMG("photo-1559686043-aef1d12f5b6e"),
    title: "AIRCRAFT\nMAINTENANCE",
    pos: "bottom-center",
    style: "bold-upper",
    tint: "light",
  },
  {
    src: IMG("photo-1588412079929-790b9f593d8e"),
    kicker: "Hangar 07",
    title: "Where wings\nrest.",
    pos: "top-left",
    style: "serif-md",
    tint: "light",
  },
  {
    src: IMG("photo-1532680678473-a16f2cda8e0d"),
    title: "Aerial Survey",
    pos: "bottom-right",
    style: "sans-sm",
    tint: "light",
  },
  {
    src: IMG("photo-1564725075388-cc5e2bc1f9e1"),
    kicker: "Ground handling",
    title: "Every detail,\non the tarmac.",
    pos: "center",
    style: "serif-md",
    tint: "light",
  },
  {
    src: IMG("photo-1583863788434-e58a36330cf0"),
    title: "ROTOR\nSERVICES",
    pos: "top-center",
    style: "bold-upper",
    tint: "light",
  },
];

const POS_CLASSES: Record<Pos, string> = {
  "top-left": "top-0 left-0 items-start text-left",
  "top-center": "top-0 left-1/2 -translate-x-1/2 items-center text-center",
  "top-right": "top-0 right-0 items-end text-right",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center text-center",
  "center-left": "top-1/2 left-0 -translate-y-1/2 items-start text-left",
  "bottom-left": "bottom-0 left-0 items-start text-left",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center text-center",
  "bottom-right": "bottom-0 right-0 items-end text-right",
};

const STYLE_TITLE: Record<Style, string> = {
  "serif-lg":
    "font-serif font-medium text-2xl sm:text-3xl md:text-4xl leading-[1.05] tracking-tight",
  "serif-md":
    "font-serif font-medium text-xl sm:text-2xl md:text-3xl leading-[1.1] tracking-tight",
  "bold-upper":
    "font-black uppercase text-xl sm:text-2xl md:text-3xl leading-[1] tracking-tight",
  "sans-md":
    "font-semibold text-xl sm:text-2xl md:text-3xl leading-[1.1] tracking-tight",
  "sans-sm":
    "font-semibold text-base sm:text-lg md:text-xl leading-tight tracking-tight",
};

function Tile({ src, kicker, title, pos, style, tint = "light" }: AviationTile) {
  const isLight = tint === "light";
  const titleColor = isLight ? "text-white" : "text-black";
  const kickerColor = isLight ? "text-white/75" : "text-black/70";

  return (
    <div className="relative shrink-0 w-[280px] sm:w-[340px] md:w-[420px] aspect-[420/270] overflow-hidden rounded-2xl bg-white/5">
      <img
        src={src}
        loading="lazy"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/0 to-black/40 pointer-events-none" />
      <div
        className={`absolute flex flex-col gap-1.5 p-4 sm:p-5 md:p-6 max-w-[85%] ${POS_CLASSES[pos]}`}
      >
        {kicker && (
          <span
            className={`text-[10px] sm:text-[11px] uppercase tracking-[0.22em] ${kickerColor}`}
            style={{ textShadow: "0 1px 8px rgba(0,0,0,0.45)" }}
          >
            {kicker}
          </span>
        )}
        <span
          className={`${STYLE_TITLE[style]} ${titleColor} whitespace-pre-line`}
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.55)" }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

export default function MarqueeImages() {
  const containerRef = useRef<HTMLElement | null>(null);
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const row1 = row1Ref.current;
      const row2 = row2Ref.current;
      const container = containerRef.current;
      if (!row1 || !row2 || !container) return;

      const sliceWidth = () => row1.scrollWidth / 3;
      const sliceWidth2 = () => row2.scrollWidth / 3;

      gsap.set(row1, { x: 0 });
      gsap.set(row2, { x: () => -sliceWidth2() });

      gsap.to(row1, {
        x: () => -sliceWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(row2, {
        x: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      aria-label="Network"
      className="relative w-full overflow-hidden bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10"
    >
      <div className="max-w-7xl mx-auto px-8 mb-12 md:mb-16 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-white/60 mb-3">
            Coverage
          </p>
          <h2 className="hero-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none">
            In motion <br className="hidden md:block" />
            everywhere.
          </h2>
        </div>
        <p className="hidden md:block text-sm text-white/55 max-w-xs leading-relaxed">
          Live operations across continents — dispatch, fuel, charter, and
          ground handling running 24/7.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="overflow-hidden">
          <div
            ref={row1Ref}
            className="flex gap-3 w-max"
            style={{ willChange: "transform" }}
          >
            {[...ROW1, ...ROW1, ...ROW1].map((tile, i) => (
              <Tile key={`r1-${i}`} {...tile} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            ref={row2Ref}
            className="flex gap-3 w-max"
            style={{ willChange: "transform" }}
          >
            {[...ROW2, ...ROW2, ...ROW2].map((tile, i) => (
              <Tile key={`r2-${i}`} {...tile} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
