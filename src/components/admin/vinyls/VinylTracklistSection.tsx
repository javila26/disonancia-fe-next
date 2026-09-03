"use client";

import { Label } from "@/components/ui/label";
import type { UpdateVinylFormField, VinylFormState } from "@/legacy-pages/admin/vinyls/edit-form";
import { Trash2 } from "lucide-react";

const inputClasses =
  "mt-2 h-11 w-full rounded-xl border border-white/15 bg-[#111111] px-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/40 focus:bg-[#141414]";

type VinylTracklistSectionProps = {
  tracklist: VinylFormState["tracklist"];
  updateField: UpdateVinylFormField;
};

export function VinylTracklistSection({ tracklist, updateField }: VinylTracklistSectionProps) {
  const updateTrack = (sideIndex: number, trackIndex: number, value: string) => {
    const nextTracklist = tracklist.map((side, currentSideIndex) =>
      currentSideIndex === sideIndex
        ? {
            ...side,
            tracks: side.tracks.map((track, currentTrackIndex) =>
              currentTrackIndex === trackIndex ? value : track,
            ),
          }
        : side,
    );

    updateField("tracklist", nextTracklist);
  };

  const addTrack = (sideIndex: number) => {
    updateField(
      "tracklist",
      tracklist.map((side, currentSideIndex) =>
        currentSideIndex === sideIndex ? { ...side, tracks: [...side.tracks, ""] } : side,
      ),
    );
  };

  const removeTrack = (sideIndex: number, trackIndex: number) => {
    updateField(
      "tracklist",
      tracklist.map((side, currentSideIndex) =>
        currentSideIndex === sideIndex
          ? { ...side, tracks: side.tracks.filter((_, currentTrackIndex) => currentTrackIndex !== trackIndex) }
          : side,
      ),
    );
  };

  return (
    <section className="border-b border-white/10 pb-8">
      <div className="mb-5">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">Music</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Tracklist</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {tracklist.map((side, sideIndex) => (
          <div key={side.side} className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4">
            <h3 className="text-lg font-medium text-white">Side {side.side}</h3>
            <div className="mt-3 space-y-3">
              {side.tracks.map((track, trackIndex) => {
                const inputId = `track-${side.side}-${trackIndex}`;

                return (
                  <div key={inputId}>
                    <Label htmlFor={inputId} className="text-sm font-medium text-zinc-300">
                      Track {trackIndex + 1}
                    </Label>
                    <div className="flex items-center gap-2">
                      <input
                        id={inputId}
                        value={track}
                        onChange={(event) => updateTrack(sideIndex, trackIndex, event.target.value)}
                        className={inputClasses}
                        placeholder="Track name"
                      />
                      <button
                        type="button"
                        onClick={() => removeTrack(sideIndex, trackIndex)}
                        className="mt-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/35 transition hover:bg-white/10 hover:text-white/75"
                        aria-label={`Remove track ${trackIndex + 1} from side ${side.side}`}
                        title="Remove track"
                      >
                        <Trash2 size={14} strokeWidth={1.75} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => addTrack(sideIndex)}
              className="mt-4 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              Add track
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
