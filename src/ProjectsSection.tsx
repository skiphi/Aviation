import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Project = {
  n: string;
  category: string;
  name: string;
  blurb: string;
  imageLeftTop: string;
  imageLeftBottom: string;
  imageRight: string;
};

const FRAME = (i: number) =>
  `${import.meta.env.BASE_URL}ezgif-23b10fd2460e2809-png-split/ezgif-frame-${String(i).padStart(3, "0")}.png`;

const PROJECTS: Project[] = [
  {
    n: "01",
    category: "Client",
    name: "Trans-Atlantic Charter Network",
    blurb:
      "Coordinated charter operations across 14 hubs between Europe and the Americas, with single-contact dispatch and contract fuel pricing at every uplift.",
    imageLeftTop: FRAME(30),
    imageLeftBottom: FRAME(85),
    imageRight: FRAME(140),
  },
  {
    n: "02",
    category: "Operations",
    name: "Middle East Fuel Coverage",
    blurb:
      "Built a regional Jet A1 supply program reaching 220 airfields in 18 countries, with quality control and contract pricing at every uplift.",
    imageLeftTop: FRAME(160),
    imageLeftBottom: FRAME(205),
    imageRight: FRAME(245),
  },
  {
    n: "03",
    category: "Personal",
    name: "VIP Concierge Program",
    blurb:
      "White-glove crew and passenger services — hotels, ground transport, visas, and arrivals — coordinated ahead of every leg for repeat operators.",
    imageLeftTop: FRAME(260),
    imageLeftBottom: FRAME(280),
    imageRight: FRAME(295),
  },
];

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const targetScale = 1 - (total - 1 - index) * 0.04;

  useGSAP(
    () => {
      const card = cardRef.current;
      const wrapper = wrapperRef.current;
      if (!card || !wrapper) return;

      gsap.to(card, {
        scale: targetScale,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: wrapperRef, dependencies: [index, total] },
  );

  return (
    <div
      ref={wrapperRef}
      className="relative h-[85vh] flex items-center"
      style={{ top: `${index * 28}px` }}
    >
      <div
        ref={cardRef}
        className="sticky top-24 md:top-32 w-full origin-top will-change-transform"
      >
        <div
          className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
          style={{ boxShadow: "0 30px 60px -30px rgba(0,0,0,0.6)" }}
        >
          <div className="flex flex-wrap items-end gap-4 md:gap-8 mb-6 md:mb-8">
            <span
              className="font-black tracking-tight leading-none text-[#D7E2EA]"
              style={{ fontSize: "clamp(2.5rem, 9vw, 8rem)" }}
            >
              {project.n}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/60 mb-2">
                {project.category}
              </p>
              <h3
                className="font-medium uppercase tracking-tight leading-tight text-[#D7E2EA]"
                style={{ fontSize: "clamp(1.2rem, 2.6vw, 2.4rem)" }}
              >
                {project.name}
              </h3>
            </div>
            <button
              type="button"
              className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-medium uppercase tracking-[0.2em]"
            >
              Live Project
            </button>
          </div>

          <p className="text-[#D7E2EA]/70 max-w-2xl text-sm md:text-base leading-relaxed mb-6 md:mb-8">
            {project.blurb}
          </p>

          <div className="grid grid-cols-5 gap-3 md:gap-4">
            <div className="col-span-2 flex flex-col gap-3 md:gap-4">
              <img
                src={project.imageLeftTop}
                alt=""
                loading="lazy"
                className="w-full rounded-[28px] sm:rounded-[36px] md:rounded-[44px] object-cover bg-[#1a2229]"
                style={{ height: "clamp(120px, 15vw, 220px)" }}
              />
              <img
                src={project.imageLeftBottom}
                alt=""
                loading="lazy"
                className="w-full rounded-[28px] sm:rounded-[36px] md:rounded-[44px] object-cover bg-[#1a2229]"
                style={{ height: "clamp(150px, 20vw, 320px)" }}
              />
            </div>
            <div className="col-span-3">
              <img
                src={project.imageRight}
                alt=""
                loading="lazy"
                className="w-full h-full rounded-[28px] sm:rounded-[36px] md:rounded-[44px] object-cover bg-[#1a2229]"
                style={{ minHeight: "clamp(280px, 35vw, 560px)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".proj-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".proj-heading",
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-16"
    >
      <h2
        className="proj-heading hero-heading font-black uppercase tracking-tight leading-none text-center mb-16 sm:mb-20 md:mb-24"
        style={{ fontSize: "clamp(3rem, 12vw, 10rem)" }}
      >
        Operations
      </h2>

      <div className="max-w-6xl mx-auto">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.n} project={p} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
}
