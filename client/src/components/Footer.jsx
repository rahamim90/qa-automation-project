import { Link } from 'react-router-dom';
import SpotifyButton from './SpotifyButton';

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-charcoal-light">
      <div className="mx-auto h-px max-w-6xl bg-gradient-to-l from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-cream/60">
        <p className="font-display text-lg font-bold text-gold">מספרת הסטייל</p>
        <p className="mt-2">רחוב הדוגמה 1, תל אביב · 03-1234567</p>
        <p className="mt-1">ראשון–חמישי 09:00–19:00 · שישי 09:00–14:00 · שבת סגור</p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
          <Link to="/about" className="text-gold hover:underline">
            אודות המספרה
          </Link>
          <SpotifyButton />
        </div>
      </div>
    </footer>
  );
}
