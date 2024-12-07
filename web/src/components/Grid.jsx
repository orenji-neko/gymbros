import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({ children }) => {
  const gridClass = `
    grid 
    grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
    p-8 gap-8`;
  
  return (
    <div className={gridClass}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  children: PropTypes.node,
};

const GridItem = ({ children, className }) => {
  return (
    <div className={` ${className}  bg-white rounded-2xl shadow-lg `}>
      {children}
    </div>
  );
};

GridItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

GridItem.defaultProps = {
  className: '',
};

export default Grid;
export { Grid, GridItem };