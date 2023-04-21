import React from "react";

const SiderBar = () => {
  const open = false;
  return (
    <div
      className={`sticky top-[4rem] dark:bg-slate-400 h-screen flex flex-col p-1 h-[calc(100vh-4rem)]
       ${open ? "w-[200px]" : "w-[6rem] "} bg-slate-800`}
    >
      sider bar
    </div>
  );
};

export default SiderBar;
