import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { guessMoodAnswer } from "../lib/mood-guess";

export function GuessMyMood() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [result, setResult] = useState<{ mood: string; song: string } | null>(null);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/6 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors"
      >
        Guess My Mood
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 grid place-items-center bg-black/55 px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg"
            >
              <GlassCard className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-white/50">
                      AI touch (mock logic)
                    </div>
                    <div className="mt-2 text-xl font-semibold text-white">
                      How are you feeling right now?
                    </div>
                    <div className="mt-1 text-sm text-white/60">
                      Type a few words and I’ll suggest a mood + song.
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-sm text-white/70 hover:bg-white/10"
                  >
                    ✕
                  </button>
                </div>

                <div className="mt-5 grid gap-3">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="e.g., I’m tired but hopeful…"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 placeholder:text-white/35"
                  />
                  <button
                    onClick={() => setResult(guessMoodAnswer(q))}
                    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 px-4 py-2 text-sm font-medium text-white shadow-glow hover:brightness-110"
                  >
                    Suggest
                  </button>

                  {result ? (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-sm text-white/75">
                        Mood: <span className="text-white">{result.mood}</span>
                      </div>
                      <div className="mt-1 text-sm text-white/65">
                        Song: <span className="text-white/90">{result.song}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

