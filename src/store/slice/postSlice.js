import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import sub from "date-fns/sub";

const POST_URL = `https://jsonplaceholder.typicode.com/posts`;

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const res = await axios.get(POST_URL);
    return res.data;
  } catch (error) {
    return error.message;
  }
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const res = await axios.post(POST_URL, initialPost);
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (initialPost) => {
    let { id } = initialPost;
    try {
      const res = await axios.put(`${POST_URL}/${id}`, initialPost);
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete(`${POST_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err) {
      return err.message;
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    newPost: {
      reducer(state, action) {
        state.posts.unshift(action.payload);
      },

      prepare(title, body, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            authorName: userId,
            date: new Date().toISOString(),
            reactions: { thumbsUp: 0, wow: 0, heart: 0, rocket: 0, coffee: 0 },
          },
        };
      },
    },

    reactionsAdd(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);

      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        let min = 1;

        const loadPosts = action.payload.slice(0, 10).map((post) => {
          post.date = sub(new Date(), { minutes: min++ })?.toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });

        state.posts = loadPosts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId) - 1;
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        };
        state.posts.unshift(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const { newPost, reactionsAdd, fetchData } = postSlice.actions;
export const useSelectPosts = (state) => state.posts.posts;
export const useSelectStatus = (state) => state.posts.status;
export const useSelectError = (state) => state.posts.error;

export const selectPostById = (state, postId) => {
  return state.posts.posts.find((post) => post.id === postId);
};

export default postSlice.reducer;
