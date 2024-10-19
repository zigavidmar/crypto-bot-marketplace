import getCoinKlines from "@/lib/get-coin-klines";
import { supabaseClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server"

export const revalidate = 2; 

export async function GET(request: Request) {
    // Fetch all active trades from the database
    const { data: trades, error } = await supabaseClient
        .from('trades')
        .select('*')
        .eq('status', 'active');

    if (error) {
        NextResponse.json(error, { status: 500 });
    }

    if (!trades || trades.length === 0) {
        return NextResponse.json({ message: 'No active trades found' });
    }

    for (const trade of trades) {
        const { id, symbol, target_price, stop_loss } = trade;

        // Fetch the latest price for the symbol
        const candles = await getCoinKlines(symbol, '1m', 1);

        // Check if the candles data is valid before accessing its content
        if (!Array.isArray(candles) || candles.length === 0 || !Array.isArray(candles[0])) {
            console.error(`Invalid candle data for ${symbol}:`, candles);
            continue; // Skip this trade if the data is invalid
        }

        const latestPrice = Number(candles[0][4]);

        // Check if the price hits the target or stop loss
        if (latestPrice >= target_price) {
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
        } else if (latestPrice <= stop_loss) {
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
    }

    return NextResponse.json({ message: 'Trades checked' });
}
