import React, { useEffect } from "react";
const Poison = (props) => {
  useEffect(() => {
    console.log("Inside poison");
  });
  if (props["dot"]) {
    const style = {
      left: `${props.dot[0]}%`,
      top: `${props.dot[1]}%`,
    };

    return <div className="poison" style={style}></div>;
  } else {
    return <div></div>;
  }
};
export default Poison;
