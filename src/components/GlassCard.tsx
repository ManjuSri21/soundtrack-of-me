import type { PropsWithChildren } from "react";

export function GlassCard({
  children,
  className = ""
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
        "shadow-[0_18px_90px_rgba(0,0,0,0.35)]",
        "transition-transform duration-300 will-change-transform",
        "hover:-translate-y-0.5 hover:shadow-glow",
        className
      ].join(" ")}
    >
      {children}
    </div>
  );
}

