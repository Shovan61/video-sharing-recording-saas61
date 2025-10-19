import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    console.log("CALLED STUDIO API /api/studio");

    const body = await request.json();

    const studio = await client.user.update({
      where: { id },
      data: {
        studio: {
          update: {
            screen: body.screen,
            mic: body.audio,
            preset: body.preset,
          },
        },
      },
    });

    return NextResponse.json(
      studio
        ? { status: 200, message: "Studio updated" }
        : { status: 400, message: "Oops Something went wrong!" },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 500, message: "Error while updating Studio from desktop APP" },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
