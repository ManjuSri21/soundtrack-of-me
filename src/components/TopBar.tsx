import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { VolumeSlider } from "./VolumeSlider";
import { GuessMyMood } from "./GuessMyMood";
import { useAudio } from "../audio/AudioManager";

export function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const { error, activeId, playing } = useAudio();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className={[
        "fixed left-0 right-0 top-0 z-30",
        "px-4 pt-4",
        "transition-all duration-300"
      ].join(" ")}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <div
        className={[
          "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl",
          "border border-white/10 bg-white/5 backdrop-blur-xl",
          "px-4 py-3",
          scrolled ? "shadow-[0_18px_90px_rgba(0,0,0,0.40)]" : ""
        ].join(" ")}
      >
        <div className="hidden sm:block w-24" />
        <div className="hidden items-center gap-4 sm:flex">
          <a className="text-xs text-white/55 hover:text-white/80" href="#mood-happy">
            Moods
          </a>
          <a className="text-xs text-white/55 hover:text-white/80" href="#community">
            Community
          </a>
        </div>
        <div className="flex items-center gap-3">
          <VolumeSlider />
          <div className="hidden lg:block text-xs text-white/40">
            {activeId ? (playing ? "Playing" : "Paused") : "No track"}{" "}
          </div>
          <GuessMyMood />
        </div>
      </div>

      {error ? (
        <div className="mx-auto mt-3 max-w-6xl rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error} (If this persists, it’s usually the audio URL being blocked or not reachable.)
        </div>
      ) : null}
    </motion.div>
  );
}

