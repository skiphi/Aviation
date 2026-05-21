import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

const FRAME_COUNT = 300;
const FRAME_DIR = "/ezgif-23b10fd2460e2809-png-split";
const PRELOAD_CONCURRENCY = 6;

const NAV_ITEMS = ["Start", "Story", "Rates", "Benefits", "FAQ"] as const;

type TextState = {
  label: string;
  lineOne: string;
  lineTwo: string;
  subtitle: string;
};

const TEXT_STATES: TextState[] = [
  {
    label: "Global Support",
    lineOne: "One partner.",
    lineTwo: "Every flight.",
    subtitle: "Coordinated 24/7 across 181 countries.",
  },
  {
    label: "Worldwide Network",
    lineOne: "1,500 airports.",
    lineTwo: "Anywhere.",
    subtitle: "Permits, fuel, and handling on call.",
  },
  {
    label: "Private Jets",
    lineOne: "Premium.",
    lineTwo: "Accessible.",
    subtitle: "Your dedication deserves recognition.",
  },
];

const framePath = (i: number) =>
  `${FRAME_DIR}/ezgif-frame-${String(i + 1).padStart(3, "0")}.png`;

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const ir = img.width / img.height;
  const cr = cw / ch;
  let dw: number;
  let dh: number;
  if (ir > cr) {
    dh = ch;
    dw = ch * ir;
  } else {
    dw = cw;
    dh = cw / ir;
  }
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;
  ctx.drawImage(img, dx, dy, dw, dh);
}

const FADE_HALF = 0.03;
const STATE_TRAVEL = 40;

function opacityFor(stateIndex: number, p: number) {
  const N = TEXT_STATES.length;
  const slot = 1 / N;
  const inCenter = stateIndex * slot;
  const outCenter = (stateIndex + 1) * slot;
  const isFirst = stateIndex === 0;
  const isLast = stateIndex === N - 1;
  if (!isFirst && p < inCenter - FADE_HALF) return 0;
  if (!isLast && p > outCenter + FADE_HALF) return 0;
  let op = 1;
  if (!isFirst && p < inCenter + FADE_HALF) {
    op = Math.min(op, (p - (inCenter - FADE_HALF)) / (FADE_HALF * 2));
  }
  if (!isLast && p > outCenter - FADE_HALF) {
    op = Math.min(op, (outCenter + FADE_HALF - p) / (FADE_HALF * 2));
  }
  return Math.max(0, Math.min(1, op));
}

function translateFor(stateIndex: number, p: number, op: number) {
  const N = TEXT_STATES.length;
  const center = (stateIndex + 0.5) / N;
  const sign = p < center ? 1 : -1;
  return sign * (1 - op) * STATE_TRAVEL;
}

export default function ScrollHero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(FRAME_COUNT).fill(null),
  );
  const loadedRef = useRef<boolean[]>(new Array(FRAME_COUNT).fill(false));
  const currentDrawnRef = useRef<number>(-1);
  const rafRef = useRef<number | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const findNearestLoaded = (idx: number) => {
      if (loadedRef.current[idx]) return idx;
      for (let r = 1; r < FRAME_COUNT; r++) {
        const lo = idx - r;
        const hi = idx + r;
        if (lo >= 0 && loadedRef.current[lo]) return lo;
        if (hi < FRAME_COUNT && loadedRef.current[hi]) return hi;
      }
      return -1;
    };

    const drawFrame = (idx: number) => {
      const target = findNearestLoaded(idx);
      if (target < 0) return;
      if (target === currentDrawnRef.current) return;
      const img = framesRef.current[target];
      if (!img) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawCover(ctx, img, window.innerWidth, window.innerHeight);
      currentDrawnRef.current = target;
    };

    const computeProgress = () => {
      const el = sectionRef.current;
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return 0;
      const scrolled = -rect.top;
      return Math.max(0, Math.min(1, scrolled / scrollable));
    };

    const updateText = (p: number) => {
      stateRefs.current.forEach((el, i) => {
        if (!el) return;
        const op = opacityFor(i, p);
        const offset = translateFor(i, p, op);
        el.style.opacity = String(op);
        el.style.transform = `translateY(${offset}px)`;
        el.style.pointerEvents = op > 0.5 ? "auto" : "none";
      });
    };

    const requestDraw = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const p = computeProgress();
        const idx = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.floor(p * (FRAME_COUNT - 1))),
        );
        drawFrame(idx);
        updateText(p);
      });
    };

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      currentDrawnRef.current = -1;
      requestDraw();
    };

    sizeCanvas();
    updateText(computeProgress());
    window.addEventListener("scroll", requestDraw, { passive: true });
    window.addEventListener("resize", sizeCanvas);

    let cancelled = false;
    let nextIndex = 0;
    const launchNext = () => {
      if (cancelled) return;
      if (nextIndex >= FRAME_COUNT) return;
      const i = nextIndex++;
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(i);
      img.onload = () => {
        if (cancelled) return;
        framesRef.current[i] = img;
        loadedRef.current[i] = true;
        setLoadedCount((c) => c + 1);
        requestDraw();
        launchNext();
      };
      img.onerror = () => {
        if (cancelled) return;
        launchNext();
      };
    };
    for (let w = 0; w < PRELOAD_CONCURRENCY; w++) launchNext();

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", requestDraw);
      window.removeEventListener("resize", sizeCanvas);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-gray-50">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
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
              <div className="relative w-full h-[18rem] md:h-[20rem] lg:h-[22rem]">
                {TEXT_STATES.map((s, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      stateRefs.current[i] = el;
                    }}
                    className="absolute inset-0 flex flex-col items-center will-change-[opacity,transform]"
                    style={{
                      opacity: i === 0 ? 1 : 0,
                      transform: "translateY(0px)",
                      transition: "opacity 120ms linear",
                    }}
                  >
                    <p className="text-sm font-semibold text-gray-600 tracking-wider mb-4 uppercase">
                      {s.label}
                    </p>
                    <h2 className="flex flex-col items-center">
                      <span className="text-6xl md:text-7xl lg:text-8xl font-normal text-gray-500 leading-none tracking-tighter whitespace-nowrap">
                        {s.lineOne}
                      </span>
                      <span
                        className="text-6xl md:text-7xl lg:text-8xl font-normal leading-none tracking-tighter whitespace-nowrap"
                        style={{ color: "#202A36", marginTop: "-12px" }}
                      >
                        {s.lineTwo}
                      </span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-2xl whitespace-nowrap">
                      {s.subtitle}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 mt-2">
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

        {loadedCount < 24 && (
          <div className="absolute bottom-6 right-8 text-xs text-gray-700 font-medium">
            Loading frames… {loadedCount}/{FRAME_COUNT}
          </div>
        )}
      </div>
    </section>
  );
}
