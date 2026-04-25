const KEY = "weboreel.community.v1";

export type CommunitySubmission = {
  id: string;
  name: string;
  mood: string;
  link: string;
  createdAt: number;
};

export function loadSubmissions(): CommunitySubmission[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CommunitySubmission[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveSubmissions(items: CommunitySubmission[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function addSubmission(item: Omit<CommunitySubmission, "id" | "createdAt">) {
  const current = loadSubmissions();
  const next: CommunitySubmission = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    ...item
  };
  const updated = [next, ...current].slice(0, 60);
  saveSubmissions(updated);
  return updated;
}

