// Placeholder hero background: animated gradient blobs standing in for a future
// looped video of the crew/shop. Pass `videoSrc` (e.g. "/videos/crew-loop.mp4",
// dropped into client/public/videos/) once real footage is available and this
// swaps in automatically.
export default function HeroMedia({ videoSrc }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {videoSrc ? (
        <video
          className="h-full w-full object-cover opacity-50"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="absolute inset-0">
          <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-gold/25 blur-3xl animate-blob" />
          <div className="absolute top-1/3 -left-10 h-80 w-80 rounded-full bg-orange-600/20 blur-3xl animate-blob animate-blob-delay-1" />
          <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-gold-deep/25 blur-3xl animate-blob animate-blob-delay-2" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/85 to-charcoal/50" />
    </div>
  );
}
