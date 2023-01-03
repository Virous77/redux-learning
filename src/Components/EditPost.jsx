import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "../store/slice/userSlice";
import {
  useSelectPosts,
  selectPostById,
  updatePost,
} from "../store/slice/postSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id: postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(useUser);

  const initialState = {
    title: post.title,
    body: post.body,
    userId: post.userId,
  };

  const [editData, setEditData] = useState(initialState);
  const { title, body, userId } = editData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editPost = (e) => {
    e.preventDefault();

    dispatch(
      updatePost({
        id: postId,
        title,
        body,
        userId,
        reactions: post.reactions,
      })
    );
    navigate(`/post/${postId}`);
  };

  return (
    <section className="createPost">
      <h2>Add a new Post</h2>

      <form>
        <fieldset>
          <label htmlFor="title">Post Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="author">Author:</label>
          <select
            id="author"
            name="userId"
            value={userId}
            onChange={handleChange}
          >
            <option value="">Choose Author</option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="body">Content</label>
          <textarea
            id="body"
            cols="30"
            rows="4"
            name="body"
            value={body}
            onChange={handleChange}
          />
        </fieldset>

        <button type="click" onClick={editPost}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default EditPost;
