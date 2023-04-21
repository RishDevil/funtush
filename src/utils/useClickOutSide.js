import React, { useEffect, useRef } from "react";

const useClickOutSide = (handle) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref && !ref.current.contains(e.target)) handle();
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return ref;
};

export default useClickOutSide;
