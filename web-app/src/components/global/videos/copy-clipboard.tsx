import { Paperclip } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
	videoId: string;
};

function CopyToClipBoard({ videoId }: Props) {
	const handleCopy = (e: React.MouseEvent) => {
		e.stopPropagation();
		navigator.clipboard
			.writeText(`${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`)
			.then(() => {
				toast("Copied!", {
					description: "Succefully coied",
					style: { backgroundColor: "white", color: "black" },
				});
			})
			.catch((err) => console.error("Failed to copy: ", err));
	};
	return (
		<>
			<Paperclip
				className="cursor-pointer text-gray-400"
				onClick={(e) => handleCopy(e)}
			/>
		</>
	);
}

export default CopyToClipBoard;
