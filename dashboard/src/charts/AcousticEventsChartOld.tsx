import { useState } from 'react';
import { hoverTemplateStrings, sunAndMoonData } from '../utils/helpers';
import { recordingEffortBinaryChartConfig, recordingEffortFiltered } from '../data/recordingEffortData';
import { acousticEventsData } from '../data/acousticEventsData';
import { PlotlyLayout } from '../utils/plotly';
import PlotlyChart from '../components/PlotlyChart';
import useDateRange from '../hooks/useDateRange';
import { chartColor } from '../utils/colors';

const maxMarkerSize = 20;
const minMarkerSize = 5;
const orcaData = acousticEventsData.filter(({ type }) => type === 'Orca');
const humpbackData = acousticEventsData.filter(({ type }) => type === 'Humpback');

function getMinMaxRange(array, property) {
  return array.reduce((result, curr) => {
    if (result.max === null || curr[property] > result.max) {
      result.max = curr[property];
    }
    if (result.min === null || curr[property] < result.min) {
      result.min = curr[property];
    }
    return result;
  }, { min: null, max: null });
}

function getMarkerSize(callCount, { min, max }) {
  const adjustedCallCount = callCount - min;
  const adjustedMax = max - min;
  const portion = adjustedCallCount / adjustedMax;
  return minMarkerSize + (portion * (maxMarkerSize - minMarkerSize));
}

// Moving this in to the component kills performance for some reason, even though it is only executed twice.
const illuminationData = sunAndMoonData();

