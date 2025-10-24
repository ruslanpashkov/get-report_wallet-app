export const DARK_BG_CLASSES: string[] = [
  "bg-zinc-800",
  "bg-slate-800",
  "bg-neutral-800",
  "bg-stone-800",
  "bg-blue-800",
  "bg-indigo-800",
  "bg-violet-800",
  "bg-purple-800",
  "bg-emerald-800",
  "bg-teal-800",
  "bg-cyan-800",
  "bg-rose-800",
  "bg-orange-800",
  "bg-amber-800",
];

export function getDarkBgClassForSeed(seed: string): string {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    const charCode = seed.charCodeAt(index);
    hash = (hash << 5) - hash + charCode;
    hash |= 0; // Convert to 32bit integer
  }
  const positiveHash = Math.abs(hash);
  const selectedIndex = positiveHash % DARK_BG_CLASSES.length;
  return DARK_BG_CLASSES[selectedIndex];
}
