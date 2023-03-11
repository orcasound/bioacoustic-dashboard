import { useState } from 'react';
import { recordingEffortBinaryChartConfig, recordingEffortFiltered } from '../data/recordingEffortData';
import PlotlyChart from '../components/PlotlyChart';
import { PlotlyLayout, axisTitle } from '../utils/plotly';
import { chartColor } from '../utils/colors';
import { hoverTemplateStrings } from '../utils/helpers';
import { round } from '../utils/math';
import { detectionTimeSeriesData } from '../data/detectionTimeSeriesData';
import useSmoothing from '../hooks/useSmoothing';
import useDateRange from '../hooks/useDateRange';
import CheckboxOptions from '../components/CheckboxOptions';

function callKey(species, callType) {
  return `${species}_${callType}`.replace(/\W/g, '');
}

function callLabel(species, callType) {
  return `${species}: ${callType}`;
}

function DetectionTimeSeriesChart({ title = '', layoutMode = '' }) {

  const { dateRangeFilter, dateRangeControls } = useDateRange();

  const { smoothing, smoothingControls, smooth, plotlySmoothedLineConfig, averageWeeksNotation } = useSmoothing();

  const callData = [];
  detectionTimeSeriesData.forEach((speciesRow, speciesIndex) => {
    speciesRow.calls.forEach((callsRow, callsIndex) => {
      callData.push({
        species: speciesRow.species,
        callType: callsRow.type,
        rows: smooth(callsRow.rows.filter(dateRangeFilter), 'date', 'callRate'),
        markerColor: chartColor(speciesIndex, callsIndex),
      })
    })
  });

  const callKeys = callData.map(({ species, callType }) => callKey(species, callType));
  const [selectedSpecies, setSelectedSpecies] = useState(callKeys);
  const filteredCallData = callData.filter(({ species, callType }) => selectedSpecies.length ? selectedSpecies.includes(callKey(species, callType)) : true)

  const plotlyData = [
    recordingEffortBinaryChartConfig(true, dateRangeFilter),
  ];

  if (!smoothing) {
    filteredCallData.forEach(({ rows, species, callType, markerColor }, index) => {
      plotlyData.push(
        {
          x: rows.map(row => row.date),
          y: rows.map(row => row.callRate),
          type: 'bar',
          marker: { color: markerColor },
          name: callLabel(species, callType),
          hovertemplate: '',
          hoverinfo: 'skip',
        }
      )
    });
  } else {
    filteredCallData.forEach(({ rows, species, callType, markerColor }, index) => {
      const config = {
        ...plotlySmoothedLineConfig(),
        x: rows.map(row => row.date),
        y: rows.map(row => row.callRate),
        name: callLabel(species, callType),
        hovertemplate: '',
        hoverinfo: 'skip',
      }
      config.line.color = markerColor;
      plotlyData.push(config);
    });
  }

  return (
    <div className="DetectionTimeSeriesChart">
      <PlotlyChart
        layoutMode={layoutMode}
        title={title}
        data={plotlyData}
        settingsControls={<>
          {dateRangeControls}
          {detectionTimeSeriesData.map(({ species }) => (
            <CheckboxOptions key={species} name={species} options={callData.filter((row) => row.species === species).map(({ species, callType, markerColor }) => ({
              value: callKey(species, callType),
              title: callType,
              color: markerColor,
            }))} currValues={selectedSpecies} setCurrValues={setSelectedSpecies} />
          ))}
          {smoothingControls}
        </>}
        layout={{
          ...new PlotlyLayout(),
          bargap: .3,
          yaxis: {
            automargin: true,
            showgrid: false,
            title: axisTitle('Detections / 24h'),
          },
          barmode: 'stack',
        }}
        dailySummary={{
          customdata: filteredCallData[0].rows.map((row, index) => ({
            ...recordingEffortFiltered(dateRangeFilter)[index],
            date: row.date,
            ...Object.fromEntries(filteredCallData.map(({ species, callType, rows, markerColor }) => [callKey(species, callType), { callRate: round(rows[index].callRate, 1), markerColor }]))
          })),
          hovertemplate: [
            `<b>${hoverTemplateStrings.date}${averageWeeksNotation}</b>`,
            ...filteredCallData.map(({ species, callType, rows }) => `${callLabel(species, callType)}: <b style="color: %{customdata.${callKey(species, callType)}.markerColor}">%{customdata.${callKey(species, callType)}.callRate}/h</b>`),
            hoverTemplateStrings.recordingCoverage,
            `<extra></extra>`,
          ].join("<br>"),
        }}
      />
    </div>
  )
}

export default DetectionTimeSeriesChart
