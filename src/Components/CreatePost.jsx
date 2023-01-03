import React, { useRef } from "react";
import { newPost, addNewPost } from "../store/slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../store/slice/userSlice";

const CreatePost = () => {
  const titleRef = useRef();
  const contentRef = useRef();
  const authorRef = useRef();

  const dispatch = useDispatch();
  const users = useSelector(useUser);

  const makeNewPost = (e) => {
    e.preventDefault();

    if (
      titleRef.current.value.trim() === "" ||
      contentRef.current.value.trim() === ""
    )
      return;

    const title = titleRef.current.value;
    const body = contentRef.current.value;
    const userId = authorRef.current.value;

    dispatch(addNewPost({ title, body, userId }));

    titleRef.current.value = "";
    contentRef.current.value = "";
    authorRef.current.value = "";
  };

  return (
    <section className="createPost">
      <h2>Add a new Post</h2>

      <form>
        <fieldset>
          <label htmlFor="title">Post Title</label>
          <input type="text" id="title" name="title" ref={titleRef} />
        </fieldset>

        <fieldset>
          <label htmlFor="author">Author:</label>
          <select id="author" ref={authorRef}>
            <option value="">Choose Author</option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            cols="30"
            rows="4"
            name="content"
            ref={contentRef}
          />
        </fieldset>

        <button type="click" onClick={makeNewPost}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
