import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
	folders: ({
		_count: {
			videos: number;
		};
	} & {
		id: string;
		name: string;
		createdAt?: Date;
		workspaceId: string;
	})[];
};

const initialState: initialStateProps = {
	folders: [],
};

export const folders = createSlice({
	name: "folders",
	initialState,
	reducers: {
		FOLDERS: (state, action: PayloadAction<initialStateProps>) => {
			return { ...action.payload };
		},
	},
});

export const { FOLDERS } = folders.actions;

export default folders.reducer;
