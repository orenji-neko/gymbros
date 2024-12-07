import PropTypes from "prop-types";
import { FaEdit } from "react-icons/fa";

const EditButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="edit-button bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
      aria-label="Edit"
    >
      <FaEdit className="h-4 w-4" />
    </button>
  )
}
EditButton.propTypes = {
  onClick: PropTypes.func
}

export default EditButton;