import type { Product } from "@/types/product";

type TracklistTableProps = {
  tracklist: Product["tracklist"] | undefined;
};

export default function TracklistTable({ tracklist }: TracklistTableProps) {
  if (!tracklist?.length) return null;

  return (
    <section className="  font-[plus_jakarta_sans]">
      <h2 className="mb-3 text-lg font-semibold">Tracklist</h2>
      <div className="overflow-hidden border border-white/15">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="border-b border-white/15 text-xs uppercase tracking-wider text-white/55">
            <tr>
              <th scope="col" className="w-20 px-4 py-3 font-medium">
                Face
              </th>
              <th scope="col" className="px-4 py-3 font-medium">
                Tracks
              </th>
            </tr>
          </thead>
          <tbody>
            {tracklist.map((face) => (
              <tr key={face.side} className="border-b border-white/10 last:border-b-0">
                <th scope="row" className="px-4 py-3 align-top font-medium text-white/80">
                  {face.side}
                </th>
                <td className="px-4 py-3 text-white/75">
                  <ol className="space-y-1">
                    {face.tracks.map((track, trackIndex) => (
                      <li key={`${face.side}-${trackIndex}`}>
                        <span className="mr-2 text-white/40">{trackIndex + 1}.</span>
                        {track}
                      </li>
                    ))}
                  </ol>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
