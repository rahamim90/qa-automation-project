import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SpotifyButton from './SpotifyButton';

const NAV_LINKS = [
  { to: '/', label: 'בית' },
  { to: '/about', label: 'אודות' },
  { to: '/products', label: 'מוצרים' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-charcoal/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="bg-gradient-to-l from-gold to-orange-400 bg-clip-text font-display text-2xl font-black tracking-tight text-transparent"
        >
          מספרת הסטייל
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-cream/90 sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors hover:text-gold ${isActive ? 'text-gold' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <SpotifyButton />
          <Link
            to="/admin"
            className="rounded-full border border-gold/40 px-4 py-1.5 text-gold transition-colors hover:bg-gold hover:text-charcoal"
          >
            כניסת צוות
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="תפריט"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/30 text-gold sm:hidden"
        >
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {open && (
        <div className="border-t border-gold/10 px-6 py-4 sm:hidden">
          <div className="flex flex-col items-start gap-4 text-cream/90">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            <SpotifyButton />
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="rounded-full border border-gold/40 px-4 py-1.5 text-gold"
            >
              כניסת צוות
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
