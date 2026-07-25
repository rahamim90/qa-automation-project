function isRecent(createdAt) {
  const created = new Date(createdAt.replace(' ', 'T') + 'Z');
  return Date.now() - created.getTime() < 24 * 60 * 60 * 1000;
}

export default function AppointmentsTable({ appointments }) {
  if (!appointments?.length) {
    return <p className="text-cream/60">אין תורים להצגה.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gold/15">
      <table className="w-full text-right text-sm">
        <thead className="bg-charcoal-lighter text-cream/70">
          <tr>
            <th className="px-4 py-3">תאריך</th>
            <th className="px-4 py-3">שעה</th>
            <th className="px-4 py-3">ספר</th>
            <th className="px-4 py-3">שירות</th>
            <th className="px-4 py-3">לקוח</th>
            <th className="px-4 py-3">טלפון</th>
            <th className="px-4 py-3">סטטוס</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr
              key={a.id}
              className={`border-t border-gold/10 ${isRecent(a.createdAt) ? 'bg-gold/10' : ''}`}
            >
              <td className="px-4 py-3">{a.date}</td>
              <td className="px-4 py-3">{a.time}</td>
              <td className="px-4 py-3">{a.barberName}</td>
              <td className="px-4 py-3">
                {a.serviceName} <span className="text-cream/50">(₪{a.servicePrice})</span>
              </td>
              <td className="px-4 py-3">{a.customerName}</td>
              <td className="px-4 py-3" dir="ltr">
                {a.customerPhone}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    a.status === 'confirmed'
                      ? 'bg-green-500/15 text-green-400'
                      : 'bg-red-500/15 text-red-400'
                  }`}
                >
                  {a.status === 'confirmed' ? 'מאושר' : 'בוטל'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
