import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import BarberCard from '../components/BarberCard';

export default function Home() {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getBarbers()
      .then(setBarbers)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-gold/15">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/seed/barbershop-hero/1600/700"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/40" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-4xl text-gold sm:text-6xl">מספרת הסטייל</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-cream/80">
            חוויית טיפוח גברית מוקפדת, שלושה ספרים מומחים, ותור אונליין בכמה קליקים.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="inline-block rounded-full border border-gold/50 px-6 py-2.5 text-gold hover:bg-gold hover:text-charcoal transition-colors"
            >
              לצפייה במוצרים שלנו
            </Link>
            <Link
              to="/about"
              className="inline-block rounded-full px-6 py-2.5 text-cream/80 hover:text-gold transition-colors"
            >
              אודות המספרה
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-2 text-center text-3xl text-gold">הספרים שלנו</h2>
        <p className="mb-10 text-center text-cream/70">בחרו ספר כדי לראות פרופיל, גלריית עבודות ולקבוע תור</p>

        {loading ? (
          <p className="text-center text-cream/60">טוען...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {barbers.map((barber) => (
              <BarberCard key={barber.id} barber={barber} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
