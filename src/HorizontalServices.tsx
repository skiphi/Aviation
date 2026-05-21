import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Fuel,
  Globe2,
  Headphones,
  Plane,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import DottedWorldMap from "./DottedWorldMap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRAME = (i: number) =>
  `/ezgif-23b10fd2460e2809-png-split/ezgif-frame-${String(i).padStart(3, "0")}.png`;

type Service = {
  n: string;
  name: string;
  body: string;
  Icon: LucideIcon;
  image: string;
  meta: string;
};

const SERVICES: readonly Service[] = [
  {
    n: "01",
    name: "Trip Support",
    body: "Coordination, not communication. One dispatcher owns fuel, slots, handling, and clearances before crews brief.",
    Icon: Headphones,
    image: FRAME(35),
    meta: "181 countries · 24/7",
  },
  {
    n: "02",
    name: "Flight Permits",
    body: "Overflight and landing clearances across 181 countries — diplomatic, governmental, and after-hours filings.",
    Icon: ShieldCheck,
    image: FRAME(85),
    meta: "Issued in <2hrs avg",
  },
  {
    n: "03",
    name: "Aircraft Charter",
    body: "Operator-vetted private jets, business turboprops, and group lift sourced for your route and cabin.",
    Icon: Plane,
    image: FRAME(140),
    meta: "VLJ to ACJ · global",
  },
  {
    n: "04",
    name: "Aviation Fuel",
    body: "Jet A1 and AvGas at 1,500+ airports with transparent contract pricing and ASTM-certified supply.",
    Icon: Fuel,
    image: FRAME(195),
    meta: "1,500+ airports",
  },
  {
    n: "05",
    name: "Concierge & Crew",
    body: "Hotels, transport, visas, catering, and VIP arrivals — coordinated ahead of every leg.",
    Icon: Users,
    image: FRAME(245),
    meta: "Crew & PAX",
  },
  {
    n: "06",
    name: "Ground Handling",
    body: "Ramp, baggage, marshalling, and turnaround services — coordinated under one operations contact.",
    Icon: Globe2,
    image: FRAME(285),
    meta: "Ramp & turnaround",
  },
];

function ServiceCard({ s }: { s: Service }) {
  return (
    <article
      className="shrink-0 w-[300px] sm:w-[340px] md:w-[380px] h-full bg-white rounded-[28px] overflow-hidden flex flex-col"
      style={{ boxShadow: "0 30px 60px -30px rgba(12,12,12,0.22)" }}
    >
      <div className="relative aspect-[4/3] bg-[#F3F4F6] overflow-hidden">
        <img
          src={s.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute left-4 bottom-4 inline-flex items-center rounded-full bg-[#0C0C0C] text-white text-[10px] uppercase tracking-[0.25em] px-3 py-1.5">
          {s.meta}
        </span>
      </div>

      <div className="flex-1 px-6 md:px-7 pt-6 md:pt-7 pb-7 md:pb-8 flex flex-col items-center text-center">
        <div className="relative w-12 h-12 mb-4 flex items-center justify-center">
          <span
            className="absolute inset-0 rotate-45 rounded-[6px] border border-[#0C0C0C]/25"
            aria-hidden="true"
          />
          <span
            className="absolute inset-2 rotate-45 rounded-[4px] border border-[#0C0C0C]/15"
            aria-hidden="true"
          />
          <s.Icon
            size={18}
            strokeWidth={1.6}
            className="relative text-[#0C0C0C]/85"
          />
        </div>

        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#0C0C0C]/45 mb-2">
          {s.n}
        </p>
        <h3 className="text-lg md:text-xl font-semibold text-[#0C0C0C] tracking-tight mb-3">
          {s.name}
        </h3>
        <p className="text-sm text-[#0C0C0C]/65 leading-relaxed mb-6 flex-1">
          {s.body}
        </p>
        <a
          href="#"
          className="text-[13px] font-medium text-[#0C0C0C] border-b border-[#0C0C0C]/40 pb-0.5 hover:border-[#0C0C0C] inline-flex items-center gap-1.5 transition-colors"
        >
          Read More <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

export default function HorizontalServices() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 40);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.from(".hsv-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Service lines"
      className="relative w-full h-screen overflow-hidden bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10"
    >
      <div className="absolute inset-0">
        <DottedWorldMap />
      </div>

      <div className="relative z-10 px-5 sm:px-8 md:px-10 pt-14 md:pt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="hsv-reveal text-[11px] font-medium uppercase tracking-[0.3em] text-[#0C0C0C]/55 mb-4">
              Services
            </p>
            <h2
              className="hsv-reveal font-medium tracking-tight leading-[1.05] text-[#0C0C0C] max-w-2xl"
              style={{ fontSize: "clamp(1.75rem, 3.4vw, 3.25rem)" }}
            >
              Six service lines.{" "}
              <span className="text-[#0C0C0C]/55">One operations team.</span>
            </h2>
          </div>
          <div className="hsv-reveal hidden md:flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#0C0C0C]/45">
            <span>Scroll</span>
            <span className="h-px w-12 bg-[#0C0C0C]/30" />
            <span>{SERVICES.length} cards</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-12 md:bottom-16 z-10">
        <div
          ref={trackRef}
          className="flex gap-5 md:gap-6 h-[58vh] md:h-[62vh] pl-5 sm:pl-8 md:pl-10 pr-12 will-change-transform"
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.n} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
