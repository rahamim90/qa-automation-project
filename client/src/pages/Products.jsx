import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <h1 className="mb-2 text-center text-3xl text-gold sm:text-4xl">מוצרים למכירה במספרה</h1>
        <p className="mb-10 text-center text-cream/70">
          מוצרי טיפוח מקצועיים שניתן לרכוש במעמד הביקור במספרה
        </p>
      </Reveal>

      {loading ? (
        <p className="text-center text-cream/60">טוען...</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={(i % 3) * 100}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          to="/about"
          className="inline-block rounded-full bg-gradient-to-l from-gold to-orange-400 px-6 py-2.5 font-bold text-charcoal transition-transform hover:scale-105"
        >
          אודות המספרה
        </Link>
      </div>
    </div>
  );
}
