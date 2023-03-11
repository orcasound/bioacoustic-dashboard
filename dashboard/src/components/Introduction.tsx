import { formatDistanceToNowStrict } from 'date-fns';
import { Fragment } from 'react';
import DifferenceIndicator from './DifferenceIndicator';
import StatusIndicator from './StatusIndicator';

const callDetections = [
  {
    title: 'Orca',
    columns: [
      {
        title: 'Today',
        value: 45,
        compareValue: 234,
      },
      {
        title: 'Yesterday',
        value: 234,
        compareValue: 221,
      },
      {
        title: '7 Days',
        value: 3463,
        compareValue: 2700,
      },
    ],
  },
  {
    title: 'Humpback',
    columns: [
      {
        title: 'Today',
        value: 0,
        compareValue: 4,
      },
      {
        title: 'Yesterday',
        value: 4,
        compareValue: 2,
      },
      {
        title: '7 Days',
        value: 6,
        compareValue: 0,
      },
    ],
  },
  {
    title: 'Fin',
    columns: [
      {
        title: 'Today',
        value: 344,
        compareValue: 59,
      },
      {
        title: 'Yesterday',
        value: 59,
        compareValue: 222,
      },
      {
        title: '7 Days',
        value: 792,
        compareValue: 820,
      },
    ],
  },
]

const exceedance = [
  {
    title: '90dB',
    columns: [
      {
        title: 'Today',
        value: 84,
        compareValue: 78,
      },
      {
        title: 'Yesterday',
        value: 78,
        compareValue: 65,
      },
      {
        title: '7 Days',
        value: 58,
        compareValue: 70,
      },
    ],
  },
  {
    title: '100dB',
    columns: [
      {
        title: 'Today',
        value: 21,
        compareValue: 22,
      },
      {
        title: 'Yesterday',
        value: 22,
        compareValue: 24,
      },
      {
        title: '7 Days',
        value: 28,
        compareValue: 23,
      },
    ],
  },
  {
    title: '110dB',
    columns: [
      {
        title: 'Today',
        value: 4,
        compareValue: 2,
      },
      {
        title: 'Yesterday',
        value: 2,
        compareValue: 1,
      },
      {
        title: '7 Days',
        value: 1,
        compareValue: 2,
      },
    ],
  },
]

const recordingConsistency = [
  {
    title: 'Today',
    value: 84,
    compareValue: 78,
  },
  {
    title: 'Yesterday',
    value: 78,
    compareValue: 95,
  },
  {
    title: '7 Days',
    value: 92,
    compareValue: 84,
  },
]

function Introduction() {

  const lastUpdatedDuration = 5 * 60 * 1000;
  const lastUpdated = Date.now() - 5 * 60 * 1000;

  const lastUpdatedStatus = (() => {
    if (lastUpdatedDuration < 4 * 60 * 60 * 100) return 'good';
    if (lastUpdatedDuration < 24 * 60 * 60 * 100) return 'warn';
    return 'bad';
  })();

  return (
    <nav className="Introduction">
      <ul className='status'>
        <li><b>Last updated:</b> <StatusIndicator status={lastUpdatedStatus} /> {formatDistanceToNowStrict(lastUpdated)} ago</li>
        <li><b>Hydrophone status:</b> <StatusIndicator status="good" /> Online</li>
      </ul>
      <h3>Bio-acoustic summary</h3>
      <table className="diffTable">
        <tbody>
          <tr>
            <th></th>
            {callDetections[0].columns.map(({ title }) => (
              <th key={title} colSpan={2}>{title}</th>
            ))}
          </tr>
          {callDetections.map(({ title, columns }) => (
            <tr key={title}>
              <th>{title}</th>
              {columns.map(({ value, compareValue, title }) => (
                <Fragment key={title}><td className="value">{value}</td><td className='difference'><DifferenceIndicator value={value} compareValue={compareValue} partial={title === 'Today'} /></td></Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Sound level exceedance</h3>
      <table className="diffTable">
        <tbody>
          <tr>
            <th></th>
            {exceedance[0].columns.map(({ title }) => (
              <th key={title} colSpan={2}>{title}</th>
            ))}
          </tr>
          {exceedance.map(({ title, columns }) => (
            <tr key={title}>
              <th>{title}</th>
              {columns.map(({ value, compareValue, title }) => (
                <Fragment key={title}><td className="value">{value}%</td><td className='difference'><DifferenceIndicator inverted={true} value={value} compareValue={compareValue} partial={title === 'Today'} /></td></Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Recording consistency</h3>
      <table className="diffTable">
        <tbody>
          <tr>
            {recordingConsistency.map(({ title }) => (
              <th key={title} colSpan={2}>{title}</th>
            ))}
          </tr>
          <tr>
            {recordingConsistency.map(({ value, compareValue, title }) => (
              <Fragment key={title}><td className="value">{value}%</td><td className='difference'><DifferenceIndicator value={value} compareValue={compareValue} partial={title === 'Today'} /></td></Fragment>
            ))}
          </tr>
        </tbody>
      </table>
    </nav>
  )
}

export default Introduction
