import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Request from "@/models/Request";
import Club from "@/models/Club";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { society_member_token } = await req.json();
  const memberData = jwt.verify(society_member_token, "this is jwt secret");

  try {
    await connectDB();

    const clubs = await Club.find({ society: memberData.society });

    const clubNames = clubs.map((club) => club.name);

    const requests = await Request.find({ club: { $in: clubNames } });

    return NextResponse.json({
      success: true,
      message: "Requests fetched successfully",
      requests,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while fetching the requests: " + error,
    });
  }
}
