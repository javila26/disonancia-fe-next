"use client";

import { useState } from "react";

type SpotifyAlbumEmbedProps = {
  albumId?: string;
  albumName: string;
};

export function SpotifyAlbumEmbed({ albumId, albumName }: SpotifyAlbumEmbedProps) {
  if (!albumId) {
    return <p className="rounded-xl border border-white/10 p-4 text-sm text-white/60">Spotify player unavailable.</p>;
  }

  return <SpotifyEmbedFrame key={albumId} albumId={albumId} albumName={albumName} />;
}

function SpotifyEmbedFrame({ albumId, albumName }: Required<SpotifyAlbumEmbedProps>) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-128.75" aria-busy={isLoading}>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-white/10 bg-[#111111] text-sm text-white/60">
          Loading player...
        </div>
      ) : null}
      <iframe
        title={`Listen to ${albumName}`}
        data-testid="embed-iframe"
        src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator&si=46979d817e6d4dff`}
        width="100%"
        height="515"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        className={`max-w-full rounded-xl transition-opacity ${isLoading ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
}
