const express = require('express');
const db = require('../db/connection');
const { isSlotAvailable } = require('../services/availability');
const { buildAppointmentIcs } = require('../services/ics');
const { notifyCustomer } = require('../services/notifications');

const router = express.Router();

const PHONE_REGEX = /^0\d{8,9}$/;

router.post('/', (req, res) => {
  const { barberSlug, serviceId, date, time, customerName, customerPhone } = req.body || {};

  if (!barberSlug || !serviceId || !date || !time || !customerName || !customerPhone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const cleanPhone = String(customerPhone).replace(/[\s-]/g, '');
  if (!PHONE_REGEX.test(cleanPhone)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }

  const barber = db.prepare('SELECT * FROM barbers WHERE slug = ?').get(barberSlug);
  if (!barber) {
    return res.status(404).json({ error: 'Barber not found' });
  }

  const service = db
    .prepare('SELECT * FROM services WHERE id = ? AND (barber_id = ? OR barber_id IS NULL)')
    .get(serviceId, barber.id);
  if (!service) {
    return res.status(404).json({ error: 'Service not found for this barber' });
  }

  const createAppointment = db.transaction(() => {
    if (!isSlotAvailable({ barber, date: String(date), time: String(time), durationMinutes: service.duration_minutes })) {
      const err = new Error('Slot no longer available');
      err.status = 409;
      throw err;
    }

    const info = db
      .prepare(
        `INSERT INTO appointments (barber_id, service_id, customer_name, customer_phone, date, time, status)
         VALUES (?, ?, ?, ?, ?, ?, 'confirmed')`
      )
      .run(barber.id, service.id, String(customerName).trim(), cleanPhone, String(date), String(time));

    return info.lastInsertRowid;
  });

  let appointmentId;
  try {
    appointmentId = createAppointment();
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  const notification = notifyCustomer({
    barberName: barber.name,
    serviceName: service.name,
    date: String(date),
    time: String(time),
    customerName: String(customerName).trim(),
    customerPhone: cleanPhone,
  });

  db.prepare('UPDATE appointments SET notified_at = CURRENT_TIMESTAMP WHERE id = ?').run(appointmentId);

  res.status(201).json({
    id: appointmentId,
    barberName: barber.name,
    serviceName: service.name,
    servicePrice: service.price,
    durationMinutes: service.duration_minutes,
    date: String(date),
    time: String(time),
    customerName: String(customerName).trim(),
    whatsappUrl: notification.whatsappUrl,
  });
});

router.get('/:id/ics', (req, res) => {
  const appointment = db
    .prepare(
      `SELECT a.*, b.name as barber_name, s.name as service_name, s.price as service_price, s.duration_minutes as duration_minutes
       FROM appointments a
       JOIN barbers b ON b.id = a.barber_id
       JOIN services s ON s.id = a.service_id
       WHERE a.id = ?`
    )
    .get(req.params.id);

  if (!appointment) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  try {
    const icsContent = buildAppointmentIcs({
      barberName: appointment.barber_name,
      serviceName: appointment.service_name,
      servicePrice: appointment.service_price,
      date: appointment.date,
      time: appointment.time,
      durationMinutes: appointment.duration_minutes,
      appointmentId: appointment.id,
    });

    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="appointment.ics"');
    res.send(icsContent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate calendar file' });
  }
});

module.exports = router;
