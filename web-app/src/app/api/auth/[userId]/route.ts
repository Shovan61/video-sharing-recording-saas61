import { NextResponse } from "next/server";

type Params = {
	params: { userId: string };
};

export async function GET(request: Request, { params }: Params) {
	try {
		const { userId } = params;
	
		const user = {
			id: userId,
			name: "John Doe",
			role: "admin",
		};

		return NextResponse.json(user, {
			headers: {
				"Access-Control-Allow-Origin": "*", 
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
		});
	} catch (error) {
		console.log(error);

		throw new Error("Error while fetching user information request for desktop");
	}
}
