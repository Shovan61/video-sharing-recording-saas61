"use client";
import { Button } from "@/components/ui/button";
import { useCreateFolder } from "@/hooks/useCreateFolder";
import { FolderIcon, LoaderIcon } from "lucide-react";
import React from "react";

type Props = {
	workspaceId: string;
};

function CreateFolders({ workspaceId }: Props) {
	const { onCreateFolder, isPending } = useCreateFolder(workspaceId);

	return (
		<Button
			disabled={isPending}
			className="cursor-pointer bg-white rounded hover:bg-neutral-300 transition-colors text-black font-bold px-2 py-1"
			onClick={onCreateFolder}
		>
			{isPending ? (
				<LoaderIcon className='animate-spin'/>
			) : (
				<>
					<FolderIcon />
					Create Folder
				</>
			)}
		</Button>
	);
}

export default CreateFolders;
