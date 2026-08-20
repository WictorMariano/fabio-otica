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

function StreamCard({
  images,
  startIndex,
  stride,
  className,
  style,
}: {
  images: readonly StreamImage[];
  startIndex: number;
  stride: number;
  className: string;
  style: React.CSSProperties;
}) {
  const [index, setIndex] = React.useState(startIndex);
  const img = images.length ? images[index % images.length] : undefined;

  return (
    <div
      className={className}
      style={style}
      onAnimationIteration={() => {
        if (images.length <= stride) return;
        setIndex((current) => (current + stride) % images.length);
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
}

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

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  const cardsPerRail = React.useMemo(() => {
    const maxUnique = Math.max(1, Math.floor(images.length / 2));
    const requested = cards ?? Math.min(14, Math.max(8, maxUnique));
    return Math.min(requested, maxUnique);
  }, [cards, images.length]);

  const stride = cardsPerRail * 2;

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p],
  );

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
          {[right, left].map((name, rail) =>
            Array.from({ length: cardsPerRail }, (_, i) => {
              const startIndex = rail * cardsPerRail + i;
              return (
                <StreamCard
                  key={`${name}-${i}`}
                  images={images}
                  startIndex={startIndex}
                  stride={stride}
                  className={cn("image-stream__card", card)}
                  style={{
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    animationDelay: `${-(i * speed) / cardsPerRail}s`,
                  }}
                />
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
