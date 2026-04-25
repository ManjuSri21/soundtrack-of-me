import { motion } from "framer-motion";
import { useAudio } from "../audio/AudioManager";
import type { Track } from "../audio/AudioManager";
import { GlassCard } from "./GlassCard";

export function Hero({
  onEnter,
  backgroundTrack
}: {
  onEnter: () => void;
  backgroundTrack: Track;
}) {
  const { play, hasUserGesture } = useAudio();

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden noise"
    >
      <div className="absolute inset-0" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_18px_rgba(232,121,249,0.6)]" />
            Music-Based Personality – A Soundtrack of My Life
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            This is not just a website.
            <span className="block bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              This is my vibe.
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            Scroll like you’re flipping through my inner playlist. Tap a mood, feel the
            shift, and let the soundtrack do the talking.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (!hasUserGesture) {
                  play(backgroundTrack, { loop: true, fadeMs: 700 });
                }
                onEnter();
              }}
              className={[
                "group relative inline-flex items-center justify-center overflow-hidden rounded-2xl",
                "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 p-[1px]",
                "shadow-glow"
              ].join(" ")}
            >
              <span className="flex items-center gap-2 rounded-2xl bg-ink px-6 py-3 text-sm font-medium text-white/90">
                <span className="relative">
                  Enter My World
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white/70 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="text-white/70">→</span>
              </span>
            </motion.button>

            <GlassCard className="px-4 py-3">
              <div className="text-xs text-white/60">Background track</div>
              <div className="mt-1 text-sm text-white/85">
                {backgroundTrack.title}{" "}
                <span className="text-white/50">— {backgroundTrack.artist}</span>
              </div>
              <div className="mt-1 text-xs text-white/50">
                Starts on interaction (browser autoplay rules).
              </div>
            </GlassCard>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.05 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[34px] bg-gradient-to-br from-fuchsia-500/25 via-purple-500/18 to-cyan-400/18 blur-2xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_120px_rgba(0,0,0,0.45)]">
            <img
              src="/hero-visual.svg"
              alt="Neon music visual"
              className="h-[360px] w-full object-cover sm:h-[440px]"
              loading="eager"
            />

            <motion.img
              src="/beats.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute bottom-4 left-1/2 w-[86%] -translate-x-1/2 opacity-90 mix-blend-screen"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.92, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.18 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

