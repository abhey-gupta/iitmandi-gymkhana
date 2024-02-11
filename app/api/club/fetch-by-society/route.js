import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Club from "@/models/Club";

export async function POST(req) {
  const { society } = await req.json();
  try {
    await connectDB();

    let clubs = await Club.find({ society: society });

    return NextResponse.json({
      success: true,
      message: "Clubs fetched successfully",
      clubs,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while fetching the clubs : " + error,
    });
  }
}
