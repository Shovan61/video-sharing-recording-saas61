export type Profile = {
	status: number;
	user: {
		subscription: {
			plan: "PRO" | "FREE";
		} | null;
		studio: {
			id: string;
			screen: string | null;
			mic: string | null;
			preset: "HD" | "SD";
			camera: string | null;
			userId: string | null;
		} | null;
		id: string;
		email: string;
		firstname: string | null;
		lastname: string | null;
		createdAt: Date;
		clerkid: string;
	} | null;
};


export type SourceDevices = {
	displays?: {
		appIcon: null;
		display_id: string;
		id: string;
		name: string;
		thumbnail: unknown[];
	}[];
	audioInputs?: {
		deviceId: string;
		kind: string;
		label: string;
		groupId: string;
	}[];
	error?: string | null;
	isPending: boolean;
};

export type DisplayDevicesActionProps = {
	type: "GET_DEVICES";
	payload: SourceDevices;
};
