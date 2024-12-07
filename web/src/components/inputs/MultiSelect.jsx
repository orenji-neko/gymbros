import PropTypes from "prop-types";
import React from "react";
import Select from "react-select";

const MultiSelect = ({ options, value, onChange }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: "#d1d5db", // Tailwind CSS gray-300
      minHeight: "3rem",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure the dropdown is on top
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#3b82f6", // Tailwind CSS blue-500
      color: "white",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "white",
      ':hover': {
        backgroundColor: "#2563eb", // Tailwind CSS blue-600
        color: "white",
      },
    }),
  };

  return (
    <div className="w-full">
      <Select
        isMulti
        value={value}
        onChange={onChange}
        options={options}
        styles={customStyles}
        className="w-full"
        classNamePrefix="react-select"
      />
    </div>
  );
};

MultiSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

MultiSelect.defaultProps = {
  value: [],
};

export default MultiSelect;
