import { supabaseClient } from "@/utils/supabase/client";

async function isTradeActive(symbol: string, strategy: string) {
    const { data, error } = await supabaseClient
        .from("trades")
        .select("symbol")
        .eq("symbol", symbol)
        .eq("trading_bot", strategy)
        .eq("status", "active");

    if (error) {
        console.error("Error fetching active trades:", error.message);
        return false;
    }

    return data.length > 0;
}

export default isTradeActive;