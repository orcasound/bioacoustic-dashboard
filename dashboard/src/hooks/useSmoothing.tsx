import { useState } from 'react';
import { groupedAverage, rollingAverage } from '../utils/math';
import { chartColor } from '../utils/colors';

function useSmoothing() {
    const [smoothing, setSmoothing] = useState('');
    const [averageWeeks, setAverageWeeks] = useState(1);

    function smooth(data, xProp, yProp) {
        if (!smoothing) return data;
        if (smoothing == 'rolling') return rollingAverage(data, xProp, yProp, averageWeeks * 7);
        if (smoothing == 'interpolated') return groupedAverage(data, xProp, yProp, averageWeeks * 7,);
    };

    function SmoothingControls() {
        const averageMinLimit = 1;
        const averageMaxLimit = 4;

        return (
            <>
                <label>
                    Smoothing:
                    <select value={smoothing} onChange={(e) => setSmoothing(e.target.value)}>
                        <option value="">None</option>
                        <option value="rolling">Rolling average</option>
                        <option value="interpolated">Interpolated average</option>
                    </select>
                </label>
                {smoothing &&
                    <span className="averageControls">
                        {" Num weeks in average: "}
                        <button onClick={() => { setAverageWeeks(averageWeeks - 1) }} disabled={averageWeeks <= averageMinLimit}>-</button>
                        {` ${averageWeeks} `}
                        <button onClick={() => { setAverageWeeks(averageWeeks + 1) }} disabled={averageWeeks >= averageMaxLimit}>+</button>
                    </span>
                }
            </>
        )
    }

    const plotlySmoothedLineConfig = () => {
        const config = {
            type: 'scatter',
            mode: 'lines',
            line: {
                color: chartColor(0),
            },
            hovertemplate: '',
            hoverinfo: 'skip',
            fill: 'tozeroy',
            connectgaps: false,
        };
        if (smoothing === 'interpolated') {
            config.line = {
                ...config.line,
                shape: 'spline',
                smoothing: 1.3,
            }
        }
        return config;
    }

    const averageWeeksNotation = smoothing ? ` (${averageWeeks}w average)` : '';

    return { smoothing, smoothingControls: <SmoothingControls />, smooth, plotlySmoothedLineConfig, averageWeeksNotation };
}

export default useSmoothing;