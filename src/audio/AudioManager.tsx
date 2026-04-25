import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { Howl } from "howler";
import { resolveSynthSrc } from "./synth";

export type Track = {
  id: string;
  src: string;
  title: string;
  artist: string;
};

type AudioState = {
  activeId: string | null;
  playing: boolean;
  volume: number; // 0..1
  hasUserGesture: boolean;
  error: string | null;
};

type AudioApi = AudioState & {
  setHasUserGesture: () => void;
  setVolume: (v: number) => void;
  play: (track: Track, opts?: { loop?: boolean; fadeMs?: number }) => void;
  toggle: (track: Track, opts?: { loop?: boolean; fadeMs?: number }) => void;
  stop: (opts?: { fadeMs?: number }) => void;
};

const Ctx = createContext<AudioApi | null>(null);

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const howlRef = useRef<Howl | null>(null);
  const activeTrackRef = useRef<Track | null>(null);
  const [state, setState] = useState<AudioState>({
    activeId: null,
    playing: false,
    volume: 0.7,
    hasUserGesture: false,
    error: null
  });

  const api = useMemo<AudioApi>(() => {
    function setHasUserGesture() {
      setState((s) => (s.hasUserGesture ? s : { ...s, hasUserGesture: true }));
    }

    function setVolume(v: number) {
      const next = clamp01(v);
      setState((s) => ({ ...s, volume: next }));
      if (howlRef.current) howlRef.current.volume(next);
    }

    function stop(opts?: { fadeMs?: number }) {
      const fadeMs = opts?.fadeMs ?? 420;
      const h = howlRef.current;
      if (!h) {
        setState((s) => ({ ...s, playing: false, activeId: null }));
        activeTrackRef.current = null;
        return;
      }
      const from = h.volume();
      h.fade(from, 0, fadeMs);
      window.setTimeout(() => {
        try {
          h.stop();
          h.unload();
        } finally {
          howlRef.current = null;
          activeTrackRef.current = null;
          setState((s) => ({ ...s, playing: false, activeId: null }));
        }
      }, fadeMs + 30);
    }

    function play(track: Track, opts?: { loop?: boolean; fadeMs?: number }) {
      const fadeMs = opts?.fadeMs ?? 520;
      const loop = opts?.loop ?? false;

      setHasUserGesture();
      setState((s) => ({ ...s, error: null }));

      const current = activeTrackRef.current;
      const sameTrack = current?.id === track.id;

      if (sameTrack && howlRef.current) {
        const h = howlRef.current;
        h.play();
        h.fade(0, state.volume, fadeMs);
        setState((s) => ({ ...s, activeId: track.id, playing: true }));
        return;
      }

      // fade out old
      if (howlRef.current) {
        const old = howlRef.current;
        const from = old.volume();
        old.fade(from, 0, fadeMs);
        window.setTimeout(() => {
          try {
            old.stop();
            old.unload();
          } catch {
            // ignore
          }
        }, fadeMs + 30);
      }

      const resolved = resolveSynthSrc(track.src) ?? track.src;
      const h = new Howl({
        src: [resolved],
        html5: true,
        loop,
        volume: 0
      });

      howlRef.current = h;
      activeTrackRef.current = track;
      setState((s) => ({ ...s, activeId: track.id, playing: true }));

      h.once("loaderror", (_id, err) => {
        setState((s) => ({
          ...s,
          playing: false,
          error: `Audio failed to load (code: ${String(err)}).`
        }));
      });
      h.once("playerror", (_id, err) => {
        setState((s) => ({
          ...s,
          playing: false,
          error: `Audio failed to play (code: ${String(err)}). Try pressing play again.`
        }));
      });

      const id = h.play();
      h.once(
        "play",
        () => {
          h.fade(0, state.volume, fadeMs);
        },
        id
      );

      h.on("end", () => setState((s) => ({ ...s, playing: false })));
      h.on("stop", () => setState((s) => ({ ...s, playing: false })));
      h.on("pause", () => setState((s) => ({ ...s, playing: false })));
    }

    function toggle(track: Track, opts?: { loop?: boolean; fadeMs?: number }) {
      setHasUserGesture();
      const h = howlRef.current;
      const isActive = state.activeId === track.id;

      if (isActive && h && state.playing) {
        const fadeMs = opts?.fadeMs ?? 360;
        const from = h.volume();
        h.fade(from, 0, fadeMs);
        window.setTimeout(() => {
          try {
            h.pause();
          } catch {
            // ignore
          }
        }, fadeMs + 30);
        setState((s) => ({ ...s, playing: false }));
        return;
      }

      play(track, opts);
    }

    return {
      ...state,
      setHasUserGesture,
      setVolume,
      play,
      toggle,
      stop
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeId, state.playing, state.volume, state.hasUserGesture]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAudio() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAudio must be used within AudioProvider");
  return v;
}

