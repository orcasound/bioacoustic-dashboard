import './App.css'
import DetectionTimeSeriesChart from './charts/DetectionTimeSeriesChart';
import AcousticEventsChart from './charts/AcousticEventsChart';
import SoundLevelChart from './charts/SoundLevelChart';
import Navigation from './components/Navigation';
import Introduction from './components/Introduction';
import { useState, useRef, useLayoutEffect } from 'react';
import StaticGraphicChart from './charts/StaticGraphicChart';
import RecordingConsistencyChart from './charts/RecordingConsistencyChart';
import AcousticEventsChartOld from './charts/AcousticEventsChartOld';
import useDimensions from './hooks/useDimensions';

function App() {
  const containerRef = useRef();
  const { width: containerWidth } = useDimensions(containerRef);
  const layoutMode = containerWidth ? (containerWidth >= 768) ? 'desktop' : 'mobile' : '';
  const [navOpen, setNavOpen] = useState(false);
  const showNav = layoutMode === 'desktop' || navOpen;

  const charts = [
    {
      title: 'Summary',
      component: Introduction,
    },
    {
      title: 'Detection time series',
      component: DetectionTimeSeriesChart,
    },
    {
      title: 'Acoustic events',
      component: AcousticEventsChart,
    },
    {
      title: 'Acoustic events (prev version)',
      component: AcousticEventsChartOld,
    },
    {
      title: 'Spectral averages',
      component: StaticGraphicChart,
    },
    {
      title: 'Sound level timeline',
      component: SoundLevelChart,
    },
    {
      title: 'Recording consistency',
      component: RecordingConsistencyChart,
    },
  ];

  const [selectedChartTitle, setSelectedChartTitle] = useState(charts[0].title);

  useLayoutEffect(() => {
    // Close the nav when the selected page changes
    setNavOpen(false);
  }, [selectedChartTitle])

  const { component: ActiveChartComponent } = charts.find(({ title }) => title === selectedChartTitle);

  const appClasses = (() => {
    const classes = [
      "App",
      `${layoutMode}-layout`,
    ];

    if (navOpen) {
      classes.push('nav-open');
    }

    return classes.join(" ");
  })();

  return (
    <div className={appClasses} ref={containerRef}>
      {layoutMode &&
        <>
          {showNav &&
            <div className="NavWrapper">
              <Navigation navTitles={charts.map(({ title }) => title)} selected={selectedChartTitle} setSelected={setSelectedChartTitle} />
            </div>
          }
          <div className="ContentWrapper">
            {layoutMode === 'mobile' &&
              <div className="mobileControls">
                <button onClick={() => setNavOpen(!navOpen)}>{navOpen ? '⨉' : '☰'} Menu</button>
              </div>
            }
            <h2>{selectedChartTitle}</h2>
            <ActiveChartComponent title={selectedChartTitle} layoutMode={layoutMode} />
          </div>
        </>
      }
    </div>
  )
}

export default App
