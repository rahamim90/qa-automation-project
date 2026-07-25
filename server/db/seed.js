require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./connection');

const HOURS_STANDARD = JSON.stringify({
  sun: ['09:00', '19:00'],
  mon: ['09:00', '19:00'],
  tue: ['09:00', '19:00'],
  wed: ['09:00', '19:00'],
  thu: ['09:00', '19:00'],
  fri: ['09:00', '14:00'],
  sat: null,
});

function img(seed, w = 600, h = 600) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

function clearAll() {
  db.exec(`
    DELETE FROM appointments;
    DELETE FROM gallery_images;
    DELETE FROM services;
    DELETE FROM barbers;
    DELETE FROM products;
    DELETE FROM admin_users;
  `);
}

function seed() {
  clearAll();

  const insertBarber = db.prepare(`
    INSERT INTO barbers (name, slug, bio, specialty, photo_url, working_hours_json, display_order)
    VALUES (@name, @slug, @bio, @specialty, @photo_url, @working_hours_json, @display_order)
  `);

  const barbers = [
    {
      name: 'יוסי כהן',
      slug: 'yossi-cohen',
      bio: 'יוסי הוא ספר עם למעלה מ-15 שנות ניסיון, מתמחה בתספורות קלאסיות ובעיצוב זקן מדויק. הגישה שלו משלבת טכניקה מסורתית עם תשומת לב לכל פרט, כדי שכל לקוח יצא עם הבעה מוקפדת ומחמיאה.',
      specialty: 'תספורות קלאסיות ועיצוב זקן',
      photo_url: img('yossi-barber', 500, 500),
      working_hours_json: HOURS_STANDARD,
      display_order: 1,
    },
    {
      name: 'דניאל לוי',
      slug: 'daniel-levi',
      bio: 'דניאל הוא ספר צעיר ואנרגטי המתמחה בפייד מודרני ובעיצובי שיער עדכניים. הוא עוקב אחרי הטרנדים העדכניים ביותר ומביא סטייל ייחודי לכל תספורת, עם דגש על דיוק בקווים.',
      specialty: 'פייד ועיצוב שיער מודרני',
      photo_url: img('daniel-barber', 500, 500),
      working_hours_json: HOURS_STANDARD,
      display_order: 2,
    },
    {
      name: 'אבי מזרחי',
      slug: 'avi-mizrahi',
      bio: 'אבי הוא הוותיק שבצוות, עם ניסיון עשיר בתספורות בתער ותספורות ילדים. הסבלנות והמקצועיות שלו הופכות כל ביקור לחוויה נעימה, גם עבור הלקוחות הצעירים ביותר.',
      specialty: 'תספורות בתער ותספורות ילדים',
      photo_url: img('avi-barber', 500, 500),
      working_hours_json: HOURS_STANDARD,
      display_order: 3,
    },
  ];

  const barberIds = {};
  for (const b of barbers) {
    const info = insertBarber.run(b);
    barberIds[b.slug] = info.lastInsertRowid;
  }

  const insertGallery = db.prepare(`
    INSERT INTO gallery_images (barber_id, image_url, caption, display_order)
    VALUES (@barber_id, @image_url, @caption, @display_order)
  `);

  const galleryCaptions = [
    'תספורת קלאסית',
    'עיצוב זקן',
    'פייד עדין',
    'סטייל יומיומי',
    'לוק לאירוע',
  ];

  for (const b of barbers) {
    galleryCaptions.forEach((caption, i) => {
      insertGallery.run({
        barber_id: barberIds[b.slug],
        image_url: img(`${b.slug}-work-${i}`, 500, 500),
        caption,
        display_order: i,
      });
    });
  }

  const insertService = db.prepare(`
    INSERT INTO services (barber_id, name, duration_minutes, price)
    VALUES (@barber_id, @name, @duration_minutes, @price)
  `);

  const sharedServices = [
    { name: 'תספורת גבר', duration_minutes: 30, price: 80 },
    { name: 'תספורת + זקן', duration_minutes: 45, price: 120 },
    { name: 'עיצוב זקן', duration_minutes: 20, price: 50 },
    { name: 'תספורת ילד', duration_minutes: 25, price: 60 },
  ];

  const serviceIdsByName = {};
  for (const s of sharedServices) {
    const info = insertService.run({ barber_id: null, ...s });
    serviceIdsByName[s.name] = info.lastInsertRowid;
  }

  const insertProduct = db.prepare(`
    INSERT INTO products (name, description, price, image_url, in_stock)
    VALUES (@name, @description, @price, @image_url, @in_stock)
  `);

  const products = [
    { name: 'פומייד עיצוב', description: 'פומייד בעל אחיזה חזקה וגימור מבריק לעיצוב תספורת מושלם לאורך כל היום.', price: 65, image_url: img('pomade', 500, 500), in_stock: 1 },
    { name: 'שמן זקן', description: 'שמן טיפוח המרכך ומזין את שיער הזקן, מעניק ריח נעים ומראה מטופח.', price: 55, image_url: img('beard-oil', 500, 500), in_stock: 1 },
    { name: 'שמפו לגבר', description: 'שמפו איכותי המנקה לעומק ומחזק את השיער וקרקפת הראש.', price: 45, image_url: img('shampoo', 500, 500), in_stock: 1 },
    { name: 'מברשת זקן', description: 'מברשת עץ טבעית לסידור וטיפוח הזקן היומיומי.', price: 35, image_url: img('beard-brush', 500, 500), in_stock: 1 },
    { name: 'מספריים מקצועיות', description: 'מספריים בעלות להב מדויק לגימור וטיפוח עצמי בין ביקורים.', price: 90, image_url: img('scissors', 500, 500), in_stock: 1 },
    { name: 'ג׳ל עיצוב', description: 'ג׳ל שיער בגימור מאט לעיצוב יומיומי קל ונוח.', price: 40, image_url: img('hair-gel', 500, 500), in_stock: 0 },
  ];

  for (const p of products) {
    insertProduct.run(p);
  }

  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'change-me-please';
  const passwordHash = bcrypt.hashSync(adminPassword, 10);
  db.prepare(`INSERT INTO admin_users (username, password_hash) VALUES (?, ?)`).run(
    adminUsername,
    passwordHash
  );

  const insertAppointment = db.prepare(`
    INSERT INTO appointments (barber_id, service_id, customer_name, customer_phone, date, time, status)
    VALUES (@barber_id, @service_id, @customer_name, @customer_phone, @date, @time, 'confirmed')
  `);

  function daysFromNow(n) {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  }

  const sampleAppointments = [
    { barber_id: barberIds['yossi-cohen'], service_id: serviceIdsByName['תספורת גבר'], customer_name: 'משה ישראלי', customer_phone: '0501234567', date: daysFromNow(1), time: '10:00' },
    { barber_id: barberIds['daniel-levi'], service_id: serviceIdsByName['תספורת + זקן'], customer_name: 'רון אברהם', customer_phone: '0527654321', date: daysFromNow(1), time: '12:30' },
    { barber_id: barberIds['avi-mizrahi'], service_id: serviceIdsByName['תספורת ילד'], customer_name: 'עידן שמעוני', customer_phone: '0541122334', date: daysFromNow(2), time: '16:00' },
    { barber_id: barberIds['yossi-cohen'], service_id: serviceIdsByName['עיצוב זקן'], customer_name: 'תום כספי', customer_phone: '0559988776', date: daysFromNow(3), time: '09:30' },
  ];

  for (const a of sampleAppointments) {
    insertAppointment.run(a);
  }

  console.log('Seed complete.');
  console.log(`Admin login -> username: "${adminUsername}", password: (from ADMIN_PASSWORD in .env)`);
}

seed();
