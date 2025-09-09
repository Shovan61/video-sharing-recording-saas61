import { useAppSelector } from "./reduxHooks";
import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import { getWorkspaceFolders, MoveVideoLocation } from "@/actions/workspace";
import { useZodForm } from "./useZodForm";
import { moveFolderSchema } from "@/components/form/change-video-locaion/schema";
import { useRouter } from "next/navigation";

export const useMoveVideos = (videoId: string, currentWorkspaceId: string) => {
	//  get state from redux store
	const router = useRouter();
	const { folders } = useAppSelector((state) => state.FolderReducer);
	const { workspaces } = useAppSelector((state) => state.WorkspacesReducer);
	// create states
	const [isFetching, setisFetching] = useState(false);
	// state for folders
	const [isFolders, setisFolders] = useState<
		| ({
				_count: {
					videos: number;
				};
		  } & {
				id: string;
				name: string;
				createdAt: Date;
				workspaceId: string | null;
		  })[]
		| undefined
	>(undefined);

	const success = () => {
		return router.push(`/dashboard/${currentWorkspaceId}`)
	};

	// use mutation data optimistic change
	const { isPending, mutate } = useMutationData(
		["change-video-location"],
		(data: { folder_id: string; workspace_id: string }) => {
			return MoveVideoLocation(data.folder_id, videoId, data.workspace_id);
		},
		"workspace-folders",
		success
	);

	// hookforms usezodform
	const { errors, onFormSubmit, watch, register } = useZodForm(mutate, moveFolderSchema);

	const fetchFolders = async () => {
		try {
			setisFetching(true);
			const folders = await getWorkspaceFolders(currentWorkspaceId);
			setisFolders(folders.data);
		} catch (error) {
			console.log(error);
		} finally {
			setisFetching(false);
		}
	};

	useEffect(() => {
		fetchFolders();
	}, []);

	useEffect(() => {
		const workspace = watch(async (values) => {
			if (values.workspace_id) {
				fetchFolders();
			}
		});

		return () => workspace.unsubscribe();
	}, [watch]);

	return {
		register,
		isPending,
		isFolders,
		workspaces,
		isFetching,
		folders,
		errors,
		onFormSubmit,
	};
};
