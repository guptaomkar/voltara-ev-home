import { useState } from "react";

interface HeaderProps {
  onEnquire: () => void;
}

const links = [
  { label: "Bikes", href: "#lineup" },
  { label: "Accessories", href: "#lineup" },
  { label: "Technology", href: "#lineup" },
  { label: "Explore", href: "#lineup" },
];

export function Header({ onEnquire }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <a className="logo" href="#top" aria-label="Voltara home">
        <svg viewBox="0 0 24 24" className="logo__mark" aria-hidden="true">
          <path d="M13.2 2 5 13.4h5.6L9.8 22 19 10.2h-5.7L13.2 2Z" fill="currentColor" />
        </svg>
        <span className="logo__word">Voltara</span>
      </a>

      <nav
        id="primary-nav"
        className={`nav${open ? " nav--open" : ""}`}
        aria-label="Primary"
      >
        {links.map((link) => (
          <a key={link.label} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="header__actions">
        <button type="button" className="btn btn--ghost" onClick={onEnquire}>
          Enquire
        </button>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="menu-toggle__bars" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
