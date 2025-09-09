"use client";
import React from "react";

import { getUserNotificatons } from "@/actions/user";
import SkeletonLoader from "@/components/global/skeleton";
import { useQueryData } from "@/hooks/useQueryData";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

function NotificationsPage() {
	const { data: response, isPending } = useQueryData(
		["user-notifications"],
		getUserNotificatons
	);

	const { data: notificationsResponseData, status } = response as {
		status: number;
		data: {
			notification: {
				id: string;
				userId: string | null;
				contnet: string;
			}[];
		};
	};

	if (isPending) {
		return <SkeletonLoader rows={12} />;
	}

	if (status !== 200) {
		return (
			<div className="flex justify-center items-center h-full w-full">
				<p>No Notification</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			{notificationsResponseData?.notification?.map((n) => (
				<div
					key={n.id}
					className="border-2 flex gap-1 items-center rounded-lg p-3"
				>
					<Avatar>
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<p className="text-neutral-400">{n.contnet}</p>
				</div>
			))}
		</div>
	);
}

export default NotificationsPage;
