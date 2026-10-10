export type BikeStyle = "naked" | "sport" | "cruiser" | "scrambler";

export interface BikeGeometry {
  /** Rear wheel centre x and radius, in the 900x420 illustration space */
  rear: { x: number; r: number };
  front: { x: number; r: number };
  style: BikeStyle;
  /** Height of the seat above the rear axle */
  seatLift: number;
}

export interface Spec {
  label: string;
  value: string;
  unit: string;
}

export interface Vehicle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // USD, dummy
  /** Accent used for the glow, slider and spec highlights */
  accent: string;
  /** Body colour of the illustration */
  body: string;
  image: string;
  ghost: string; // Japanese ghost word behind the bike
  specs: Spec[];
  detailSpecs: Spec[];
  geometry: BikeGeometry;
}

export const vehicles: Vehicle[] = [
  {
    id: "vx-1-noir",
    name: "VX-1 Noir",
    tagline: "Flagship naked roadster",
    description:
      "An all-black flagship with satin graphite panels and brushed copper accents. Silent at the lights, instant the moment you twist the throttle.",
    price: 24900,
    accent: "#e0a54b",
    body: "#1b1c20",
    image: "/bikes/vx-1-noir.webp",
    ghost: "電動バイク",
    specs: [
      { label: "Top speed", value: "169", unit: "mph" },
      { label: "Power", value: "162", unit: "hp" },
      { label: "Torque", value: "130.5", unit: "N·m" },
      { label: "Range", value: "212", unit: "mi" },
    ],
    detailSpecs: [
      { label: "Battery", value: "18.4", unit: "kWh" },
      { label: "Charge time", value: "45", unit: "min (20–80%)" },
      { label: "0–60 mph", value: "2.9", unit: "sec" },
      { label: "Weight", value: "478", unit: "lb" },
    ],
    geometry: {
      rear: { x: 190, r: 92 },
      front: { x: 700, r: 92 },
      style: "naked",
      seatLift: 104,
    },
  },
  {
    id: "rx-7-apex",
    name: "RX-7 Apex",
    tagline: "Track-bred sport fairing",
    description:
      "A full carbon-look fairing, a rear-set riding position and a 600 V battery pack tuned for repeated hard launches on track days.",
    price: 28400,
    accent: "#ff7a45",
    body: "#24201f",
    image: "/bikes/rx-7-apex.webp",
    ghost: "疾風",
    specs: [
      { label: "Top speed", value: "182", unit: "mph" },
      { label: "Power", value: "201", unit: "hp" },
      { label: "Torque", value: "148", unit: "N·m" },
      { label: "Range", value: "168", unit: "mi" },
    ],
    detailSpecs: [
      { label: "Battery", value: "16.8", unit: "kWh" },
      { label: "Charge time", value: "38", unit: "min (20–80%)" },
      { label: "0–60 mph", value: "2.4", unit: "sec" },
      { label: "Weight", value: "452", unit: "lb" },
    ],
    geometry: {
      rear: { x: 185, r: 90 },
      front: { x: 705, r: 90 },
      style: "sport",
      seatLift: 112,
    },
  },
  {
    id: "cr-9-meridian",
    name: "CR-9 Meridian",
    tagline: "Long-range electric cruiser",
    description:
      "A low, long stance with a wide rear tyre and the largest battery in the lineup. Built for highway days that start with a full charge and end with range to spare.",
    price: 26200,
    accent: "#d9b87a",
    body: "#1d1e1c",
    image: "/bikes/cr-9-meridian.webp",
    ghost: "長距離",
    specs: [
      { label: "Top speed", value: "124", unit: "mph" },
      { label: "Power", value: "118", unit: "hp" },
      { label: "Torque", value: "162", unit: "N·m" },
      { label: "Range", value: "285", unit: "mi" },
    ],
    detailSpecs: [
      { label: "Battery", value: "23.2", unit: "kWh" },
      { label: "Charge time", value: "52", unit: "min (20–80%)" },
      { label: "0–60 mph", value: "3.8", unit: "sec" },
      { label: "Weight", value: "536", unit: "lb" },
    ],
    geometry: {
      rear: { x: 170, r: 96 },
      front: { x: 730, r: 86 },
      style: "cruiser",
      seatLift: 78,
    },
  },
  {
    id: "sx-3-ridgeline",
    name: "SX-3 Ridgeline",
    tagline: "Dual-sport scrambler",
    description:
      "Tall suspension, a bash plate under the battery and a 21-inch front wheel. Quiet enough for forest trails, quick enough for the ride home.",
    price: 19800,
    accent: "#f0c05a",
    body: "#22221e",
    image: "/bikes/sx-3-ridgeline.webp",
    ghost: "冒険",
    specs: [
      { label: "Top speed", value: "112", unit: "mph" },
      { label: "Power", value: "94", unit: "hp" },
      { label: "Torque", value: "118", unit: "N·m" },
      { label: "Range", value: "178", unit: "mi" },
    ],
    detailSpecs: [
      { label: "Battery", value: "15.2", unit: "kWh" },
      { label: "Charge time", value: "42", unit: "min (20–80%)" },
      { label: "0–60 mph", value: "4.1", unit: "sec" },
      { label: "Weight", value: "421", unit: "lb" },
    ],
    geometry: {
      rear: { x: 195, r: 98 },
      front: { x: 700, r: 106 },
      style: "scrambler",
      seatLift: 122,
    },
  },
  {
    id: "ct-2-pulse",
    name: "CT-2 Pulse",
    tagline: "Compact city commuter",
    description:
      "Light, narrow and easy to park. A swappable battery, a low seat and a 0 to 30 mph time that keeps you ahead of city traffic.",
    price: 11900,
    accent: "#c98a3f",
    body: "#202225",
    image: "/bikes/ct-2-pulse.webp",
    ghost: "街",
    specs: [
      { label: "Top speed", value: "78", unit: "mph" },
      { label: "Power", value: "48", unit: "hp" },
      { label: "Torque", value: "74", unit: "N·m" },
      { label: "Range", value: "96", unit: "mi" },
    ],
    detailSpecs: [
      { label: "Battery", value: "7.2", unit: "kWh" },
      { label: "Charge time", value: "35", unit: "min (20–80%)" },
      { label: "0–60 mph", value: "5.8", unit: "sec" },
      { label: "Weight", value: "318", unit: "lb" },
    ],
    geometry: {
      rear: { x: 215, r: 80 },
      front: { x: 675, r: 80 },
      style: "naked",
      seatLift: 96,
    },
  },
  {
    id: "rx-9-tempest",
    name: "RX-9 Tempest",
    tagline: "Carbon-fibre electric superbike",
    description:
      "A race-inspired superbike with razor-sharp response, aerodynamic bodywork and the composure to turn a fast lap into an everyday ride.",
    price: 32900,
    accent: "#e65b4b",
    body: "#211b1b",
    image: "/bikes/rx-9-tempest.webp",
    ghost: "疾風",
    specs: [
      { label: "Top speed", value: "190", unit: "mph" },
      { label: "Power", value: "218", unit: "hp" },
      { label: "Torque", value: "152", unit: "N·m" },
      { label: "Range", value: "155", unit: "mi" },
    ],
    detailSpecs: [
      { label: "Battery", value: "17.2", unit: "kWh" },
      { label: "Charge time", value: "36", unit: "min (20–80%)" },
      { label: "0–60 mph", value: "2.3", unit: "sec" },
      { label: "Weight", value: "438", unit: "lb" },
    ],
    geometry: {
      rear: { x: 185, r: 90 },
      front: { x: 705, r: 90 },
      style: "sport",
      seatLift: 118,
    },
  },
  {
    id: "vx-4-strike",
    name: "VX-4 Strike",
    tagline: "Hyper-naked performance",
    description:
      "Superbike acceleration in a more upright package, with instant torque and a stripped-back stance made for winding roads.",
    price: 27600,
    accent: "#91b9a3",
    body: "#1c2220",
    image: "/bikes/vx-4-strike.webp",
    ghost: "電光",
    specs: [
      { label: "Top speed", value: "174", unit: "mph" },
      { label: "Power", value: "184", unit: "hp" },
      { label: "Torque", value: "142", unit: "N·m" },
      { label: "Range", value: "198", unit: "mi" },
    ],
    detailSpecs: [
      { label: "Battery", value: "18.1", unit: "kWh" },
      { label: "Charge time", value: "41", unit: "min (20–80%)" },
      { label: "0–60 mph", value: "2.7", unit: "sec" },
      { label: "Weight", value: "461", unit: "lb" },
    ],
    geometry: {
      rear: { x: 190, r: 92 },
      front: { x: 700, r: 92 },
      style: "naked",
      seatLift: 106,
    },
  },
  {
    id: "ct-4-metro",
    name: "CT-4 Metro",
    tagline: "Everyday electric commuter",
    description:
      "A friendly, practical runabout with a comfortable upright seat, low running costs and enough range for the daily round trip.",
    price: 8900,
    accent: "#7da9c3",
    body: "#1c2227",
    image: "/bikes/ct-4-metro.webp",
    ghost: "街",
    specs: [
      { label: "Top speed", value: "68", unit: "mph" },
      { label: "Power", value: "32", unit: "hp" },
      { label: "Torque", value: "58", unit: "N·m" },
      { label: "Range", value: "112", unit: "mi" },
    ],
    detailSpecs: [
      { label: "Battery", value: "6.4", unit: "kWh" },
      { label: "Charge time", value: "32", unit: "min (20–80%)" },
      { label: "0–60 mph", value: "7.2", unit: "sec" },
      { label: "Weight", value: "286", unit: "lb" },
    ],
    geometry: {
      rear: { x: 215, r: 80 },
      front: { x: 675, r: 80 },
      style: "naked",
      seatLift: 92,
    },
  },
  {
    id: "ct-5-daybreak",
    name: "CT-5 Daybreak",
    tagline: "Lightweight urban runabout",
    description:
      "Easy to handle, simple to charge and made for weaving through the weekday rush without the noise or fuel stops.",
    price: 6900,
    accent: "#d8a2bd",
    body: "#211c21",
    image: "/bikes/ct-5-daybreak.webp",
    ghost: "朝",
    specs: [
      { label: "Top speed", value: "58", unit: "mph" },
      { label: "Power", value: "24", unit: "hp" },
      { label: "Torque", value: "46", unit: "N·m" },
      { label: "Range", value: "84", unit: "mi" },
    ],
    detailSpecs: [
      { label: "Battery", value: "4.8", unit: "kWh" },
      { label: "Charge time", value: "28", unit: "min (20–80%)" },
      { label: "0–60 mph", value: "8.6", unit: "sec" },
      { label: "Weight", value: "254", unit: "lb" },
    ],
    geometry: {
      rear: { x: 215, r: 80 },
      front: { x: 675, r: 80 },
      style: "naked",
      seatLift: 96,
    },
  },
];

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
