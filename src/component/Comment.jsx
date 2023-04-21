import { MdOutlineSort } from "react-icons/md";

import { FaUserCircle } from "react-icons/fa";

import CommentCards from "./CommentCards";
import useCommentFetcher from "../utils/useCommentFetcher";

const Comment = ({ videoId, commentCount }) => {
  const { data, isLoading, fetchNextPage, isSuccess, isFetchingNextPage } =
    useCommentFetcher("watch_page", "vedio_comment", videoId);

  const comments = data?.pages?.flatMap((page) => page.items) ?? [];

  return isLoading ? (
    <div className="">loading....</div>
  ) : (
    <div className="flex p-2 mb flex-col">
      <div className="comment-stats flex flex-row items-center gap-8">
        <div className="comment-count font-medium ">
          {parseInt(commentCount).toLocaleString()} Comments
        </div>
        <div className="sort flex gap-2 cursor-pointer items-center">
          <MdOutlineSort size="1.5rem" />
          <span className="font-semibold text-sm">Sort by</span>
        </div>
      </div>
      <div className="add_comment text-sm flex items-center  gap-4 my-8 ">
        <div className="user_pic text-black">
          <FaUserCircle size="2.5rem" />
        </div>
        <div className="comment_input w-full ">
          <input
            className="border-b dark:border-white/50 w-full h-8 focus:outline-none py-2 focus:border-black focus:border-b-2 dark:bg-zinc-900"
            type="text"
            placeholder="Add a comment..."
          />
          <div className="flex justify-end gap-4 pt-2 font-semibold">
            <button className="hover:bg-zinc-200 dark:hover:bg-zinc-700 px-4 py-2 rounded-full">
              Cancel
            </button>
            <button className="bg-gray-200 px-4 py-2 rounded-3xl text-gray-500">
              Comment
            </button>
          </div>
        </div>
      </div>
      <div className="comments">
        {isSuccess &&
          comments.map((comment) => (
            <CommentCards key={comment.id} commentData={comment} />
          ))}
      </div>
      {isLoading || isFetchingNextPage ? (
        <div className="w-full">
          <img className="w-12 h-12 m-auto" src={""} alt="" />
        </div>
      ) : (
        <button
          className="w-full font-bold bg-gray-200 dark:bg-zinc-700 rounded-3xl px-4 py-1"
          onClick={fetchNextPage}
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default Comment;
