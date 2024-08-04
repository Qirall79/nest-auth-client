import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const GET = (req: NextRequest) => {
    const res = NextResponse.json({
        message: "hi"
    })
    cookies().set("hi", "world", {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    })

    res.cookies.set("test", "hello", {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false
    })

    return res;
}