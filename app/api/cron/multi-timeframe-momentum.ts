import getAllUSDTTradingPairs from '@/lib/get-all-usdt-trading-pairs';
import getCoinKlines from '@/lib/get-coin-klines';
import placeOrder from '@/lib/place-order';
import isTradeActive from '@/lib/trade-active';
import { RSI, MACD, ATR } from 'technicalindicators';

const STRATEGY_MTF = 'multi-timeframe-momentum';
const MTF_HIGHER_INTERVAL = '1h';
const MTF_LOWER_INTERVAL = '15m';
const MTF_RSI_PERIOD = 14;
const MTF_ATR_PERIOD = 14;
const MTF_MACD_FAST_PERIOD = 12;
const MTF_MACD_SLOW_PERIOD = 26;
const MTF_MACD_SIGNAL_PERIOD = 9;
const MTF_TARGET_PROFIT_MULTIPLIER = 2;
const MTF_STOP_LOSS_MULTIPLIER = 1;

export async function cronMultiTimeframeMomentum() {
    const tradingPairs = await getAllUSDTTradingPairs();
    let results = [];

    for (const symbol of tradingPairs) {
        const candles1h = await getCoinKlines(symbol, MTF_HIGHER_INTERVAL);
        const candles15m = await getCoinKlines(symbol, MTF_LOWER_INTERVAL);

        if (!Array.isArray(candles1h) || !Array.isArray(candles15m)) {
            continue;
        }

        const closePrices1h = candles1h.map(c => Number(c[4]));
        const closePrices15m = candles15m.map(c => Number(c[4]));
        const highPrices15m = candles15m.map(c => Number(c[2]));
        const lowPrices15m = candles15m.map(c => Number(c[3]));

        const rsi1h = RSI.calculate({ values: closePrices1h, period: MTF_RSI_PERIOD });
        const macd15m = MACD.calculate({
            values: closePrices15m,
            fastPeriod: MTF_MACD_FAST_PERIOD,
            slowPeriod: MTF_MACD_SLOW_PERIOD,
            signalPeriod: MTF_MACD_SIGNAL_PERIOD,
            SimpleMAOscillator: false,
            SimpleMASignal: false
        });
        const atr15m = ATR.calculate({ close: closePrices15m, high: highPrices15m, low: lowPrices15m, period: MTF_ATR_PERIOD });

        const lastRSI1h = rsi1h[rsi1h.length - 1];
        const lastMACD = macd15m[macd15m.length - 1];
        const lastClose15m = closePrices15m[closePrices15m.length - 1];
        const lastATR15m = atr15m[atr15m.length - 1];

        // Entry condition: 1-hour RSI above 50 and 15-minute MACD histogram positive
        if (lastRSI1h > 50 && lastMACD.histogram > 0) {
            const tradeActive = await isTradeActive(symbol, STRATEGY_MTF);
            if (tradeActive) {
                continue;
            }

            const entryPrice = lastClose15m;
            const targetPrice = entryPrice + (MTF_TARGET_PROFIT_MULTIPLIER * lastATR15m);
            const stopLossPrice = entryPrice - (MTF_STOP_LOSS_MULTIPLIER * lastATR15m);

            await placeOrder(symbol, entryPrice, targetPrice, stopLossPrice, STRATEGY_MTF);
        }

        const result = {
            symbol,
            rsi1h: lastRSI1h,
            macd15m: lastMACD,
            close15m: lastClose15m,
            atr15m: lastATR15m
        };
        results.push(result);
    }

    return results;
}