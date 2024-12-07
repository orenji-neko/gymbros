import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Sidebar = ({ className, children, show }) => {
  return (
    <div
      className={`
         ${className} 
        fixed top-0 left-0 z-50 flex flex-col w-64 h-full bg-gray-800 text-white transition-transform duration-500
        p-2 space-y-2
        ${!show ? ' -translate-x-full ' : ' translate-x-0 '}
      `}
    >
      {children}
    </div>
  );
};

Sidebar.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node,
  className: PropTypes.string
};
Sidebar.defaultProps = {
  className: "",
};

const SidebarItem = ({ className, label, onClick }) => {
  return (
    <button 
      className={`
         ${className}
        px-4 py-3
        hover:bg-gray-700
        rounded-3xl
      `}
      onClick={() => onClick() }
    >
      {label}
    </button>
  );
};
SidebarItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};
SidebarItem.defaultProps = {
  className: "",
  onClick: () => {}
};

export default Sidebar;
export { SidebarItem };
