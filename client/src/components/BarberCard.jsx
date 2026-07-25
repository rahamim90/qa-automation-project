import { Link } from 'react-router-dom';

export default function BarberCard({ barber }) {
  return (
    <Link
      to={`/barbers/${barber.slug}`}
      className="group block overflow-hidden rounded-2xl border border-gold/15 bg-charcoal-light transition-transform hover:-translate-y-1 hover:border-gold/40"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={barber.photoUrl}
          alt={barber.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 text-center">
        <h3 className="text-xl text-gold">{barber.name}</h3>
        <p className="mt-1 text-sm text-cream/70">{barber.specialty}</p>
        <span className="mt-4 inline-block rounded-full border border-gold/40 px-4 py-1.5 text-xs text-gold group-hover:bg-gold group-hover:text-charcoal transition-colors">
          לצפייה בפרופיל ולקביעת תור
        </span>
      </div>
    </Link>
  );
}
