export default function ServiceList({ services, selectedServiceId, onSelect }) {
  return (
    <div className="space-y-2">
      {services.map((service) => {
        const selected = service.id === selectedServiceId;
        return (
          <button
            key={service.id}
            type="button"
            onClick={() => onSelect(service.id)}
            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-right transition-all ${
              selected
                ? 'border-gold bg-gradient-to-l from-gold/20 to-orange-400/10 text-gold shadow-[0_0_20px_-6px_rgba(242,177,52,0.5)]'
                : 'border-gold/15 text-cream/90 hover:border-gold/40'
            }`}
          >
            <span>
              <span className="block font-medium">{service.name}</span>
              <span className="block text-xs text-cream/50">{service.durationMinutes} דקות</span>
            </span>
            <span className="text-lg text-gold">₪{service.price}</span>
          </button>
        );
      })}
    </div>
  );
}
