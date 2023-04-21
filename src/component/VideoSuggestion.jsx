import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import VedioCard from "./VedioCard";
import VideSuggestionCard from "./VideoSuggestionCard";

const VideoSuggestion = ({ videoId }) => {
  console.log("suggestion  ", videoId);
  const getSuggestedVideos = async (videoId) => {
    const response = await fetch(
      BASE_URL +
        `/search?part=snippet&relatedToVideoId=${videoId}&maxResults=15&type=video&key=${
          import.meta.env.VITE_APP_GOOGLE_KEY
        }`
    );
    const data = await response.json();
    return data.items;
  };

  const { data: suggestedVideos, isLoading } = useQuery({
    queryKey: ["watch-page", "video-suggestions", videoId],
    queryFn: () => getSuggestedVideos(videoId),
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="flex flex-col">
      {suggestedVideos?.map((sug, index) => {
        console.log(sug);
        return (
          <Link to={`/watch/${sug.id.videoId}`}>
            <VideSuggestionCard video={sug} />
          </Link>
        );
      })}
    </div>
  );
};

export default VideoSuggestion;
