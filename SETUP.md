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

## פרסום לאינטרנט (Render)

הריפו כולל `render.yaml` בשורש, שמגדיר שירות web יחיד שבונה את הלקוח (`client/dist`) ומגיש אותו יחד עם ה-API מאותו שרת Express — כך שאין צורך בשני שירותים נפרדים או בהגדרות CORS.

**שלבים (אפשר לבצע גם מהנייד):**
1. גשו ל-https://render.com/deploy?repo=https://github.com/rahamim90/qa-automation-project
2. התחברו עם חשבון GitHub (או צרו חשבון חדש - חינמי)
3. ודאו שהברנץ' הנבחר הוא `claude/barber-shop-website-qoxkz9` (אפשר לבחור זאת במסך ההגדרות של ה-Blueprint לפני האישור)
4. בשדה `ADMIN_PASSWORD` הזינו סיסמה משלכם לניהול התורים (שם המשתמש יהיה `admin`)
5. לחצו על "Apply" / "Deploy Blueprint" וחכו לסיום הבנייה (כ-2-3 דקות)
6. בסיום תקבלו קישור קבוע כמו `https://barbershop-website.onrender.com` — זה הכתובת של האתר החי

**מגבלות של התוכנית החינמית ב-Render (שווה לדעת):**
- השירות "נרדם" אחרי כ-15 דקות בלי תנועה, ולוקח כ-30 שניות "להתעורר" בבקשה הראשונה אחרי זה
- מסד הנתונים (SQLite) יושב על דיסק זמני — בכל הפעלה מחדש של השירות (redeploy, restart, "התעוררות") הוא מתאפס לנתוני הדמו המקוריים. מצוין להדגמה, לא מתאים לשימוש עסקי אמיתי בלי שדרוג לדיסק קבוע (Persistent Disk) בתוכנית בתשלום

## הערות חשובות

- **תמונות**: כל התמונות (ספרים, גלריה, מוצרים) הן placeholder מ-Picsum. יש להחליף בתמונות אמיתיות של המספרה לפני עלייה לאוויר.
- **תזכורת WhatsApp**: מיושמת כקישור `wa.me` שפותח את הוואטסאפ של הלקוח עם הודעת תזכורת מוכנה מראש — אין חיוב בתשלום ואין צורך בחשבון עסקי. שליחה אוטומטית אמיתית (WhatsApp Business API / Twilio / Green API) ניתנת להוספה בעתיד דרך `server/services/notifications/` מבלי לשנות את שאר הקוד.
- **הוספה ליומן**: קובץ `.ics` להורדה, נתמך על ידי Google Calendar, Outlook, Apple Calendar ועוד.
- **מסד הנתונים**: קובץ יחיד ב-`server/db/data/barbershop.db` (לא ב-git). הרצת `npm run seed` מאפסת ומאכלסת אותו מחדש.
