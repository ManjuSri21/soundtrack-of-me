type Mapping = { keywords: string[]; mood: string; song: string };

const MAP: Mapping[] = [
  { keywords: ["happy", "good", "great", "excited", "joy", "fun"], mood: "Happy 😊", song: "Sunny Days — Moodlight" },
  { keywords: ["focus", "study", "work", "flow", "productive"], mood: "Focused 🧠", song: "Deep Work — Night Circuit" },
  { keywords: ["sad", "down", "lonely", "tired", "heart"], mood: "Sad 💔", song: "Falling Quiet — Velvet Static" },
  { keywords: ["motivate", "gym", "push", "energy", "hype"], mood: "Motivated 🔥", song: "Level Up — Neon Runner" },
  { keywords: ["night", "late", "overthink", "thinking", "moon"], mood: "Late Night Thoughts 🌙", song: "After Hours — Moonwire" }
];

export function guessMoodAnswer(input: string) {
  const q = input.trim().toLowerCase();
  if (!q) return { mood: "Unknown", song: "Pick the mood that feels closest." };

  for (const m of MAP) {
    if (m.keywords.some((k) => q.includes(k))) return { mood: m.mood, song: m.song };
  }
  return { mood: "Mixed vibes", song: "Try “Late Night Thoughts 🌙” and see if it fits." };
}

