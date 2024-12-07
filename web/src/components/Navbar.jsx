import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai"; // Import the burger icon

const Navbar = ({ onClickSidebar, title, isSidebarOpen, className }) => {

  const handleOnClick = () => {
    const event = {
      target: {
        isSidebarOpen: !isSidebarOpen
      }
    }
    onClickSidebar(event);
  }

  return (
    <nav className={`
         ${className} relative bg-gray-800 flex items-center justify-between px-4 py-5 transition-all duration-500 
      `}>
      <button onClick={handleOnClick} className="text-white focus:outline-none">
        <AiOutlineMenu 
          className={`
            h-6 w-6 transform transition-transform duration-500 
            ${isSidebarOpen ? 'rotate-90' : 'rotate-0'}
          `} 
        /> {/* Use the React icon */}
      </button>
      <div className="flex-1 px-4">
        <h1 className="text-white text-2xl">{title}</h1>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onClickSidebar: PropTypes.func,
  isSidebarOpen: PropTypes.func,
  title: PropTypes.string.isRequired,
  className: PropTypes.string
};
Navbar.defaultProps = {
  className: "",
};

export default Navbar;