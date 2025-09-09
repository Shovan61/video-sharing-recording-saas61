"use client";

import React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { useQueryData } from "@/hooks/useQueryData";
import { getUserWorkspaces } from "@/actions/workspace";
import { NotificationsProps, UserProps } from "@/types/index.types";
import Modal from "../modal";
import Tooltip from "@/components/ui/customtooltip";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebar-item";
import { getUserNotificatons } from "@/actions/user";

import { FolderOpen, Video, PlusCircle, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import GlobalCard from "../global-card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { WORKSPACES } from "@/redux/slices/workspaces";
import { SignOutButton } from "@clerk/nextjs";
import PaymentButton from "../payment-button";

type Props = {
	actionWorkspaceId: string;
};

const SidebarMain = ({ actionWorkspaceId }: Props) => {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useAppDispatch();

	const { data } = useQueryData(["user-workspaces"], getUserWorkspaces);

	const { data: notifications } = useQueryData(["user-notifications"], getUserNotificatons);

	const { data: user } = data as UserProps;
	const { data: notificationCount } = notifications as NotificationsProps;

	const menuItems = MENU_ITEMS(actionWorkspaceId);
	const currentWorkspace = user?.workspace?.find(
		(curWorkspace) => curWorkspace.id === actionWorkspaceId
	);

	if (user?.workspace.length > 0) {
		dispatch(WORKSPACES({ workspaces: user?.workspace }));
	}

	// TO Do
	// Add Upgrade Button

	const handleChange = (val: string) => {
		router.push(`/dashboard/${val}`);
	};

	const SidebarContent = (
		<div className="bg-[#111111] flex-none relative p-4 h-full w-[240px] flex flex-col gap-4 items-center overflow-hidden">
			<div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-2 flex">
				<Video />
				<span className="text-white text-xs truncate">
					Shovans Video APP
				</span>
			</div>

			<Select defaultValue={actionWorkspaceId} onValueChange={handleChange}>
				<SelectTrigger className="w-[180px] bg-transparent outline-none focus:outline-none ring-0 focus:ring-0">
					<SelectValue placeholder="Select a workspace" />
				</SelectTrigger>
				<SelectContent className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0">
					<SelectGroup>
						{user?.workspace.map((wSpace) => (
							<SelectItem
								value={wSpace.id}
								key={wSpace.id}
							>
								{wSpace.name}
							</SelectItem>
						))}
						{user?.members?.length > 0 && (
							<div>
								{user.members.map((member) => (
									<SelectItem
										value={
											member
												.Workspace
												.id
										}
										key={
											member
												.Workspace
												.id
										}
									>
										{
											member
												.Workspace
												.name
										}
									</SelectItem>
								))}
							</div>
						)}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Separator className="mb-4 text-white" />
			{currentWorkspace?.type === "PUBLIC" &&
				user.subscriptions?.plan === "PRO" && (
					<Modal
						title="Add Workspace"
						trigger={
							<Tooltip content="Invite to workspace">
								<div className="p-1 border group border-neutral-800/90 flex items-center rounded-lg justify-center gap-2 cursor-pointer hover:text-gray-200">
									<PlusCircle
										size={30}
										className="text-neutral-300/90 text-sm cursor-pointer transition-colors group-hover:text-gray-200"
									/>
									<span className="text-sm text-neutral-300/90 transition-colors group-hover:text-gray-200">
										Invite to workspace
									</span>
								</div>
							</Tooltip>
						}
						description="Create new workspace"
					>
						<Search workspaceId={actionWorkspaceId} />
					</Modal>
				)}
			<p className="w-full text-gray-500 font-bold mt-4">Menu</p>
			<nav className="w-full">
				<ul>
					{menuItems?.map((menu, i) => (
						<SidebarItem
							title={menu.title}
							href={menu.href}
							icon={menu.icon}
							selected={pathname === menu.href}
							key={i}
							notifications={
								menu.title === "Notifications"
									? notificationCount._count
											.notifications
									: 0
							}
						/>
					))}
				</ul>
			</nav>
			<Separator className="w-4/5 text-white" />
			<p className="w-full text-gray-500 font-bold mt-4">Workspaces</p>
			{user?.workspace?.length === 1 && user.members.length === 0 && (
				<div className="w-full mt-[-10px]">
					<p className="text-gray-600 font-medium text-sm">
						{user?.subscriptions?.plan === "FREE"
							? "Upgrade to create workspaces"
							: "No workspaces"}
					</p>
				</div>
			)}
			<nav className="w-full">
				<ul className="w-full h-[150px] overflow-auto overflow-x-hidden fade-layer">
					{user?.workspace.map((workspace) => (
						<>
							{workspace.type !== "PERSONAL" && (
								<SidebarItem
									title={workspace.name}
									selected={
										pathname ===
										`/dashboard/${workspace.id}`
									}
									href={`/dashboard/${workspace.id}`}
									icon={<FolderOpen />}
									key={workspace.name}
								/>
							)}
						</>
					))}
					{user?.members?.length > 0 &&
						user.members.map((member) => (
							<>
								<SidebarItem
									title={
										member.Workspace
											.name
									}
									selected={
										pathname ===
										`/dashboard/${member.Workspace.id}`
									}
									href={`/dashboard/${member.Workspace.id}`}
									icon={<FolderOpen />}
									key={member.Workspace.name}
								/>
							</>
						))}
				</ul>
			</nav>
			<Separator className="w-4/5" />
			{user.subscriptions?.plan === "FREE" && (
				<GlobalCard
					title="Upgrade to PRO"
					footer={<PaymentButton />}
					descripttion="Unlock AI features like transcription, AI summary , and more."
				></GlobalCard>
			)}
		</div>
	);

	return (
		<div className="w-[240px]">
			<div className="md:hidden w-[240px] fixed my-4">
				<Sheet>
					<SheetTrigger asChild className="ml-2">
						<Button variant="ghost" className="mt-2">
							<Menu />
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="p-0 w-fit h-full">
						{SidebarContent}
					</SheetContent>
				</Sheet>
			</div>
			<div className="md:block hidden w-[240px] overflow-x-hidden">
				{SidebarContent}
			</div>

			{/* Log out btton */}
			<div className="w-full flex items-center justify-center border border-neutral-700  rounded-xl cursor-pointer">
				<SignOutButton />
			</div>
		</div>
	);
};

export default SidebarMain;
