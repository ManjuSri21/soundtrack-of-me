export function Equalizer({ playing }: { playing: boolean }) {
  const bars = [0, 1, 2, 3, 4, 5];
  return (
    <div className="flex items-end gap-1 h-6">
      {bars.map((i) => (
        <div
          key={i}
          className={[
            "w-1.5 rounded-sm bg-white/70",
            playing ? "eq-bar opacity-100" : "opacity-30"
          ].join(" ")}
          style={{
            height: `${10 + i * 2}px`,
            animationDelay: `${i * 120}ms`,
            animationPlayState: playing ? "running" : "paused"
          }}
        />
      ))}
    </div>
  );
}

