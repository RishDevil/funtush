import moment from "moment";
import { BASE_URL } from "./../utils/constants";
import { GiAerialSignal } from "react-icons/gi";
import { decode } from "html-entities";
import { useQuery } from "@tanstack/react-query";
import useVideoDetailsFetcher from "../utils/useVideoDetailsFetcher";
import useChannelFetcher from "../utils/useChannelFetcher";

const VedioCard = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
    statistics,
  } = video;

  const decodeTitle = decode(title);
  const _videoId = id?.videoId || contentDetails?.videoId || id;

  const { data: videoDetails } = useVideoDetailsFetcher(
    "home",
    "video_card",
    _videoId
  );

  let views, duration;

  if (contentDetails && statistics) {
    duration = contentDetails?.duration;
    views = statistics.viewCount;
  } else {
    duration = videoDetails?.contentDetails?.duration;
    views = videoDetails?.statistics?.viewCount;
  }

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const { channelIcon2 } = useChannelFetcher("home", "video_card", channelId);

  return (
    <div className=" flex flex-col w-full min-h-[320px]  gap-2 custom-box pb-1 ">
      <div className="relative ">
        <img src={medium.url} className="  w-full object-cover rounded-xl" />
        <div className="absolute opacity-70 text-sm py-1 px-2 right-1 bottom-1 bg-black w-auto rounded-xl text-white">
          {_duration}
        </div>
      </div>
      <div className="flex flex-row ">
        <div className="flex gap-2">
          <div className=" items-center w-1/5 h-full   ">
            <img
              className="h-10 w-10 object-cover rounded-[50%]"
              src={channelIcon2}
            />
          </div>
          <div className="flex flex-col gap-2 justify-start ">
            <div className=" font-semibold text-base leading-snug ">
              {decodeTitle.length > 60
                ? decodeTitle.slice(0, 60) + "..."
                : decodeTitle}
            </div>
            <div className=" text-xs pt-2 ">{channelTitle}</div>
            <div className="text-xs pt-1 ">
              <span>
                {Intl.NumberFormat("en", { notation: "compact" }).format(views)}{" "}
                views
              </span>
              <span> • </span>
              <span>{moment(publishedAt).fromNow()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VedioCard;
