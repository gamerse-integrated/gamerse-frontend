import React, { useEffect } from "react";
const getPoison = (style) => {
  let choice = new Date().getMinutes() % 3;
  switch (choice) {
    case 0:
      return (
        <div className="poison" style={style}>
          🥬
        </div>
      );
    case 1:
      return (
        <div className="poison" style={style}>
          🥦
        </div>
      );
    case 2:
      return (
        <div className="poison" style={style}>
          🥑
        </div>
      );

    default:
      return (
        <div className="poison" style={style}>
          ☠
        </div>
      );
  }
};
const Poison = (props) => {
  useEffect(() => {
    console.log("Inside poison");
  });
  if (props["dot"]) {
    const style = {
      left: `${props.dot[0]}%`,
      top: `${props.dot[1]}%`,
    };

    return getPoison(style);
  } else {
    return <div></div>;
  }
};
export default Poison;
