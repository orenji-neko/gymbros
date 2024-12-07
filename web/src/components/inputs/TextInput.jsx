import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ type = "text", label, value, onChange, error }) => {
  return (
    <div className="mb-6 relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value) }
        className={`peer shadow appearance-none border rounded w-full h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-300 ease-in-out ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {label && (
        <label className={`absolute left-3 top-2 text-gray-700 text-sm bg-white px-1 transition-all duration-300 transform ${value ? '-translate-y-6 scale-75' : 'translate-y-0 scale-100'} peer-focus:-translate-y-6 peer-focus:scale-75`}>
          {label}
        </label>
      )}
      {error && <p className="text-red-500 text-xs italic mt-2 transition-opacity duration-300">{error}</p>}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  label: '',
  placeholder: '',
  error: '',
};

export default TextInput;
