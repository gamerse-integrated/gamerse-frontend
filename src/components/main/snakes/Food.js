import React from "react";
const getFood = (style) => {
  let choice = new Date().getMinutes() % 3;
  switch (choice) {
    case 0:
      return (
        <div className="snake-food" style={style}>
          🍎
        </div>
      );
    case 1:
      return (
        <div className="snake-food" style={style}>
          🍌
        </div>
      );
    case 2:
      return (
        <div className="snake-food" style={style}>
          🥭
        </div>
      );

    default:
      return (
        <div className="snake-food" style={style}>
          🍍
        </div>
      );
  }
};

const Food = (props) => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`,
  };

  return getFood(style);
};
export default Food;
