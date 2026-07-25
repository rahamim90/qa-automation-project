const { createEvent } = require('ics');

function buildAppointmentIcs({ barberName, serviceName, servicePrice, date, time, durationMinutes, appointmentId }) {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);

  const { error, value } = createEvent({
    start: [year, month, day, hour, minute],
    duration: { minutes: durationMinutes },
    title: `תור אצל ${barberName} במספרה`,
    description: `${serviceName} (₪${servicePrice}). נא להגיע 5 דקות מראש.`,
    location: 'מספרת הסטייל, רחוב הדוגמה 1, תל אביב',
    status: 'CONFIRMED',
    uid: `appointment-${appointmentId}@barbershop.local`,
    productId: 'barbershop-app',
  });

  if (error) {
    throw error;
  }

  return value;
}

module.exports = { buildAppointmentIcs };
