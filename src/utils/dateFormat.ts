// Formats a date into readable text.
// Example: May 15, 2026
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}


export function formatDueDate(
  dueDay: number,
): string {


  const today = new Date();

  const date = new Date(
    today.getFullYear(),
    today.getMonth(),
    dueDay
  );

  return `${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })}`;
}