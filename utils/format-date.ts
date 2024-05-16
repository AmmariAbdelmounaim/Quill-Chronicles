export function formatDate(dateString: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Parse the input date string
  const date = new Date(dateString);

  // Extract the year, month, and day
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();

  // Format the date string
  return `Published on ${month} ${day}, ${year}`;
}
