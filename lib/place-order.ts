import { supabaseClient } from "@/utils/supabase/client";

async function placeOrder(symbol: string, entryPrice: number, targetPrice: number, stopLossPrice: number, tradingBot: string) {
    const { error } = await supabaseClient
        .from("trades")
        .insert([
            {
                symbol,
                entry_price: entryPrice,
                target_price: targetPrice,
                stop_loss: stopLossPrice,
                trading_bot : tradingBot,
                status: "active"
            },
        ]);

    if (error) {
        console.error("Error placing order:", error.message);
        return false;
    }

    console.log(`Order placed for ${symbol} at ${entryPrice}`);
    return true;
}

export default placeOrder;