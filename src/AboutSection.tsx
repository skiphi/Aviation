import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Meta =
  | {
      kind: "count";
      target: number;
      format: "int" | "comma";
      suffix?: string;
      label: string;
    }
  | { kind: "static"; value: string; label: string };

const META: readonly Meta[] = [
  {
    kind: "count",
    target: 2008,
    format: "int",
    label: "Founded in Dubai",
  },
  {
    kind: "count",
    target: 181,
    format: "int",
    label: "Countries served",
  },
  {
    kind: "count",
    target: 1500,
    format: "comma",
    suffix: "+",
    label: "Airports on network",
  },
  { kind: "static", value: "24 / 7", label: "Dispatch & operations" },
];

const formatValue = (n: number, format: "int" | "comma") =>
  format === "comma"
    ? Math.round(n).toLocaleString("en-US")
    : String(Math.round(n));

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".about-reveal", {
        y: 24,
        opacity: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
      });

      gsap.from(".about-stat", {
        y: 18,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: {
          trigger: ".about-stats",
          start: "top 85%",
        },
      });

      gsap.from(".about-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-rule",
          start: "top 90%",
        },
      });

      const nums = sectionRef.current?.querySelectorAll<HTMLSpanElement>(
        "[data-counter]",
      );
      nums?.forEach((el) => {
        const target = Number(el.dataset.to ?? "0");
        const format = (el.dataset.format ?? "int") as "int" | "comma";
        const suffix = el.dataset.suffix ?? "";
        const obj = { v: 0 };
        el.textContent = "0" + suffix;
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = formatValue(obj.v, format) + suffix;
          },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative w-full bg-[#0C0C0C] text-[#D7E2EA] px-5 sm:px-8 md:px-10 py-20 md:py-24 lg:py-28"
    >
      <div className="max-w-7xl mx-auto">
        <div className="about-rule h-px w-full bg-white/15 mb-12 md:mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-5">
            <p className="about-reveal text-[11px] font-medium uppercase tracking-[0.3em] text-white/50 mb-6">
              About SkyElite
            </p>
            <h2
              className="about-reveal font-medium tracking-tight leading-[1.05] text-white"
              style={{ fontSize: "clamp(2rem, 3.6vw, 3.5rem)" }}
            >
              A quiet partner for{" "}
              <span className="text-white/55">serious operators.</span>
            </h2>
          </div>

          <div className="lg:col-span-7 lg:pt-3 space-y-6">
            <p className="about-reveal text-base md:text-lg leading-relaxed text-white/85">
              SkyElite was founded in Dubai in 2008 to give business aviation
              operators a single, dependable point of contact across the globe.
              Our dispatch team coordinates trip support, permits, fuel, and
              ground handling at 1,500+ airports in 181 countries — every hour
              of every day.
            </p>
            <p className="about-reveal text-base md:text-[17px] leading-relaxed text-white/60">
              We do not chase volume. We build long relationships with
              operators who expect clear pricing, accountable answers, and
              crews on the ground before their wheels touch the tarmac.
            </p>
            <p className="about-reveal pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 text-sm md:text-[15px] font-medium text-white border-b border-white/40 hover:border-white pb-1 transition-colors"
              >
                Read selected operations
                <span aria-hidden="true">→</span>
              </a>
            </p>
          </div>
        </div>

        <div className="about-stats mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
          {META.map((m, i) => (
            <div
              key={m.label}
              className={
                "about-stat py-8 md:py-10 pr-6 " +
                (i > 0 ? "md:pl-8 md:border-l border-white/10 " : "") +
                (i === 1 || i === 3 ? "border-l border-white/10 pl-6 " : "") +
                (i < 2 ? "border-b md:border-b-0 border-white/10 " : "")
              }
            >
              {m.kind === "count" ? (
                <span
                  data-counter=""
                  data-to={m.target}
                  data-format={m.format}
                  data-suffix={m.suffix ?? ""}
                  className="font-medium tracking-tight text-white tabular-nums block"
                  style={{ fontSize: "clamp(1.65rem, 2.6vw, 2.4rem)" }}
                >
                  {`0${m.suffix ?? ""}`}
                </span>
              ) : (
                <span
                  className="font-medium tracking-tight text-white tabular-nums block"
                  style={{ fontSize: "clamp(1.65rem, 2.6vw, 2.4rem)" }}
                >
                  {m.value}
                </span>
              )}
              <div className="mt-2 text-[11px] md:text-xs uppercase tracking-[0.18em] text-white/55 leading-snug max-w-[22ch]">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
