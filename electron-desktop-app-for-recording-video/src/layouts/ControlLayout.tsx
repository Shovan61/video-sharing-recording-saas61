import { cn, onCloseApp } from "@/lib/utils";
import { UserButton } from "@clerk/clerk-react";
import { X, VideoIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {
	children: React.ReactNode;
	className?: string;
};

function ControlLayout({ children, className }: Props) {
	const [isVisible, setisVisible] = useState(false);

	window.ipcRenderer.on("hide-plugin", (event, payload) => {
		console.log(event);
		setisVisible(payload.state);
	});

	return (
		<div
			className={cn(
				className,
				isVisible && "invisible",
				"bg-neutral-800 flex px-1 flex-col rounded-3xl overflow-hidden"
			)}
		>
			<div className="flex justify-between items-center p-5 draggable">
				<span className="no-drag">
					<UserButton />
				</span>
				<X
					size={20}
					className="text-gray-400 no-drag hover:text-white cursor-pointer"
					onClick={onCloseApp}
				/>
			</div>
			<div className="flex-1 h-10 overflow-auto">{children}</div>
			<div className="p-5 flex w-full">
				<div className="flex gap-1 items-center">
					<VideoIcon size={25} className="text-white" />
					<span className="text-white text-xs">
						Record and share video
					</span>
				</div>
			</div>
		</div>
	);
}

export default ControlLayout;
