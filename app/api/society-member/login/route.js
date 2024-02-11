import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import SocietyMember from "@/models/SocietyMember";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    console.log(email, password);

    // Connecting to the database
    await connectDB();

    // Checking if the user already exists with either email or phone number
    const society_member = await SocietyMember.findOne({
      email,
    });

    if (society_member) {
      // Decrypting the password and matching it against the user's password
      // const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)

      if (password == society_member.password) {
        const token = jwt.sign(
          {
            id: society_member._id,
            type: "Society Member",
            name: society_member.name,
            email: society_member.email,
            society: society_member.society,
            position: society_member.position,
          },
          "this is jwt secret"
        );
        return NextResponse.json({
          success: true,
          message: "Logged in successfully",
          member_token: token,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Invalid credentials",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Society Member doesn't exist",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while logging in the society member: " + error,
    });
  }
}
