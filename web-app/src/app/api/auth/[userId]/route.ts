import { client } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type Params = {
	params: { userId: string };
};

const origin = {
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type, Authorization",
	},
};

export async function GET(request: Request, { params }: Params) {
	try {
		const { userId } = params;

		const userData = await client.user.findUnique({
			where: {
				clerkId: userId,
			},
			include: {
				studio: true,
				subscriptions: {
					select: {
						plan: true,
					},
				},
			},
		});

		if (userData) return NextResponse.json({ status: 200, data: userData }, origin);

		const clerkUserInstance = await clerkClient();
		const clerkUserInformation = await clerkUserInstance.users.getUser(userId);

		const createUser = await client.user.create({
			data: {
				clerkId: userId,
				email: clerkUserInformation.emailAddresses[0].emailAddress,
				firstName: clerkUserInformation.firstName,
				lastName: clerkUserInformation.lastName,
				studio: {
					create: {},
				},
				workspace: {
					create: {
						name: `${clerkUserInformation.firstName}'s wrokspace`,
						type: "PERSONAL",
					},
				},
				subscriptions: {
					create: {},
				},
			},
			include: {
				subscriptions: {
					select: {
						plan: true,
					},
				},
			},
		});

		if (createUser) {
			return NextResponse.json({ status: 200, data: createUser }, origin);
		}
		return NextResponse.json({ status: 400, data: undefined }, origin);
	} catch (error) {
		console.log(error);
		throw new Error("Error while fetching user information request for desktop");
	}
}
