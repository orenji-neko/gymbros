import PropTypes from 'prop-types';

const Button = ({ disabled = false, onClick, children, type = 'button', className = '' }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`
        py-2 px-4 font-semibold rounded-lg shadow-md w-full
        ${disabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}
        focus:outline-none focus:ring-2 focus:ring-opacity-75 
        transition-transform duration-300 ease-in-out transform 
        ${!disabled && 'hover:scale-105'} ${className}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

export default Button;