import React from 'react';

const Cell = (props) => {
  return (
    <div
      id={props.id}
      className={props.className}
      onClick={props.onClick}
    ></div>
  );
};

export default Cell;
