"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Share2, Circle, Eye } from "lucide-react";
import Loader from "../loader";
import CardMenu from "./card-menu";
import CopyToClipBoard from "./copy-clipboard";
import { useRouter } from "next/navigation";

type Props = {
	User: {
		firstName: string | null;
		lastName: string | null;
		image: string | null;
	} | null;
	id: string;
	Folder: {
		id: string;
		name: string;
	} | null;
	createdAt: Date;
	title: string | null;
	source: string;
	processing: boolean;
	workspaceId: string;
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

function VideoCard(props: Props) {
	const router = useRouter();
	const dayAgo = getTimeAgo(props.createdAt);

	return (
		<Card className="w-full max-w-sm !p-0 bg-gray-900/10 h-[380px]  border-gray-700 overflow-hidden">
			<Loader state={props.processing}>
				{/* Top section with white background */}
				<div className="bg-gray-800/20 h-[150px]">
					<video
						controls={false}
						preload="metadata"
						className="w-full aspect-video opacity-50 !h-[150px] cursor-pointer"
						onClick={() =>
							router.push(
								`/dashboard/${props.workspaceId}/video/${props.id}`
							)
						}
					>
						<source
							src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_UR}/${props.source}/#t=1`}
							type="video/mp4"
						/>
						Your browser does not support the video tag.
					</video>
				</div>
				<div className="flex items-center justify-between p-2">
					<div className="flex items-center gap-1">
						<CopyToClipBoard videoId={props.id} />
						<CardMenu
							videoId={props.id}
							currentFolder={props.Folder?.id}
							currentFolderName={props.Folder?.name}
							currentWorkspace={props.workspaceId}
						/>
					</div>

					<Badge className=" bg-gray-800 text-white hover:bg-gray-800">
						120 min To Do
					</Badge>
				</div>

				{/* Bottom section with dark background */}
				<CardContent className="p-6 space-y-4">
					<span className="text-white font-medium text-xs leading-relaxed mb-2">
						How to create an offer so good your clients feel
						stupid saying no.
					</span>

					{/* Profile section */}
					<div className="flex items-center space-x-3 mt-3">
						<Avatar className="w-8 h-8">
							<AvatarImage
								src={props.User?.image || ""}
							/>
							<AvatarFallback className="bg-blue-500 text-white text-xs">
								<User />
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<p className="text-white font-medium text-sm">
								{`${props.User?.firstName} ${props.User?.lastName}`}
							</p>
							<p className="text-gray-400 text-xs">
								{dayAgo}
							</p>
						</div>
					</div>

					{/* Footer info */}
					<div className="flex items-center justify-between mt-3 text-gray-400 text-xs">
						<div className="flex items-center space-x-1">
							<Share2 className="w-3 h-3 " />
							<span>
								{props.User?.firstName} Workplace
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="flex gap-1 items-center">
								<Circle className="h-3 w-3" />
								<span>2 </span>
							</div>
							<div className="flex gap-1 items-center">
								<Eye className="h-3 w-3" />
								<span>2 </span>
							</div>
							<span>{props.processing}</span>
						</div>
					</div>
				</CardContent>
			</Loader>
		</Card>
	);
}

export default VideoCard;
