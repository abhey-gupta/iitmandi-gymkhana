import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";
import SocietyMember from "@/models/SocietyMember";
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

    const society_member = await SocietyMember.findById(memberData.id);

    if (Object.keys(society_member.monthly_expense).includes(formattedDate)) {
      society_member.monthly_expense[formattedDate] += parseFloat(amount);
    } else {
      society_member.monthly_expense[formattedDate] = parseFloat(amount);
    }

    // Mark the 'monthly_expense' property as modified
    society_member.markModified("monthly_expense");

    await society_member.save();

    return NextResponse.json({
      success: true,
      message: "Society member expense updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message:
        "An error occurred while updaing the Society member expense : " + error,
    });
  }
}
