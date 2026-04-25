# Music-Based Personality – A Soundtrack of My Life

A modern, interactive **Weboreel** experience that represents personality through music. Scroll through moods, tap to play, and let the UI shift with the vibe.

## Live features

- **Dark neon aesthetic** (purple/blue/pink gradients)
- **Smooth scroll animations** (fade-in sections + ambient background motion)
- **Glassmorphism mood cards**
- **Mood-based music player**
  - Play/Pause per mood
  - **Only one track plays at a time**
  - Smooth **fade** when switching songs
  - Global **volume slider**
- **Community Playlist Wall**
  - Submit name + mood + link
  - Stored locally with `localStorage`
- **“Guess My Mood”** (mock AI) song suggestion
- **Mobile friendly** + swipe up/down navigation

## Tech stack

- React + TypeScript (Vite)
- Tailwind CSS
- Framer Motion
- Howler.js (audio)

## Getting started

### 1) Install

```bash
npm install
```

### 2) Run dev server

```bash
npm run dev
```

Open the local URL shown in your terminal (usually `http://localhost:5173`).

## Audio setup (important)

Browsers block autoplay with sound, so audio starts after the user clicks **Enter My World** or presses **Play**.

### Use your own local MP3 files (recommended)

Put your audio files here:

```
public/audio/
```

Expected filenames (you can change these, but keep `src/data/moods.ts` in sync):

- `happy.mp3`
- `focused.mp3`
- `sad.mp3`
- `motivated.mp3`
- `latenight.mp3`

Optional background track:

- `intro.mp3`

### Where songs/moods are defined

- `src/data/moods.ts`
  - `subtitle`: mood vibe text
  - `song.title` / `song.artist`: display text
  - `song.src`: audio path (example: `"/audio/happy.mp3"`)

## Community playlist storage

- Stored in the browser using `localStorage`
- Code lives in `src/lib/storage.ts`

Project Live URL : https://soundtrack-of-me-git-main-manjusriit23-3989s-projects.vercel.app/



