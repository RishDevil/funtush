import React, { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiSearch } from "react-icons/tfi";
import { MdKeyboardVoice } from "react-icons/md";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../slice/ThemeSlice";
import { setsearch } from "../slice/searchSlice";
import { YOUTUBE_SEARCH_SUGGESTION_API_URL } from "../utils/constants";
import SuggestionDropDown from "./SuggestionDropDown";
import useClickOutSide from "../utils/useClickOutSide";
import useDebounce from "../utils/useDebounce";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const { appTheme } = useSelector((state) => state.theme);
  const searchRef = useClickOutSide(() => {
    setLoading(true);
  });

  console.log(appTheme + "  heder");
  const haddleToggle = () => {
    dispatch(setTheme());
  };

  const handleSearch = useDebounce((e) => {
    if (e.target.value.trim() !== "") {
      const value = e.target.value;
      setSearch(value);
      console.log(" target ", value);
    }
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getAutocompletion = async (searchText) => {
      console.log("api call made for text -> ", searchText);
      const response = await fetch(
        YOUTUBE_SEARCH_SUGGESTION_API_URL + searchText,
        signal
      );
      const data = await response.json();
      //   dispatch(cacheResults({ [searchText]: data[1] }));
      console.log(data);
      setSuggestions(data[1]);
    };

    try {
      //   if (search.length > 2) getAutocompletion(search);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }

    return () => {
      controller.abort("cancel request");
    };
    // eslint-disable-next-line
  }, [search]);

  return (
    <div className=" z-10 sticky top-0 w-full h-[4rem] flex flex-row  gap-1 justify-between items-center px-2 lg:p-4 dark:bg-black/90 bg-white">
      <div className="flex justify-start gap-4 items-center">
        <div className="hidden p-2 hover:bg-slate-100 hover:rounded-full dark:hover:bg-slate-700">
          ``
          <RxHamburgerMenu
            size="1.5rem"
            title="hambergur menu"
            className="cursor-pointer "
          />
        </div>

        <Link to="/">
          <div className="">logo</div>
        </Link>
      </div>
      <div
        ref={searchRef}
        className="bg-white dark:bg-black rounded-2xl flex w-3/5 2xl:w-2/5 gap-2 items-center"
      >
        <div className=" searchbar flex flex-1 items-center border-2 rounded-3xl relative">
          <input
            type="text"
            placeholder="search..."
            onChange={(e) => handleSearch(e)}
            onFocus={(e) => {
              setLoading(false);
            }}
            className="w-full rounded-l-3xl focus:outline-none  px-2 text-black dark:text-white dark:bg-black/90 sm:px-8"
          />{" "}
          <div className="px-8 bg-white dark:bg-black rounded-xl">
            <TfiSearch
              size="1.2rem"
              className=""
              onClick={() => {
                dispatch(setsearch({ search }));
                navigate("/");
                setLoading(true);
              }}
            />
          </div>
          {!loading && (
            <SuggestionDropDown
              suggestions={suggestions}
              setLoading={setLoading}
              setSuggestions={setSuggestions}
              setSearchQuery={setSearch}
            />
          )}
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <div className="toggle-dark-mode-switch  flex items-center gap-2">
          <label
            htmlFor="check"
            className="bg-gray-100 dark:bg-zinc-700 relative top-0 w-auto p-2 h-8 rounded-2xl cursor-pointer flex items-center justify-around dark:text-black transition duration-1000"
            onClick={haddleToggle}
          >
            {appTheme === "dark" ? (
              <BsFillSunFill className="text-amber-400" size="1.2rem" />
            ) : (
              <BsFillMoonFill className="text-zinc-700" size="1.2rem" />
            )}
          </label>
        </div>

        <div className="p-2 max-sm:hidden  hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full cursor-pointer">
          <RiVideoAddLine size="1.5rem" />
        </div>
        <div className="p-2 max-sm:hidden  hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full cursor-pointer">
          <IoMdNotificationsOutline size="1.5rem" />
        </div>
        <div className="p-2 max-sm:hidden   hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full cursor-pointer">
          <FaUserCircle size="1.5rem" />
        </div>
      </div>
    </div>
  );
};

export default Header;
