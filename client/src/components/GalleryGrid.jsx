export default function GalleryGrid({ images }) {
  if (!images?.length) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((img) => (
        <figure key={img.id} className="overflow-hidden rounded-xl border border-gold/15">
          <img
            src={img.imageUrl}
            alt={img.caption || 'תספורת לדוגמה'}
            className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
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
