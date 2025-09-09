import FormGenerator from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { useVideoComment } from "@/hooks/useVideo";
import { X, Loader, Send } from "lucide-react";
import React from "react";

type Props = {
	videoId: string;
	author: string;
	commentId?: string;
	close?: () => void;
};

function CommentForm({ videoId, author, close, commentId }: Props) {
	const { errors, isPending, onFormSubmit, register } = useVideoComment(videoId, commentId);

	return (
		<form onSubmit={onFormSubmit} className="relative w-full">
			<div className="flex-1">
				<FormGenerator
					inputType="input"
					placeholder={`Place ${author}'s comment...`}
					type="text"
					name="comment"
					errors={errors}
					register={register}
				/>
			</div>

			<div className="absolute top-[1px] right-3 flex items-center gap-2">
				<Button
					disabled={isPending}
					className="cursor-pointer flex items-center justify-center  bg-transparent hover:bg-transparent"
					variant="ghost"
					type="submit"
				>
					{isPending ? (
						<>
							<Loader
								size={18}
								className="text-white/50 animate-spin"
							/>
						</>
					) : (
						<>
							<Send
								className="text-white/50 cursor-pointer hover:text-white/50"
								size={18}
							/>
						</>
					)}
				</Button>
				{close && (
					<>
						<Button
							className="cursor-pointer flex items-center justify-center bg-transparent hover:bg-transparent"
							variant="ghost"
							type="submit"
							onClick={close}
						>
							<>
								<X
									className="text-white/50 cursor-pointer hover:text-white/50"
									size={18}
								/>
							</>
						</Button>
					</>
				)}
			</div>
		</form>
	);
}

export default CommentForm;
