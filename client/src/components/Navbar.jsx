import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-charcoal/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-2xl text-gold tracking-wide">
          מספרת הסטייל
        </Link>
        <div className="flex items-center gap-6 text-sm text-cream/90">
          <Link to="/" className="hover:text-gold transition-colors">
            בית
          </Link>
          <Link to="/about" className="hover:text-gold transition-colors">
            אודות
          </Link>
          <Link to="/products" className="hover:text-gold transition-colors">
            מוצרים
          </Link>
          <Link
            to="/admin"
            className="rounded-full border border-gold/40 px-4 py-1.5 text-gold hover:bg-gold hover:text-charcoal transition-colors"
          >
            כניסת ספרים
          </Link>
        </div>
      </nav>
    </header>
  );
}
