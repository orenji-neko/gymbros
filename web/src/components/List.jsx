import PropTypes from "prop-types";

const List = ({ children }) => {
  return (
    <div className="list-container bg-gray-100 p-4 rounded-xl space-y-4">
      {children}
    </div>
  );
}

List.propTypes = {
  children: PropTypes.node.isRequired,
};

const ListItem = ({ children }) => {
  return (
    <div className={`
        p-6 flex justify-between items-center
        bg-white rounded-xl
      `}>
      <div>
        { children }
      </div>
    </div>
  );
}

ListItem.propTypes = {
  children: PropTypes.node,
};

export default List;
export { ListItem };
