import { useEffect, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";

const WORLD_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const WIDTH = 1000;
const HEIGHT = 520;

type Hub = { name: string; lon: number; lat: number };

const HUBS: Hub[] = [
  { name: "DXB", lon: 55.36, lat: 25.25 },
  { name: "JFK", lon: -73.78, lat: 40.64 },
  { name: "LHR", lon: -0.45, lat: 51.47 },
  { name: "SIN", lon: 103.99, lat: 1.36 },
  { name: "HKG", lon: 113.92, lat: 22.31 },
  { name: "CDG", lon: 2.55, lat: 49.01 },
  { name: "LAX", lon: -118.41, lat: 33.94 },
  { name: "NRT", lon: 140.39, lat: 35.77 },
  { name: "GRU", lon: -46.47, lat: -23.43 },
];

type Props = {
  dotColor?: string;
  hubColor?: string;
};

export default function DottedWorldMap({
  dotColor = "rgba(12, 12, 12, 0.55)",
  hubColor = "#0C0C0C",
}: Props = {}) {
  const [features, setFeatures] =
    useState<FeatureCollection<Geometry> | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(WORLD_URL)
      .then((r) => r.json())
      .then((topo) => {
        if (cancelled) return;
        const fc = feature(
          topo,
          topo.objects.countries,
        ) as unknown as FeatureCollection<Geometry>;
        setFeatures(fc);
      })
      .catch(() => {
        /* network blocked — map stays empty */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const projection = geoMercator()
    .scale(155)
    .translate([WIDTH / 2, HEIGHT / 1.55]);
  const pathGen = geoPath(projection);

  const project = (lon: number, lat: number): [number, number] | null => {
    const p = projection([lon, lat]);
    return p ? [p[0], p[1]] : null;
  };

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="land-dots"
          x="0"
          y="0"
          width="5.5"
          height="5.5"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2.75" cy="2.75" r="0.9" fill={dotColor} />
        </pattern>
      </defs>

      {features?.features.map((feat, i) => (
        <path
          key={i}
          d={pathGen(feat) ?? ""}
          fill="url(#land-dots)"
          stroke="none"
        />
      ))}

      {HUBS.map((hub, i) => {
        const p = project(hub.lon, hub.lat);
        if (!p) return null;
        const delay = (i * 0.35).toFixed(2);
        return (
          <g key={hub.name} transform={`translate(${p[0]} ${p[1]})`}>
            <circle r="1.4" fill={hubColor} opacity="0.95" />
            <circle
              r="1.6"
              fill="none"
              stroke={hubColor}
              strokeWidth="0.6"
              opacity="0.55"
            >
              <animate
                attributeName="r"
                values="1.6;14"
                dur="2.6s"
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;0"
                dur="2.6s"
                begin={`${delay}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle
              r="1.6"
              fill="none"
              stroke={hubColor}
              strokeWidth="0.4"
              opacity="0"
            >
              <animate
                attributeName="r"
                values="1.6;22"
                dur="2.6s"
                begin={`${parseFloat(delay) + 0.9}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.45;0"
                dur="2.6s"
                begin={`${parseFloat(delay) + 0.9}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}
