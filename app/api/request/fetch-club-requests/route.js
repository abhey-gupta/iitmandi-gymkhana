import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Request from "@/models/Request";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { member_token } = await req.json();

  const memberData = jwt.verify(member_token, "this is jwt secret");

  try {
    await connectDB();

    const requests = await Request.find({
      club: memberData.club,
    });

    return NextResponse.json({
      success: true,
      message: "Requests fetched successfully",
      requests,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while creating the request : " + error,
    });
  }
}
