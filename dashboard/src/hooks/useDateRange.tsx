import { useState } from 'react';

function useDateRange(fromDate = '2021-01-01', toDate = '2021-12-31') {
    const [startDate, setStartDate] = useState(fromDate);
    const [endDate, setEndDate] = useState(toDate);

    // ToDo: get minDate and maxDate from args
    const minDate = fromDate;
    const maxDate = toDate;

    function dateRangeFilter(row) {
        // Filter on date or startDate prop
        return (row.date || row.startDate) >= startDate && (row.date || row.startDate) <= endDate;
    }

    function DateRangeControls() {
        return (
            <>
                <label>
                    From:
                    <input type="date" value={startDate} min={minDate} max={maxDate} onChange={(e) => setStartDate(e.target.value)} />
                </label>
                <label>
                    To:
                    <input type="date" value={endDate} min={startDate > minDate ? startDate : minDate} max={maxDate} onChange={(e) => setEndDate(e.target.value)} />
                </label>
            </>
        )
    }

    return { dateRangeFilter, dateRangeControls: <DateRangeControls /> };
}

export default useDateRange;