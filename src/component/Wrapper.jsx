import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div className="max-w-9xl dark:text-white text-black dark:bg-black/90 bg-white  flex flex-col">
      {children}
    </div>
  );
};

export default Wrapper;
