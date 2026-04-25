import { useAudio } from "../audio/AudioManager";

export function VolumeSlider() {
  const { volume, setVolume } = useAudio();
  return (
    <div className="flex items-center gap-3">
      <div className="text-xs text-white/70 w-12">Vol</div>
      <input
        aria-label="Volume"
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => setVolume(Number(e.target.value))}
        className="w-40 accent-fuchsia-400"
      />
      <div className="text-xs tabular-nums text-white/60 w-10 text-right">
        {Math.round(volume * 100)}
      </div>
    </div>
  );
}

