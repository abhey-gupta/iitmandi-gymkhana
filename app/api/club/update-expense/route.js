import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import Club from "@/models/Club";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { member_token, amount } = await req.json();
  const memberData = jwt.verify(member_token, "this is jwt secret");

  const formattedDate = `${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;
  console.log(formattedDate);

  try {
    await connectDB();

    const club = await Club.findOne({ name: memberData.club });

    if (Object.keys(club.monthly_expense).includes(formattedDate)) {
      club.monthly_expense[formattedDate] += parseFloat(amount);
    } else {
      club.monthly_expense[formattedDate] = parseFloat(amount);
    }

    // Mark the 'monthly_expense' property as modified
    club.markModified("monthly_expense");

    await club.save();

    return NextResponse.json({
      success: true,
      message: "Club expense updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "An error occurred while updaing the club expense : " + error,
    });
  }
}
