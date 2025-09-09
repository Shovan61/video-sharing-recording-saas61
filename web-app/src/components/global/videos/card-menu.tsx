"use client";

import React from "react";
import Modal from "../modal";
import { Move } from "lucide-react";
import ChangeVideoLocation from "@/components/form/change-video-locaion";

type Props = {
	videoId: string;
	currentWorkspace?: string;
	currentFolder?: string;
	currentFolderName?: string;
};

function CardMenu({ videoId, currentFolder, currentFolderName, currentWorkspace }: Props) {
	return (
		<Modal
			className="flex items-center cursor-pointer"
			title="Move to new workspace or folder"
			description="Input form for moving this video to a new workspace or a new folder"
			trigger={<Move className="text-gray-400" />}
		>
			<ChangeVideoLocation
				videoId={videoId}
				currentFolder={currentFolder}
				currentFolderName={currentFolderName}
				currentWorkspace={currentWorkspace}
			/>
		</Modal>
	);
}

export default CardMenu;
