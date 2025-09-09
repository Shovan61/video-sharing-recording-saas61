import { acceptInvite } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
	params: {
		inviteId: string;
	};
};

async function page({ params: { inviteId } }: Props) {
	const invite = await acceptInvite(inviteId);


	if (invite.status !== 200) {
		return (
			<div className="flex flex-col gap-3 h-screen flex items-center justify-center">
				<h2 className="text-6xl font-bold text-white">404</h2>
				<p className="text-lg text-white">You are not authorized</p>
			</div>
		);
	}

	return redirect("/auth/callback");
}

export default page;
