import { client } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function POST(request: NextRequest, parameters: Params) {
  try {
    const {
      params: { id },
    } = parameters;

    console.log("CALLED STUDIO API /api/studio");

    const body = await request.json();

    const studio = await client.user.update({
      where: {
        id: id,
      },
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

    if (studio) {
      return NextResponse.json({ status: 200, message: "Studio updated" });
    }

    return NextResponse.json({
      status: 400,
      message: "Oops Something went wrong!",
    });
    
  } catch (error) {
    console.log(error);
    throw new Error("Error while updating Studio from desktop APP");
  }
}
