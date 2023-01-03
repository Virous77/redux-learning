import { sub, parseISO, formatDistanceToNow } from "date-fns";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useSelectPosts,
  reactionsAdd,
  useSelectStatus,
  useSelectError,
  fetchPosts,
  deletePost,
} from "../store/slice/postSlice";
import { fetchUser, useUser } from "../store/slice/userSlice";
import { Link } from "react-router-dom";

const PostList = () => {
  const posts = useSelector(useSelectPosts);
  const error = useSelector(useSelectError);
  const status = useSelector(useSelectStatus);
  const user = useSelector(useUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  const emoji = {
    thumbsUp: "👍",
    wow: "😯",
    heart: "❤️",
    rocket: "🚀",
    coffee: "🍵",
  };

  if (status === "loading")
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (posts.status === "failed")
    return <p style={{ textAlign: "center" }}>{error}</p>;

  return (
    <section className="postlist">
      <h1>Post</h1>
      {posts.map((post, idx) => {
        const time = post.date
          ? parseISO(post?.date)
          : parseISO(sub(new Date(), { minutes: 10 })?.toISOString());

        return (
          <div className="postList" key={idx}>
            <Link to={`/post/${post.id}`}>
              <h3>{post.title}</h3>
              <p>
                {post.body?.length > 300
                  ? post.body?.substring(0, 300)
                  : post.body}
              </p>
              <div className="authorDetails">
                {post.userId ? (
                  <span>
                    By {user[post?.userId]?.name || "Unknown Author"}{" "}
                  </span>
                ) : (
                  <span>By {user[post?.userId]?.name}</span>
                )}

                {post?.date ? (
                  <b>{formatDistanceToNow(time)} ago</b>
                ) : (
                  <b>{formatDistanceToNow(time)} ago</b>
                )}
              </div>
            </Link>

            <div className="reaction">
              {Object.entries(post.reactions).map(([name, value]) => (
                <p
                  onClick={() =>
                    dispatch(reactionsAdd({ postId: post.id, reaction: name }))
                  }
                  key={name}
                >
                  <span>{emoji[name]}</span>
                  {value}
                </p>
              ))}
            </div>

            <p
              onClick={() => {
                dispatch(deletePost({ id: post.id }));
              }}
            >
              Delete
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default PostList;
