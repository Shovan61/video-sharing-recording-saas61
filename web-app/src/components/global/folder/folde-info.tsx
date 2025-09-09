"use client";

import { getFolderInfo } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { FolderTypeSingle } from "@/types/index.types";
import React from "react";

type Props = {
	folderId: string;
};

function FolderInfo({ folderId }: Props) {
	const { data } = useQueryData(["folder-info"], () => {
		getFolderInfo(folderId);
	});

	const { data: folder } = data as FolderTypeSingle;

	return (
		<div className="flex items-center">
			<h2 className="text-gray-300 text-2xl">{folder.name}</h2>
		</div>
	);
}

export default FolderInfo;
