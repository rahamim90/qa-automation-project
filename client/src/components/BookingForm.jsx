import { useState } from 'react';

export default function BookingForm({ onSubmit, disabled, submitting, error }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [localError, setLocalError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setLocalError('נא להזין שם מלא');
      return;
    }
    if (!/^0\d{8,9}$/.test(phone.trim())) {
      setLocalError('נא להזין מספר טלפון תקין (לדוגמה 0501234567)');
      return;
    }
    setLocalError('');
    onSubmit({ customerName: name.trim(), customerPhone: phone.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm text-cream/70" htmlFor="customerName">
          שם מלא
        </label>
        <input
          id="customerName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-gold/20 bg-charcoal px-4 py-2 text-cream focus:border-gold focus:outline-none"
          placeholder="ישראל ישראלי"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-cream/70" htmlFor="customerPhone">
          מספר טלפון (לוואטסאפ)
        </label>
        <input
          id="customerPhone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-gold/20 bg-charcoal px-4 py-2 text-cream focus:border-gold focus:outline-none"
          placeholder="0501234567"
          dir="ltr"
        />
      </div>
      {(localError || error) && (
        <p className="text-sm text-red-400">{localError || error}</p>
      )}
      <button
        type="submit"
        disabled={disabled || submitting}
        className="w-full rounded-full bg-gradient-to-l from-gold to-orange-400 py-3 font-extrabold text-charcoal transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
      >
        {submitting ? 'קובע תור...' : 'קביעת תור'}
      </button>
    </form>
  );
}
