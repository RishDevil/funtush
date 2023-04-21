import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BASE_URL } from "./constants";

const useChannelFetcher = (page, type, channelId) => {
  const get_channel_details = async (channelId) => {
    const response = await fetch(
      BASE_URL +
        `/channels?part=snippet%2Cstatistics%2CcontentDetails&id=${channelId}&key=${
          import.meta.env.VITE_APP_GOOGLE_KEY
        }`
    );
    const data = await response.json();
    return data.items[0];
  };

  const { data: channelDetails } = useQuery({
    queryKey: [page, type, channelId],
    queryFn: () => get_channel_details(channelId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
    enabled: !!channelId,
  });
  const channelIcon2 = channelDetails?.snippet?.thumbnails?.default?.url;
  return { channelDetails, channelIcon2 };
};

export default useChannelFetcher;
