import PropTypes from 'prop-types';

const Selection = ({ onSelect = (value) => {}, value, options = [] }) => {
  return (
    <select
      className="px-4 py-2 rounded-xl"
      value={value}
      onChange={(e) => onSelect(e.target.value)}
    >
      {options.map((opt, index) => (
        <option key={index} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

Selection.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string, // Changed to string if selecting a single value
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  )
};

export default Selection;