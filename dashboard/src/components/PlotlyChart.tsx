import Plot from 'react-plotly.js';
import Plotly from 'plotly.js-cartesian-dist/plotly-cartesian';
import { binaryHeatmap } from '../utils/plotly';
import ChartWrapper from '../charts/ChartWrapper';

function PlotlyChart({ data = [], layout = {}, config, dailySummary, settingsControls, title = '', layoutMode = '' }: Plotly.PlotlyDataLayoutConfig) {
  const withDailySummary = Array.isArray(dailySummary?.customdata);

  if (withDailySummary && !dailySummary?.hovertemplate) {
    throw new Error('Hovertemplate required for daily summary');
  }

  function getData() {
    const foregroundCharts = data.filter(chart => !chart?.background);
    const backgroundCharts = data.filter(chart => chart?.background);
    if (!withDailySummary) return [...backgroundCharts, ...foregroundCharts];

    // Add an invisible chart that covers the whole chart area, with a visible 'daily summary' hover tooltip
    return [
      ...backgroundCharts,
      binaryHeatmap(dailySummary.customdata,
        dailySummary.customdata.map(row => 1),
        dailySummary.hovertemplate, 'rgba(0,0,0, 0)'),
      ...foregroundCharts
    ];
  }

  function getLayout() {
    // Add a y axis for our daily summary that will pin the chart
    return {
      ...layout,
      yaxis9: {
        automargin: true,
        title: 'Daily information overlay',
        overlaying: 'y',
        visible: false,
        range: [1],
        showgrid: false,
      }
    }
  }

  const plotlyProps = {
    data: getData(),
    config: {
      responsive: true,
      displayModeBar: false,
      displaylogo: false,
      ...config,
    },
    layout: getLayout(),
  }

  return (
    <ChartWrapper
      settingsControls={settingsControls}
      buttons={
        <button onClick={() => {
          const tempDiv = document.createElement("div");
          Plotly.newPlot(tempDiv, plotlyProps.data, {
            ...plotlyProps.layout,
            xaxis: { ...plotlyProps.layout.xaxis, rangeslider: false },
            title,
            margin: { ...plotlyProps.layout.margin, t: 45 },
            showlegend: true,
          }, plotlyProps.config).then((graphDiv) => {
            Plotly.downloadImage(graphDiv, {
              format: 'png',
              height: 500,
              width: 1000,
              filename: `chart-${title.toLowerCase().replace(/\W/g, '-')}-${Date.now()}`,
              scale: 1.5,
            })
            Plotly.purge(graphDiv);
            tempDiv.remove();
          })
        }}>⬇ Download</button>
      }
      layoutMode={layoutMode}
    >
      <div className="PlotlyChart">
        <Plot
          {...plotlyProps}
          useResizeHandler={true}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </ChartWrapper>
  )
}

export default PlotlyChart
