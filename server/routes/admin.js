const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/connection');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  req.session.adminId = user.id;
  req.session.username = user.username;
  res.json({ username: user.username });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

router.get('/me', (req, res) => {
  if (req.session && req.session.adminId) {
    return res.json({ username: req.session.username });
  }
  res.status(401).json({ error: 'Not authenticated' });
});

router.get('/appointments', requireAdmin, (req, res) => {
  const { barberId, from, to } = req.query;

  let query = `
    SELECT a.*, b.name as barber_name, s.name as service_name, s.price as service_price
    FROM appointments a
    JOIN barbers b ON b.id = a.barber_id
    JOIN services s ON s.id = a.service_id
    WHERE 1 = 1
  `;
  const params = [];

  if (barberId) {
    query += ' AND a.barber_id = ?';
    params.push(barberId);
  }
  if (from) {
    query += ' AND a.date >= ?';
    params.push(from);
  }
  if (to) {
    query += ' AND a.date <= ?';
    params.push(to);
  }

  query += ' ORDER BY a.date ASC, a.time ASC';

  const rows = db.prepare(query).all(...params);
  const appointments = rows.map((a) => ({
    id: a.id,
    barberId: a.barber_id,
    barberName: a.barber_name,
    serviceName: a.service_name,
    servicePrice: a.service_price,
    customerName: a.customer_name,
    customerPhone: a.customer_phone,
    date: a.date,
    time: a.time,
    status: a.status,
    createdAt: a.created_at,
  }));

  res.json(appointments);
});

router.patch('/appointments/:id', requireAdmin, (req, res) => {
  const { status } = req.body || {};
  if (!['confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const result = db.prepare('UPDATE appointments SET status = ? WHERE id = ?').run(status, req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  res.json({ ok: true });
});

module.exports = router;
