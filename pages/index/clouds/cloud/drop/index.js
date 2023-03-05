import React from "react";

const Drop = ({ positionX, positionY, dropColor }) => {
  const styleCss = {
    top: positionY,
    left: positionX,
    background: dropColor,
  };

  return <div className="w-[1.5px] h-[5px] absolute" style={styleCss} />;
};

export default Drop;
