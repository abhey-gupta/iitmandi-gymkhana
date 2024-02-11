import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import ClubMember from "@/models/ClubMember";

export async function POST(req) {
  try {
    const { position, email, password } = await req.json();
    console.log(position, email, password);

    // Connecting to the database
    await connectDB();

    // Checking if the user already exists with either email or phone number
    const club_member = await ClubMember.findOne({
      position,
      email,
    });

    console.log(club_member);

    if (club_member) {
      // Decrypting the password and matching it against the user's password
      // const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)

      if (password == club_member.password) {
        console.log("here");
        const token = jwt.sign(
          {
            id: club_member._id,
            type: "Club Member",
            name: club_member.name,
            email: club_member.email,
            club: club_member.club,
            position: club_member.position,
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
        message: "Club Member doesn't exist",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "An error occurred while logging in the club member: " + error,
    });
  }
}
