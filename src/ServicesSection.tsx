import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DottedWorldMap from "./DottedWorldMap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FRAME = (i: number) =>
  `/ezgif-23b10fd2460e2809-png-split/ezgif-frame-${String(i).padStart(3, "0")}.png`;

type Service = {
  n: string;
  name: string;
  summary: string;
  body: string;
  meta: string;
  image: string;
};

const SERVICES: readonly Service[] = [
  {
    n: "01",
    name: "Trip Support",
    summary: "Coordination, not just communication.",
    body: "Fuel, slots, handling, and clearances handled before you brief the crew. One dispatcher owns the trip from filed flight plan to last shutdown.",
    meta: "181 countries · 24/7 dispatch",
    image: FRAME(35),
  },
  {
    n: "02",
    name: "Flight Permits",
    summary: "Cleared to enter.",
    body: "Overflight and landing permits secured across diplomatic, governmental, and short-notice channels — including weekend and after-hours filings.",
    meta: "Permits issued in <2hrs avg",
    image: FRAME(95),
  },
  {
    n: "03",
    name: "Aircraft Charter",
    summary: "Private lift, on your timetable.",
    body: "Private jet, business turboprop, and group charter sourced to your route, cabin, and passenger requirements — with operator-vetted aircraft only.",
    meta: "VLJ to ACJ · global routing",
    image: FRAME(165),
  },
  {
    n: "04",
    name: "Aviation Fuel",
    summary: "Quality-controlled at every uplift.",
    body: "Jet A1 and AvGas at 1,500+ airports with transparent contract pricing, volume discounts, and ASTM-certified supply chain audits.",
    meta: "1,500+ airports · Jet A1 & AvGas",
    image: FRAME(225),
  },
  {
    n: "05",
    name: "Concierge & Crew",
    summary: "On the ground before you land.",
    body: "Hotels, transport, visas, catering, and VIP receiving lines — coordinated for crew and passengers ahead of every leg.",
    meta: "Crew & PAX · arrivals secured",
    image: FRAME(285),
  },
] as const;

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const reverse = i % 2 === 1;
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center w-full">
      <div
        className={`md:col-span-6 ${reverse ? "md:order-2" : "md:order-1"}`}
      >
        <div
          className="relative aspect-[4/3] rounded-[28px] md:rounded-[36px] overflow-hidden bg-[#F3F4F6]"
          style={{ boxShadow: "0 30px 60px -30px rgba(12,12,12,0.22)" }}
        >
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
      </div>

      <div
        className={`md:col-span-6 ${reverse ? "md:order-1" : "md:order-2"}`}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#0C0C0C]/45 mb-5">
          {s.n}
          <span className="mx-2 text-[#0C0C0C]/20">/</span>
          <span className="text-[#0C0C0C]/65">{s.meta}</span>
        </p>
        <h3
          className="font-medium tracking-tight leading-[1.05] text-[#0C0C0C] mb-4"
          style={{ fontSize: "clamp(1.75rem, 3vw, 3rem)" }}
        >
          {s.name}
        </h3>
        <p className="text-base md:text-lg text-[#0C0C0C]/55 italic font-light mb-4 max-w-md">
          {s.summary}
        </p>
        <p className="text-[15px] md:text-base text-[#0C0C0C]/70 leading-relaxed max-w-lg">
          {s.body}
        </p>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const cards = cardsRef.current.filter(
        (c): c is HTMLDivElement => c !== null,
      );
      if (cards.length < 2) return;

      cards.forEach((card, i) => {
        if (i > 0) gsap.set(card, { yPercent: 110 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${(cards.length - 1) * window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(card, { yPercent: 0, ease: "none" }, i - 1);
      });

      gsap.from(".svc-heading-reveal", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="relative h-screen w-full overflow-hidden bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10"
    >
      <div className="absolute inset-0">
        <DottedWorldMap />
      </div>

      <div className="absolute inset-x-0 top-0 z-30 px-5 sm:px-8 md:px-10 pt-14 md:pt-20">
        <div className="max-w-7xl mx-auto">
          <p className="svc-heading-reveal text-[11px] font-medium uppercase tracking-[0.3em] text-[#0C0C0C]/55 mb-4">
            Services
          </p>
          <h2
            className="svc-heading-reveal font-medium tracking-tight leading-[1.05] text-[#0C0C0C] max-w-3xl"
            style={{ fontSize: "clamp(1.75rem, 3.4vw, 3.25rem)" }}
          >
            Five capabilities.{" "}
            <span className="text-[#0C0C0C]/55">One dispatch line.</span>
          </h2>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 px-5 sm:px-8 md:px-10 pb-10 md:pb-14">
        <div className="max-w-7xl mx-auto relative h-[68vh] md:h-[70vh]">
          {SERVICES.map((s, i) => (
            <div
              key={s.n}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="absolute inset-0 will-change-transform flex items-center"
              style={{ zIndex: 10 + i }}
            >
              <div
                className="w-full bg-white rounded-[28px] md:rounded-[36px] px-6 md:px-10 py-8 md:py-10"
                style={{ boxShadow: "0 30px 80px -30px rgba(12,12,12,0.28)" }}
              >
                <ServiceCard s={s} i={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
