"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FocusEvent, useEffect, useState } from "react";

export type ImageSlide = {
  src: string;
  alt: string;
  label: string;
  title?: string;
  caption: string;
  href?: string;
};

type ImageSlideshowProps = {
  slides: readonly ImageSlide[];
  className?: string;
  priority?: boolean;
};

export function ImageSlideshow({ slides, className = "", priority = false }: ImageSlideshowProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const slide = slides[current];

  useEffect(() => {
    if (slides.length < 2 || paused || interacting || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setCurrent((index) => (index + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [current, interacting, paused, slides.length]);

  const changeSlide = (direction: number) => {
    setCurrent((index) => (index + direction + slides.length) % slides.length);
  };

  const leaveFocus = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false);
  };

  return (
    <figure
      className={`photo-reel ${className}`.trim()}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={leaveFocus}
    >
      <div className="photo-reel__viewport">
        <Image
          key={slide.src}
          className="photo-reel__image"
          src={slide.src}
          alt={slide.alt}
          fill
          priority={priority && current === 0}
          quality={90}
          sizes="(max-width: 900px) 100vw, 62vw"
        />
        <span className="photo-reel__counter" aria-hidden="true">{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <figcaption className="photo-reel__caption" aria-live="off">
          <span>{slide.label}</span>
          {slide.title && <strong>{slide.title}</strong>}
          <p>{slide.caption}</p>
          {slide.href && <Link href={slide.href}>Explore this sector <ChevronRight aria-hidden="true" /></Link>}
        </figcaption>
        <div className="photo-reel__controls">
          <button type="button" onClick={() => changeSlide(-1)} aria-label="Show previous image"><ChevronLeft aria-hidden="true" /></button>
          <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume slideshow" : "Pause slideshow"}>{paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}</button>
          <button type="button" onClick={() => changeSlide(1)} aria-label="Show next image"><ChevronRight aria-hidden="true" /></button>
        </div>
      </div>
      <div className="photo-reel__tabs" aria-label="Choose an image">
        {slides.map((item, index) => (
          <button key={`${item.src}-${item.label}`} type="button" aria-pressed={index === current} onClick={() => setCurrent(index)}>
            <span>{String(index + 1).padStart(2, "0")}</span>{item.label}
          </button>
        ))}
      </div>
    </figure>
  );
}
