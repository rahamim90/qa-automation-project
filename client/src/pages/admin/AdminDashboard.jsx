import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import AppointmentsTable from '../../components/admin/AppointmentsTable';

export default function AdminDashboard({ username, onLoggedOut }) {
  const [barbers, setBarbers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeBarberId, setActiveBarberId] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBarbers().then(setBarbers);
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = activeBarberId === 'all' ? {} : { barberId: activeBarberId };
    api
      .adminGetAppointments(params)
      .then(setAppointments)
      .finally(() => setLoading(false));
  }, [activeBarberId]);

  async function handleLogout() {
    await api.adminLogout();
    onLoggedOut();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gold">לוח ניהול תורים</h1>
          <p className="text-sm text-cream/60">מחובר כ-{username}</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full border border-gold/40 px-4 py-2 text-sm text-gold hover:bg-gold hover:text-charcoal transition-colors"
        >
          התנתקות
        </button>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveBarberId('all')}
          className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
            activeBarberId === 'all' ? 'bg-gold text-charcoal' : 'border border-gold/20 text-cream/80'
          }`}
        >
          כל הספרים
        </button>
        {barbers.map((b) => (
          <button
            key={b.id}
            onClick={() => setActiveBarberId(b.id)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              activeBarberId === b.id ? 'bg-gold text-charcoal' : 'border border-gold/20 text-cream/80'
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-cream/60">טוען...</p>
      ) : (
        <AppointmentsTable appointments={appointments} />
      )}
    </div>
  );
}
