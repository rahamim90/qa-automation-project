# מספרת הסטייל — הפעלת הפרויקט

אתר עסקי למספרה עם 3 ספרים, קביעת תורים, תזכורות ודף מוצרים.

## מבנה

- `server/` — Express API + מסד נתונים SQLite (`better-sqlite3`)
- `client/` — React + Vite + Tailwind CSS

## הפעלה (שני טרמינלים)

### 1. שרת (Backend)

```bash
cd server
npm install
cp .env.example .env
# ערכו את .env: הגדירו ADMIN_PASSWORD ו-SESSION_SECRET
npm run seed   # יוצר את מסד הנתונים וזורע נתוני דוגמה (3 ספרים, שירותים, מוצרים, יוזר אדמין)
npm run dev    # מריץ את השרת על http://localhost:4000
```

פרטי התחברות לניהול (לאחר seed): שם משתמש `admin`, סיסמה — הערך שהוגדר ב-`ADMIN_PASSWORD`.

### 2. לקוח (Frontend)

```bash
cd client
npm install
npm run dev    # מריץ על http://localhost:5173, עם proxy אוטומטי ל-API
```

גשו ל-http://localhost:5173

## הערות חשובות

- **תמונות**: כל התמונות (ספרים, גלריה, מוצרים) הן placeholder מ-Picsum. יש להחליף בתמונות אמיתיות של המספרה לפני עלייה לאוויר.
- **תזכורת WhatsApp**: מיושמת כקישור `wa.me` שפותח את הוואטסאפ של הלקוח עם הודעת תזכורת מוכנה מראש — אין חיוב בתשלום ואין צורך בחשבון עסקי. שליחה אוטומטית אמיתית (WhatsApp Business API / Twilio / Green API) ניתנת להוספה בעתיד דרך `server/services/notifications/` מבלי לשנות את שאר הקוד.
- **הוספה ליומן**: קובץ `.ics` להורדה, נתמך על ידי Google Calendar, Outlook, Apple Calendar ועוד.
- **מסד הנתונים**: קובץ יחיד ב-`server/db/data/barbershop.db` (לא ב-git). הרצת `npm run seed` מאפסת ומאכלסת אותו מחדש.
