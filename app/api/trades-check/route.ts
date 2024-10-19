import getCoinKlines from "@/lib/get-coin-klines";
import { supabaseClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server"

export const revalidate = 2; 

export async function GET(request: Request) {
    let response;
    // Fetch all active trades from the database
    const { data: trades, error } = await supabaseClient
        .from('trades')
        .select('*')
        .eq('status', 'active');

    if (error) {
        response = NextResponse.json(error, { status: 500 });
        return response;
    }

    if (!trades || trades.length === 0) {
        response = NextResponse.json({ message: 'No active trades found' });
        return response;
    }

    for (const trade of trades) {
        const { id, symbol, target_price, stop_loss } = trade;

        // Fetch the latest price for the symbol
        const { data: candles, error } = await getCoinKlines(symbol, '1m', 5);

        if (error || !candles) {
            console.error(`Error fetching candles for ${symbol}:`, error);
            continue; // Skip this trade if there was an error fetching the candles
        }

        const latestPrices = candles.map((candle) => parseFloat(candle[4]));

        const containsTargetPrice = latestPrices.some((price) => price >= target_price);
        const containsStopLossPrice = latestPrices.some((price) => price <= stop_loss);
        // Check if the price hits the target or stop loss
        if (containsTargetPrice) {
            // Update trade status to 'hit_target'
            const { error: updateError } = await supabaseClient
                .from('trades')
                .update({ status: 'hit_target' })
                .eq('id', id);

            if (updateError) {
                console.error(`Error updating trade ${id} to hit_target:`, updateError);
            } else {
                console.log(`Trade ${id} for ${symbol} has hit the target price.`);
            }
        } else if (containsStopLossPrice) {
            // Update trade status to 'hit_stop_loss'
            const { error: updateError } = await supabaseClient
                .from('trades')
                .update({ status: 'hit_stop_loss' })
                .eq('id', id);

            if (updateError) {
                console.error(`Error updating trade ${id} to hit_stop_loss:`, updateError);
            } else {
                console.log(`Trade ${id} for ${symbol} has hit the stop loss.`);
            }
        } else {
            console.log(`Trade ${id} for ${symbol} is still active.`);
        }

        // Sleep for a short period to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500));
    }

    response = NextResponse.json({ message: 'Trades checked' });

    // Set cache-control header to disable caching
    response.headers.set('Cache-Control', 'no-store');

    return response;
}
