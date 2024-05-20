import { createReducer } from "@reduxjs/toolkit";

import { postReducerTypes } from "../constants/constant";

const initialState = {
  Bookmarks: [],
};

const {
  postOfFollowingRequest,
  postOfFollowingSuccess,
  postOfFollowingFailure,
  clearErrors,
  likeRequest,
  likeSuccess,
  likeFailure,
  clearMessage,
  commentRequest,
  commentSuccess,
  commentFailure,
  deleteCommentRequest,
  deleteCommentSuccess,
  deleteCommentFailure,
  myPostRequest,
  myPostSuccess,
  myPostFailure,
  createPostRequest,
  createPostSuccess,
  createPostFailure,
  updateCaptionRequest,
  updateCaptionSuccess,
  updateCaptionFailure,
  deletePostRequest,
  deletePostSuccess,
  deletePostFailure,
  userPostRequest,
  userPostSuccess,
  userPostFailure,
  addBookMarkRequest,
  addBookMarkSuccess,
  addBookMarkFailure,
  removeBookmark
} = postReducerTypes;

export const postReducer = createReducer(initialState, (builder) => {
  builder.addCase(postOfFollowingRequest, (state) => {
    state.loading = true;
  });
  builder.addCase(postOfFollowingSuccess, (state, action) => {
    state.loading = false;
    state.post = action.payload;
  });
  builder.addCase(postOfFollowingFailure, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase(clearErrors, (state) => {
    state.error = null;
  });
});

export const likeReducer = createReducer(initialState, (builder) => {
  builder.addCase(likeRequest, (state) => {
    state.loading = true;
  });
  builder.addCase(likeSuccess, (state, action) => {
    state.loading = false;
    state.message = action.payload;
  });

  builder.addCase(likeFailure, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  builder.addCase(clearErrors, (state) => {
    state.error = null;
  });
  builder.addCase(clearMessage, (state) => {
    state.message = null;
  });
});

export const commentReducer = createReducer(initialState, builder => {
  builder.addCase(commentRequest, (state) => {
    state.loading = true;
  })

  builder.addCase(commentSuccess, (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })

  builder.addCase(commentFailure, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })

  builder.addCase(deleteCommentRequest, (state) => {
    state.loading = true;
  })

  builder.addCase(deleteCommentSuccess, (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })

  builder.addCase(deleteCommentFailure, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })

  builder.addCase(clearErrors, (state) => {
    state.error = null;
  })

  builder.addCase(clearMessage, (state) => {
    state.message = null;
  })
});

export const myPostReducer = createReducer(initialState, builder => {
  builder.addCase(myPostRequest, (state) => {
    state.loading = true;
  })

  builder.addCase(myPostSuccess, (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  })

  builder.addCase(myPostFailure, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })

  builder.addCase(clearErrors, (state) => {
    state.error = null;
  })
});

export const createPostReducer = createReducer(initialState, builder => {
  builder.addCase(createPostRequest, (state) => {
    state.loading = true;
  })

  builder.addCase(createPostSuccess, (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })

  builder.addCase(createPostFailure, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })

  builder.addCase(updateCaptionRequest, (state) => {
    state.loading = true;
  })

  builder.addCase(updateCaptionSuccess, (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })

  builder.addCase(updateCaptionFailure, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })

  builder.addCase(deletePostRequest, (state) => {
    state.loading = true;
  })

  builder.addCase(deletePostSuccess, (state, action) => {
    state.loading = false;
    state.message = action.payload;
  })

  builder.addCase(deletePostFailure, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })

  builder.addCase(clearErrors, (state) => {
    state.error = null;
  })

  builder.addCase(clearMessage, (state) => {
    state.message = null;
  })
});

export const userPostReducer = createReducer(initialState, builder => {
  builder.addCase(userPostRequest, (state) => {
    state.loading = true;
  })

  builder.addCase(userPostSuccess, (state, action) => {
    state.loading = false;
    state.posts = action.payload;
  })

  builder.addCase(userPostFailure, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })

  builder.addCase(clearErrors, (state) => {
    state.error = null;
  })
});

export const addBookMarkReducer = createReducer(initialState,builder => {
  builder.addCase(addBookMarkRequest, (state, action) => {
    state.loading = true;
  })
  builder.addCase(addBookMarkSuccess, (state, action) => {
    state.loading = false;
    state.Bookmarks = action.payload;
  })
  builder.addCase(addBookMarkFailure, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  builder.addCase(removeBookmark, (state, action) => {
    state.loading = false;
    state.Bookmarks = [state.Bookmarks].filter(
      (bookmark) => bookmark._id === action.payload
    );
  })
  builder.addCase(clearMessage, (state) => {
    state.message = null;
  })
});
