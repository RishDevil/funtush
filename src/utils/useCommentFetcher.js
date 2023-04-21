import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BASE_URL } from "../utils/constants";

const useCommentFetcher = (page, type, videoId) => {
  const getComments = async (nextPageToken = "") => {
    const response = await fetch(
      BASE_URL +
        `/commentThreads?part=snippet%2Creplies&order=relevance&key=${
          import.meta.env.VITE_APP_GOOGLE_KEY
        }&videoId=${videoId}&textFormat=plainText&pageToken=${
          nextPageToken ?? ""
        }`
    );
    const data = await response.json();
    return data;
  };

  const { data, isLoading, fetchNextPage, isSuccess, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [page, type, videoId],
      queryFn: ({ pageParam = null }) => getComments(pageParam),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.nextPageToken;
      },
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    });

  return { data, isLoading, fetchNextPage, isSuccess, isFetchingNextPage };
};

export default useCommentFetcher;
