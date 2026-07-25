const db = require('../db/connection');

const SLOT_MINUTES = 30;
const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const MIN_LEAD_MINUTES = 15;

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

function toHHMM(minutes) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0');
  const m = (minutes % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}

function isValidDateString(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

function getAvailableSlots({ barber, date, durationMinutes, now = new Date() }) {
  if (!isValidDateString(date)) {
    throw new Error('Invalid date format, expected YYYY-MM-DD');
  }

  const requestedDate = new Date(`${date}T00:00:00`);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  if (requestedDate < today) {
    return [];
  }

  const workingHours = JSON.parse(barber.working_hours_json);
  const dayKey = DAY_KEYS[requestedDate.getDay()];
  const hoursForDay = workingHours[dayKey];
  if (!hoursForDay) {
    return [];
  }

  const [openStr, closeStr] = hoursForDay;
  const openMin = toMinutes(openStr);
  const closeMin = toMinutes(closeStr);

  const existing = db
    .prepare(
      `SELECT a.time as time, s.duration_minutes as duration_minutes
       FROM appointments a
       JOIN services s ON s.id = a.service_id
       WHERE a.barber_id = ? AND a.date = ? AND a.status = 'confirmed'`
    )
    .all(barber.id, date);

  const blocked = new Set();
  for (const appt of existing) {
    const start = toMinutes(appt.time);
    const slots = Math.ceil(appt.duration_minutes / SLOT_MINUTES);
    for (let i = 0; i < slots; i++) {
      blocked.add(start + i * SLOT_MINUTES);
    }
  }

  const isToday = requestedDate.getTime() === today.getTime();
  const nowMinutes = now.getHours() * 60 + now.getMinutes() + MIN_LEAD_MINUTES;

  const slotsNeeded = Math.ceil(durationMinutes / SLOT_MINUTES);
  const available = [];

  for (let start = openMin; start + durationMinutes <= closeMin; start += SLOT_MINUTES) {
    if (isToday && start < nowMinutes) {
      continue;
    }
    let fits = true;
    for (let i = 0; i < slotsNeeded; i++) {
      if (blocked.has(start + i * SLOT_MINUTES)) {
        fits = false;
        break;
      }
    }
    if (fits) {
      available.push(toHHMM(start));
    }
  }

  return available;
}

function isSlotAvailable({ barber, date, time, durationMinutes, now = new Date() }) {
  const slots = getAvailableSlots({ barber, date, durationMinutes, now });
  return slots.includes(time);
}

module.exports = { getAvailableSlots, isSlotAvailable, SLOT_MINUTES };
