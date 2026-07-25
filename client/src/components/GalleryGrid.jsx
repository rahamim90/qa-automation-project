export default function GalleryGrid({ images }) {
  if (!images?.length) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((img) => (
        <figure className="group overflow-hidden rounded-2xl border border-gold/15 transition-colors hover:border-gold/40" key={img.id}>
          <img
            src={img.imageUrl}
            alt={img.caption || 'תספורת לדוגמה'}
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {img.caption && (
            <figcaption className="bg-charcoal-light px-2 py-1 text-center text-xs text-cream/70">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
