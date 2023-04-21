import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { BiLike, BiDislike } from "react-icons/bi";
import { TfiShare, TfiDownload, TfiMoreAlt } from "react-icons/tfi";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import useChannelFetcher from "../utils/useChannelFetcher";

const VideoMetaData = ({ videoDetails, channelId }) => {
  const [desc, setDesc] = useState(true);
  const [showButton, setShowButton] = useState("Show More");

  const { channelDetails } = useChannelFetcher(
    "watch_page",
    "channel_detail",
    channelId
  );
  useEffect(() => {
    //set description
    if (videoDetails?.snippet?.description.length > 40) {
      setDesc(videoDetails?.snippet?.description.slice(0, 40) + "...");
    } else {
      setDesc(videoDetails?.snippet?.description);
    }
  }, [videoDetails]);

  const toggleShowButton = () => {
    if (showButton === "Show More") {
      setDesc(videoDetails?.snippet?.description);
      setShowButton("Show Less");
    } else {
      setDesc(videoDetails?.snippet?.description.slice(0, 40) + " ...");
      setShowButton("Show More");
    }
  };
  return (
    channelDetails && (
      <div className="flex flex-col  px-2 gap-y-2 w-full pb-2">
        <div className="text-lg font-bold">{videoDetails.snippet.title}</div>
        <div className="flex gap-2 gap-y-4 justify-between w-full">
          <div className="flex flex-row  w-full justify-between gap-4">
            <div className="gap-2 flex ">
              <div className="h-10 w-10">
                <img
                  src={channelDetails.snippet.thumbnails.default.url}
                  className="rounded-[50%] object-cover w-full"
                ></img>
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-bold">
                  {channelDetails?.snippet?.localized?.title}
                </div>
                <div className="text-sm">
                  {Intl.NumberFormat("en", { notation: "compact" }).format(
                    channelDetails?.statistics?.subscriberCount
                  )}{" "}
                  subscribers
                </div>
              </div>
              <div className="ml-2">
                {" "}
                <button className="bg-black dark:bg-zinc-700  text-sm text-white rounded-2xl px-4 py-2 ">
                  {" "}
                  Subscribe
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center justify-end">
              <div className="button-wrapper flex bg-gray-200  rounded-2xl p-2">
                <button className="like   flex gap-1 items-center pr-2">
                  <div className="like_icon">
                    <BiLike
                      size="1.2rem"
                      className="text-gray-600 dark:text-white "
                    />
                  </div>
                  <div className="like_count ">
                    {Intl.NumberFormat("en", { notation: "compact" }).format(
                      videoDetails?.statistics?.likeCount
                    )}
                  </div>
                </button>
                <button className="cursor-pointer">
                  <div className="border-l-2 border-black/20 dark:border-white/50 pl-2">
                    <BiDislike
                      size="1.2rem"
                      className="text-gray-600 dark:text-white"
                    />
                  </div>
                </button>
              </div>
              <button className="share flex items-center gap-2 bg-gray-200 dark:bg-zinc-700 rounded-2xl p-2">
                <TfiShare />
                <span>Share</span>
              </button>
              <button className="download flex items-center justify-center gap-2 bg-gray-200 dark:bg-zinc-700  rounded-2xl p-2">
                <TfiDownload />
                <span>Download</span>
              </button>
              <button className="more flex items-center gap-2 bg-gray-200 rounded-2xl p-2 dark:bg-zinc-700  ">
                <TfiMoreAlt />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default VideoMetaData;
