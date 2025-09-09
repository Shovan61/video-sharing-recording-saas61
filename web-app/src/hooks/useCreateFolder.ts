import { CreateFolders } from "@/actions/workspace";
import { useMutationData } from "./useMutationData";

export const useCreateFolder = (workspaceId: string) => {
	const { mutate, isPending } = useMutationData(
		["create-folder"],
		() => {
			return CreateFolders(workspaceId);
		},
		"workspace-folders"
	);

	const onCreateFolder = () => {
		mutate({ name: "Untitled", id: "optimistic--id" });
	};

	return { onCreateFolder, isPending };
};
