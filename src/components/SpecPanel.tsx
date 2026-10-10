import type { Vehicle } from "../data/vehicles";

interface SpecPanelProps {
  vehicle: Vehicle;
}

export function SpecPanel({ vehicle }: SpecPanelProps) {
  return (
    <aside className="specs" aria-label={`${vehicle.name} specifications`}>
      <dl key={vehicle.id} className="specs__list">
        {vehicle.specs.map((spec) => (
          <div className="spec" key={spec.label}>
            <dt className="spec__label">{spec.label}</dt>
            <dd className="spec__value">
              <span className="spec__num">{spec.value}</span>
              <span className="spec__unit">{spec.unit}</span>
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
