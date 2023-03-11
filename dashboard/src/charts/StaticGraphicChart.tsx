import { useState } from 'react';
import { staticGraphicData } from '../data/staticGraphicData';
import ChartWrapper from './ChartWrapper';

function StaticGraphicChart({ layoutMode = '' }) {
  const calendarData = staticGraphicData.reduce((result, { date, value }) => {
    const [year, month, day] = date.split('-');
    if (result[year] === undefined) result[year] = {}
    if (result[year][month] === undefined) result[year][month] = {}
    if (result[year][month][day] === undefined) result[year][month][day] = value
    return result;
  }, {});
  const yearOptions = Object.keys(calendarData).sort();
  const [selectedYear, setSelectedYear] = useState(yearOptions[yearOptions.length - 1]);
  const monthOptions = Object.keys(calendarData[selectedYear]).sort();
  const defaultMonth = monthOptions[monthOptions.length - 1];
  const [unsafeSelectedMonth, setSelectedMonth] = useState(defaultMonth);
  const selectedMonth = calendarData[selectedYear][unsafeSelectedMonth] !== undefined ? unsafeSelectedMonth : defaultMonth;
  const dayOptions = Object.keys(calendarData[selectedYear][selectedMonth]).sort();
  const defaultDay = dayOptions[dayOptions.length - 1];
  const [unsafeSelectedDay, setSelectedDay] = useState(defaultDay);
  const selectedDay = calendarData[selectedYear][selectedMonth][unsafeSelectedDay] !== undefined ? unsafeSelectedDay : defaultDay;

  const imageUrl = `${import.meta.env.BASE_URL}test-images/${calendarData[selectedYear][selectedMonth][selectedDay]}`;

  function currIndex() {
    return staticGraphicData.findIndex(({ date }) => date === `${selectedYear}-${selectedMonth}-${selectedDay}`);
  }

  function nextIndex() {
    const currI = currIndex();
    return (staticGraphicData[currI + 1] !== undefined) ? currI + 1 : -1;
  }

  function prevIndex() {
    const currI = currIndex();
    return (staticGraphicData[currI - 1] !== undefined) ? currI - 1 : -1;
  }

  function go(date) {
    const [year, month, day] = date.split('-');
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(day);
  }

  function goNext() {
    go(staticGraphicData[nextIndex()].date);
  }

  function goPrev() {
    go(staticGraphicData[prevIndex()].date);
  }

  return (
    <div className="StaticGraphicChart">
      <ChartWrapper
        settingsControls={
          <div className="settingsControls">
            <button onClick={goPrev} disabled={prevIndex() < 0}>
              Prev
            </button>
            <label>
              Year:
              <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                {yearOptions.map(title => <option value={title} key={title}>{title}</option>)}
              </select>
            </label>
            <label>
              Month:
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                {monthOptions.map(title => <option value={title} key={title}>{title}</option>)}
              </select>
            </label>
            <label>
              Day:
              <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                {dayOptions.map(title => <option value={title} key={title}>{title}</option>)}
              </select>
            </label>
            <button onClick={goNext} disabled={nextIndex() < 0}>
              Next
            </button>
          </div>}
        buttons={
          <a href={imageUrl} download>⬇ Download</a>
        }
        layoutMode={layoutMode}
      />
      <img src={imageUrl} alt={`Chart graphic for ${selectedYear}-${selectedMonth}-${selectedDay}`} />
    </div>
  )
}

export default StaticGraphicChart
