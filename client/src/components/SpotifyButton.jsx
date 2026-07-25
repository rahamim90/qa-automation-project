// TODO: swap PLAYLIST_URL for the barbershop's real Spotify playlist link once available.
const PLAYLIST_URL = 'https://open.spotify.com/search/afrobeats%20hip-hop%20reggae%20barbershop';

export default function SpotifyButton({ className = '' }) {
  return (
    <a
      href={PLAYLIST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full bg-[#1DB954] px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-105 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.59 14.44a.62.62 0 0 1-.86.21c-2.36-1.44-5.33-1.77-8.83-.97a.62.62 0 1 1-.28-1.21c3.83-.88 7.12-.5 9.76 1.11.3.18.39.57.21.86zm1.22-2.72a.78.78 0 0 1-1.07.26c-2.7-1.66-6.82-2.14-10.02-1.17a.78.78 0 1 1-.45-1.49c3.65-1.11 8.19-.57 11.28 1.33.37.23.49.71.26 1.07zm.11-2.83c-3.24-1.92-8.6-2.1-11.7-1.16a.93.93 0 1 1-.54-1.78c3.56-1.08 9.47-.87 13.21 1.35a.93.93 0 0 1-.97 1.59z" />
      </svg>
      הפלייליסט שלנו
    </a>
  );
}
