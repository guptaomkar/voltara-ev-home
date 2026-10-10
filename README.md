# Voltara: EV motorcycle home page

Home page for an electric motorcycle shop, built with React 18, TypeScript and Vite.
Visitors browse the lineup and click **Enquire**; there is no checkout.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

## What is on the page

- **Hero**: 3D-tilting stage with a ghost Japanese headline, the selected bike, a rotating badge,
  a spec panel, and a model slider (buttons, segment bar, or the left/right arrow keys).
- **Lineup**: nine sport, cruiser, scrambler and commuter models with key specs, prices and
  direct links to each product page.
- **Hero carousel**: rotates through all nine bikes every 6.5 seconds, with next/previous,
  direct selection, pause/resume, hover pause, and reduced-motion support.
- **Product page**: shareable `#bike/<model-id>` detail view with extended specifications and
  a model-specific enquiry call to action.
- **Enquiry dialog**: opens from every Enquire button, preselects the model, validates name and
  email, and shows a confirmation.
- **Molten backdrop**: layered CSS gradients, no images or canvas.

## Where things live

```
src/
  data/vehicles.ts            Dummy models, specs, prices and bike geometry
  components/BikeArt.tsx      Local bike photography with SVG illustration fallback
  components/Hero.tsx         Stage, slider, price and CTA
  components/SpecPanel.tsx    Right-hand spec card
  components/Lineup.tsx       Model cards
  components/ProductPage.tsx  Product details and expanded specifications
  components/EnquiryModal.tsx Native <dialog> form with validation
  hooks/usePointerTilt.ts     Pointer-driven 3D tilt (off for touch and reduced motion)
  styles/global.css           Tokens, layout, motion, responsive rules
```

## Swapping in real data

1. **Models and images**: edit `src/data/vehicles.ts`. To use photos, add an `image` field to
   `Vehicle` and render an `<img>` in `Hero.tsx` and `Lineup.tsx` where `<BikeArt />` is used.
   Transparent PNG or WebP cut-outs (side profile, about 16:9) work best.
2. **Enquiry submit**: in `EnquiryModal.tsx`, replace the `console.info` and `setTimeout` in
   `onSubmit` with a `fetch` to your API.
3. **Brand and copy**: the name "Voltara" appears in `Header.tsx`, `Footer.tsx` and `index.html`.

## Notes

- Fonts (Unbounded, Montserrat, Noto Sans JP) load from Google Fonts in `index.html`.
- Motion respects `prefers-reduced-motion`.
- Lineup illustrations are static and offscreen cards use browser content visibility to reduce
  scrolling work; the molten backdrop is static to avoid continuous full-screen repainting.
- Bike photos are locally stored, optimized WebP files in `public/bikes/` and were sourced from
  [Unsplash](https://unsplash.com/license) under the Unsplash License. They are concept/reference
  photography, not images of actual Voltara models; the model details and specifications remain
  sample data.
- Colors come from one `--accent` token that changes per model.
