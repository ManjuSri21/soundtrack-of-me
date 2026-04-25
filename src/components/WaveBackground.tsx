import { motion, useReducedMotion } from "framer-motion";

export function WaveBackground() {
  const reduced = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-neon-radial opacity-100" />

      <motion.div
        className="wave absolute -left-24 top-16 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-purple-500/25 to-pink-500/10 blur-3xl"
        animate={
          reduced
            ? undefined
            : {
                y: [0, -18, 0],
                x: [0, 22, 0]
              }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="wave absolute -right-24 top-40 h-[560px] w-[560px] rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-400/10 blur-3xl"
        animate={
          reduced
            ? undefined
            : {
                y: [0, 24, 0],
                x: [0, -26, 0]
              }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="wave absolute left-[40%] -bottom-52 h-[640px] w-[640px] rounded-full bg-gradient-to-br from-fuchsia-500/16 to-indigo-500/10 blur-3xl"
        animate={
          reduced
            ? undefined
            : {
                y: [0, 18, 0],
                x: [0, 18, 0]
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

