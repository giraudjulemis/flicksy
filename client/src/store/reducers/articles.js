import { createSlice } from "@reduxjs/toolkit";
import {
  addArticle,
  getPaginateArticles,
  changeArticleStatus,
  loadMore,
} from "../actions/articles";

export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    homeSort: {
      sortby: "_id",
      order: "desc",
      limit: 4,
      skip: 0,
    },
    loading: false,
    articles: [],
    current: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.lastAdded = action.payload;
      })
      .addCase(addArticle.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPaginateArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPaginateArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.adminArticles = action.payload;
      })
      .addCase(getPaginateArticles.rejected, (state) => {
        state.loading = false;
      })
      .addCase(changeArticleStatus.fulfilled, (state, action) => {
        state.adminArticles.docs = action.payload;
      })
      .addCase(loadMore.fulfilled, (state, action) => {
        state.homeSort.skip = action.payload.sort.skip;
        state.articles = action.payload.newState;
      });
  },
});

export default articlesSlice.reducer;
