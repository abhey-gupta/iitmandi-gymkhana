import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Club from "@/models/Club";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { member_token } = await req.json();
  const memberData = jwt.verify(member_token, "this is jwt secret");
  try {
    await connectDB();

    let club = await Club.findOne({ name: memberData.club });

    return NextResponse.json({
      success: true,
      message: "Club fetched successfully",
      club,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while fetching the club : " + error,
    });
  }
}
