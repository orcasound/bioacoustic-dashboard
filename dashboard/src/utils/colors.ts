import Color from 'color';

export const themeColors = {
  // disabled1: '#CECECE',
}

export const chartColors = [
  '#0663C7',
  '#0bbfa1',
  '#EF767A',
  '#ED8224',
  '#542344',
  '#EEB868',
  '#008BF8',
];

export function chartColor(index, subIndex = 0) {
  const cycledIndex = index % chartColors.length;
  const color = Color(chartColors[cycledIndex]);
  const modified = subIndex ? color.darken(.2 * subIndex) : color;
  return modified.hex();
}