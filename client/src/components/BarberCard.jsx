import { Link } from 'react-router-dom';

export default function BarberCard({ barber }) {
  return (
    <Link
      to={`/barbers/${barber.slug}`}
      className="group relative block overflow-hidden rounded-3xl border border-gold/15 bg-charcoal-light transition-all duration-300 hover:-translate-y-2 hover:border-gold/50 hover:shadow-[0_0_40px_-8px_rgba(242,177,52,0.5)]"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={barber.photoUrl}
          alt={barber.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent" />
      </div>
      <div className="relative p-5 text-center">
        <h3 className="font-display text-xl font-extrabold text-gold">{barber.name}</h3>
        <p className="mt-1 text-sm text-cream/70">{barber.specialty}</p>
        <span className="mt-4 inline-block rounded-full bg-gradient-to-l from-gold to-orange-400 px-4 py-1.5 text-xs font-bold text-charcoal transition-transform group-hover:scale-105">
          לצפייה בפרופיל ולקביעת תור
        </span>
      </div>
    </Link>
  );
}
