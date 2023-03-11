import SunCalc from 'suncalc';
import { add, differenceInSeconds, eachDayOfInterval, format, max, min, parseISO } from 'date-fns';
import { Moon } from "lunarphase-js";

export function sunAndMoonData() {
  // ToDo: accept input date range and lat/lon
  // ToDo: ensure everything uses timezone of hydrophone
  const lat = 53.69919824095036;
  const lon = -130.4692817438937;
  const timeZone = 'America/Vancouver';

  // Dates will be at midnight in user's local timezone
  return eachDayOfInterval({
    start: parseISO('2021-01-01'),
    end: parseISO('2021-12-31'),
  }).map((midnightDate) => {
    // Get an iso date string
    // const isoDate = format(midnightDate, 'yyyy-MM-dd');
    // // Get a date object representing this date in the hydrophone timezone
    // const date = parseISO(`${isoDate}T00:00:00.000Z-0800`);
    // Try to correct for moon data given for wrong date
    const date = add(midnightDate, { hours: 12 });
    const sun = SunCalc.getTimes(date, lat, lon);
    const moon = {
      ...SunCalc.getMoonIllumination(date),
      ...SunCalc.getMoonTimes(date, lat, lon),
    }
    // Convert to local (BC) date time compatible with input
    // Get the greater of daylight illumination and moonlight illumination

    function formatHourOfDayForChart(dateOb) {
      if (!dateOb || isNaN(dateOb)) return null;
      const hour = parseFloat(dateOb.toLocaleString("en-US", {
        timeZone,
        hour: 'numeric',
        hourCycle: 'h24',
      }));
      const minute = parseFloat(dateOb.toLocaleString("en-US", {
        timeZone,
        minute: 'numeric',
      }));
      const minuteAsHourPortion = minute / 60;
      return hour + minuteAsHourPortion;
    }

    // function moonIllumination() {
    //   const sunlightHours = 24 - (differenceInSeconds(sun.sunrise, sun.sunset) / (60 * 60));
    //   if (moon.alwaysUp) return 24 - sunlightHours;
    //   const startsUp = moon.alwaysUp || moon.set && !moon.rise || moon.set < moon.rise;
    //   const endsUp = moon.alwaysUp || moon.set < moon.rise;
    // }

    function eveningMoonRise() {
      if (moon.alwaysUp) return formatHourOfDayForChart(sun.sunset);
      if (moon.alwaysDown) return null;
      if (moon.rise && !moon.set) {
        return formatHourOfDayForChart(max([moon.rise, sun.sunset]));
      }
      if (moon.set && !moon.rise) {
        return (moon.set > sun.sunset) ? formatHourOfDayForChart(sun.sunset) : null;
      }
      if (moon.rise > moon.set) {
        return formatHourOfDayForChart(max([moon.rise, sun.sunset]));
      }
      if (moon.set > moon.rise) {
        return (moon.set > sun.sunset) ? formatHourOfDayForChart(max([moon.rise, sun.sunset])) : null;
      }
      return null;
    }

    function eveningMoonSet() {
      if (moon.alwaysUp) return 24;
      if (moon.alwaysDown) return null;
      if (moon.rise && !moon.set) return 24;
      if (moon.set && !moon.rise) {
        return (moon.set > sun.sunset) ? formatHourOfDayForChart(moon.set) : null;
      }
      if (moon.rise > moon.set) return 24;
      if (moon.set > moon.rise) {
        return (moon.set > sun.sunset) ? formatHourOfDayForChart(moon.set) : null;
      }
      return null;
    }

    function illumination() {
      // Dawn to sunrise and sunset to dusk = twilight
      const strengths = {
        daylight: 50,
        twilight: 10,
        moonlight: 5,
      };
      const result = [];
      const minutesPerBracket = 5;
      const hours = 24;
      let minutes = 0;
      while (minutes < hours * 60) {
        const startTime = add(midnightDate, { minutes });
        const endTime = add(midnightDate, { minutes: minutes + minutesPerBracket });
        const findTimePortion = (open, close) => {
          if (open > close) return 0;
          const start = min([max([startTime, open]), endTime]);
          const end = max([min([endTime, close]), startTime]);
          return differenceInSeconds(end, start) / (60 * minutesPerBracket);
        }

        const moonlight = () => {
          const nextMidnight = add(midnightDate, { days: 1 });
          if (moon.alwaysUp) return 1;
          if (moon.alwaysDown) return 0;
          const moonRise = (moon.set && !moon.rise) ? midnightDate : moon.rise;
          const moonSet = (moon.rise && !moon.set) ? nextMidnight : moon.set;
          if (moonRise < moonSet) {
            return findTimePortion(moonRise, moonSet) * moon.fraction;
          } else {
            return (findTimePortion(midnightDate, moonSet) + findTimePortion(moonRise, nextMidnight)) * moon.fraction;
          }
        }
        const portions = {
          daylight: findTimePortion(sun.sunrise, sun.sunset),
          twilight: startTime > sun.solarNoon ? findTimePortion(sun.sunset, sun.dusk) : findTimePortion(sun.dawn, sun.sunrise),
          moonlight: moonlight(),
        };
        result.push(Object.entries(portions).reduce((result, [key, portion]) => Math.min(strengths.daylight, result + (portion * strengths[key])), 0))
        minutes = minutes + minutesPerBracket;
      }
      return result;
    }

    return {
      date: format(date, 'yyyy-MM-dd'),
      sunrise: formatHourOfDayForChart(sun.sunrise),
      sunset: formatHourOfDayForChart(sun.sunset),
      moonrise: formatHourOfDayForChart(moon.rise),
      moonset: formatHourOfDayForChart(moon.set),
      eveningMoonrise: eveningMoonRise(),
      eveningMoonset: eveningMoonSet(),
      moonFraction: moon.fraction,
      moonPhase: moon.phase,
      // hours that moon is up between midnight and sunrise, and midnight and sunset
      // moonIllumination: 
      illumination: illumination(),
      moonEmoji: Moon.lunarPhaseEmoji(date),
    };
  });
}

export const hoverTemplateStrings = {
  lunarAndSolar: "%{customdata.moonEmoji} ☀️⬆ %{customdata.sunrise} ☀️⬇ %{customdata.sunset}",
  date: "%{x|%a %b %-d, %Y}",
  recordingCoverage: "Recording coverage: <b style=\"color: %{customdata.recordingConsistencyTextColor}\">%{customdata.recordingConsistencyPercent:.0f}%</b>",
  detectionSummary: "Detections: <b>%{customdata.detections.numEvents}</b>  Calls: <b>%{customdata.detections.numCalls}</b>",
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function colorForValue(value) {
  // Green for good, red for bad
  const good = value >= .5;
  const baseColor = good ? {
    h: 140,
    s: 75,
    l: 28 * ((value * 2) - 1)
  } : {
    h: 0,
    s: 100,
    l: 44 * (1 - (value * 2))
  };
  return `hsl(${baseColor.h} ${baseColor.s}% ${baseColor.l}%)`;
}