export function getColor(index: number, max: number): string {
  const ratio = index / max;
  const hue = Math.floor(ratio * 360);
  return `hsl(${hue}, 80%, 80%)`;
}