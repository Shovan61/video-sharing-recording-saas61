/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, FolderIcon } from "lucide-react";
import React from "react";
import Folder from "./folder";
import { useQueryData } from "@/hooks/useQueryData";
import { getWorkspaceFolders } from "@/actions/workspace";
import { useMutationStateData } from "@/hooks/useMutationData";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { FOLDERS } from "@/redux/slices/folders";

type Props = {
	workspaceId: string;
};

export type FolderType = {
	status: 200 | 403;
	data:
		| {
				id: string;
				name: string;
				workspaceId: string;
				_count: {
					videos: number;
				};
		  }[]
		| [];
};

function Folders({ workspaceId }: Props) {
	const dispatch = useAppDispatch();
	// Get Folders
	const { data, isFetched } = useQueryData(["workspace-folders"], () =>
		getWorkspaceFolders(workspaceId)
	);
	//  Optimistic variable => in new data is there from query variable
	const { latestVariable } = useMutationStateData(["create-folder"]);

	const { status, data: folders } = data as FolderType;

	if (isFetched && folders) {
		dispatch(FOLDERS({ folders: folders }));
	}

	return (
		<div className="flex flex-col gap-4 px-2">
			<div className="flex items-centerronded w-full justify-between">
				<div className="flex items-center gap-4">
					<FolderIcon />
					<h2 className="text-gray-300 text-xl">Folders</h2>
				</div>
				<Button className="flex items-center gap-2 cursor-pointer rounded bg-white text-black p-2 font-bold hover:bg-gray-200 transition-colors">
					See More
					<ArrowRight />
				</Button>
			</div>
			<section
				className={cn(
					status !== 200 && "justify-center",
					"flex items-center gap-4 !overflow-x-auto max-w-[1400px]"
				)}
			>
				{status !== 200 ? (
					<p className="text-neutral-300">No folders in workspace</p>
				) : (
					<>
						{latestVariable?.status === "pending" ? (
							<Folder
								name={latestVariable.variable.name}
								id={latestVariable.variable.id}
								optimistic
							/>
						) : (
							<>
								{folders.map((folder: any) => (
									<>
										<Folder
											name={
												folder.name
											}
											id={
												folder.id
											}
											count={
												folder
													._count
													.videos
											}
											key={
												folder.id
											}
										/>
									</>
								))}
							</>
						)}
					</>
				)}
			</section>
		</div>
	);
}

export default Folders;
