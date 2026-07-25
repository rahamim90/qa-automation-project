import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import BarberCard from '../components/BarberCard';
import HeroMedia from '../components/HeroMedia';
import SpotifyButton from '../components/SpotifyButton';
import Reveal from '../components/Reveal';

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
      <section className="relative flex min-h-[85vh] items-center overflow-hidden border-b border-gold/15">
        <HeroMedia />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="bg-gradient-to-l from-gold via-orange-300 to-gold-deep bg-clip-text font-display text-5xl font-black leading-tight text-transparent sm:text-7xl">
            מספרת הסטייל
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cream/85 sm:text-xl">
            תספורות חדות, אווירה חמה, והפלייליסט הכי טוב בעיר. בואו לחוות את זה בעצמכם.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#crew"
              className="animate-glow-pulse inline-block rounded-full bg-gradient-to-l from-gold to-orange-400 px-8 py-3 text-lg font-extrabold text-charcoal transition-transform hover:scale-105"
            >
              קביעת תור עכשיו
            </a>
            <SpotifyButton />
            <Link
              to="/products"
              className="inline-block rounded-full border border-gold/50 px-6 py-2.5 text-gold transition-colors hover:bg-gold hover:text-charcoal"
            >
              לצפייה במוצרים שלנו
            </Link>
            <Link
              to="/about"
              className="inline-block px-6 py-2.5 text-cream/80 transition-colors hover:text-gold"
            >
              אודות המספרה
            </Link>
          </div>
        </div>
      </section>

      <section id="crew" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <Reveal>
          <h2 className="mb-2 text-center text-3xl text-gold sm:text-4xl">תכירו את הצוות</h2>
          <p className="mb-10 text-center text-cream/70">
            שלושה ספרים, אלף סיפורים, ותספורת אחת מושלמת בשבילכם. בחרו ספר, תקבעו תור, ותנו לקצב
            לעשות את השאר.
          </p>
        </Reveal>

        {loading ? (
          <p className="text-center text-cream/60">טוען...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {barbers.map((barber, i) => (
              <Reveal key={barber.id} delay={i * 120}>
                <BarberCard barber={barber} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
