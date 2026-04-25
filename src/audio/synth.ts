type SynthKey = "intro" | "happy" | "focused" | "sad" | "motivated" | "latenight";

const cache = new Map<string, string>();

function writeString(view: DataView, offset: number, s: string) {
  for (let i = 0; i < s.length; i++) view.setUint8(offset + i, s.charCodeAt(i));
}

function floatToI16(x: number) {
  const v = Math.max(-1, Math.min(1, x));
  return v < 0 ? v * 0x8000 : v * 0x7fff;
}

function makeWavBlob(samples: Float32Array, sampleRate: number) {
  // 16-bit PCM mono WAV
  const bytesPerSample = 2;
  const blockAlign = bytesPerSample * 1;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  writeString(view, 0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true); // PCM header size
  view.setUint16(20, 1, true); // format = PCM
  view.setUint16(22, 1, true); // channels
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // bits
  writeString(view, 36, "data");
  view.setUint32(40, dataSize, true);

  let o = 44;
  for (let i = 0; i < samples.length; i++) {
    view.setInt16(o, floatToI16(samples[i]) as number, true);
    o += 2;
  }
  return new Blob([buffer], { type: "audio/wav" });
}

function tone(t: number, hz: number) {
  return Math.sin(2 * Math.PI * hz * t);
}

function env(t: number, a = 0.02, d = 0.12) {
  // quick attack, gentle decay, loops fine
  if (t < a) return t / a;
  return Math.exp(-(t - a) / d);
}

function chordsFor(key: SynthKey) {
  switch (key) {
    case "intro":
      return [220, 277.18, 329.63]; // A minor-ish
    case "happy":
      return [261.63, 329.63, 392.0]; // C major
    case "focused":
      return [196.0, 246.94, 293.66]; // G sus-ish
    case "sad":
      return [220, 261.63, 329.63]; // A minor
    case "motivated":
      return [293.66, 369.99, 440.0]; // D major-ish
    case "latenight":
      return [174.61, 220, 261.63]; // F / A / C
  }
}

export function resolveSynthSrc(src: string): string | null {
  if (!src.startsWith("synth:")) return null;
  const key = src.slice("synth:".length) as SynthKey;
  if (!["intro", "happy", "focused", "sad", "motivated", "latenight"].includes(key)) return null;

  const cached = cache.get(key);
  if (cached) return cached;

  const sampleRate = 44100;
  const seconds = 4;
  const n = sampleRate * seconds;
  const out = new Float32Array(n);

  const chord = chordsFor(key);
  const bass = chord[0] / 2;
  const tempoHz = key === "motivated" ? 2.6 : key === "happy" ? 2.2 : 1.6;

  for (let i = 0; i < n; i++) {
    const t = i / sampleRate;
    const beat = (Math.sin(2 * Math.PI * tempoHz * t) + 1) * 0.5;
    const wobble = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.18 * t);

    const chordMix =
      0.38 * tone(t, chord[0]) +
      0.26 * tone(t, chord[1]) +
      0.22 * tone(t, chord[2]);
    const bassMix = 0.28 * tone(t, bass);
    const pad = chordMix * (0.45 + 0.25 * wobble);

    const pulse = key === "motivated" ? beat : beat * 0.6;
    const e = env((t % (1 / tempoHz)) as number, 0.01, 0.18);
    const lead = 0.18 * e * tone(t, chord[2] * (key === "happy" ? 2 : 1));

    const raw = (pad + bassMix + lead) * (0.55 + 0.45 * pulse);

    // soft clip
    out[i] = Math.tanh(raw * 1.35) * 0.65;
  }

  const blob = makeWavBlob(out, sampleRate);
  const url = URL.createObjectURL(blob);
  cache.set(key, url);
  return url;
}

