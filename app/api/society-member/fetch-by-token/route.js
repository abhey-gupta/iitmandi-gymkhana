import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import SocietyMember from "@/models/SocietyMember";

export async function POST(req) {
  const { society_member_token } = await req.json();
  const memberData = jwt.verify(society_member_token, "this is jwt secret");
  try {
    await connectDB();

    let society_member = await SocietyMember.findOne({
      society: memberData.society,
    });

    return NextResponse.json({
      success: true,
      message: "society_member fetched successfully",
      society_member,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while fetching the society_member : " + error,
    });
  }
}
