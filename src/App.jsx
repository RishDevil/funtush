import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Wrapper from "./component/Wrapper";
import SiderBar from "./component/SideBar";
import VedioGallery from "./component/VedioGallery";
import Header from "./component/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Home from "./component/Home";
import VideoWatch from "./component/VideoWatch";
import { useSelector } from "react-redux";

export const queryClient = new QueryClient();

function App() {
  const { appTheme } = useSelector((state) => state.theme);
  useEffect(() => {
    if (appTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [appTheme]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/watch/:videoId" element={<VideoWatch />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
