import { DEFAULT_STOP_LOSS_PERCENT, DEFAULT_TARGET_PROFIT_PERCENT } from "@/lib/calculations";
import { supabaseClient } from "@/utils/supabase/client"
import moment from "moment";
import Link from "next/link";

interface BotStrategiesResponse {
  id: string;
  name: string;
  created_at: string;
  profit: number;
  totalTrades: number;
}

async function getBotStrategies() {
  const { data, error } = await supabaseClient
    .from("trading_bots")
    .select("*, trades(id, status)");

  if (error) {
    console.error("Error fetching bot strategies:", error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  let botStrategies: BotStrategiesResponse[] = [];

  for (const bot of data) {
    let profit = 0;
    bot.trades.map((trade) => {
      if (trade.status === "hit_target") {
        profit += DEFAULT_TARGET_PROFIT_PERCENT;
      }

      if (trade.status === "hit_stop_loss") {
        profit -= DEFAULT_STOP_LOSS_PERCENT;
      }

      return;
    });

    botStrategies.push({
      id: bot.id,
      name: bot.name,
      created_at: bot.created_at,
      profit,
      totalTrades: bot.trades.length,
    });
  }


  return botStrategies;
}

export default async function Page() {
  const botStrategies = await getBotStrategies();

  return (
    <main className="p-5">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold pb-5">Bot Strategies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {botStrategies.map(({ id: botId, created_at, name, profit, totalTrades }) => (
            <Link href={`/bot-strategies/${botId}`} key={botId} className="bg-foreground p-4 rounded-lg">
              <div>
                <h2 className="text-xl font-bold text-[#a5a6b5]">{name}</h2>
                <p className="text-gray-500 text-sm">Created {moment(created_at).fromNow()}</p>
                <p className="text-lg font-bold mt-2 flex items-center gap-2">
                  Profit: 
                  {profit > 0 && (
                    <span className="text-green-500">+{profit}%</span>
                  )}
                  {profit < 0 && (
                    <span className="text-red-500">-{profit}%</span>
                  )}
                  {profit === 0 && (
                    <span className="text-white">/</span>
                  )}
                </p>
                <p className="text-gray-400 text-sm pt-2">
                  {totalTrades === 0 && (
                    <span className="text-red-500">No trades yet</span>
                  )}
                  {totalTrades > 0 && (
                    <span>Total trades: <b className="text-white">{totalTrades}</b></span>
                  )}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}