import { recordingEffortFiltered } from '../data/recordingEffortData';
import PlotlyChart from '../components/PlotlyChart';
import { PlotlyLayout } from '../utils/plotly';
import { chartColor } from '../utils/colors';
import { hoverTemplateStrings } from '../utils/helpers';
import useSmoothing from '../hooks/useSmoothing';
import useDateRange from '../hooks/useDateRange';

function RecordingConsistencyChart({ title = '', layoutMode = '' }) {

  const { dateRangeFilter, dateRangeControls } = useDateRange();
  const filteredChartData = recordingEffortFiltered(dateRangeFilter);
  const { smoothingControls, smooth, plotlySmoothedLineConfig, averageWeeksNotation } = useSmoothing();
  const smoothedData = smooth(filteredChartData, 'date', 'recordingConsistency');

  const plotlyData = [
    {
      ...plotlySmoothedLineConfig(),
      x: smoothedData.map(row => row.date),
      y: smoothedData.map(row => row.recordingConsistency),
      type: 'scatter',
      mode: 'lines',
      stackgroup: 'one',
      marker: { color: chartColor(0) },
      name: 'Recording consistency',
      hovertemplate: '',
      hoverinfo: 'skip',
    },
  ];

  return (
    <div className="RecordingConsistencyChart">
      <PlotlyChart
        layoutMode={layoutMode}
        title={title}
        data={plotlyData}
        settingsControls={<>
          {dateRangeControls}
          {smoothingControls}
        </>}
        layout={{
          ...new PlotlyLayout(),
          // plot_bgcolor: "#cccccc",
          bargap: .3,
          yaxis: {
            automargin: true,
            showgrid: false,
            tickformat: ',.0%',
          },
        }}
        dailySummary={{
          customdata: filteredChartData,
          hovertemplate: [
            `<b>${hoverTemplateStrings.date}${averageWeeksNotation}</b>`,
            hoverTemplateStrings.recordingCoverage,
            `<extra></extra>`,
          ].join("<br>"),
        }}
      />
    </div>
  )
}

export default RecordingConsistencyChart
