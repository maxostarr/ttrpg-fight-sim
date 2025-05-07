export function getColor(index: number, max: number): string {
  const ratio = index / max;
  const hue = Math.floor(ratio * 120);
  return `hsl(${hue}, 100%, 50%)`;
}