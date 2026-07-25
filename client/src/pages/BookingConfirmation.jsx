import { Link, useLocation, useParams } from 'react-router-dom';
import { icsDownloadUrl } from '../api/client';

export default function BookingConfirmation() {
  const { id } = useParams();
  const location = useLocation();
  const appointment = location.state?.appointment;

  if (!appointment) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-2xl text-gold">התור נקבע בהצלחה!</h1>
        <p className="mt-4 text-cream/70">
          פרטי האישור המלאים אינם זמינים בעמוד זה (לדוגמה לאחר רענון). ניתן להוריד את קובץ היומן
          עבור התור.
        </p>
        <a
          href={icsDownloadUrl(id)}
          className="mt-6 inline-block rounded-full border border-gold/40 px-6 py-2.5 text-gold hover:bg-gold hover:text-charcoal transition-colors"
        >
          הוסף ליומן
        </a>
        <div className="mt-8">
          <Link to="/" className="text-cream/60 underline">
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <div className="rounded-3xl border border-gold/20 bg-charcoal-light p-8 text-center shadow-[0_0_50px_-16px_rgba(242,177,52,0.4)]">
        <h1 className="text-3xl text-gold">התור נקבע בהצלחה!</h1>
        <p className="mt-2 text-cream/70">מחכים לראותך, {appointment.customerName}</p>

        <dl className="mt-6 space-y-2 text-right">
          <div className="flex justify-between border-b border-gold/10 py-2">
            <dt className="text-cream/60">ספר</dt>
            <dd className="text-cream">{appointment.barberName}</dd>
          </div>
          <div className="flex justify-between border-b border-gold/10 py-2">
            <dt className="text-cream/60">שירות</dt>
            <dd className="text-cream">
              {appointment.serviceName} (₪{appointment.servicePrice})
            </dd>
          </div>
          <div className="flex justify-between border-b border-gold/10 py-2">
            <dt className="text-cream/60">תאריך</dt>
            <dd className="text-cream">{appointment.date}</dd>
          </div>
          <div className="flex justify-between py-2">
            <dt className="text-cream/60">שעה</dt>
            <dd className="text-cream">{appointment.time}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href={appointment.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#25D366] py-3 font-medium text-charcoal transition-opacity hover:opacity-90"
          >
            תזכורת בוואטסאפ
          </a>
          <a
            href={icsDownloadUrl(appointment.id)}
            className="rounded-full border border-gold/40 py-3 font-medium text-gold hover:bg-gold hover:text-charcoal transition-colors"
          >
            הוסף ליומן
          </a>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-cream/60 underline">
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}
