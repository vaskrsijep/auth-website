import User from "@/lib/models/User";
import { connectMongoDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {    
    await connectMongoDB();
    
    const {email, password} = await request.json();

    const existingUser = await User.findOne({email});

    if (existingUser) {
        return new NextResponse("User already exists", {status: 400});
    }
    
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        return new NextResponse("User created successfully", {status: 200});
    } catch (error: any) {
        return new NextResponse(error, {
            status: 500,
            statusText: "Internal Server Error"
        })
    }
}