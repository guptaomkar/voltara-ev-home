import { useEffect, useState } from "react";
import { BikeArt } from "./BikeArt";
import { Header } from "./Header";
import { RotatingBadge } from "./RotatingBadge";
import { usePointerTilt } from "../hooks/usePointerTilt";
import { formatPrice, type Vehicle } from "../data/vehicles";

export type Direction = 1 | -1;

interface HeroProps {
  vehicles: Vehicle[];
  index: number;
  direction: Direction;
  onChange: (next: number) => void;
  onEnquire: () => void;
  onViewDetails: () => void;
  autoPlayPaused?: boolean;
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Hero({
  vehicles,
  index,
  direction,
  onChange,
  onEnquire,
  onViewDetails,
  autoPlayPaused = false,
}: HeroProps) {
  const vehicle = vehicles[index];
  const total = vehicles.length;
  const stageRef = usePointerTilt<HTMLDivElement>(4);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (isAutoPaused || isHovered || autoPlayPaused || reducedMotion.matches) return;

    let timer = 0;
    const scheduleNext = () => {
      window.clearTimeout(timer);
      if (!document.hidden) {
        timer = window.setTimeout(() => onChange((index + 1) % total), 6500);
      }
    };
    const onVisibilityChange = () => scheduleNext();
    document.addEventListener("visibilitychange", onVisibilityChange);
    scheduleNext();

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [autoPlayPaused, index, isAutoPaused, isHovered, onChange, total]);

  const prev = () => onChange((index - 1 + total) % total);
  const next = () => onChange((index + 1) % total);

  return (
    <section className="frame hero" id="top" aria-label="Featured motorcycles">
      <Header onEnquire={onEnquire} />

      <div
        className="stage"
        ref={stageRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="stage__scene">
          <div key={`ghost-${vehicle.id}`} className="stage__ghost" aria-hidden="true">
            {vehicle.ghost}
          </div>
          <div
            key={`bike-${vehicle.id}`}
            className={`stage__bike ${direction === 1 ? "from-right" : "from-left"}`}
          >
            <BikeArt vehicle={vehicle} imagePriority />
          </div>
        </div>

        <div className="stage__title" key={`title-${vehicle.id}`}>
          <p className="stage__tagline">{vehicle.tagline}</p>
          <h1 className="stage__name">{vehicle.name}</h1>
        </div>

        <RotatingBadge />

        <div className="stage__copy">
          <p className="stage__desc" key={`desc-${vehicle.id}`}>
            {vehicle.description}
          </p>

          <div className="slider" role="group" aria-label="Choose a model">
            <button type="button" className="icon-btn" onClick={prev} aria-label="Previous model">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m14.5 6-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="slider__count">{pad(index + 1)}</span>
            <div className="slider__track">
              {vehicles.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  className="slider__seg"
                  aria-label={`Show ${v.name}`}
                  aria-current={i === index ? "true" : undefined}
                  onClick={() => onChange(i)}
                />
              ))}
            </div>
            <span className="slider__count">{pad(total)}</span>
            <button
              type="button"
              className="slider__autoplay"
              aria-label={isAutoPaused ? "Play slideshow" : "Pause slideshow"}
              aria-pressed={isAutoPaused}
              onClick={() => setIsAutoPaused((paused) => !paused)}
            >
              {isAutoPaused ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 6 10 6-10 6z" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 6h3v12H8zm5 0h3v12h-3z" fill="currentColor" />
                </svg>
              )}
            </button>
            <button type="button" className="icon-btn" onClick={next} aria-label="Next model">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9.5 6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="stage__buy">
          <p className="stage__price">
            <span className="stage__price-label">From</span>
            {formatPrice(vehicle.price)}
          </p>
          <button type="button" className="btn btn--primary" onClick={onEnquire}>
            Enquire about {vehicle.name}
          </button>
          <button type="button" className="btn btn--ghost" onClick={onViewDetails}>
            View specifications
          </button>
        </div>

        <p className="sr-only" aria-live="polite">
          Showing {vehicle.name}, {index + 1} of {total}
        </p>
      </div>
    </section>
  );
}
