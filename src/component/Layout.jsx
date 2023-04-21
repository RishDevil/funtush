import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SiderBar from "./SideBar";
import VedioGallery from "./VedioGallery";
import Wrapper from "./Wrapper";

const Layout = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <Outlet />
      </Wrapper>
    </>
  );
};

export default Layout;
