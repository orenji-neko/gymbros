import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";

const DeleteButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="delete-button bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
      aria-label="Delete"
    >
      <FaTrash className="h-4 w-4" />
    </button>
  )
}
DeleteButton.propTypes = {
  onClick: PropTypes.func
}

export default DeleteButton;