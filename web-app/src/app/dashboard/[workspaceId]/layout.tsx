import { getUserNotificatons, onAuthenticateUser } from "@/actions/user";
import {
	getUserVideos,
	getUserWorkspaces,
	getWorkspaceFolders,
	verifyAccessToWorkspace,
} from "@/actions/workspace";
import { redirect } from "next/navigation";
import React from "react";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import SidebarMain from "@/components/global/sidebar/Sidebar";
import GlobalHeader from "@/components/global/global-header";

type Props = {
	params: { workspaceId: string };
	children: React.ReactNode;
};

const Layout = async ({ params, children }: Props) => {
	// Authenticate user first
	const auth = await onAuthenticateUser();

	// Redirect if no user or no workspaces
	if (!auth?.user?.workspace?.length) {
		redirect("/auth/sign-in");
	}

	// Verify access to the specific workspace
	const hasAccess = await verifyAccessToWorkspace(params?.workspaceId);

	// Redirect if no access
	if (hasAccess.status !== 200 || !hasAccess.data) {
		redirect(`/dashboard/${auth.user.workspace[0].id}`); // Fallback to first accessible workspace
	}

	const query = new QueryClient();

	await query.prefetchQuery({
		queryKey: ["workspace-folders"],
		queryFn: () => getWorkspaceFolders(params?.workspaceId),
	});

	await query.prefetchQuery({
		queryKey: ["user-videos"],
		queryFn: () => getUserVideos(params?.workspaceId),
	});

	await query.prefetchQuery({
		queryKey: ["user-workspaces"],
		queryFn: () => getUserWorkspaces(),
	});

	await query.prefetchQuery({
		queryKey: ["user-notifications"],
		queryFn: () => getUserNotificatons(),
	});

	return (
		<HydrationBoundary state={dehydrate(query)}>
			<div className="flex h-screen w-screen">
				<SidebarMain actionWorkspaceId={params?.workspaceId} />
				<div className="w-full pt-10">
					<GlobalHeader workspace={hasAccess.data} />
					<div className="mt-2 px-2">{children}</div>
				</div>
			</div>
		</HydrationBoundary>
	);
};

export default Layout;
