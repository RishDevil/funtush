import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BASE_URL } from "./constants";

const useVideoDetailsFetcher = (page, type, videoId) => {
  const getVideoDetail = async () => {
    const response = await fetch(
      BASE_URL +
        `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${
          import.meta.env.VITE_APP_GOOGLE_KEY
        }`
    );
    const data = await response.json();
    return data.items[0];
  };

  const { data: videoDetails, isLoading } = useQuery({
    queryKey: [page, type, videoId],
    queryFn: () => getVideoDetail(videoId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return { videoDetails, isLoading };
};

export default useVideoDetailsFetcher;
