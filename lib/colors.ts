export const DARK_COLORS: string[] = [
  "#1a2332",
  "#2d1b3d",
  "#1f2937",
  "#3d2817",
  "#1e3a5f",
  "#2e1a47",
  "#3b1e54",
  "#4a1f5c",
  "#1b4d3e",
  "#1f4a4a",
  "#1e3d52",
  "#5c1f2f",
  "#4d2e1a",
  "#3d2f1f",
];

export function getDarkColorForSeed(seed: string): string {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    const charCode = seed.charCodeAt(index);
    hash = (hash << 5) - hash + charCode;
    hash |= 0; // Convert to 32bit integer
  }
  const positiveHash = Math.abs(hash);
  const selectedIndex = positiveHash % DARK_COLORS.length;
  return DARK_COLORS[selectedIndex];
}
