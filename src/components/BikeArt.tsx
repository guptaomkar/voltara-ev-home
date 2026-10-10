import { useId } from "react";
import type { Vehicle } from "../data/vehicles";

interface BikeArtProps {
  vehicle: Vehicle;
  className?: string;
  /** Draw the mirrored floor reflection (hero). Cards turn it off. */
  reflection?: boolean;
  imagePriority?: boolean;
}

const GROUND = 380;
const SIN = 0.438; // fork rake (26deg)
const COS = 0.899;

const polar = (c: { x: number; y: number }, r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: c.x + r * Math.cos(a), y: c.y + r * Math.sin(a) };
};

const arc = (
  c: { x: number; y: number },
  r: number,
  from: number,
  to: number,
) => {
  const a = polar(c, r, from);
  const b = polar(c, r, to);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 0 1 ${b.x} ${b.y}`;
};

interface WheelProps {
  c: { x: number; y: number };
  r: number;
  accent: string;
  uid: string;
  knobby?: boolean;
}

function Wheel({ c, r, accent, uid, knobby }: WheelProps) {
  return (
    <g transform={`translate(${c.x} ${c.y})`}>
      <circle r={r} fill="#07080a" />
      {knobby && (
        <circle
          r={r - 3}
          fill="none"
          stroke="#1d1e22"
          strokeWidth={7}
          strokeDasharray="7 5"
        />
      )}
      <circle r={r - 2} fill="none" stroke="#2c2e33" strokeWidth={1.5} />
      <g className="wheel-spin">
        <circle
          r={r - 17}
          fill="#0b0c0e"
          stroke={`url(#${uid}-metal)`}
          strokeWidth={6}
        />
        {[0, 72, 144, 216, 288].map((a) => (
          <line
            key={a}
            x1={0}
            y1={-12}
            x2={0}
            y2={-(r - 21)}
            stroke="#3f4147"
            strokeWidth={5}
            strokeLinecap="round"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx={0} cy={-(r - 17)} r={3} fill={accent} />
      </g>
      <circle
        r={r * 0.5}
        fill="none"
        stroke="#80838a"
        strokeOpacity={0.55}
        strokeWidth={5}
      />
      <rect
        x={r * 0.5 - 10}
        y={-14}
        width={17}
        height={28}
        rx={4}
        fill={accent}
        opacity={0.9}
        transform="rotate(-38)"
      />
      <circle r={10} fill="#1a1b1f" stroke={accent} strokeWidth={2} />
    </g>
  );
}

export function BikeArt({
  vehicle,
  className,
  reflection = true,
  imagePriority = false,
}: BikeArtProps) {
  const uid = useId().replace(/:/g, "");
  if (vehicle.image) {
    return (
      <img
        className={className ? `bike-photo ${className}` : "bike-photo"}
        src={vehicle.image}
        alt={`${vehicle.name} concept motorcycle`}
        loading={imagePriority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  const { geometry: g, accent, body } = vehicle;

  const wb = g.front.x - g.rear.x;
  const rc = { x: g.rear.x, y: GROUND - g.rear.r };
  const fc = { x: g.front.x, y: GROUND - g.front.r };
  const forkLen =
    g.style === "scrambler" ? 222 : g.style === "cruiser" ? 202 : 188;
  const head = { x: fc.x - SIN * forkLen, y: fc.y - COS * forkLen };
  const forkMid = { x: (fc.x + head.x) / 2, y: (fc.y + head.y) / 2 };
  const seatY = rc.y - g.seatLift;
  const pivot = { x: rc.x + wb * 0.36, y: rc.y + 6 };
  const tankRear = { x: rc.x + wb * 0.27, y: seatY - 6 };
  const tankFront = { x: head.x + 26, y: head.y + 30 };
  const packBottom = GROUND - (g.style === "scrambler" ? 80 : 60);
  const tailEnd = {
    x: rc.x - wb * 0.08,
    y: g.style === "sport" ? seatY - 34 : seatY + 4,
  };

  const bars = {
    naked: { x: -48, y: -38 },
    sport: { x: -36, y: -2 },
    cruiser: { x: -80, y: -40 },
    scrambler: { x: -52, y: -74 },
  }[g.style];
  const grip = { x: head.x + bars.x, y: head.y + bars.y };

  const topLine = `M ${tankFront.x} ${tankFront.y} C ${tankFront.x - 60} ${tankFront.y - 22}, ${tankRear.x + 130} ${tankFront.y - 8}, ${tankRear.x} ${tankRear.y}`;
  const bodyD = [
    topLine,
    `L ${tankRear.x - 8} ${tankRear.y + 30}`,
    `L ${tankRear.x + 2} ${packBottom - 22}`,
    `Q ${tankRear.x + 6} ${packBottom}, ${tankRear.x + 44} ${packBottom}`,
    `L ${head.x - 44} ${packBottom - 8}`,
    `C ${head.x - 16} ${packBottom - 26}, ${head.x + 36} ${head.y + 150}, ${head.x + 20} ${head.y + 78}`,
    "Z",
  ].join(" ");

  const seatD = `M ${tankRear.x + 24} ${seatY - 6} L ${tailEnd.x + 30} ${tailEnd.y - 4} Q ${tailEnd.x - 6} ${tailEnd.y} ${tailEnd.x} ${tailEnd.y + 16} L ${tankRear.x + 4} ${seatY + 14} Z`;
  const cowlD = `M ${tailEnd.x} ${tailEnd.y + 16} L ${tankRear.x + 4} ${seatY + 14} L ${tankRear.x - 6} ${seatY + 48} L ${tailEnd.x + 38} ${tailEnd.y + 36} Z`;

  const fairingD = `M ${head.x + 54} ${head.y + 8} C ${head.x + 30} ${head.y - 26}, ${head.x - 4} ${head.y - 44}, ${head.x - 34} ${head.y - 48} L ${head.x - 52} ${head.y + 22} C ${head.x - 76} ${head.y + 80}, ${head.x - 70} ${head.y + 130}, ${head.x - 36} ${head.y + 150} L ${head.x + 44} ${head.y + 110} C ${head.x + 58} ${head.y + 70}, ${head.x + 62} ${head.y + 36}, ${head.x + 54} ${head.y + 8} Z`;

  const frontFender =
    g.style === "cruiser"
      ? arc(fc, g.front.r + 9, -140, -42)
      : g.style === "scrambler"
        ? arc(fc, g.front.r + 12, -118, -66)
        : arc(fc, g.front.r + 8, -112, -60);
  const rearFender =
    g.style === "cruiser"
      ? arc(rc, g.rear.r + 10, -165, -20)
      : g.style === "scrambler"
        ? arc(rc, g.rear.r + 12, -160, -105)
        : arc(rc, g.rear.r + 8, -150, -96);

  const knobby = g.style === "scrambler";

  const bike = (
    <g>
      {/* wheels */}
      <Wheel c={rc} r={g.rear.r} accent={accent} uid={uid} knobby={knobby} />
      <Wheel c={fc} r={g.front.r} accent={accent} uid={uid} knobby={knobby} />

      {/* swingarm and coil shock */}
      <line
        x1={rc.x}
        y1={rc.y}
        x2={pivot.x}
        y2={pivot.y}
        stroke="#2b2d32"
        strokeWidth={16}
        strokeLinecap="round"
      />
      <line
        x1={rc.x}
        y1={rc.y - 6}
        x2={pivot.x}
        y2={pivot.y - 6}
        stroke="#5a5d64"
        strokeOpacity={0.5}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <line
        x1={rc.x + wb * 0.12}
        y1={rc.y - 6}
        x2={rc.x + wb * 0.2}
        y2={seatY + 24}
        stroke={accent}
        strokeWidth={13}
        strokeDasharray="4 3"
        filter={`url(#${uid}-glow)`}
      />

      {/* fork */}
      <line
        x1={fc.x}
        y1={fc.y}
        x2={forkMid.x}
        y2={forkMid.y}
        stroke="#2b2d32"
        strokeWidth={14}
        strokeLinecap="round"
      />
      <line
        x1={forkMid.x}
        y1={forkMid.y}
        x2={head.x}
        y2={head.y}
        stroke={accent}
        strokeWidth={9}
        strokeLinecap="round"
        opacity={0.92}
      />
      <line
        x1={forkMid.x - 2}
        y1={forkMid.y}
        x2={head.x - 2}
        y2={head.y}
        stroke="#fff"
        strokeOpacity={0.25}
        strokeWidth={2}
      />

      {/* fenders */}
      <path d={rearFender} fill="none" stroke={body} strokeWidth={8} strokeLinecap="round" />
      <path d={frontFender} fill="none" stroke={body} strokeWidth={8} strokeLinecap="round" />

      {/* battery pack and tank */}
      <path d={bodyD} fill={`url(#${uid}-body)`} />
      {[22, 40, 58].map((o) => (
        <line
          key={o}
          x1={tankRear.x + 26}
          y1={packBottom - o}
          x2={head.x - 52 + o * 0.25}
          y2={packBottom - o - 4}
          stroke={accent}
          strokeOpacity={0.28}
          strokeWidth={1.5}
        />
      ))}
      <path
        d={topLine}
        fill="none"
        stroke={`url(#${uid}-rim)`}
        strokeWidth={2.2}
        strokeLinecap="round"
      />

      {/* motor cover at the swingarm pivot */}
      <circle cx={pivot.x} cy={pivot.y} r={36} fill="#101114" stroke="#33353b" strokeWidth={2} />
      <circle cx={pivot.x} cy={pivot.y} r={26} fill="none" stroke={accent} strokeOpacity={0.55} strokeWidth={1.5} />
      {[0, 45, 90, 135].map((a) => (
        <line
          key={a}
          x1={pivot.x - 20}
          y1={pivot.y}
          x2={pivot.x + 20}
          y2={pivot.y}
          stroke="#2a2c31"
          strokeWidth={3}
          transform={`rotate(${a} ${pivot.x} ${pivot.y})`}
        />
      ))}
      <circle cx={pivot.x} cy={pivot.y} r={6} fill={accent} />

      {/* tail and seat */}
      <path d={cowlD} fill={`url(#${uid}-body)`} />
      <path d={seatD} fill="#0a0b0d" stroke="#2c2e33" strokeWidth={1.5} />
      <line
        x1={tailEnd.x + 2}
        y1={tailEnd.y + 6}
        x2={tailEnd.x + 2}
        y2={tailEnd.y + 15}
        stroke="#ff4438"
        strokeWidth={4}
        strokeLinecap="round"
        filter={`url(#${uid}-glow)`}
      />

      {/* sport fairing */}
      {g.style === "sport" && (
        <>
          <path d={fairingD} fill={`url(#${uid}-body)`} stroke="#34363c" strokeWidth={1.5} />
          <path
            d={`M ${head.x + 8} ${head.y - 34} Q ${head.x - 24} ${head.y - 70} ${head.x - 56} ${head.y - 62} L ${head.x - 44} ${head.y - 16} Z`}
            fill={accent}
            fillOpacity={0.14}
            stroke={accent}
            strokeOpacity={0.5}
            strokeWidth={1.2}
          />
          <path
            d={`M ${head.x + 50} ${head.y + 18} L ${head.x - 10} ${head.y + 6}`}
            stroke={accent}
            strokeWidth={5}
            strokeLinecap="round"
            filter={`url(#${uid}-glow)`}
          />
          <path
            d={`M ${head.x - 40} ${head.y + 150} L ${tankRear.x + 70} ${packBottom + 4}`}
            stroke={accent}
            strokeOpacity={0.5}
            strokeWidth={1.5}
          />
        </>
      )}

      {/* bash plate for the scrambler */}
      {g.style === "scrambler" && (
        <path
          d={`M ${tankRear.x + 10} ${packBottom + 4} L ${head.x - 40} ${packBottom - 2}`}
          stroke="#6a6d74"
          strokeWidth={5}
          strokeLinecap="round"
        />
      )}

      {/* handlebar, lever, mirror */}
      <line
        x1={head.x - 2}
        y1={head.y - 8}
        x2={grip.x}
        y2={grip.y}
        stroke="#33353b"
        strokeWidth={7}
        strokeLinecap="round"
      />
      <circle cx={grip.x} cy={grip.y} r={7} fill="#0b0c0e" />
      <line
        x1={grip.x}
        y1={grip.y + 2}
        x2={grip.x + 36}
        y2={grip.y + 8}
        stroke="#a2a5ac"
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      {g.style !== "sport" && (
        <>
          <line
            x1={grip.x + 4}
            y1={grip.y - 4}
            x2={grip.x + 12}
            y2={grip.y - 36}
            stroke="#33353b"
            strokeWidth={2.5}
          />
          <ellipse cx={grip.x + 12} cy={grip.y - 40} rx={9} ry={6} fill="#0b0c0e" stroke="#3a3c42" />
        </>
      )}
      {g.style === "scrambler" && (
        <line
          x1={grip.x - 18}
          y1={grip.y + 22}
          x2={grip.x + 24}
          y2={grip.y + 22}
          stroke="#33353b"
          strokeWidth={3}
        />
      )}

      {/* headlight */}
      {g.style !== "sport" && (
        <>
          <circle cx={head.x + 30} cy={head.y + 24} r={19} fill="#0b0c0e" stroke="#3a3c42" strokeWidth={2} />
          <circle
            cx={head.x + 30}
            cy={head.y + 24}
            r={12}
            fill={`url(#${uid}-lamp)`}
            filter={`url(#${uid}-glow)`}
          />
        </>
      )}
    </g>
  );

  return (
    <svg
      className={className}
      viewBox={`0 0 900 ${reflection ? 520 : 410}`}
      role="img"
      aria-label={`${vehicle.name}, ${vehicle.tagline}`}
    >
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#40434a" />
          <stop offset="0.35" stopColor={body} />
          <stop offset="1" stopColor="#07080a" />
        </linearGradient>
        <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={accent} stopOpacity="0" />
          <stop offset="0.5" stopColor={accent} stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9e6df" />
          <stop offset="0.5" stopColor="#6c6f76" />
          <stop offset="1" stopColor="#c9c6bf" />
        </linearGradient>
        <radialGradient id={`${uid}-lamp`}>
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.6" stopColor={accent} />
          <stop offset="1" stopColor={accent} stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id={`${uid}-floor`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={accent} stopOpacity="0.38" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${uid}-mask`} maskUnits="userSpaceOnUse" x="0" y="380" width="900" height="140">
          <rect x="0" y="380" width="900" height="140" fill={`url(#${uid}-fade)`} />
        </mask>
        <filter id={`${uid}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <g id={`${uid}-bike`}>{bike}</g>
      </defs>

      <ellipse cx="450" cy={GROUND + 6} rx="400" ry="26" fill={`url(#${uid}-floor)`} />

      {reflection && (
        <g mask={`url(#${uid}-mask)`}>
          <use href={`#${uid}-bike`} transform={`translate(0 ${GROUND * 2 + 4}) scale(1 -1)`} />
        </g>
      )}
      <use href={`#${uid}-bike`} />
    </svg>
  );
}
