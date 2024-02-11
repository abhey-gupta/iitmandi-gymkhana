import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Request from "@/models/Request";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const {
    heading,
    description,
    quantity,
    total_amount,
    purpose,
    attachment,
    member_token,
  } = await req.json();

  try {
    await connectDB();

    const memberData = jwt.verify(member_token, "this is jwt secret");

    await Request.create({
      heading,
      member_id: memberData.id,
      club: memberData.club,
      description,
      quantity,
      total_amount,
      purpose,
      attachment,
    });

    return NextResponse.json({
      success: true,
      message: "Request created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while creating the request : " + error,
    });
  }
}
