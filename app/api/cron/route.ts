import { NextResponse } from "next/server"
import { cronMultiFrameMadness } from "./multiframe-madness"
import { cronWeeklyIsTheBest } from "./weekly-is-the-best"
import { cronMultiTimeframeMomentum } from "./multi-timeframe-momentum"
import { cronStochasticSupportResistance } from "./stochastic-support-resistance"
import { cronVolumeBreakout } from "./volume-breakout"

export const revalidate = 2; 

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    switch (type) {
        case 'multiframe-madness':
            return NextResponse.json(await cronMultiFrameMadness())
        case 'weekly-is-the-best':
            return NextResponse.json(await cronWeeklyIsTheBest())
            case 'multi-timeframe-momentum':
            return NextResponse.json(await cronMultiTimeframeMomentum())
            case 'stochastic-support-resistance':
            return NextResponse.json(await cronStochasticSupportResistance())
            case 'volume-breakout':
            return NextResponse.json(await cronVolumeBreakout())
        default:
            return NextResponse.json({ error: 'Invalid search type' }, { status: 400 })
    }
}
