export default function ProductCard({ product }) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-gold/15 bg-charcoal-light transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_0_30px_-10px_rgba(242,177,52,0.5)]">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {!product.inStock && (
          <span className="absolute right-2 top-2 rounded-full bg-charcoal/90 px-3 py-1 text-xs text-cream/80">
            אזל המלאי
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg text-gold">{product.name}</h3>
        <p className="mt-1 text-sm text-cream/70">{product.description}</p>
        <p className="mt-3 text-xl font-medium text-cream">₪{product.price}</p>
      </div>
    </div>
  );
}
