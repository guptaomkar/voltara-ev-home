import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Vehicle } from "../data/vehicles";

interface EnquiryModalProps {
  open: boolean;
  vehicles: Vehicle[];
  initialVehicleId: string;
  onClose: () => void;
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
}

type Status = "idle" | "sending" | "sent";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function EnquiryForm({
  vehicles,
  initialVehicleId,
  onClose,
}: Omit<EnquiryModalProps, "open">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleId, setVehicleId] = useState(initialVehicleId);
  const [message, setMessage] = useState("");
  const [testRide, setTestRide] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const vehicle = vehicles.find((v) => v.id === vehicleId) ?? vehicles[0];

  const validate = (): Errors => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Enter your full name.";
    if (!EMAIL.test(email.trim())) next.email = "Enter a valid email address, like name@example.com.";
    if (phone.trim() && phone.replace(/\D/g, "").length < 7) {
      next.phone = "Enter at least 7 digits, or leave this blank.";
    }
    return next;
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    // Dummy submit. Replace this block with a call to your enquiries API.
    console.info("Enquiry", { name, email, phone, model: vehicle.name, message, testRide });
    window.setTimeout(() => setStatus("sent"), 700);
  };

  if (status === "sent") {
    return (
      <div className="modal__done">
        <h2 id="enquiry-title" className="modal__title">
          Enquiry sent
        </h2>
        <p className="modal__text">
          Thanks, {name.trim().split(" ")[0]}. We'll email {email.trim()} about the {vehicle.name}{" "}
          within one business day.
        </p>
        <button type="button" className="btn btn--primary" onClick={onClose} autoFocus>
          Close
        </button>
      </div>
    );
  }

  return (
    <form className="modal__form" onSubmit={onSubmit} noValidate>
      <h2 id="enquiry-title" className="modal__title">
        Enquire about the {vehicle.name}
      </h2>
      <p className="modal__text">
        Tell us how to reach you. A Voltara advisor will reply with pricing, availability and test
        ride options.
      </p>

      <div className="field">
        <label htmlFor="enq-name">Full name</label>
        <input
          id="enq-name"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "enq-name-err" : undefined}
          autoFocus
        />
        {errors.name && (
          <p className="field__error" id="enq-name-err">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="enq-email">Email</label>
          <input
            id="enq-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "enq-email-err" : undefined}
          />
          {errors.email && (
            <p className="field__error" id="enq-email-err">
              {errors.email}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="enq-phone">Phone (optional)</label>
          <input
            id="enq-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "enq-phone-err" : undefined}
          />
          {errors.phone && (
            <p className="field__error" id="enq-phone-err">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="enq-model">Model</label>
        <select id="enq-model" name="model" value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="enq-message">Message (optional)</label>
        <textarea
          id="enq-message"
          name="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <label className="check">
        <input type="checkbox" checked={testRide} onChange={(e) => setTestRide(e.target.checked)} />
        <span>I'd like to book a test ride</span>
      </label>

      <div className="modal__actions">
        <button type="button" className="btn btn--ghost" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
      </div>
    </form>
  );
}

export function EnquiryModal({ open, vehicles, initialVehicleId, onClose }: EnquiryModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // Bumped each time the dialog opens so the form starts fresh.
  const [session, setSession] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setSession((s) => s + 1);
      dialog.showModal();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="enquiry-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal__panel">
        <button type="button" className="modal__close icon-btn" onClick={onClose} aria-label="Close enquiry form">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        {open && (
          <EnquiryForm
            key={session}
            vehicles={vehicles}
            initialVehicleId={initialVehicleId}
            onClose={onClose}
          />
        )}
      </div>
    </dialog>
  );
}
