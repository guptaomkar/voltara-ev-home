import { BikeArt } from "./BikeArt";
import { formatPrice, type Vehicle } from "../data/vehicles";

interface ProductPageProps {
  vehicle: Vehicle;
  onBack: () => void;
  onEnquire: () => void;
}

export function ProductPage({ vehicle, onBack, onEnquire }: ProductPageProps) {
  return (
    <main className="product-page frame">
      <div className="product-page__top">
        <a
          className="logo"
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            onBack();
          }}
        >
          <svg viewBox="0 0 24 24" className="logo__mark" aria-hidden="true">
            <path d="M13.2 2 5 13.4h5.6L9.8 22 19 10.2h-5.7L13.2 2Z" fill="currentColor" />
          </svg>
          <span className="logo__word">Voltara</span>
        </a>
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          Back to all bikes
        </button>
      </div>

      <div className="product-page__hero">
        <div className="product-page__intro">
          <p className="product-page__eyebrow">Voltara collection / {vehicle.tagline}</p>
          <h1 className="product-page__title">{vehicle.name}</h1>
          <p className="product-page__description">{vehicle.description}</p>
          <p className="product-page__price">
            <span>Starting at</span>
            {formatPrice(vehicle.price)}
          </p>
          <button type="button" className="btn btn--primary" onClick={onEnquire}>
            Enquire about {vehicle.name}
          </button>
        </div>
        <div className="product-page__art">
          <BikeArt vehicle={vehicle} reflection={false} imagePriority />
        </div>
      </div>

      <section className="product-page__specs" aria-labelledby="product-specs-title">
        <div>
          <p className="product-page__eyebrow">Built around your ride</p>
          <h2 id="product-specs-title">Specifications</h2>
        </div>
        <dl className="product-page__spec-list">
          {[...vehicle.specs, ...vehicle.detailSpecs].map((spec) => (
            <div className="product-page__spec" key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>
                {spec.value} <span>{spec.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="product-page__note">
          Specifications and pricing shown are sample data and may change.
        </p>
      </section>
    </main>
  );
}
