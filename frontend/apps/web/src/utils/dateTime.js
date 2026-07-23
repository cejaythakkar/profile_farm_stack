function formatMonth(month, format = "MM") {
  const shortMonths = [
    "jan", "feb", "mar", "apr", "may", "jun",
    "jul", "aug", "sep", "oct", "nov", "dec"
  ];

  const longMonths = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];

  if (month < 1 || month > 12) {
    throw new Error("Invalid month");
  }

  switch (format) {
    case "MM":
      return String(month).padStart(2, "0");
    case "MMM":
      return shortMonths[month - 1];
    case "MMMM":
      return longMonths[month - 1];
    default:
      throw new Error("Invalid format. Use MM, MMM, or MMMM.");
  }
}

export const getDateString = ({ dateString, format }) => {
  const date = new Date(dateString);
  switch (format) {
    case 'MM-YYYY': {
      if (dateString === '')
        return 'Present'
      const formattedDateString = `${formatMonth(date.getMonth() + 1, 'MMM')}-${date.getFullYear()}`
      return formattedDateString;

    }
    case 'DD-MM-YYYY': {

      const formattedDateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
      return formattedDateString;
    }
  }
}