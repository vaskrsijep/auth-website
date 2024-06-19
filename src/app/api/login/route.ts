import { connectMongoDB } from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: any) => {
    await connectMongoDB();

    const { email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return new NextResponse("User not found", { status: 400 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) {
        return new NextResponse("Incorrect password", { status: 400 });
    }

    return new NextResponse("Login successful", { status: 200 });
}