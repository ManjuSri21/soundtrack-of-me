import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";
import type { Mood } from "../data/moods";
import { useAudio } from "../audio/AudioManager";
import { GlassCard } from "./GlassCard";
import { Equalizer } from "./Equalizer";

export function MoodSection({
  mood,
  onEnterMood
}: {
  mood: Mood;
  onEnterMood: (moodKey: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-35% 0px -45% 0px", amount: 0.25 });
  const { activeId, playing, toggle, play, hasUserGesture } = useAudio();

  const track = useMemo(
    () => ({
      id: `mood:${mood.key}`,
      src: mood.song.src,
      title: mood.song.title,
      artist: mood.song.artist
    }),
    [mood]
  );

  const isActive = activeId === track.id;
  const isPlaying = isActive && playing;

  return (
    <section
      id={`mood-${mood.key}`}
      ref={ref}
      className="relative min-h-[100svh] w-full px-5 py-20"
    >
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 opacity-90 transition-opacity duration-700",
          inView ? "opacity-100" : "opacity-50"
        ].join(" ")}
      >
        <div
          className={[
            "absolute inset-0 bg-gradient-to-br",
            mood.theme.accentFrom,
            mood.theme.accentTo,
            "opacity-15"
          ].join(" ")}
        />
        <div className="absolute inset-0 bg-ink/70" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="text-sm text-white/60">Mood</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {mood.title} <span className="text-white/70">{mood.emoji}</span>
          </h2>
          <p className="mt-3 max-w-xl text-white/65">{mood.subtitle}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                onEnterMood(mood.key);
                toggle(track, { loop: true, fadeMs: 520 });
              }}
              className={[
                "inline-flex items-center gap-2 rounded-xl border border-white/12 px-4 py-2",
                "bg-white/6 text-sm text-white/85 backdrop-blur-md",
                "transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/10"
              ].join(" ")}
            >
              <span className="text-white/70">{isPlaying ? "❚❚" : "▶"}</span>
              <span>{isPlaying ? "Pause" : isActive ? "Resume" : "Play"}</span>
            </button>

            <button
              onClick={() => {
                onEnterMood(mood.key);
                if (!hasUserGesture) {
                  // ensures first interaction always primes audio
                  play(track, { loop: true, fadeMs: 520 });
                } else {
                  play(track, { loop: true, fadeMs: 520 });
                }
              }}
              className="text-sm text-white/55 hover:text-white/80 transition-colors"
            >
              Make this my current mood
            </button>

            <div className="ml-auto flex items-center gap-3">
              <Equalizer playing={isPlaying} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <GlassCard className={["p-6", mood.theme.glow].join(" ")}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50">
                  Featured song
                </div>
                <div className="mt-2 text-xl font-semibold text-white">
                  {mood.song.title}
                </div>
                <div className="mt-1 text-sm text-white/60">{mood.song.artist}</div>
              </div>
              <div
                className={[
                  "h-12 w-12 rounded-2xl border border-white/10 bg-gradient-to-br",
                  mood.theme.accentFrom,
                  mood.theme.accentTo,
                  "opacity-80"
                ].join(" ")}
              />
            </div>

            <div className="mt-5 grid gap-3 text-sm text-white/65">
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-xs text-white/55">Audio rules</div>
                <div className="mt-1">
                  Only one mood plays at a time, with a smooth fade when switching.
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="text-xs text-white/55">Tip</div>
                <div className="mt-1">
                  On mobile, you can swipe up/down to jump between sections.
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

