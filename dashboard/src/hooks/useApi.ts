// ToDo

import { useState } from 'react';
import { detectionTimeSeriesData } from '../data/detectionTimeSeriesData';
import { acousticEventsData } from '../data/acousticEventsData';
import { soundLevelData } from '../data/soundLevelData';
import { staticGraphicData } from '../data/staticGraphicData';
import { recordingEffortData } from '../data/recordingEffortData';
import { dataForDateRange } from '../utils/data';

function useApi(dataType, dateFrom, dateTo) {
  // const [dataCache, setData] = useState({});

  // const loading = false; // ToDo: infer from pending requests

  // const results = dataTypes.map(type => {
  //   const cacheTime = 5 * 60 * 1000;
  //   if (dataCache[type] && dataCache[type].updated > Date.now() - cacheTime) {
  //     return dataCache[type];
  //   }
  //   return 
  // })



  // ToDo: return from cache if recent, else fetch. Store in a context at top level.
  // https://www.npmjs.com/package/react-fetch-hook

  // POC solution
  const store = {
    detectionTimeSeriesData,
    acousticEventsData,
    soundLevelData,
    staticGraphicData,
    recordingEffortData,
  }

  return dataForDateRange(store[dataType], dateFrom, dateTo);
}

export default useApi;