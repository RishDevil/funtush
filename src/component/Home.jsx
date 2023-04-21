import React from "react";
import SiderBar from "./SideBar";
import Tags from "./Tags";
import VedioGallery from "./VedioGallery";

const Home = () => {
  return (
    <div className={`flex flex-row w-full`}>
      <div className="w-full">
        <Tags />
        <VedioGallery />
      </div>
    </div>
  );
};

export default Home;
