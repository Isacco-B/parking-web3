export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export default function parseDate(date1, date2) {
  const startDate = new Date(date1 * 1000);
  const endDate = new Date(date2 * 1000);
  const parsedStartDate =
    startDate.getHours() +
    ":" +
    startDate.getMinutes() +
    ":" +
    startDate.getSeconds();
  const parsedEndDate =
    endDate.getHours() +
    ":" +
    endDate.getMinutes() +
    ":" +
    endDate.getSeconds();

  return {
    start: parsedStartDate,
    end: parsedEndDate,
  };
}
