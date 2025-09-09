"use client";
import { Workspace } from "@/generated/prisma/client";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
	workspace: Workspace;
};

function GlobalHeader({ workspace }: Props) {
	const pathname = usePathname().split(`/dashboard/${workspace.id}`)[1];

	return (
		<article className="flex flex-col gap-2 px-4">
			<span className="text-gray-600 text-xs">
				{workspace.type.toLocaleUpperCase()}
			</span>

			<h1 className="text-4xl font-bold">
				{pathname && !pathname.includes("folder")
					? pathname.charAt(1).toUpperCase() +
					  pathname.slice(2).toLowerCase()
					: "My Library"}
			</h1>
		</article>
	);
}

export default GlobalHeader;
