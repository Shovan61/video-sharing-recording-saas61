import CommentForm from "@/components/form/comment-form";
import React from "react";
import CommentCard from "../comment-card/CommentCard";
import { useQueryData } from "@/hooks/useQueryData";
import { getVideoComments } from "@/actions/user";
import SkeletonLoader from "../skeleton";
import { VideoCommentsProps } from "@/types/index.types";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
	author: string;
	videoId: string;
};

function Activity({ author, videoId }: Props) {
	const { data, isFetching } = useQueryData(["video-comments"], () =>
		getVideoComments(videoId)
	);

	const commentsData = data as VideoCommentsProps;

	return (
		<main className="min-h-[40vh] text-white p-6 bg-neutral-800/80 shadow-2xl rounded-md">
			<h2 className="mb-6 text-neutral-300 font-semibold">
				Make canges to your content heres
			</h2>
			<CommentForm author={author} videoId={videoId} />
			<div className="mt-3">
				{isFetching ? (
					<>
						<SkeletonLoader />
					</>
				) : (
					<>
						{commentsData?.status !== 200 ? (
							<>
								<Alert variant="destructive">
									<AlertCircleIcon />
									<AlertTitle>
										No Comments
										Aailable.
									</AlertTitle>
									<AlertDescription>
										<p>
											This video
											has no
											comments
											yet!
										</p>
									</AlertDescription>
								</Alert>
							</>
						) : (
							<>
								{commentsData?.data?.map(
									(comment) => (
										<>
											<CommentCard
												author={{
													firstname:
														comment
															.User
															.firstname ??
														"",
													image:
														comment
															.User
															.image ??
														"",
													lastname:
														comment
															.User
															.lastname ??
														"",
												}}
												comment={
													comment.comment
												}
												reply={
													comment.reply
												}
												videoId={
													comment.videoId ??
													""
												}
												commentId={
													comment.id
												}
												key={
													comment.id
												}
											/>
										</>
									)
								)}
							</>
						)}
					</>
				)}
			</div>
		</main>
	);
}

export default Activity;
