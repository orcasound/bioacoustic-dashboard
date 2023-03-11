import { round } from '../utils/math';

function DifferenceIndicator({ value, compareValue, partial = false, inverted = false }) {

  const decimalPoints = 0;
  const roundedValue = round(parseInt(value || 0), decimalPoints, false);
  const roundedCompareValue = round(parseInt(compareValue || 0), decimalPoints, false);

  const diffPercent = (() => {
    if (roundedValue !== roundedCompareValue && (roundedValue === 0 || roundedCompareValue === 0)) return "∞";
    if (roundedValue === roundedCompareValue) return round(0, decimalPoints);
    return round(((roundedValue - roundedCompareValue) * 100) / roundedCompareValue, decimalPoints);
  })();

  const shift = (() => {
    if (roundedValue > roundedCompareValue) return 'increase';
    if (roundedValue < roundedCompareValue) return 'decrease';
    return 'neutral';
  })();

  const status = (() => {
    if (shift === 'decrease') return inverted ? 'good' : 'bad';
    if (shift === 'increase') return inverted ? 'bad' : 'good';
    return '';
  })();

  function renderValue() {
    const negative = `${diffPercent}`[0] === '-';
    return negative ? <><span className="minus">-</span>{`${diffPercent}`.slice(1)}</> : diffPercent;
  }

  return (
    <span className={["DifferenceIndicator", status, shift, partial ? "partial" : ""].join(" ")}>
      {renderValue()}%
    </span>
  )
}

export default DifferenceIndicator
