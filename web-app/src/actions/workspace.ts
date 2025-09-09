"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import nodemailer from "nodemailer";

const sendEmail = async (
	from: string,
	to: string,
	subject: string,
	text: string,
	html?: string
) => {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAILER_EMAIL,
			pass: process.env.MAILER_PASSWORD,
		},
	});

	const info = await transporter.sendMail({
		from,
		to,
		subject,
		text,
		html: html ?? "",
	});

	return info;
};

export const verifyAccessToWorkspace = async (workspaceID: string) => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const isUserInWorkspace = await client.workspace.findUnique({
			where: {
				id: workspaceID,
				OR: [
					{
						User: {
							clerkId: user.id,
						},
						members: {
							every: {
								User: {
									clerkId: user.id,
								},
							},
						},
					},
				],
			},
		});

		return isUserInWorkspace
			? { status: 200, data: isUserInWorkspace }
			: { status: 403, data: null };
	} catch (error) {
		console.log(error);
		return { status: 403, data: null };
	}
};

export const getWorkspaceFolders = async (workspaceID: string) => {
	try {
		const user = currentUser();
		if (!user) return { status: 403 };

		const getFolders = await client.folder.findMany({
			where: {
				workspaceId: workspaceID,
			},
			include: {
				_count: {
					select: {
						videos: true,
					},
				},
			},
		});

		if (getFolders && getFolders.length > 0) {
			return { status: 200, data: getFolders };
		}

		return { status: 403, data: [] };
	} catch (error) {
		console.log(error);
		return { status: 403, data: [] };
	}
};

export const getUserVideos = async (workspaceID: string) => {
	try {
		const user = currentUser();
		if (!user) return { status: 403 };

		const getVideos = await client.video.findMany({
			where: {
				OR: [
					{
						workspaceId: workspaceID,
					},
					{
						folderId: workspaceID,
					},
				],
			},

			select: {
				id: true,
				title: true,
				source: true,
				createdAt: true,
				proccessing: true,
				Folder: {
					select: {
						name: true,
						id: true,
					},
				},
				User: {
					select: {
						firstName: true,
						lastName: true,
						image: true,
					},
				},
			},
			orderBy: {
				createdAt: "asc",
			},
		});

		return getVideos ? { status: 200, data: getVideos } : { status: 403, data: [] };
	} catch (error) {
		console.log(error);
		return { status: 403, data: [] };
	}
};

export const getUserWorkspaces = async () => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const workspaces = await client.user.findUnique({
			where: {
				clerkId: user.id,
			},
			select: {
				subscriptions: {
					select: {
						plan: true,
					},
				},
				workspace: {
					select: {
						id: true,
						name: true,
						type: true,
					},
				},
				members: {
					select: {
						Workspace: {
							select: {
								id: true,
								name: true,
								type: true,
							},
						},
					},
				},
			},
		});

		return workspaces ? { status: 200, data: workspaces } : { status: 403, data: [] };
	} catch (error) {
		console.log(error);
		return { status: 403, data: [] };
	}
};

export const CreateWorkspace = async (name: string) => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const isAuthorized = await client.user.findUnique({
			where: {
				clerkId: user.id,
			},
			select: {
				subscriptions: {
					select: {
						plan: true,
					},
				},
			},
		});

		if (isAuthorized?.subscriptions?.plan === "PRO") {
			const create = await client.user.update({
				where: {
					clerkId: user.id,
				},
				data: {
					workspace: {
						create: {
							name: name,
							type: "PUBLIC",
						},
					},
				},
			});

			if (create) {
				return { status: 200, data: create };
			}
		}
		return { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const RenameFolder = async (name: string, folderId: string) => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const renamed = await client.folder.update({
			where: {
				id: folderId,
			},
			data: {
				name: name,
			},
		});

		if (renamed) {
			return { status: 200, data: renamed };
		}

		return { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const CreateFolders = async (workspaceId: string) => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const newFolders = await client.workspace.update({
			where: {
				id: workspaceId,
			},
			data: {
				folders: {
					create: { name: "Untitled" },
				},
			},
		});

		if (newFolders) {
			return { status: 200, data: newFolders };
		}

		return { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const getFolderInfo = async (folderId: string) => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const folderInfo = await client.folder.findUnique({
			where: {
				id: folderId,
			},
			select: {
				name: true,
				_count: {
					select: {
						videos: true,
					},
				},
			},
		});

		if (folderInfo) {
			return { status: 200, data: folderInfo };
		}

		return { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const MoveVideoLocation = async (folderId: string, videoId: string, workspaceId: string) => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const video = await client.video.update({
			where: {
				id: videoId,
			},
			data: {
				folderId: folderId || null,
				workspaceId: workspaceId,
			},
		});

		if (video) {
			return { status: 200, data: video };
		}

		return { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const getAllVideos = async () => {
	try {
		const user = await currentUser();

		if (!user) return { status: 403 };

		const appUser = await client.user.findUnique({
			where: {
				clerkId: user.id,
			},
		});

		if (!appUser) return { status: 403 };

		const videos = await client.video.findMany({
			where: {
				userId: appUser.id,
			},
			take: 10,
			select: {
				id: true,
				title: true,
				source: true,
				createdAt: true,
				proccessing: true,
				Folder: {
					select: {
						name: true,
						id: true,
					},
				},
				Workspace: {
					select: {
						id: true,
					},
				},
				User: {
					select: {
						firstName: true,
						lastName: true,
						image: true,
					},
				},
			},
			orderBy: {
				createdAt: "asc",
			},
		});

		if (videos.length > 0) {
			return { status: 200, data: videos };
		}

		return { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const getPreviewVideo = async (videoId: string) => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const video = await client.video.findUnique({
			where: {
				id: videoId,
			},
			select: {
				title: true,
				createdAt: true,
				source: true,
				description: true,
				proccessing: true,
				views: true,
				summery: true,
				User: {
					select: {
						firstName: true,
						lastName: true,
						image: true,
						clerkId: true,
						trial: true,
						subscriptions: {
							select: {
								plan: true,
							},
						},
					},
				},
			},
		});

		if (video) {
			return {
				status: 200,
				data: video,
				author: user.id === video.User.clerkId ? true : false,
			};
		}

		return { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const sendEmailForFirstView = async (videoId: string) => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const firstViewSettings = await client.user.findUnique({
			where: {
				clerkId: user.id,
			},
			select: {
				firstView: true,
			},
		});

		if (!firstViewSettings?.firstView) return;

		const video = await client.video.findUnique({
			where: {
				id: videoId,
			},
			select: {
				title: true,
				views: true,
				User: {
					select: {
						email: true,
					},
				},
			},
		});

		if (video && video.views === 0) {
			await client.video.update({
				where: {
					id: videoId,
				},
				data: {
					views: video.views + 1,
				},
			});
		}

		if (!video) return;

		const info = await sendEmail(
			"shovonmazumder61@gmail.com",
			video?.User.email,
			"You got a viewer",
			`Your video ${video.title} just got its first viewer!`
		);

		if (info) {
			const notification = await client.user.update({
				where: {
					clerkId: user.id,
				},
				data: {
					notifications: {
						create: {
							content: `Your video ${video.title} just got its first viewer!`,
						},
					},
				},
			});

			if (notification) return { status: 200 };
		} else {
			return { status: 400, data: "failed to sending email!" };
		}
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};
