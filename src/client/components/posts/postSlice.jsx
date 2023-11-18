import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllPosts,createPost,updatePost,fetchPostById } from './postAPI';

const initialState = {
  posts: [],
  status: 'idle',
  totalPosts: 0,
  selectedPost: null,
};

export const fetchAllPostsAsync = createAsyncThunk(
  'post/fetchAllPosts',
  async () => {
    const response = await fetchAllPosts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchPostByIdAsync = createAsyncThunk(
  'post/fetchPostById',
  async (id) => {
    const response = await fetchPostById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createPostAsync = createAsyncThunk(
  'post/create',
  async (post) => {
    const response = await createPost(post);
    return response.data;
  }
);

export const updatePostAsync = createAsyncThunk(
  'post/update',
  async (update) => {
    const response = await updatePost(update);
    return response.data;
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    clearSelectedProduct:(state)=>{
      state.selectedPost = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(fetchPostByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPostByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedPost = action.payload;
      })
      .addCase(createPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts.push(action.payload);
      })
      .addCase(updatePostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        state.posts[index] = action.payload;
        state.selectedPost = action.payload;

      });
  },
});

export const { clearSelectedPost } = postSlice.actions;

export const selectAllPosts = (state) => state.post.posts;
export const selectPostById = (state) => state.post.selectedPost;
export const selectPostListStatus = (state) => state.post.status;

export const selectTotalPosts = (state) => state.post.totalPosts;

export default postSlice.reducer;