import { useQuery } from "@tanstack/react-query";
import { decode } from "html-entities";
import moment from "moment";
import { BASE_URL } from "../utils/constants";
import useVideoDetailsFetcher from "../utils/useVideoDetailsFetcher";

const VideSuggestionCard = ({ video }) => {
  const {
    id: { videoId },
    snippet: {
      publishedAt,
      title,
      thumbnails: { medium },
      channelTitle,
    },
  } = video;

  const newTitle = decode(title);

  const { videoDetails, isLoading } = useVideoDetailsFetcher(
    "vedio_suggestion",
    "vedio_detail",
    videoId
  );
  const seconds =
    !isLoading &&
    moment.duration(videoDetails.contentDetails.duration).asSeconds();
  const _duration = !isLoading && moment.utc(seconds * 1000).format("mm:ss");

  return (
    !isLoading && (
      <div className="video flex  gap-2 md:gap-4  lg:gap-2 xl:gap-4 cursor-pointer mb-4 custom-box pr-2 h-[80px] xl:h-[120px] sm:h-[96px] ">
        <div className="video__thumbnail   relative top-0 left-0 lg:w-[150px] lg:flex-none xl:w-[200px]  h-[100%]">
          <img
            src={medium.url}
            className="rounded-xl w-full h-full object-cover"
            alt="video thumbnail"
          />
          <div className="absolute bottom-1 right-1 bg-black/80 px-2 py-1 rounded-md text-xs text-white">
            {_duration}
          </div>
        </div>
        <div className="video__details  py-1 justify-center h-[100%] items-center">
          <div className="h-[100%]">
            <div className="video-title  font-semibold text-sm md:text-base lg:text-sm leading-tight md:leading-normal lg:leading-tight  ">
              {newTitle.length > 32 ? newTitle.slice(0, 32) + "..." : newTitle}
            </div>
            <div className="small h-[50%]  ">
              <div className="channel-name text-xs xl:text-sm pt-2">
                {channelTitle}
              </div>
              <div className="text-xs ">
                <span>
                  {Intl.NumberFormat("en", { notation: "compact" }).format(
                    videoDetails.statistics.viewCount
                  )}{" "}
                  views
                </span>
                <span> • </span>
                <span>{moment(publishedAt).fromNow()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default VideSuggestionCard;
