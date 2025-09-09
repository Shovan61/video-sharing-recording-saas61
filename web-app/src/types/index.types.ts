export type UserProps = {
	data: {
		subscriptions: {
			plan: "FREE" | "PRO";
		} | null;
		workspace: {
			id: string;
			name: string;
			type: "PUBLIC" | "PERSONAL";
		}[];
		members: {
			Workspace: {
				id: string;
				name: string;
				type: "PUBLIC" | "PERSONAL";
			};
		}[];
	};
};

export type NotificationsProps = {
	status: number;
	data: {
		_count: {
			notifications: number;
		};
	};
};

export type UserWorkspaceResponse =
	| {
			status: 200;
			data: {
				subscriptions: {
					plan: "PRO" | "FREE";
				};
				workspace: {
					id: string;
					name: string;
					type: string;
				} | null;
				members: {
					Workspace: {
						id: string;
						name: string;
						type: string;
					};
				}[];
			};
	  }
	| {
			status: 403;
			data?: [];
	  };

export type FolderTypeSingle = {
	data: {
		id: string;
		name: string;
		workspaceId: string;
		_count: {
			videos: number;
		};
	};
};

export type VideosResponse = {
	status: number;
	data: {
		id: string;
		title: string;
		source: string;
		createdAt: Date;
		proccessing: boolean;
		Folder: {
			name: string;
			id: string;
		} | null;
		User: {
			firstName: string;
			lastName: string;
			image: string;
		} | null;
	}[];
};

export type GetPreviewVideoResponse =
	| {
			status: 200;
			data: {
				title: string;
				createdAt: Date;
				source: string;
				description: string | null;
				proccessing: boolean;
				views: number;
				summery: string | null;
				User: {
					firstName: string;
					lastName: string;
					image: string | null;
					clerkId: string;
					trial: boolean;
					subscriptions: {
						plan: string;
					}[];
				};
			};
			author: boolean;
	  }
	| {
			status: 403;
			data?: undefined;
			author?: undefined;
	  };

export type CommentRepliesProps = {
	id: string;
	comment: string;
	createdAt: Date;
	commentId: string | null;
	userId: string | null;
	videoId: string | null;
	User: {
		id: string;
		email: string | null;
		firstname: string | null;
		lastname: string | null;
		createdAt: Date;
		clerkId: string;
		image: string | null;
		trial: boolean;
		firstView: boolean | null;
	};
};

export type VideoCommentsProps =
	| {
			status: 200;
			data: {
				User: {
					id: string;
					email: string | null;
					firstname: string | null;
					lastname: string | null;
					createdAt: Date;
					clerkId: string;
					image: string | null;
					trial: boolean;
					firstView: boolean | null;
				};
				reply: CommentRepliesProps[];
				id: string;
				comment: string;
				createdAt: Date;
				commentId: string | null;
				userId: string | null;
				videoId: string | null;
			}[];
	  }
	| {
			status: 403;
			data?: undefined;
			author?: undefined;
	  };
