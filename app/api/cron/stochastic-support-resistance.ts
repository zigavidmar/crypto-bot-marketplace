import getAllUSDTTradingPairs from '@/lib/get-all-usdt-trading-pairs';
import getCoinKlines from '@/lib/get-coin-klines';
import placeOrder from '@/lib/place-order';
import isTradeActive from '@/lib/trade-active';
import { Stochastic, ATR } from 'technicalindicators';

const STRATEGY_STOCHASTIC_SR = 'stochastic-support-resistance';
const STOCH_INTERVAL = '15m';
const STOCH_PERIOD = 14;
const STOCH_SIGNAL_PERIOD = 3;
const ATR_PERIOD = 14;
const STOCH_TARGET_PROFIT_MULTIPLIER = 2;
const STOCH_STOP_LOSS_MULTIPLIER = 1;

export async function cronStochasticSupportResistance() {
    const tradingPairs = await getAllUSDTTradingPairs();
    let results = [];

    for (const symbol of tradingPairs) {
        const candles15m = await getCoinKlines(symbol, STOCH_INTERVAL);

        if (!Array.isArray(candles15m)) {
            continue;
        }

        const closePrices = candles15m.map(c => Number(c[4]));
        const highPrices = candles15m.map(c => Number(c[2]));
        const lowPrices = candles15m.map(c => Number(c[3]));
        
        const stoch = Stochastic.calculate({
            high: highPrices,
            low: lowPrices,
            close: closePrices,
            period: STOCH_PERIOD,
            signalPeriod: STOCH_SIGNAL_PERIOD
        });
        const atr = ATR.calculate({ close: closePrices, high: highPrices, low: lowPrices, period: ATR_PERIOD });

        const lastStochK = stoch[stoch.length - 1].k;
        const lastStochD = stoch[stoch.length - 1].d;
        const lastClose = closePrices[closePrices.length - 1];
        const lastATR = atr[atr.length - 1];

        // Entry condition: Stochastic %K below 20 and %K crosses above %D (potential buy signal)
        if (lastStochK < 20 && lastStochK > lastStochD) {
            const tradeActive = await isTradeActive(symbol, STRATEGY_STOCHASTIC_SR);
            if (tradeActive) {
                continue;
            }

            const entryPrice = lastClose;
            const targetPrice = entryPrice + (STOCH_TARGET_PROFIT_MULTIPLIER * lastATR);
            const stopLossPrice = entryPrice - (STOCH_STOP_LOSS_MULTIPLIER * lastATR);

            await placeOrder(symbol, entryPrice, targetPrice, stopLossPrice, STRATEGY_STOCHASTIC_SR);
        }

        const result = {
            symbol,
            stochK: lastStochK,
            stochD: lastStochD,
            close: lastClose,
            atr: lastATR
        };
        results.push(result);
    }

    return results;
}