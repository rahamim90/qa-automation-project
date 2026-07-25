const express = require('express');
const db = require('../db/connection');
const { getAvailableSlots } = require('../services/availability');

const router = express.Router();

function getBarberBySlug(slug) {
  return db.prepare('SELECT * FROM barbers WHERE slug = ?').get(slug);
}

function serializeBarber(barber) {
  return {
    id: barber.id,
    name: barber.name,
    slug: barber.slug,
    bio: barber.bio,
    specialty: barber.specialty,
    photoUrl: barber.photo_url,
    workingHours: JSON.parse(barber.working_hours_json),
  };
}

router.get('/', (req, res) => {
  const barbers = db
    .prepare('SELECT * FROM barbers ORDER BY display_order ASC')
    .all()
    .map(serializeBarber);
  res.json(barbers);
});

router.get('/:slug', (req, res) => {
  const barber = getBarberBySlug(req.params.slug);
  if (!barber) {
    return res.status(404).json({ error: 'Barber not found' });
  }
  res.json(serializeBarber(barber));
});

router.get('/:slug/gallery', (req, res) => {
  const barber = getBarberBySlug(req.params.slug);
  if (!barber) {
    return res.status(404).json({ error: 'Barber not found' });
  }
  const images = db
    .prepare('SELECT * FROM gallery_images WHERE barber_id = ? ORDER BY display_order ASC')
    .all(barber.id)
    .map((img) => ({ id: img.id, imageUrl: img.image_url, caption: img.caption }));
  res.json(images);
});

router.get('/:slug/services', (req, res) => {
  const barber = getBarberBySlug(req.params.slug);
  if (!barber) {
    return res.status(404).json({ error: 'Barber not found' });
  }
  const services = db
    .prepare('SELECT * FROM services WHERE barber_id = ? OR barber_id IS NULL ORDER BY id ASC')
    .all(barber.id)
    .map((s) => ({
      id: s.id,
      name: s.name,
      durationMinutes: s.duration_minutes,
      price: s.price,
    }));
  res.json(services);
});

router.get('/:slug/availability', (req, res) => {
  const barber = getBarberBySlug(req.params.slug);
  if (!barber) {
    return res.status(404).json({ error: 'Barber not found' });
  }

  const { date, serviceId } = req.query;
  if (!date || !serviceId) {
    return res.status(400).json({ error: 'date and serviceId query params are required' });
  }

  const service = db
    .prepare('SELECT * FROM services WHERE id = ? AND (barber_id = ? OR barber_id IS NULL)')
    .get(serviceId, barber.id);
  if (!service) {
    return res.status(404).json({ error: 'Service not found for this barber' });
  }

  try {
    const slots = getAvailableSlots({
      barber,
      date: String(date),
      durationMinutes: service.duration_minutes,
    });
    res.json({ date, slots });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
