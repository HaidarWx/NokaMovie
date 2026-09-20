export function dateFunction(dateRaw) {
  if (!dateRaw) return "Data not found!";

  const dateObj = new Date(dateRaw);

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObj);
}
