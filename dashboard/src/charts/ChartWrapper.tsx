import { useState } from 'react';

function ChartWrapper({ settingsControls, layoutMode = '', children, buttons }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const showSettings = layoutMode === 'desktop' || settingsOpen;

  return (
    <div className="ChartWrapper"><div className="buttons">
      {buttons}
      {settingsControls && layoutMode === 'mobile' && <button onClick={() => setSettingsOpen(!settingsOpen)}>{settingsOpen ? '⨉' : '⚙️'} Settings</button>}
    </div>
      {settingsControls && showSettings &&
        <div className="settingsControls">
          {settingsControls}
        </div>
      }
      {children}
    </div>
  )
}

export default ChartWrapper
