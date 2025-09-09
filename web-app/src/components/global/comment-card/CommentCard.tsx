/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommentRepliesProps } from "@/types/index.types";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommentForm from "@/components/form/comment-form";

type Props = {
	comment: string;
	author: { image: string; firstname: string; lastname: string };
	videoId: string;
	commentId?: string;
	reply: CommentRepliesProps[];
	isReply?: boolean;
};

function CommentCard({ author, comment, reply, videoId, commentId, isReply }: Props) {
	const [onReply, setonReply] = useState<boolean>(false);

	return (
		<Card
			className={cn(
				isReply
					? "bg-[#1D1D1D] border-none pl-10"
					: "border-[1px] bg-[#1D1D1D] p-5"
			)}
		>
			<CardContent>
				<div className="flex gap-x-2 items-center">
					<Avatar className="w-6 h-6">
						<AvatarImage
							src={author.image || ""}
							alt="author"
						/>
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<p className="capitalize text-sm text-neutral-400">
						{author.firstname} {author.lastname}
					</p>
				</div>
				<div>
					<p className="capitalize text-sm text-neutral-400">
						{comment}
					</p>
				</div>
				{!isReply && (
					<>
						<div className="mt-3 flex justify-end">
							{!onReply ? (
								<>
									<Button
										className="bg-neutral-500 hover:bg-neutral-600 cursor-pointer"
										onClick={() =>
											setonReply(
												true
											)
										}
									>
										Reply
									</Button>
								</>
							) : (
								<>
									<CommentForm
										author={
											author.firstname +
											" " +
											author.lastname
										}
										videoId={videoId}
										commentId={
											commentId
										}
										close={() =>
											setonReply(
												false
											)
										}
									/>
								</>
							)}
						</div>
					</>
				)}
				{reply?.length > 0 && (
					<>
						<div className="flex flex-col">
							{reply?.map((r: any) => (
								<CommentCard
									author={{
										firstname: r.User
											.firstname,
										lastname: r.User
											.lastname,
										image: r.User.image,
									}}
									key={r.id}
									isReply
									comment={r.comment}
									commentId={r.commentId}
									reply={[]}
									videoId={videoId}
								/>
							))}
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
}

export default CommentCard;
