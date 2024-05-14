export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");
}
