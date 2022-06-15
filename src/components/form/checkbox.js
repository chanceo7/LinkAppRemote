import React, { useState, useEffect } from "react";

export default function Checkbox(props) {
  const [check, setCheck] = useState(false);

  const checkbox = {
    border: "1px solid transparent",
    height: "20px",
    width: "20px",
  };

  const container = {
    width: "fit-content",
  };

  useEffect(() => {}, [props.state]);

  return (
    <div onClick={props.click}>
      {" "}
      <div className={container}>
        {props.state ? (
          <svg className={checkbox} viewBox="0 0 50 50">
            <circle
              class="circle"
              cx="25"
              cy="25"
              r="24"
              stroke="black"
              stroke-width="0"
              fill="rgb(23, 166, 185)"
            />
            <path
              d="M 9 26 L 20 40 L 41 17 "
              stroke="white"
              stroke-width="3"
              fill="none"
            />
          </svg>
        ) : (
          <svg className={checkbox} viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="23"
              stroke="black"
              stroke-width="3"
              fill="none"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
