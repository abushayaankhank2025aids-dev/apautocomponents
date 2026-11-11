"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { galleryPhotos } from "@/config/gallery";

const allCategories = "All photographs";

export function GallerySection({ headingLevel = "h2", showBrowseLink = false }: {
  headingLevel?: "h1" | "h2";
  showBrowseLink?: boolean;
}) {
  const [category, setCategory] = useState(allCategories);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const visiblePhotos = category === allCategories
    ? galleryPhotos
    : galleryPhotos.filter((photo) => photo.category === category);
  const categories = [...new Set(galleryPhotos.map((photo) => photo.category))];
  const activePhoto = activeIndex === null ? null : visiblePhotos[activeIndex];
  const Heading = headingLevel;
  const isLightboxOpen = activePhoto !== null;

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) => {
          if (current === null) return current;
          const direction = event.key === "ArrowRight" ? 1 : -1;
          return (current + direction + visiblePhotos.length) % visiblePhotos.length;
        });
      } else if (event.key === "Tab") {
        const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>("button:not([disabled])");
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [isLightboxOpen, visiblePhotos.length]);

  const openPhoto = (index: number, event: MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  const movePhoto = (direction: number) => {
    setActiveIndex((current) => current === null
      ? current
      : (current + direction + visiblePhotos.length) % visiblePhotos.length);
  };

  return (
    <section className="section gallery-section" aria-labelledby="gallery-title">
      <div className="container">
        <p className="section-kicker">A closer look</p>
        <Heading id="gallery-title" className="gallery-section__title">Inside A.P. Auto Components</Heading>
        <p className="gallery-section__intro">A closer look at our company, infrastructure and manufacturing environment.</p>

        <div className="gallery-filters" aria-label="Filter photographs by category">
          {[allCategories, ...categories].map((item) => (
            <button
              key={item}
              type="button"
              className="gallery-filter"
              aria-pressed={category === item}
              onClick={() => {
                setCategory(item);
                setActiveIndex(null);
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {visiblePhotos.map((photo, index) => (
            <article className="gallery-card" key={photo.src}>
              <button
                type="button"
                className="gallery-card__trigger"
                aria-label={`View larger image: ${photo.title}`}
                onClick={(event) => openPhoto(index, event)}
              >
                <img
                  className="gallery-card__image"
                  src={photo.src}
                  alt={photo.alt}
                  width="750"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                />
                <span className="gallery-card__expand" aria-hidden="true">View image ↗</span>
              </button>
              <div className="gallery-card__caption">
                <div>
                  <p className="gallery-card__category">{photo.category}</p>
                  <h3>{photo.title}</h3>
                </div>
                <p>{photo.caption}</p>
              </div>
            </article>
          ))}
        </div>

        {showBrowseLink && (
          <p className="gallery-section__more"><Link href="/gallery">Explore the gallery <span aria-hidden="true">↗</span></Link></p>
        )}
      </div>

      {activePhoto && (
        <div
          className="gallery-lightbox"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveIndex(null);
          }}
        >
          <div
            ref={dialogRef}
            className="gallery-lightbox__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
          >
            <button ref={closeRef} type="button" className="gallery-lightbox__close" onClick={() => setActiveIndex(null)} aria-label="Close image viewer">×</button>
            {visiblePhotos.length > 1 && (
              <>
                <button type="button" className="gallery-lightbox__nav gallery-lightbox__nav--previous" onClick={() => movePhoto(-1)} aria-label="Previous image">‹</button>
                <button type="button" className="gallery-lightbox__nav gallery-lightbox__nav--next" onClick={() => movePhoto(1)} aria-label="Next image">›</button>
              </>
            )}
            <figure className="gallery-lightbox__figure">
              <img src={activePhoto.src} alt={activePhoto.alt} width="750" height="1000" />
              <figcaption>
                <p className="gallery-card__category">{activePhoto.category}</p>
                <h2 id="gallery-lightbox-title">{activePhoto.title}</h2>
                <p>{activePhoto.caption}</p>
                <p className="gallery-lightbox__count">{(activeIndex ?? 0) + 1} / {visiblePhotos.length}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      )}
    </section>
  );
}
