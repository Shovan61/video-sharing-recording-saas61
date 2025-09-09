/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { getUserVideos } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { cn } from "@/lib/utils";
import { VideosResponse } from "@/types/index.types";
import { Video } from "lucide-react";
import React from "react";
import VideoCard from "./video-card";

type Props = {
	folderId: string;
	videoKey: string;
	workspaceId: string;
};

function Videos({ folderId, workspaceId, videoKey }: Props) {
	// TO Do add video logic
	const { data } = useQueryData([videoKey], () => {
		getUserVideos(workspaceId);
	});

	const { status, data: videos } = data as VideosResponse;

	return (
		<div className="flex flex-col gap-4 mt-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Video />
					<h2 className="text-gray-300 text-xl">Videos</h2>
				</div>
			</div>
			<section
				className={cn(
					status !== 200
						? "p-5"
						: "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
				)}
			>
				{status === 200 ? (
					<>
						{videos.map((video) => (
							<VideoCard
								key={video.id}
								Folder={video.Folder}
								User={video.User}
								createdAt={
									new Date(video.createdAt)
								}
								id={video.id}
								processing={video.proccessing}
								workspaceId={workspaceId}
								source={video.source}
								title={video.title}
							/>
						))}
					</>
				) : (
					<p className="text-neutral-300">No videos in workspace</p>
				)}
			</section>
		</div>
	);
}

export default Videos;
