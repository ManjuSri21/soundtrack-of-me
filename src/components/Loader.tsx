import { motion } from "framer-motion";

export function Loader({ label = "Loading your vibe…" }: { label?: string }) {
  const bars = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink">
      <div className="flex flex-col items-center gap-5">
        <div className="flex items-end gap-1.5">
          {bars.map((i) => (
            <motion.div
              key={i}
              className="w-2 rounded bg-gradient-to-t from-fuchsia-400 to-cyan-300"
              initial={{ height: 10, opacity: 0.65 }}
              animate={{ height: [10, 36, 14, 42, 18], opacity: [0.5, 1, 0.7, 1, 0.6] }}
              transition={{ duration: 1.1, delay: i * 0.06, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="text-sm text-white/70">{label}</div>
      </div>
    </div>
  );
}

