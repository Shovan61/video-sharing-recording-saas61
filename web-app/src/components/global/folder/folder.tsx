"use client";

import { FolderIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import LoaderItem from "../loader";
import { useMutationData, useMutationStateData } from "@/hooks/useMutationData";
import { RenameFolder } from "@/actions/workspace";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
	name: string;
	id: string;
	optimistic?: boolean;
	count?: number;
};

function Folder({ name, id, count, optimistic }: Props) {
	const pathname = usePathname();
	const router = useRouter();

	const inputRef = useRef<HTMLInputElement | null>(null);
	const folderCardRef = useRef<HTMLDivElement | null>(null);

	const [onRename, setonRename] = useState<boolean>(false);

	const Rename = () => setonRename(true);
	const Renamed = () => setonRename(false);

	const { mutate, isPending } = useMutationData(
		["rename-folder"],
		async (data: { name: string }) => {
			RenameFolder(data.name, id);
		},
		"workspace-folders",
		Renamed
	);

	const { latestVariable } = useMutationStateData(["rename-folder"]);

	const handleFolderClick = () => {
		router.push(`${pathname}/folder/${id}`);
	};

	const handleFolderRename = (e: React.MouseEvent) => {
		Rename();
		e.stopPropagation();
	};

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const updateFolderName = (e: React.FocusEvent<HTMLInputElement>) => {
		if (inputRef.current && folderCardRef.current) {
			// if (
			// 	!inputRef.current.contains(e.target as Node | null) &&
			// 	!folderCardRef.current.contains(e.target as Node | null)
			// ) {
			if (inputRef.current.value) {
				mutate({ name: inputRef.current.value, id });
			} else {
				Renamed();
			}
		}
	};
	// TO Do loading states

	return (
		<div
			className={cn(
				optimistic && "opacity-60",
				"min-w-[240px] cursor-pointer bg-gray-900/5 hover:bg-gray-500/20 transition-colors rounded border-[1px] flex py-6 px-4 items-center justify-between"
			)}
			onClick={handleFolderClick}
			ref={folderCardRef}
		>
			<LoaderItem state={false}>
				<div className="flex flex-col gap-2">
					{onRename ? (
						<>
							<Input
								ref={inputRef}
								placeholder={name}
								className="border-none text-neutral-100 bg-transparent underline h-6 p-2 focus-visible:ring-0 focus-visible:outline-none focus:ring-0 focus:outline-none"
								onClick={(e) => e.stopPropagation()}
								autoFocus
								onBlur={(e) => updateFolderName(e)}
								disabled={isPending}
							/>
						</>
					) : (
						<>
							{latestVariable && latestVariable?.status === "pending" && latestVariable?.variable?.id === id ? (
								<p className="text-sm">
									{
										latestVariable
											.variable
											.name
									}
								</p>
							) : (
								<p
									className="text-sm"
									onDoubleClick={(
										e: React.MouseEvent
									) => handleFolderRename(e)}
									onClick={(e) =>
										e.stopPropagation()
									}
								>
									{name}
								</p>
							)}
						</>
					)}

					<p className="text-xs">{count || 0} videos</p>
				</div>
			</LoaderItem>

			<FolderIcon />
		</div>
	);
}

export default Folder;
