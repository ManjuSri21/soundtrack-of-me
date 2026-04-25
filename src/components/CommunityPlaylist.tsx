import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { addSubmission, loadSubmissions, type CommunitySubmission } from "../lib/storage";
import { MOODS } from "../data/moods";

function prettyTime(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString();
}

export function CommunityPlaylist() {
  const [items, setItems] = useState<CommunitySubmission[]>(() => loadSubmissions());
  const moodOptions = useMemo(
    () => MOODS.map((m) => `${m.title} ${m.emoji}`),
    []
  );

  const [name, setName] = useState("");
  const [mood, setMood] = useState(moodOptions[0] ?? "Happy 😊");
  const [link, setLink] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <section id="community" className="relative w-full px-5 py-20">
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="text-sm text-white/60">User contribution</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Community Playlist Wall
          </h2>
          <p className="mt-3 max-w-2xl text-white/65">
            Drop a song that matches a mood. Submissions are stored locally in your
            browser (localStorage).
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <GlassCard className="p-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setError(null);

                const n = name.trim();
                const l = link.trim();
                if (!n) return setError("Name is required.");
                if (!l) return setError("Song link is required.");
                if (!/^https?:\/\//i.test(l)) return setError("Please paste a full URL (https://...).");

                const updated = addSubmission({ name: n, mood, link: l });
                setItems(updated);
                setName("");
                setLink("");
              }}
              className="grid gap-4"
            >
              <div>
                <label className="text-xs text-white/60">Your name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 placeholder:text-white/35"
                  placeholder="e.g., Alex"
                />
              </div>
              <div>
                <label className="text-xs text-white/60">Mood</label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85"
                >
                  {moodOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-white/60">Song link</label>
                <input
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 placeholder:text-white/35"
                  placeholder="YouTube / Spotify link"
                />
              </div>

              {error ? (
                <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-4 py-2 text-sm font-medium text-white shadow-glow hover:brightness-110"
              >
                Add to wall
              </button>
              <div className="text-xs text-white/45">
                Stored locally on this device only.
              </div>
            </form>
          </GlassCard>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.length === 0 ? (
              <GlassCard className="p-6 sm:col-span-2">
                <div className="text-sm text-white/70">
                  No submissions yet. Be the first to leave a track.
                </div>
              </GlassCard>
            ) : (
              items.map((it) => (
                <motion.a
                  key={it.id}
                  href={it.link}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, rotate: -0.2 }}
                  whileTap={{ scale: 0.98 }}
                  className="block"
                >
                  <div
                    className={[
                      "rounded-2xl border border-white/10 bg-gradient-to-br",
                      "from-white/10 to-white/5 backdrop-blur-xl",
                      "p-5 shadow-[0_16px_90px_rgba(0,0,0,0.32)]",
                      "hover:shadow-glow transition-shadow"
                    ].join(" ")}
                  >
                    <div className="text-xs text-white/55">{it.mood}</div>
                    <div className="mt-2 text-lg font-semibold text-white/90">
                      {it.name}
                    </div>
                    <div className="mt-1 text-sm text-white/60 break-all">
                      {it.link}
                    </div>
                    <div className="mt-3 text-xs text-white/40">{prettyTime(it.createdAt)}</div>
                  </div>
                </motion.a>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

