import React, { Fragment, useEffect, useRef } from "react";
import VedioCard from "./VedioCard";

import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import useObserverIntersection from "../utils/useObserverIntersection";
import useVedioFetcher from "../utils/useVedioFetcher";
import { useDispatch, useSelector } from "react-redux";
import { setsearch } from "../slice/searchSlice";

const VedioGallery = () => {
  const loadVideoRef = useRef();
  const reachedEnd = useObserverIntersection(loadVideoRef, {
    threshold: 0.5,
  });
  const dispatch = useDispatch();
  const category = useSelector((state) => state.catg.category);
  const search = useSelector((state) => state.srch.search);
  console.log(category, " gal ", search);
  const { data, isLoading, fetchNextPage, isFetchingNextPage, isSuccess } =
    useVedioFetcher(
      "vedio_home",
      "vedio_card",
      search !== "" ? search : category
    );
  // if (isSuccess && search !== "") {
  //   dispatch(setsearch({ search: "" }));
  //   console.log(" searc gallery");
  // }
  if (reachedEnd == true && data?.pages[0]) fetchNextPage();
  console.log(data?.pages[0]);
  return (
    <>
      {isLoading ? (
        <div
          className={`relative w-full grid justify-center  grid-cols-[repeat(auto-fill,minmax(310px,_1fr))] max-xl:grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-[2rem_1rem] 
    pt-6 px-8 overflow-x-hidden max-h-[calc(100vh- 4rem)] dark:text-white bg-slate-100`}
        >
          <Shimmer />
        </div>
      ) : (
        <div
          className={`relative w-full grid justify-center justify-items-center grid-cols-[repeat(auto-fill,minmax(310px,_1fr))] max-xl:grid-cols-[repeat(auto-fill,minmax(250px,_1fr))] gap-[2rem_1rem] 
    pt-6 px-8 overflow-x-hidden max-h-[calc(100vh- 4rem)] dark:text-white pb-2 `}
        >
          {isSuccess &&
            data?.pages?.map((page, inx) => {
              return (
                page?.items && (
                  <Fragment key={inx}>
                    {page?.items?.map((vedio, index) => (
                      <Link
                        key={index}
                        to={`/watch/${vedio?.id?.videoId || vedio?.id}`}
                      >
                        <VedioCard video={vedio} />
                      </Link>
                    ))}
                  </Fragment>
                )
              );
            })}

          {isFetchingNextPage && <Shimmer />}
        </div>
      )}
      {isSuccess && <div ref={loadVideoRef} className="mb-10"></div>}
    </>
  );
};

export default VedioGallery;
