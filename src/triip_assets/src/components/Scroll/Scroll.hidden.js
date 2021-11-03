import React from "react";
import { Scroll } from "./Scroll";

const ScrollHidden = ({ children, sx }) => {
  return (
    <Scroll>
      <div style={{ margin: "0 10px", height: "100%", ...sx }}>{children}</div>
    </Scroll>
  );
};

export default ScrollHidden;
