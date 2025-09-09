import { getUserProfile, getVideoComments } from "@/actions/user";
import { getPreviewVideo } from "@/actions/workspace";
import VideoPreview from "@/components/global/videos/preview";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
	params: { videoId: string };
};

async function VideoPage({ params: { videoId } }: Props) {
	const queryClinet = new QueryClient();

	await queryClinet.prefetchQuery({
		queryKey: ["preview-video"],
		queryFn: () => getPreviewVideo(videoId),
	});

	await queryClinet.prefetchQuery({
		queryKey: ["user-profile"],
		queryFn: getUserProfile,
	});

	await queryClinet.prefetchQuery({
		queryKey: ["video-comments"],
		queryFn: () => getVideoComments(videoId),
	});

	await queryClinet.prefetchQuery({
		queryKey: ["video-comments"],
		queryFn: () => getVideoComments(videoId),
	});
  
	return (
		<HydrationBoundary state={dehydrate(queryClinet)}>
			<VideoPreview videoId={videoId} />
		</HydrationBoundary>
	);
}

export default VideoPage;
