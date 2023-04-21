import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { BASE_URL } from "./../utils/constants";

import { useQuery } from "@tanstack/react-query";
import VideoMetaData from "./VideoMetaData";
import Shimmer from "./Shimmer";
import Comment from "./Comment";
import VideoSuggestion from "./VideoSuggestion";
import useVideoDetailsFetcher from "../utils/useVideoDetailsFetcher";

const VideoWatch = (props) => {
  const { videoId } = useParams();
  const handleSummaryButtonClick = async () => {
    const text = `Summarize the YouTube video in Points and in details\nTitle: ${videoDetails?.snippet?.title} by ${videoDetails?.snippet?.channelTitle}`;

    const copyToClipboard = async (str) => {
      if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return await navigator.clipboard.writeText(str);
      return Promise.reject("The Clipboard API is not available.");
    };
    await copyToClipboard(text);
    showPopup();
    window.open("https://chat.openai.com/chat", "_blank");
  };

  const { videoDetails, isLoading } = useVideoDetailsFetcher(
    "watch_page",
    "vedio_detail",
    videoId
  );

  return (
    <div className="grid grid-cols-12 w-full h-fit md:gap-x-8 px-4 md:px-12 2xl:px-24 gap-y-4 pt-4 ">
      <div className=" col-span-12 lg:col-span-8">
        <div className="mb-4">
          <div className="mb-4 h-[32vh] md:h-[50vh] lg:h-[50vh] 2xl:h-[70vh]">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
              title={videoDetails?.snippet?.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;  web-share"
              allowFullScreen
            ></iframe>
          </div>
          {isLoading ? (
            "Loding"
          ) : (
            <VideoMetaData
              videoDetails={videoDetails}
              channelId={videoDetails?.snippet?.channelId}
            />
          )}

          <Comment
            videoId={videoId}
            commentCount={videoDetails?.statistics?.commentCount}
          />
        </div>
      </div>
      <div className=" col-span-12 lg:col-span-4">
        <VideoSuggestion videoId={videoId} />
      </div>
    </div>
  );
};

export default VideoWatch;
