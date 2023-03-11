import { isValid, parseISO, eachDayOfInterval, formatISO } from "date-fns";

export function dataForDateRange(data, fromDate, toDate, backfill = false) {
  // Assumes a 'date' or 'startDate' property on data
  const dataWithDate = data.map(row => {
    const date = `${(row.date || row.startDate)}`.substring(0, 10);
    const valid = (date.length === 10 && isValid(parseISO(date)));
    if (!valid) throw new Error(`Missing or invalid 'date' or 'startDate' property`);
    return {
      ...row,
      date,
    }
  });
  const filteredData = dataWithDate.filter(row => row.date >= fromDate && row.date <= toDate);
  const firstAvailableDate = filteredData.at(0)?.date;
  const lastAvailableDate = filteredData.at(-1)?.date;
  // Backfill if necessary with empty values
  if (backfill && (firstAvailableDate !== fromDate || lastAvailableDate !== toDate)) {
    // Copy the data structure of first item but with null values
    const template = {};
    if (filteredData.at(0)) {
      Object.keys(filteredData.at(0)).forEach(key => {
        template[key] = null;
      })
    }
    // Create an entry for each date in the range
    const blanks = eachDayOfInterval({
      start: parseISO(fromDate),
      end: parseISO(toDate)
    }).map((date, index) => ({
      ...template,
      date: formatISO(date, { representation: 'date' }),
    }))
    // If we don't have any data return now
    if (filteredData.length === 0) return blanks;
    // Determine fill area
    const fillToIndex = blanks.findIndex(row => row.date === firstAvailableDate);
    const fillBefore = fillToIndex > -1 ? blanks.slice(0, fillToIndex) : [];
    const fillFromIndex = blanks.findIndex(row => row.date === lastAvailableDate);
    const fillAfter = fillFromIndex > -1 ? blanks.slice(fillFromIndex + 1) : [];
    // Merge together
    return [...fillBefore, ...filteredData, ...fillAfter];
  }
  return filteredData;
}