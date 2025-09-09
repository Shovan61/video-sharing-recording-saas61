import { getFolderInfo, getUserVideos } from "@/actions/workspace";
import FolderInfo from "@/components/global/folder/folde-info";
import Videos from "@/components/global/videos";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
	params: {
		folderId: string;
		workspaceId: string;
	};
};

async function page({ params: { folderId, workspaceId } }: Props) {
	const query = new QueryClient();

	await query.prefetchQuery({
		queryKey: ["folder-videos"],
		queryFn: () => getUserVideos(folderId),
	});

	await query.prefetchQuery({
		queryKey: ["folder-info"],
		queryFn: () => getFolderInfo(folderId),
	});

	return (
		<HydrationBoundary state={dehydrate(query)}>
			<FolderInfo folderId={folderId} />
			<Videos
				workspaceId={workspaceId}
				folderId={folderId}
				videoKey="folder-videos"
			/>
		</HydrationBoundary>
	);
}

export default page;
