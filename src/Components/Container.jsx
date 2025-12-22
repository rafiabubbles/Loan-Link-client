import React from "react";

const Container = ({ children, className }) => {
  return <div className={`sm:w-11/12 mx-auto ${className}`}>{children}</div>;
};

export default Container;
