import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../slice/CategorySlice";
import { setsearch } from "../slice/searchSlice";
import { tags } from "../utils/constants";

const Tags = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.catg.category);

  useEffect(() => {
    const tag = document.querySelector(".tag");
    let down = false;
    let intialP;
    let sc;
    const handleMouseDown = (e) => {
      down = true;
      console.log(e);
      intialP = e.pageX;
      sc = tag.scrollLeft;
    };
    const handleMouseUp = (e) => {
      down = false;
      console.log(down);
    };
    const handleMouseOut = (e) => {
      down = false;
      console.log(down, " out");
    };
    const handleMove = (e) => {
      //   console.log(e);
      if (down === false) return;
      console.log("here");
      tag.scrollLeft = sc - (e.pageX - intialP);
    };
    tag.addEventListener("mousedown", (e) => handleMouseDown(e));
    tag.addEventListener("mouseup", (e) => handleMouseUp(e));
    tag.addEventListener("mouseleave", (e) => handleMouseOut(e));
    tag.addEventListener("mousemove", (e) => handleMove(e));
    return () => {
      tag.removeEventListener("mousedown", handleMouseDown);
      tag.removeEventListener("mouseup", handleMouseUp);
      tag.removeEventListener("mousemove", handleMove);
    };
  }, []);
  const handleCategory = (cat) => {
    dispatch(setsearch({ search: "" }));
    dispatch(setCategory({ category: cat }));
  };
  return (
    <div className="w-full items-center justify-center flex">
      <div className="tag tags-wrapper h-16  flex  px-2 py-2 gap-2  overflow-x-auto w-[calc(100vw-4rem)] ">
        {tags.map((tag, index) => (
          <button key={index} onClick={() => handleCategory(tag)}>
            <div
              className={`px-2 py-1 rounded-md dark:text-white text-black  ${
                tag === category
                  ? "bg-slate-400 custom-box-nohover"
                  : "bg-slate-50"
              }   justify-center w-fit whitespace-nowrap bg-slate-50 dark:bg-slate-600`}
            >
              {tag}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tags;
