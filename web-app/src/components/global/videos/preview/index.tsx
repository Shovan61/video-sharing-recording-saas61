/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { getPreviewVideo, sendEmailForFirstView } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { GetPreviewVideoResponse } from "@/types/index.types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "../../skeleton";
import CopyToClipBoard from "../copy-clipboard";
import RichLink from "../rich-link";
import { cn, truncateString } from "@/lib/utils";
import { Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AiTools from "../../ai-tools";
import Transcript from "../../transcript";
import Activity from "../../activity/activity";
import { Button } from "@/components/ui/button";

type Props = {
	videoId: string;
};

const getTimeAgo = (createdAt: string | Date): string => {
	const now = new Date();
	const past = new Date(createdAt);
	const diff = now.getTime() - past.getTime();

	const minutes = Math.floor(diff / (1000 * 60));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));

	if (days > 0) return `${days} day(s) ago`;
	if (hours > 0) return `${hours} hour(s) ago`;
	if (minutes > 0) return `${minutes} minute(s) ago`;

	return "just now";
};

function VideoPreview({ videoId }: Props) {
	const [activeTab, setactiveTab] = useState("ai");

	const router = useRouter();
	const { data, isFetching } = useQueryData(["preview-video"], () =>
		getPreviewVideo(videoId)
	);

	const notifyFirstView = async () => await sendEmailForFirstView(videoId);

	if (isFetching) {
		return <SkeletonLoader rows={12} />;
	}

	const { data: responseData, status, author } = data as GetPreviewVideoResponse;

	if (status !== 200) {
		return router.push(`/dashboard`);
	}

	const daysAgo = getTimeAgo(responseData.createdAt);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (responseData?.views === 0) {
			notifyFirstView();
		}
		return () => {
			notifyFirstView();
		};
	}, [responseData?.views]);

	return (
		<div className="p-3 lg:px-5 lg:py-2 overflow-y-auto">
			<div className="flex flex-col gap-3 mb-6">
				<div className="flex gap-x-5 items-center justify-between">
					<h5 className="text-white text-4xl font-bold">
						{responseData.title}
					</h5>
					{/* Eiit Video if author exists */}
					{/* {author && (
							<EditVideo
								videoId={videoId}
								title={responseData.title}
								description={
									responseData.description
								}
							/>
						)} */}
					<span className="flex gap-2">
						<p className="text-neutral-600 capitalize text-sm">
							{responseData?.User?.firstName}{" "}
							{responseData?.User?.lastName}
						</p>
						<p className="text-neutral-600 text-sm">
							{daysAgo}
						</p>
					</span>
				</div>
				<div className="lg:col-span-1 flex flex-col gap-y-16">
					<div className="flex justify-end items-center gap-x-3">
						<CopyToClipBoard videoId={videoId} />
						<RichLink
							title={responseData.title}
							id={videoId}
							source={responseData.source}
							description={truncateString(
								responseData.description || "",
								150
							)}
						/>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
				<div className="flex flex-col lg:col-span-2 gap-y-10">
					<video
						controls
						preload="metadata"
						className="w-full aspect-video opacity-50 rounded-xl"
					>
						<source
							src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${responseData.source}#1`}
						/>
					</video>
					<div className="flex w-full items-center justify-between">
						<div className="flex flex-col text-2xl gap-y-4">
							<div className="flex gap-x-5 items-center justify-between">
								<p className="text-neutral-600 font-semibold">
									Description
								</p>
							</div>
							{/* {author && (
							<EditVideo
								videoId={videoId}
								title={responseData.title}
								description={
									responseData.description
								}
							/>
						)} */}
							<p className="text-neutral-600 text-sm">
								{responseData.description}
							</p>
						</div>
						<Button
							variant={"default"}
							className="cursor-pointer bg-white text-black hover:bg-gray-200 transition-colors"
						>
							<Download />
							Download
						</Button>
					</div>
				</div>
				<div className="lg:col-span-1 ">
					<Tabs defaultValue={activeTab} onValueChange={setactiveTab}>
						<TabsList className="flex gap-3">
							<TabsTrigger
								value="ai"
								className={cn(
									"cursor-pointer border border-neutral-700 px-3 py-2 shadow-xl",
									activeTab === "ai" &&
										"bg-neutral-500"
								)}
							>
								Ai Toolts
							</TabsTrigger>
							<TabsTrigger
								value="transcript"
								className={cn(
									"cursor-pointer border border-neutral-700 px-3 py-2 shadow-xl",
									activeTab ===
										"transcript" &&
										"bg-neutral-500"
								)}
							>
								Transcript
							</TabsTrigger>
							<TabsTrigger
								value="activity"
								className={cn(
									"cursor-pointer border border-neutral-700 px-3 py-2 shadow-xl",
									activeTab === "activity" &&
										"bg-neutral-500"
								)}
							>
								Activity
							</TabsTrigger>
						</TabsList>
						<TabsContent value="ai">
							<AiTools
								videoId={videoId}
								trial={responseData.User.trial}
								plan={
									responseData.User
										.subscriptions
								}
							/>
						</TabsContent>
						<TabsContent value="transcript">
							<Transcript
								transcript={
									responseData?.description
								}
							/>
						</TabsContent>
						<TabsContent value="activity">
							<Activity
								author={responseData.User.firstName}
								videoId={videoId}
							/>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	);
}

export default VideoPreview;
