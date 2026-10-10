import { BikeArt } from "./BikeArt";
import { formatPrice, type Vehicle } from "../data/vehicles";

interface LineupProps {
  vehicles: Vehicle[];
  onEnquire: (vehicleId: string) => void;
  onViewDetails: (vehicleId: string) => void;
}

export function Lineup({ vehicles, onEnquire, onViewDetails }: LineupProps) {
  return (
    <section className="frame lineup" id="lineup" aria-labelledby="lineup-title">
      <div className="lineup__head">
        <h2 id="lineup-title" className="lineup__title">
          The lineup
        </h2>
        <p className="lineup__sub">
          From superbike performance to everyday electric mobility. Find the ride that fits you.
        </p>
      </div>

      <ul className="lineup__grid">
        {vehicles.map((v) => (
          <li key={v.id} className="card" style={{ ["--accent" as string]: v.accent }}>
            <div className="card__art">
              <BikeArt vehicle={v} reflection={false} />
            </div>
            <div className="card__body">
              <h3 className="card__name">{v.name}</h3>
              <p className="card__tagline">{v.tagline}</p>
              <dl className="card__stats">
                <div>
                  <dt>Range</dt>
                  <dd>{v.specs[3].value} mi</dd>
                </div>
                <div>
                  <dt>Top speed</dt>
                  <dd>{v.specs[0].value} mph</dd>
                </div>
                <div>
                  <dt>Power</dt>
                  <dd>{v.specs[1].value} hp</dd>
                </div>
              </dl>
              <div className="card__foot">
                <p className="card__price">{formatPrice(v.price)}</p>
                <div className="card__actions">
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => onViewDetails(v.id)}
                    aria-label={`View ${v.name} specifications`}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => onEnquire(v.id)}
                    aria-label={`Enquire about ${v.name}`}
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