function AcousticEventsChartOld({ title = '', layoutMode = '' }) {
  const [illumination, setIllumination] = useState('sun');
  const [species, setSpecies] = useState('all');
  const [informationMode, setInformationMode] = useState('basic');
  const [showRecordingGaps, setShowRecordingGaps] = useState(true);

  // Filter data
  const { dateRangeFilter, dateRangeControls } = useDateRange();
  const filteredOrcaData = orcaData.filter(dateRangeFilter);
  const filteredHumpbackData = humpbackData.filter(dateRangeFilter);

  // Rearrange data into a matrix that Plotly understands
  const filteredIlluminationData = illuminationData.filter(dateRangeFilter);
  const zData = filteredIlluminationData[0].illumination.map((row, index) => filteredIlluminationData.map(({ illumination }) => illumination[index]));

  // Assemble detections data
  const detectionsData = {
    orca: {
      points: filteredOrcaData,
      callCountRange: getMinMaxRange(filteredOrcaData, 'callCount'),
    },
    humpback: {
      points: filteredHumpbackData,
      callCountRange: getMinMaxRange(filteredHumpbackData, 'callCount'),
    }
  }

  // Merge template data
  const customData = recordingEffortFiltered(dateRangeFilter).map((row, index) => {
    const detectionDataForDay = acousticEventsData.filter(({ startDate }) => startDate.startsWith(row.date));
    const formatTime = (hours24float) => {
      const am = (hours24float > 12) ? false : true;
      const hoursFloat = (hours24float > 12) ? hours24float - 12 : hours24float;
      const minutes = Math.floor((hoursFloat % 1) * 60);
      const hours = Math.floor(hoursFloat);
      return `${hours}:${`${minutes}`.padStart(2, '0')} ${am ? 'AM' : 'PM'}`;
    }
    return {
      ...row,
      ...filteredIlluminationData[index],
      detections: {
        numEvents: detectionDataForDay.length,
        numCalls: detectionDataForDay.reduce((result, row) => row.callCount + result, 0),
      },
      sunrise: formatTime(filteredIlluminationData[index].sunrise),
      sunset: formatTime(filteredIlluminationData[index].sunset),
    }
  });

  const sunProps = {
    x: filteredIlluminationData.map(row => row.date),
    type: 'scatter',
    mode: 'lines',
    line: { color: 'orange', width: 0 },
    fillcolor: 'rgba(0,0,0,0.1)',
    marker: { color: 'yellow' },
    showlegend: false,
    hovertemplate:
      "%{x|%a %b %-d}" +
      "<extra><b style=\"color: black\">%{text}</b></extra>",
  }

  function hourToTime(hour) {
    const hours = `${Math.floor(hour)}`.padStart(2, '0');
    const minutes = `${Math.floor((hour % 1) * 60)}`.padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const plotlyData = [
    recordingEffortBinaryChartConfig(showRecordingGaps, dateRangeFilter),
    {
      z: zData,
      x: filteredIlluminationData.map(row => row.date),
      y: [...Array(72).keys()].map((val) => val / 12),
      type: 'heatmap',
      colorscale: [[0, 'rgb(0,12,31)'], [1 / 5, 'rgb(129,196,242)'], [1, 'rgba(255,255,255,0)']],
      showscale: false,
      hoverinfo: 'skip',
      visible: illumination == 'sunAndMoon',
      background: true,
    },
    {
      ...sunProps,
      y: filteredIlluminationData.map(row => row.sunrise),
      fill: 'tozeroy',
      name: 'Sunrise',
      hovertemplate: `Sunrise ${sunProps.hovertemplate}`,
      text: filteredIlluminationData.map((row) => hourToTime(row.sunrise)),
      visible: illumination == 'sun',
    },
    {
      ...sunProps,
      y: filteredIlluminationData.map(row => 24),
      fill: 'none',
      name: '',
      hoverinfo: 'skip',
      hovertemplate: '',
      visible: illumination == 'sun',
    },
    {
      ...sunProps,
      y: filteredIlluminationData.map(row => row.sunset),
      fill: 'tonexty',
      name: 'Sunset',
      hovertemplate: `Sunset ${sunProps.hovertemplate}`,
      text: filteredIlluminationData.map((row) => hourToTime(row.sunset)),
      visible: illumination == 'sun',
    },
    getDetectionChartSettings(detectionsData.orca, 'Orca', chartColor(0)),
    getDetectionChartSettings(detectionsData.humpback, 'Humpback', chartColor(1)),
  ];

  function getDetectionChartSettings(data, label, color) {
    return {
      x: data.points.map(({ startDate }) => startDate.slice(0, 10)),
      y: data.points.map(({ eventHour }) => eventHour),
      customdata: data.points.map((item, index) => {
        const minutes = Math.round(item.duration / 60);
        const remainderMinutes = minutes % 60;
        const hours = Math.floor(minutes / 60);
        return {
          ...customData.find((row) => row.date === item.startDate.slice(0, 10)),
          ...item,
          timeFrom: (new Date(item.startDate)).toLocaleTimeString('en-US', {
            timeZone: 'America/Los_Angeles',
            hour: 'numeric',
            minute: '2-digit',
          }),
          timeTo: (new Date(item.endDate)).toLocaleTimeString('en-US', {
            timeZone: 'America/Los_Angeles',
            hour: 'numeric',
            minute: '2-digit',
          }),
          duration: {
            hours,
            minutes: remainderMinutes,
          },
          durationText: `${hours ? `${hours}h ` : ''}${remainderMinutes}m`,
          callsPerMinute: item.callCount / minutes,
        }
      }),
      mode: 'markers',
      marker: {
        size: data.points.map(({ callCount }) => getMarkerSize(callCount, data.callCountRange)),
        color,
      },
      hovertemplate:
        [
          `<b>${label} detection</b>`,
          ...(informationMode == 'detailed') ? [`%{customdata.timeFrom} – %{customdata.timeTo} (%{customdata.durationText})`] : [],
          `<b>%{customdata.callCount}</b> calls  <b>%{customdata.callsPerMinute:.1f}</b> calls/m`,
          ...(informationMode == 'detailed') ? [
            `<br><b>${hoverTemplateStrings.date}</b>`,
            hoverTemplateStrings.detectionSummary,
            hoverTemplateStrings.recordingCoverage,
            hoverTemplateStrings.lunarAndSolar,
          ] : [],
          `<extra></extra>`,
        ].join('<br>'),
      name: label,
      visible: species === `${label}`.toLowerCase() || species === 'all',
    }
  }

  const controls =
    <>
      {dateRangeControls}
      <label>
        Species:
        <select value={species} onChange={(e) => setSpecies(e.target.value)}>
          <option value="all">All</option>
          <option value="orca">Orca</option>
          <option value="humpback">Humpback</option>
        </select>
      </label>
      <label>
        Illumination:
        <select value={illumination} onChange={(e) => setIllumination(e.target.value)}>
          <option value="sun">Sun</option>
          <option value="sunAndMoon">Sun + Moon</option>
          <option value="none">None</option>
        </select>
      </label>
      <label>
        Hover information:
        <select value={informationMode} onChange={(e) => setInformationMode(e.target.value)}>
          <option value="basic">Basic</option>
          <option value="detailed">Detailed</option>
        </select>
      </label>
      <label>
        <input type="checkbox" checked={showRecordingGaps} onChange={(e) => setShowRecordingGaps(e.currentTarget.checked)} />
        Show recording gaps
      </label>
    </>

  return (
    <div className="AcousticEventsChartOld">
      <PlotlyChart
        layoutMode={layoutMode}
        title={title}
        data={plotlyData}
        settingsControls={controls}
        layout={{
          ... new PlotlyLayout(),
          yaxis: {
            automargin: true,
            range: [0, 24],
            tickmode: "array",
            tickvals: [...new Array(7)].map((value, index) => index * 4),
            ticktext: [
              'Midn.',
              '4 AM',
              '8 AM',
              'Noon',
              '4 PM',
              '8 PM',
              'Midn.',
            ],
            tick0: 0,
            dtick: 4,
            showgrid: false,
          },
        }}
        dailySummary={{
          customdata: customData,
          hovertemplate: [
            `<b>${hoverTemplateStrings.date}</b>`,
            hoverTemplateStrings.detectionSummary,
            hoverTemplateStrings.recordingCoverage,
            hoverTemplateStrings.lunarAndSolar,
            `<extra></extra>`,
          ].join("<br>"),
        }}
      />
    </div>
  )
}

export default AcousticEventsChartOld
