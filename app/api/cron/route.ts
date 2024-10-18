import { NextResponse } from "next/server"
import { cronMultiFrameMadness } from "./multiframe-madness"
import { cronWeeklyIsTheBest } from "./weekly-is-the-best"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    switch (type) {
        case 'multiframe-madness':
            return NextResponse.json(await cronMultiFrameMadness())
        case 'weekly-is-the-best':
            return NextResponse.json(await cronWeeklyIsTheBest())
        default:
            return NextResponse.json({ error: 'Invalid search type' }, { status: 400 })
    }
}
