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

    let response;

    switch (type) {
        case 'multiframe-madness':
            response = NextResponse.json(await cronMultiFrameMadness());
            break;
        case 'weekly-is-the-best':
            response = NextResponse.json(await cronWeeklyIsTheBest());
            break;
        case 'multi-timeframe-momentum':
            response = NextResponse.json(await cronMultiTimeframeMomentum());
            break;
        case 'stochastic-support-resistance':
            response = NextResponse.json(await cronStochasticSupportResistance());
            break;
        case 'volume-breakout':
            response = NextResponse.json(await cronVolumeBreakout());
            break;
        default:
            response = NextResponse.json({ error: 'Invalid search type' }, { status: 400 });
            break;
    }

    // Set cache-control header to disable caching
    response.headers.set('Cache-Control', 'no-store');

    return response;
}
