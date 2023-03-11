import Color from 'color';

function CheckboxOptions({ name, options, currValues, setCurrValues }) {

  function renderOption({ title, value, color }) {
    const checked = currValues.includes(value);
    const backgroundColor = Color(color).fade(.9);
    const textColor = Color(color).darken(.2);
    return (
      <label key={value} style={{ backgroundColor, color: textColor }}>
        <input
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={() => checked ? setCurrValues(currValues.filter(val => val !== value)) : setCurrValues([...currValues, value])}
        />
        {title}
      </label>
    )
  }

  return (
    <span className="CheckboxOptions">
      {name}: {options.map(renderOption)}
    </span>
  )
}

export default CheckboxOptions
