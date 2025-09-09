import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";

type Props = {
	title: string;
	href: string;
	selected: boolean;
	notifications?: number;
	icon: React.ReactNode;
};

function SidebarItem({ title, icon, href, notifications, selected }: Props) {
	const showBadge = title === "Notifications";

	return (
		<Link href={href}>
			<li
				className={`relative flex gap-2 text-white items-center border border-gray-800 p-1.5 hover:bg-gray-700 rounded-lg transition-colors text-sm mb-2 ${
					selected ? "bg-[#212121]" : ""
				}`}
			>
				<div className="flex items-center gap-2">
					{icon}
					{title}

					{showBadge && (
						<Badge className="absolute -top-2 -right-2 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums text-lg p-2 bg-red-600 text-white">
							{notifications}
						</Badge>
					)}
				</div>
			</li>
		</Link>
	);
}

export default SidebarItem;
