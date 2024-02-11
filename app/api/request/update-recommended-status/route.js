import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Request from "@/models/Request";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { id, member_token } = await req.json();

  const memberData = jwt.verify(member_token, "this is jwt secret");

  try {
    await connectDB();

    const request = await Request.findById(id);
    if (!request) {
      return NextResponse.json({
        success: false,
        message: "Request doesn't exist",
      });
    }

    request.recommendedBy = [
      ...request.recommendedBy,
      {
        memberId: memberData.id,
        memberRole: memberData.position,
        createdAt: new Date(),
      },
    ];

    let updatedRequest = await request.save();

    return NextResponse.json({
      success: true,
      message: "Status updated successfully",
      request: updatedRequest,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while updating the status : " + error,
    });
  }
}
