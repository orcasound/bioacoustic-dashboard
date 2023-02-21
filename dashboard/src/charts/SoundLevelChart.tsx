import { recordingEffortBinaryChartConfig, recordingEffortFiltered } from '../data/recordingEffortData';
import { useState } from 'react';
import PlotlyChart from '../components/PlotlyChart';
import { PlotlyLayout, axisTitle } from '../utils/plotly';
import { colorForValue, hoverTemplateStrings } from '../utils/helpers';
import { round } from '../utils/math';
import { soundLevelData } from '../data/soundLevelData';
import useSmoothing from '../hooks/useSmoothing';
import useDateRange from '../hooks/useDateRange';

function getBandData(bandTitle) {
  return soundLevelData.find(({ band }) => band === bandTitle);
}

function getExceedenceData(bandTitle, thresholdTitle) {
  return getBandData(bandTitle)?.exceedance.find(({ threshold }) => threshold === thresholdTitle)?.rows;
}

function SoundLevelChart({ title = '', layoutMode = '' }) {
  const bands = soundLevelData.map(({ band }) => band);
  const [selectedBand, setSelectedBand] = useState(bands[0]);
  const metrics = [
    'Sound pressure level',
    'Exceedance',
  ]
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);
  const thresholds = soundLevelData[0].exceedance.map(({ threshold }) => threshold);
  const [selectedThreshold, setSelectedThreshold] = useState(thresholds[0]);

  const chartData = selectedMetric === 'Sound pressure level' ? getBandData(selectedBand).noise : getExceedenceData(selectedBand, selectedThreshold);
  const { dateRangeFilter, dateRangeControls } = useDateRange();
  const filteredChartData = chartData.filter(dateRangeFilter);

  const { smoothingControls, smooth, plotlySmoothedLineConfig, averageWeeksNotation } = useSmoothing();
  const smoothedData = smooth(filteredChartData, 'date', 'value');
  const range = (() => {
    // For noise we don't want to start at zero
    if (selectedMetric !== 'Sound pressure level') return undefined;
    const sortedValues = smoothedData.map(row => row.value).filter(value => typeof value === 'number').sort((a, b) => a - b);
    const minValue = sortedValues[0];
    const maxValue = sortedValues.at(-1);
    const minMaxDiff = maxValue - minValue;
    const buffer = minMaxDiff * .1;
    return [Math.max(0, minValue - buffer), maxValue + buffer];
  })();

  const plotlyData = [
    recordingEffortBinaryChartConfig(true, dateRangeFilter),
    {
      ...plotlySmoothedLineConfig(),
      x: smoothedData.map(row => row.date),
      y: smoothedData.map(row => row.value),
      name: `${selectedBand}${selectedMetric === 'Sound pressure level' ? '' : `: ${selectedThreshold}`}`
    },
  ];

  const noiseControls = <>
    <label>
      Band:
      <select value={selectedBand} onChange={(e) => setSelectedBand(e.target.value)}>
        {bands.map(title => <option value={title} key={title}>{title}</option>)}
      </select>
    </label>
    <label>
      Metric:
      <select value={selectedMetric} onChange={(e) => setSelectedMetric(e.target.value)}>
        {metrics.map(title => <option value={title} key={title}>{title}</option>)}
      </select>
    </label>
    {selectedMetric === 'Exceedance' &&
      <label>
        Threshold:
        <select value={selectedThreshold} onChange={(e) => setSelectedThreshold(e.target.value)}>
          {thresholds.map(title => <option value={title} key={title}>{title}</option>)}
        </select>
      </label>
    }
  </>

  return (
    <div className="SoundLevelChart">
      <PlotlyChart
        layoutMode={layoutMode}
        title={`${title}: ${selectedMetric}`}
        data={plotlyData}
        settingsControls={<>
          {dateRangeControls}
          {noiseControls}
          {smoothingControls}
        </>}
        layout={{
          ...new PlotlyLayout(),
          yaxis: {
            automargin: true,
            showgrid: false,
            tickformat: selectedMetric === 'Sound pressure level' ? undefined : ',.0%',
            title: axisTitle(selectedMetric === 'Sound pressure level' ? 'dB re 1μPa' : undefined),
            range: range,
          },
        }}
        dailySummary={{
          customdata: filteredChartData.map((row, index) => ({
            ...recordingEffortFiltered(dateRangeFilter)[index],
            ...row,
            roundedValue: selectedMetric === 'Sound pressure level' ? round(row.value, 1) : round(row.value * 100, 0),
            roundedValueTextColor: colorForValue(selectedMetric === 'Sound pressure level' ? .5 : (1 - row.value)),
          })),
          hovertemplate: [
            `<b>${hoverTemplateStrings.date}${averageWeeksNotation}</b>`,
            selectedMetric === 'Sound pressure level' ? "Sound level: <b>%{customdata.roundedValue}</b> (dB re 1μPa)" : "Exceedance time: <b style=\"color: %{customdata.roundedValueTextColor}\">%{customdata.roundedValue}%</b>",
            hoverTemplateStrings.recordingCoverage,
            `<extra></extra>`,
          ].join("<br>"),
        }}
      />
    </div>
  )
}

export default SoundLevelChart
