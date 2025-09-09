"use client";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutationData } from "@/hooks/useMutationData";
import { useSearch } from "@/hooks/useSearch";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inviteMembers } from "@/actions/user";

type Props = {
	workspaceId: string;
};

const Search = ({ workspaceId }: Props) => {
	const { onSearchQuery, query, isFetching, onUsers } = useSearch("get-users", "USER");

	const { isPending, mutate } = useMutationData(
		["invite-member"],
		(data: { receiverId: string; email: string }) =>
			inviteMembers(workspaceId, data.receiverId, data.email)
	);

	return (
		<div className="flex flex-col gap-y-5">
			<Input
				onChange={onSearchQuery}
				value={query}
				className="bg-transparent border-2 outline-none"
				placeholder="Search for user.."
				type="text"
			/>

			{isFetching ? (
				<div className="flex flex-col gap-y-2">
					<Skeleton className="w-full h-3 rounded-xl bg-neutral-700"></Skeleton>
					<Skeleton className="w-full h-3 rounded-xl bg-neutral-700"></Skeleton>
				</div>
			) : (
				<div>
					{onUsers && onUsers.length > 0 ? (
						<>
							{onUsers.map((user) => {
								return (
									<div
										key={user.id}
										className="flex p-2 justify-between items-center bg-gray-900/80 rounded-md gap-y-2 border-gray-700"
									>
										<div className="flex flex-col">
											<div className="flex gap-2 items-center">
												<Avatar>
													<AvatarImage
														src={
															user.image ||
															""
														}
														alt="avatar"
													/>
													<AvatarFallback>
														<User />
													</AvatarFallback>
												</Avatar>
												<span className="text-xs font-semibold">{`${user.firstName} ${user.lastName}`}</span>
											</div>
											<p className="text-xs font-semibold text-black ml-10 mt-2 border border-neutral-300 bg-white rounded-xl flex items-center justify-center">
												{
													user
														.subscriptions
														.plan
												}
											</p>
										</div>

										<Button
											disabled={
												isPending
											}
											className="bg-white px-3 py-1 rounded flex gap-2 cursor-pointer hover:bg-gray-200 transition-colors"
											onClick={() =>
												mutate(
													{
														receiverId: user.id,
														email: user.email,
													}
												)
											}
										>
											{isPending && (
												<Loader className="animate-spin text-black h-4 w-4"></Loader>
											)}
											<span className="text-black text-xs font-semibold">
												Invite
											</span>
										</Button>
									</div>
								);
							})}
						</>
					) : (
						<span className="text-xs p-2 text-gray-600">
							No user found!
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default Search;
