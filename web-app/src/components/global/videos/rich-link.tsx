import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

type Props = {
	title: string;
	id: string;
	source: string;
	description: string;
};

function RichLink({ description, id, source, title }: Props) {
	const copyRichText = () => {
		const originalTitle = title;
		const thumbnail =
			`<a href="${process.env.NEXT_PUBLIC_HOST_URL}/preview/${id}" style={{display: flex, flexDirection: column, gap: 10px}}>
			<h3 style={{textDecoration: none, color: black, margin: 0}}>${originalTitle}</h3>
			<p style={{textDecoration: none, color: black, margin: 0}}>${description}</p>
			<video style={{display: block}} width={320}>
				<source src="${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${source}" type="video/webm"/>
			</video>
			</a>`.trim();

		const blobTitle = new Blob([originalTitle], { type: "text/plain" });
		const blobThumnail = new Blob([thumbnail], { type: "text/html" });

		const data = new ClipboardItem({
			["text/plain"]: blobTitle,
			["text/html"]: blobThumnail,
		});

		navigator.clipboard.write([data]).then(() => {
			return toast("Embedded code copied successfully", {
				description: "Successfully copied!",
				style: { backgroundColor: "white", color: "black" },
			});
		});
	};

	return (
		<Button
			className="rounded-full cursor-pointer border border-neutral-700 shadow-2xl"
			onClick={copyRichText}
		>
			Get Embedded Code
		</Button>
	);
}

export default RichLink;
