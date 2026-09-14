"use client";

import { useEffect, useId, useState } from "react";
import type { CatalogPhoto } from "@/lib/catalog";

type ModelCarouselProps = {
  photos: CatalogPhoto[];
  label: string;
};

export default function ModelCarousel({ photos, label }: ModelCarouselProps) {
  const [index, setIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const titleId = useId();
  const total = photos.length;
  const current = photos[index] ?? photos[0];

  useEffect(() => {
    setIndex(0);
  }, [photos]);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoomOpen(false);
      if (event.key === "ArrowLeft") setIndex((value) => (value - 1 + total) % total);
      if (event.key === "ArrowRight") setIndex((value) => (value + 1) % total);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [zoomOpen, total]);

  if (!current) return null;

  const go = (next: number) => {
    setIndex((next + total) % total);
  };

  return (
    <>
      <div className="model-carousel" aria-roledescription="carrossel" aria-label={label}>
        <button
          type="button"
          className="model-carousel__viewport"
          onClick={() => setZoomOpen(true)}
          aria-label={`Ampliar foto de ${label}`}
        >
          <img key={current.src + index} src={current.src} alt={current.alt} />
          <span className="model-carousel__zoom" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="10.5" cy="10.5" r="6.25" stroke="currentColor" strokeWidth="1.5" />
              <path d="M15.2 15.2 20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10.5 8v5M8 10.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Ampliar
          </span>
        </button>
        {total > 1 ? (
          <div className="model-carousel__thumbs" aria-label="Miniaturas">
            {photos.map((photo, photoIndex) => (
              <button
                key={`${photo.src}-thumb-${photoIndex}`}
                type="button"
                className={photoIndex === index ? "is-active" : undefined}
                aria-label={`Ver foto ${photoIndex + 1}`}
                onClick={() => setIndex(photoIndex)}
              >
                <img src={photo.src} alt="" />
              </button>
            ))}
          </div>
        ) : null}
        <div className="model-carousel__controls">
          <button type="button" className="model-carousel__nav" aria-label="Foto anterior" onClick={() => go(index - 1)}>
            ‹
          </button>
          <div className="model-carousel__dots" role="tablist" aria-label="Fotos do modelo">
            {photos.map((photo, photoIndex) => (
              <button
                key={`${photo.src}-${photoIndex}`}
                type="button"
                role="tab"
                aria-selected={photoIndex === index}
                aria-label={`Foto ${photoIndex + 1} de ${total}`}
                className={photoIndex === index ? "is-active" : undefined}
                onClick={() => setIndex(photoIndex)}
              />
            ))}
          </div>
          <button type="button" className="model-carousel__nav" aria-label="Próxima foto" onClick={() => go(index + 1)}>
            ›
          </button>
        </div>
        <p className="model-carousel__hint">Clique na foto para ampliar</p>
      </div>

      {zoomOpen ? (
        <div
          className="catalog-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={() => setZoomOpen(false)}
        >
          <div className="catalog-lightbox__panel" onClick={(event) => event.stopPropagation()}>
            <div className="catalog-lightbox__top">
              <p id={titleId}>{label}</p>
              <button type="button" className="catalog-lightbox__close" aria-label="Fechar zoom" onClick={() => setZoomOpen(false)}>
                Fechar
              </button>
            </div>
            <div className="catalog-lightbox__stage">
              {total > 1 ? (
                <button type="button" className="catalog-lightbox__nav" aria-label="Foto anterior" onClick={() => go(index - 1)}>
                  ‹
                </button>
              ) : null}
              <img src={current.src} alt={current.alt} />
              {total > 1 ? (
                <button type="button" className="catalog-lightbox__nav" aria-label="Próxima foto" onClick={() => go(index + 1)}>
                  ›
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
