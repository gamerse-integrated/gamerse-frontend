import React from "react";
export default (props) => {
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
