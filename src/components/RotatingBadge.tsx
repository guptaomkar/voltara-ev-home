import { useId } from "react";

interface RotatingBadgeProps {
  text?: string;
}

export function RotatingBadge({
  text = "Zero emissions · Instant torque · Silent power · ",
}: RotatingBadgeProps) {
  const id = useId().replace(/:/g, "");
  return (
    <div className="badge" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="badge__ring">
        <defs>
          <path
            id={`${id}-circle`}
            d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"
          />
        </defs>
        <text className="badge__text">
          <textPath href={`#${id}-circle`} textLength="285" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <svg viewBox="0 0 24 24" className="badge__bolt">
        <path d="M13.2 2 5 13.4h5.6L9.8 22 19 10.2h-5.7L13.2 2Z" fill="currentColor" />
      </svg>
    </div>
  );
}
