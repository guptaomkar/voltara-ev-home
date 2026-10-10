import { useCallback, useEffect, useState } from "react";
import { vehicles } from "./data/vehicles";
import { Hero, type Direction } from "./components/Hero";
import { SpecPanel } from "./components/SpecPanel";
import { Lineup } from "./components/Lineup";
import { EnquiryModal } from "./components/EnquiryModal";
import { MoltenBackdrop } from "./components/MoltenBackdrop";
import { Footer } from "./components/Footer";
import { ProductPage } from "./components/ProductPage";

function getDetailVehicleId() {
  const match = window.location.hash.match(/^#bike\/([^/?#]+)$/);
  return match && vehicles.some((vehicle) => vehicle.id === match[1]) ? match[1] : null;
}

export default function App() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [detailVehicleId, setDetailVehicleId] = useState<string | null>(getDetailVehicleId);
  const [enquiry, setEnquiry] = useState<{ open: boolean; vehicleId: string }>({
    open: false,
    vehicleId: vehicles[0].id,
  });

  const vehicle = vehicles[index];
  const detailVehicle = vehicles.find((item) => item.id === detailVehicleId);

  useEffect(() => {
    const syncDetailRoute = () => setDetailVehicleId(getDetailVehicleId());
    window.addEventListener("hashchange", syncDetailRoute);
    return () => window.removeEventListener("hashchange", syncDetailRoute);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (next === index) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
    },
    [index],
  );

  const openEnquiry = useCallback((vehicleId: string) => {
    setEnquiry({ open: true, vehicleId });
  }, []);

  const closeEnquiry = useCallback(() => {
    setEnquiry((e) => (e.open ? { ...e, open: false } : e));
  }, []);

  const openProduct = useCallback((vehicleId: string) => {
    window.history.pushState(null, "", `#bike/${vehicleId}`);
    setDetailVehicleId(vehicleId);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const backToLineup = useCallback(() => {
    window.history.replaceState(null, "", "#lineup");
    setDetailVehicleId(null);
    window.requestAnimationFrame(() =>
      document.getElementById("lineup")?.scrollIntoView({ behavior: "smooth" }),
    );
  }, []);

  // Arrow keys switch models, except while typing or when the form is open.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (enquiry.open) return;
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.key === "ArrowRight") goTo((index + 1) % vehicles.length);
      if (event.key === "ArrowLeft") goTo((index - 1 + vehicles.length) % vehicles.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enquiry.open, goTo, index]);

  return (
    <div className="app" style={{ ["--accent" as string]: (detailVehicle ?? vehicle).accent }}>
      <MoltenBackdrop />
      {detailVehicle ? (
        <div className="page">
          <ProductPage
            vehicle={detailVehicle}
            onBack={backToLineup}
            onEnquire={() => openEnquiry(detailVehicle.id)}
          />
          <Footer />
        </div>
      ) : (
        <main className="page">
          <div className="shell">
            <Hero
              vehicles={vehicles}
              index={index}
              direction={direction}
              onChange={goTo}
              onEnquire={() => openEnquiry(vehicle.id)}
              onViewDetails={() => openProduct(vehicle.id)}
              autoPlayPaused={enquiry.open}
            />
            <SpecPanel vehicle={vehicle} />
          </div>
          <Lineup
            vehicles={vehicles}
            onEnquire={openEnquiry}
            onViewDetails={openProduct}
          />
          <Footer />
        </main>
      )}
      <EnquiryModal
        open={enquiry.open}
        vehicles={vehicles}
        initialVehicleId={enquiry.vehicleId}
        onClose={closeEnquiry}
      />
    </div>
  );
}
