"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type CorridorPath = {
  perspective?: number;
  cardWidth?: number;
  cardHeight?: number;
  cardRadius?: number;
  birthHeight?: number;
  exitHeight?: number;
  railBirth?: number;
  railExit?: number;
  fan?: number;
  turnBirth?: number;
  turnExit?: number;
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

function keyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    const scale = (p.birthHeight / p.cardHeight) * Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail = p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(2)}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`,
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export type StreamImage = {
  src: string;
  alt?: string;
};

export type ImageStreamHeroProps = {
  images: readonly StreamImage[];
  cards?: number;
  speed?: number;
  axis?: number;
  path?: CorridorPath;
  children?: React.ReactNode;
  className?: string;
};

export function ImageStreamHero({
  images,
  cards,
  speed = 22,
  axis = 55,
  path,
  children,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & ImageStreamHeroProps) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  // One entry per src — never show the same file twice in the corridor.
  const uniqueImages = React.useMemo(() => {
    const seen = new Set<string>();
    return images.filter((image) => {
      if (!image?.src || seen.has(image.src)) return false;
      seen.add(image.src);
      return true;
    });
  }, [images]);

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  // Split the curated set across both rails with no leftover reuse.
  const rightCount = React.useMemo(() => {
    if (uniqueImages.length === 0) return 0;
    const maxPerRail = cards ?? Math.min(13, Math.ceil(uniqueImages.length / 2));
    return Math.min(maxPerRail, Math.ceil(uniqueImages.length / 2));
  }, [cards, uniqueImages.length]);

  const leftCount = uniqueImages.length - rightCount;

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p],
  );

  const rails: Array<{ name: string; offset: number; count: number }> = [
    { name: right, offset: 0, count: rightCount },
    { name: left, offset: rightCount, count: leftCount },
  ];

  return (
    <div
      className={cn("image-stream", className)}
      {...props}
      style={{ containerType: "inline-size", ...style }}
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="image-stream__stage"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div className="image-stream__rail">
          {rails.map(({ name, offset, count }) =>
            Array.from({ length: count }, (_, i) => {
              const img = uniqueImages[offset + i];
              return (
                <div
                  key={`${name}-${i}`}
                  className={cn("image-stream__card", card)}
                  style={{
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    animationDelay: `${-(i * speed) / Math.max(count, 1)}s`,
                  }}
                >
                  {img ? (
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  ) : null}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

export default ImageStreamHero;
