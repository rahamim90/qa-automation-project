import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 py-8 text-center text-sm text-cream/60">
      <p>מספרת הסטייל · רחוב הדוגמה 1, תל אביב · 03-1234567</p>
      <p className="mt-1">ראשון–חמישי 09:00–19:00 · שישי 09:00–14:00 · שבת סגור</p>
      <p className="mt-2">
        <Link to="/about" className="text-gold hover:underline">
          אודות המספרה
        </Link>
      </p>
    </footer>
  );
}
