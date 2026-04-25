export type MoodKey = "happy" | "focused" | "sad" | "motivated" | "latenight";

export type Mood = {
  key: MoodKey;
  title: string;
  emoji: string;
  subtitle: string;
  theme: {
    accentFrom: string;
    accentTo: string;
    surface: string;
    glow: string;
  };
  song: {
    title: string;
    artist: string;
    /** Public preview URL (replace with your own if you want). */
    src: string;
  };
};

/**
 * NOTE:
 * Browsers block autoplay with sound. This app starts audio only after the user clicks
 * “Enter My World” or plays a mood. You can replace these preview URLs anytime.
 */
export const MOODS: Mood[] = [
  {
    key: "happy",
    title: "When I’m Happy",
    emoji: "😊",
    subtitle: "Feel-good, light, positive vibes.",
    theme: {
      accentFrom: "from-pink-500",
      accentTo: "to-purple-500",
      surface: "bg-white/10",
      glow: "shadow-[0_0_60px_rgba(236,72,153,0.20)]"
    },
    song: {
      title: "Vaathi Coming",
      artist: "Anirudh Ravichander",
      src: "/audio/happy.mp3"
    }
  },
  {
    key: "focused",
    title: "When I’m Focused",
    emoji: "🧠",
    subtitle: "Calm, instrumental, productivity vibes.",
    theme: {
      accentFrom: "from-blue-500",
      accentTo: "to-cyan-400",
      surface: "bg-white/5",
      glow: "shadow-[0_0_60px_rgba(59,130,246,0.18)]"
    },
    song: {
      title: "The Life of Ram",
      artist: "Govind Vasantha",
      src: "/audio/focused.mp3"
    }
  },
  {
    key: "sad",
    title: "When I’m Sad",
    emoji: "💔",
    subtitle: "Emotional, heartbreak, deep feeling.",
    theme: {
      accentFrom: "from-purple-500",
      accentTo: "to-indigo-500",
      surface: "bg-white/5",
      glow: "shadow-[0_0_60px_rgba(99,102,241,0.18)]"
    },
    song: {
      title: "Po Nee Po",
      artist: "Anirudh Ravichander",
      src: "/audio/sad.mp3"
    }
  },
  {
    key: "motivated",
    title: "When I’m Motivated",
    emoji: "🔥",
    subtitle: "Energy, hustle, confidence.",
    theme: {
      accentFrom: "from-orange-500",
      accentTo: "to-pink-500",
      surface: "bg-white/10",
      glow: "shadow-[0_0_60px_rgba(249,115,22,0.18)]"
    },
    song: {
      title: "Arjunar Villu",
      artist: "Vidyasagar",
      src: "/audio/motivated.mp3"
    }
  },
  {
    key: "latenight",
    title: "Late Night Thoughts",
    emoji: "🌙",
    subtitle: "Chill, dreamy, introspective.",
    theme: {
      accentFrom: "from-fuchsia-500",
      accentTo: "to-blue-500",
      surface: "bg-white/5",
      glow: "shadow-[0_0_60px_rgba(168,85,247,0.18)]"
    },
    song: {
      title: "Kannazhaga",
      artist: "Anirudh Ravichander",
      src: "/audio/latenight.mp3"
    }
  }
];

