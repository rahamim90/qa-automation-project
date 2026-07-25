import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api/client';
import GalleryGrid from '../components/GalleryGrid';
import ServiceList from '../components/ServiceList';
import DatePicker from '../components/DatePicker';
import TimeSlotGrid from '../components/TimeSlotGrid';
import BookingForm from '../components/BookingForm';

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

export default function BarberDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [barber, setBarber] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [services, setServices] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(todayString());
  const [selectedTime, setSelectedTime] = useState(null);
  const [slots, setSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    setNotFound(false);
    Promise.all([api.getBarber(slug), api.getBarberGallery(slug), api.getBarberServices(slug)])
      .then(([barberData, galleryData, servicesData]) => {
        setBarber(barberData);
        setGallery(galleryData);
        setServices(servicesData);
        if (servicesData.length) setSelectedServiceId(servicesData[0].id);
      })
      .catch(() => setNotFound(true));
  }, [slug]);

  useEffect(() => {
    if (!selectedServiceId || !selectedDate) return;
    setSlotsLoading(true);
    setSelectedTime(null);
    api
      .getAvailability(slug, selectedDate, selectedServiceId)
      .then((data) => setSlots(data.slots))
      .finally(() => setSlotsLoading(false));
  }, [slug, selectedDate, selectedServiceId]);

  async function handleBooking({ customerName, customerPhone }) {
    setSubmitting(true);
    setSubmitError('');
    try {
      const appointment = await api.createAppointment({
        barberSlug: slug,
        serviceId: selectedServiceId,
        date: selectedDate,
        time: selectedTime,
        customerName,
        customerPhone,
      });
      navigate(`/booking-confirmation/${appointment.id}`, { state: { appointment } });
    } catch (err) {
      setSubmitError(err.message || 'אירעה שגיאה, נסו שוב');
      if (err.status === 409) {
        setSlotsLoading(true);
        api
          .getAvailability(slug, selectedDate, selectedServiceId)
          .then((data) => setSlots(data.slots))
          .finally(() => setSlotsLoading(false));
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (notFound) {
    return <p className="mx-auto max-w-4xl px-6 py-16 text-center text-cream/70">הספר לא נמצא.</p>;
  }

  if (!barber) {
    return <p className="mx-auto max-w-4xl px-6 py-16 text-center text-cream/70">טוען...</p>;
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <img
          src={barber.photoUrl}
          alt={barber.name}
          className="h-40 w-40 flex-shrink-0 rounded-3xl object-cover shadow-[0_0_30px_-8px_rgba(242,177,52,0.4)]"
        />
        <div>
          <h1 className="text-3xl text-gold sm:text-4xl">{barber.name}</h1>
          <p className="mt-1 font-medium text-cream/70">{barber.specialty}</p>
          <p className="mt-3 leading-relaxed text-cream/80">{barber.bio}</p>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl text-gold">גלריית עבודות</h2>
        <GalleryGrid images={gallery} />
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl text-gold">קביעת תור</h2>

        <div className="space-y-6 rounded-3xl border border-gold/15 bg-charcoal-light p-6">
          <div>
            <h3 className="mb-2 text-sm text-cream/70">1. בחרו שירות</h3>
            <ServiceList
              services={services}
              selectedServiceId={selectedServiceId}
              onSelect={setSelectedServiceId}
            />
          </div>

          <div>
            <h3 className="mb-2 text-sm text-cream/70">2. בחרו תאריך</h3>
            <DatePicker selectedDate={selectedDate} onSelect={setSelectedDate} />
          </div>

          <div>
            <h3 className="mb-2 text-sm text-cream/70">3. בחרו שעה</h3>
            <TimeSlotGrid
              slots={slots}
              selectedTime={selectedTime}
              onSelect={setSelectedTime}
              loading={slotsLoading}
            />
          </div>

          {selectedTime && (
            <div>
              <h3 className="mb-2 text-sm text-cream/70">4. פרטים לקביעת התור</h3>
              <BookingForm
                onSubmit={handleBooking}
                submitting={submitting}
                error={submitError}
                disabled={!selectedServiceId || !selectedDate || !selectedTime}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
