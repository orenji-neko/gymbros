import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";

const AddButton = ({ onClick, className }) => {
  return (
    <button 
      onClick={onClick} 
      className={`  ${className}  edit-button bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition`}
      aria-label="Edit"
    >
      <FaPlus className="h-4 w-4" />
    </button>
  )
}
AddButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default AddButton;