/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type Props = {
	state: boolean;
	className?: string;
	color?: string;
	children?: React.ReactNode;
};

function LoaderItem({ state, className, color, children }: Props) {
	if (state) {
		return (
			<div className={cn(className, "!min-w-[40px] flex items-center justify-center")}>
				<Loader className="animate-spin"/>
			</div>
		);
	}
	return <div>{children}</div>;
}

export default LoaderItem;
