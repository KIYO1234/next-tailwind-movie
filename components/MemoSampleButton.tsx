import React, { memo, useState, useCallback, useMemo } from "react";

const MemoSampleButton = (props) => {
  console.log("MemoSampleButton");

  const [isHover, setIsHover] = useState(false);
  const title = "MemoSampleButton";

  return (
    <>
      <button
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{
          background: isHover ? "red" : "blue",
          color: "white",
          padding: 10,
          marginLeft: 30,
          marginBottom: 100,
        }}
        onClick={props.onClick}
      >
        {title}
      </button>
    </>
  );
};

export default MemoSampleButton;
