import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Request from "@/models/Request";

export async function POST() {
  try {
    await connectDB();

    const requests = await Request.find();

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
