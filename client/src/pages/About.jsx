import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-center text-3xl text-gold">אודות מספרת הסטייל</h1>

      <div className="mt-8 space-y-4 leading-relaxed text-cream/80">
        <p>
          מספרת הסטייל נוסדה מתוך אהבה למקצוע ולתשומת לב לפרטים הקטנים. אנחנו מאמינים שתספורת
          טובה היא הרבה יותר מגזירת שיער — היא חוויה, ביטחון עצמי ומראה שמדבר בעד עצמו. הצוות שלנו
          משלב טכניקות קלאסיות עם הטרנדים העדכניים ביותר, כדי שכל לקוח יצא מרוצה ומחודש.
        </p>
        <p>
          המספרה פועלת כבר למעלה מעשור בלב העיר, ולאורך השנים הפכה לבית עבור מאות לקוחות קבועים.
          אצלנו תמצאו אווירה חמה ומקצועית, ציוד איכותי, ומוצרי טיפוח מהמותגים המובילים למכירה
          במקום.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-gold/15 bg-charcoal-light p-6 sm:grid-cols-2">
        <div>
          <h2 className="text-sm text-gold">כתובת</h2>
          <p className="mt-1 text-cream/80">רחוב הדוגמה 1, תל אביב</p>
        </div>
        <div>
          <h2 className="text-sm text-gold">טלפון</h2>
          <p className="mt-1 text-cream/80" dir="ltr">
            03-1234567
          </p>
        </div>
        <div>
          <h2 className="text-sm text-gold">שעות פעילות</h2>
          <p className="mt-1 text-cream/80">ראשון–חמישי 09:00–19:00</p>
          <p className="text-cream/80">שישי 09:00–14:00</p>
          <p className="text-cream/80">שבת סגור</p>
        </div>
        <div>
          <h2 className="text-sm text-gold">דוא״ל</h2>
          <p className="mt-1 text-cream/80" dir="ltr">
            info@style-barbershop.co.il
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="inline-block rounded-full border border-gold/40 px-6 py-2.5 text-gold hover:bg-gold hover:text-charcoal transition-colors"
        >
          הכירו את הספרים שלנו
        </Link>
      </div>
    </div>
  );
}
