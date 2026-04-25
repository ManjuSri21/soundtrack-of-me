import { useEffect, useMemo, useRef, useState } from "react";
import { AudioProvider, type Track, useAudio } from "./audio/AudioManager";
import { MOODS } from "./data/moods";
import { WaveBackground } from "./components/WaveBackground";
import { TopBar } from "./components/TopBar";
import { Hero } from "./components/Hero";
import { MoodSection } from "./components/MoodSection";
import { CommunityPlaylist } from "./components/CommunityPlaylist";
import { Loader } from "./components/Loader";

function AppInner() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeMoodKey, setActiveMoodKey] = useState<string | null>(null);
  const { hasUserGesture, play } = useAudio();

  // A soft background track (low volume is handled by the global slider).
  const backgroundTrack: Track = useMemo(
    () => ({
      id: "bg:intro",
      title: "Neon Drift (Intro)",
      artist: "Weboreel",
      src: "/audio/intro.mp3"
    }),
    []
  );

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(t);
  }, []);

  // Swipe-based navigation on mobile: swipe up/down to jump sections.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startY = 0;
    let startX = 0;
    let active = false;

    function onTouchStart(e: TouchEvent) {
      if (e.touches.length !== 1) return;
      active = true;
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    }

    function onTouchEnd(e: TouchEvent) {
      if (!active) return;
      active = false;
      const t = e.changedTouches[0];
      const dy = t.clientY - startY;
      const dx = t.clientX - startX;
      if (Math.abs(dy) < 70 || Math.abs(dy) < Math.abs(dx)) return;

      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("section[id]")
      ).filter((s) => s.id !== "");
      const y = window.scrollY + window.innerHeight * 0.33;
      const idx = sections.findIndex((s) => s.offsetTop > y) - 1;
      const currentIndex = Math.max(0, idx);
      const nextIndex = dy < 0 ? currentIndex + 1 : currentIndex - 1;
      const next = sections[Math.max(0, Math.min(sections.length - 1, nextIndex))];
      next?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {loading ? <Loader /> : null}
      <TopBar />

      <div className="fixed inset-0 -z-10">
        <WaveBackground />
      </div>

      <Hero
        backgroundTrack={backgroundTrack}
        onEnter={() => {
          setEntered(true);
          // Nudge the user forward to the first mood section.
          document.getElementById("mood-happy")?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }}
      />

      {MOODS.map((m) => (
        <MoodSection
          key={m.key}
          mood={m}
          onEnterMood={(key) => {
            setActiveMoodKey(key);
          }}
        />
      ))}

      <CommunityPlaylist />

      <footer className="px-5 pb-16 pt-10">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-sm text-white/55">
          <div className="text-white/75 font-medium">
            Music-Based Personality – A Soundtrack of My Life
          </div>
          <div className="mt-1">
            Tip: click a mood to switch tracks (only one plays at a time, with fade).
          </div>
          <div className="mt-3 text-xs text-white/45">
            {entered || hasUserGesture || activeMoodKey ? (
              <>Audio unlocked by user interaction.</>
            ) : (
              <>Audio starts after you click “Enter My World”.</>
            )}
          </div>
          <div className="mt-4">
            <button
              onClick={() => {
                if (!hasUserGesture) play(backgroundTrack, { loop: true, fadeMs: 700 });
                document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-xl border border-white/12 bg-white/6 px-4 py-2 text-xs text-white/75 hover:bg-white/10"
            >
              Back to top
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <AppInner />
    </AudioProvider>
  );
}

