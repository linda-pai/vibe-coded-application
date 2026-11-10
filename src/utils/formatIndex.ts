/** 1 → "01". Used for section numbering in the nav and section headers. */
export function formatIndex(value: number): string {
  return String(value).padStart(2, '0');
}
