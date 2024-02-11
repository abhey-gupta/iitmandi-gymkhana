import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Society from "@/models/Society";

export async function POST(req) {
  const { id } = await req.json();
  try {
    await connectDB();

    let society = await Society.findById(id);

    if (society) {
      return NextResponse.json({
        success: true,
        message: "Societies fetched successfully",
        society,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Society doesn't exist : " + error,
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while fetching the societies : " + error,
    });
  }
}
