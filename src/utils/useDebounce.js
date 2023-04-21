const useDebounce = (fn, timeOut = 400) => {
  let timer = null;
  return (...arg) => {
    if (timer !== null) clearTimeout(timer);
    console.log("debounce");
    timer = setTimeout(() => {
      fn.apply(this, arg);
      console.log(arg);
    }, timeOut);
  };
};

export default useDebounce;
