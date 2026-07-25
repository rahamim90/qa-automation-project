const DAY_LABELS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

function toDateString(date) {
  return date.toISOString().slice(0, 10);
}

export default function DatePicker({ selectedDate, onSelect, daysAhead = 14 }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = Array.from({ length: daysAhead }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {days.map((d) => {
        const dateStr = toDateString(d);
        const selected = dateStr === selectedDate;
        const isFriday = d.getDay() === 5;
        return (
          <button
            key={dateStr}
            type="button"
            onClick={() => onSelect(dateStr)}
            className={`flex min-w-16 flex-shrink-0 flex-col items-center rounded-xl border px-3 py-2 transition-all ${
              selected
                ? 'border-gold bg-gradient-to-b from-gold to-orange-400 text-charcoal shadow-[0_0_20px_-6px_rgba(242,177,52,0.6)]'
                : 'border-gold/15 text-cream/90 hover:border-gold/40'
            }`}
          >
            <span className="text-xs opacity-70">{DAY_LABELS[d.getDay()]}{isFriday ? '׳' : ''}</span>
            <span className="text-lg font-medium">{d.getDate()}</span>
            <span className="text-xs opacity-70">{d.toLocaleDateString('he-IL', { month: 'short' })}</span>
          </button>
        );
      })}
    </div>
  );
}
