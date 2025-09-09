"use client";

import { getUserWorkspaces } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import React from "react";
import Modal from "../modal";
import { Button } from "@/components/ui/button";
import { FolderPlusIcon } from "lucide-react";
import WorkspaceForm from "@/components/form/workspace-form";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type Props = {};

function CreateWorkspace({}: Props) {
	const { data } = useQueryData(["user-workspaces"], getUserWorkspaces);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { data: workspace } = data as any;

	if (workspace.subscriptions.plan === "FREE") {
		return (
			<></>
		);
	}
	if (workspace.subscriptions.plan === "PRO") {
		return (
			<Modal
				title="Create a Workspace"
				trigger={
					<Button
						variant="outline"
						className="!bg-white !text-black font-bold rounded-md cursor-pointer hover:!bg-gray-200 transition-colors"
					>
						<FolderPlusIcon />
						Create Workspace
					</Button>
				}
				description="Create to add member and shae video in private"
			>
				<WorkspaceForm />
			</Modal>
		);
	}
}

export default CreateWorkspace;
