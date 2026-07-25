export default function TimeSlotGrid({ slots, selectedTime, onSelect, loading }) {
  if (loading) {
    return <p className="text-cream/60">טוען שעות פנויות...</p>;
  }

  if (!slots?.length) {
    return <p className="text-cream/60">אין שעות פנויות בתאריך זה. נסו לבחור תאריך אחר.</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
      {slots.map((time) => {
        const selected = time === selectedTime;
        return (
          <button
            key={time}
            type="button"
            onClick={() => onSelect(time)}
            className={`rounded-xl border px-2 py-2 text-sm transition-all ${
              selected
                ? 'border-gold bg-gradient-to-b from-gold to-orange-400 text-charcoal shadow-[0_0_20px_-6px_rgba(242,177,52,0.6)]'
                : 'border-gold/15 text-cream/90 hover:border-gold/40'
            }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
