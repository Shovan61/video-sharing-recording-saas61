import CreateFolders from "@/components/global/create-folders";
import CreateWorkspace from "@/components/global/create-workspace";
import DashboardVideos from "@/components/global/dashboard-videos";
import Folders from "@/components/global/folder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
	params: { workspaceId: string };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WrokspacePage({ params }: Props) {
	return (
		<>
			<div className="flex gap-x-2 justify-end px-3">
				<CreateWorkspace />
				<CreateFolders workspaceId={params.workspaceId} />
			</div>

			<div className="px-3">
				<Tabs defaultValue="videos" className="mt-6 w-full">
					<TabsList className="bg-transparent gap-2 pl-0">
						<TabsTrigger
							value="videos"
							className="cursor-pointer p-[13px] px-6 rounded-full font-bold border border-gray-400 data-[state=active]:bg-black/30"
						>
							Videos
						</TabsTrigger>
						<TabsTrigger
							value="archive"
							className="p-[13px] px-6 cursor-pointer rounded-full font-bold border border-gray-400 data-[state=active]:bg-black/30"
						>
							Archive
						</TabsTrigger>
					</TabsList>
					<section className="py-9 w-full">
						<TabsContent value="videos" className="w-full">
							<Folders workspaceId={params.workspaceId} />
							<div className="mt-4">
								<DashboardVideos />
							</div>
						</TabsContent>
					</section>
				</Tabs>
			</div>
		</>
	);
}

export default WrokspacePage;
