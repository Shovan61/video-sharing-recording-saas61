"use client";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import FolderReducer from './slices/folders'
import WorkspacesReducer from './slices/workspaces'

const rootReducer = combineReducers({
    FolderReducer,
    WorkspacesReducer
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMddleware) => {
		return getDefaultMddleware({
			serializableCheck: false,
		});
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
