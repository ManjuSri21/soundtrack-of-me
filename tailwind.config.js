/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b14"
      },
      boxShadow: {
        glow: "0 0 30px rgba(168, 85, 247, 0.25), 0 0 60px rgba(59, 130, 246, 0.18)"
      },
      backgroundImage: {
        "neon-radial":
          "radial-gradient(1200px 600px at 15% 10%, rgba(168,85,247,0.35), transparent 55%), radial-gradient(1000px 700px at 85% 25%, rgba(59,130,246,0.30), transparent 60%), radial-gradient(900px 650px at 60% 95%, rgba(236,72,153,0.22), transparent 55%)"
      }
    }
  },
  plugins: []
};

