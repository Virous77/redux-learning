import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPostById,
  fetchPosts,
  useSelectStatus,
  reactionsAdd,
} from "../store/slice/postSlice";
import { fetchUser, useUser } from "../store/slice/userSlice";
import { Link, useParams } from "react-router-dom";
import { sub, parseISO, formatDistanceToNow } from "date-fns";

const SinglePost = () => {
  const { id: postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const status = useSelector(useSelectStatus);
  const user = useSelector(useUser);

  // useEffect(() => {
  //   dispatch(fetchPosts());
  //   dispatch(fetchUser());
  // }, []);

  const emoji = {
    thumbsUp: "👍",
    wow: "😯",
    heart: "❤️",
    rocket: "🚀",
    coffee: "🍵",
  };

  const time = post?.date
    ? parseISO(post?.date)
    : parseISO(sub(new Date(), { minutes: 10 })?.toISOString());

  if (status === "loading") return <p>Loading...</p>;
  if (!post) return <p>No Post Found!</p>;

  return (
    <section className="postList">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <div className="authorDetails">
        {post.userId ? (
          <span>By {user[post?.userId]?.name || "Unknown Author"} </span>
        ) : (
          <span>By {user[post?.userId]?.name}</span>
        )}

        {post?.date ? (
          <b>{formatDistanceToNow(time)} ago</b>
        ) : (
          <b>{formatDistanceToNow(time)} ago</b>
        )}
      </div>

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

      <span>
        <Link to={`/edit-post/${postId}`}>Edit</Link>
      </span>
    </section>
  );
};

export default SinglePost;
