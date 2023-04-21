const Shimmer = ({ count = 12 }) => {
  return (
    <>
      {Array(count)
        .fill([])
        .map((e, index) => (
          <div key={index} className=" m-2 p-3 w-80 h-80">
            <div className="w-full h-1/2 border rounded-xl bg-64 custom-linear-gradient animate-pulse"></div>
            <div
              className="w-[90%] h-[10%] mt-3 border rounded-full
               bg-64 custom-linear-gradient animate-pulse "
            ></div>
            <div className="w-[70%] h-[7%]  mt-3 border rounded-full bg-64 custom-linear-gradient animate-pulse"></div>
          </div>
        ))}
    </>
  );
};
export default Shimmer;
