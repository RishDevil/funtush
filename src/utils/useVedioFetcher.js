import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";

const useVedioFetcher = (page, type, category) => {
  const getVideos = async (nextPageToken = "") => {
    try {
      const response = await fetch(
        BASE_URL +
          `/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=8&chart=mostPopular&regionCode=IN&pageToken=${
            nextPageToken ?? ""
          }&videoDuration=medium&key=` +
          import.meta.env.VITE_APP_GOOGLE_KEY
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const { data, isLoading, fetchNextPage, isFetchingNextPage, isSuccess } =
    useInfiniteQuery(
      [page, type, category],
      ({ pageParam = null }) =>
        category === "All"
          ? getVideos(pageParam)
          : searchVideoByKeyword(category, pageParam),
      {
        getNextPageParam: (lastPage, pages) => {
          return lastPage?.nextPageToken;
        },
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 1000 * 60 * 60 * 24,
        cacheTime: 1000 * 60 * 60 * 24,
      }
    );

  const searchVideoByKeyword = async (searchText, nextPageToken = "") => {
    try {
      const response = await fetch(
        BASE_URL +
          `/search?part=snippet&maxResults=8&type=video&q=${searchText}&pageToken=${
            nextPageToken ?? ""
          }&videoDuration=medium&key=${import.meta.env.VITE_APP_GOOGLE_KEY}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return { data, isLoading, fetchNextPage, isFetchingNextPage, isSuccess };
};

export default useVedioFetcher;
