require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const session = require('express-session');

const db = require('./db/connection');
const { seed } = require('./db/seed');
const barbersRouter = require('./routes/barbers');
const appointmentsRouter = require('./routes/appointments');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');

// On a fresh/ephemeral disk (e.g. a free-tier host that resets on restart),
// auto-seed demo data so the site is never empty after a redeploy.
const { count } = db.prepare('SELECT COUNT(*) as count FROM barbers').get();
if (count === 0) {
  seed();
}

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

app.set('trust proxy', 1);

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: IS_PRODUCTION,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);

app.use('/api/barbers', barbersRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/products', productsRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Serve the built frontend (client/dist) when present, so a single service
// can host both the API and the SPA in production. In local dev this
// directory doesn't exist, so this is a no-op and the Vite dev server is used instead.
const clientDistPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Barbershop API listening on http://localhost:${PORT}`);
});
