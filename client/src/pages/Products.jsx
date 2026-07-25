import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';

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
      <h1 className="mb-2 text-center text-3xl text-gold">מוצרים למכירה במספרה</h1>
      <p className="mb-10 text-center text-cream/70">
        מוצרי טיפוח מקצועיים שניתן לרכוש במעמד הביקור במספרה
      </p>

      {loading ? (
        <p className="text-center text-cream/60">טוען...</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          to="/about"
          className="inline-block rounded-full border border-gold/40 px-6 py-2.5 text-gold hover:bg-gold hover:text-charcoal transition-colors"
        >
          אודות המספרה
        </Link>
      </div>
    </div>
  );
}
