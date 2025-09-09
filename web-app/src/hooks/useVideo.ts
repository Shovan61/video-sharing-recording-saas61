import { commentSchema } from "@/components/form/comment-form/schema";
import { useMutationData } from "./useMutationData";
import { useQueryData } from "./useQueryData";
import { useZodForm } from "./useZodForm";
import { createCommentAndReply, getUserProfile } from "@/actions/user";

export const useVideoComment = (videoId: string, commentId?: string) => {
	const query = useQueryData(["user-profile"], getUserProfile);

	const user = query.data as {
		status: number;
		data: { id: string; image: string } | undefined;
	};

	const { mutate, isPending } = useMutationData(
		["new-comment"],
		(data: { comment: string }) => {
			if (!user?.data?.id) throw new Error("User not loaded");
			return createCommentAndReply(user.data.id, data.comment, videoId, commentId);
		},
		"video-comments",
		() => reset()
	);

	const { register, onFormSubmit, errors, reset } = useZodForm(mutate, commentSchema);

	return { register, onFormSubmit, isPending, errors };
};
