import getAllUSDTTradingPairs from "@/lib/get-all-usdt-trading-pairs";
import getCoinKlines from "@/lib/get-coin-klines";
import placeOrder from "@/lib/place-order";
import isTradeActive from "@/lib/trade-active";
import { RSI, MACD, ATR, SMA, BollingerBands } from 'technicalindicators';

// Define your trading settings
const STRATEGY = 'multiframe-madness';
const SYMBOL = 'BTC_USDT';
const HIGHER_INTERVAL = '1h';
const LOWER_INTERVAL = '15m';
const RSI_PERIOD = 14;
const SMA_SHORT_PERIOD = 50;
const SMA_LONG_PERIOD = 200;
const BB_PERIOD = 20;
const ATR_PERIOD = 14;
const MACD_FAST_PERIOD = 12;
const MACD_SLOW_PERIOD = 26;
const MACD_SIGNAL_PERIOD = 9;
const TARGET_PROFIT_MULTIPLIER = 2; // ATR multiplier for take-profit
const STOP_LOSS_MULTIPLIER = 1; // ATR multiplier for stop-loss

export async function cronMultiFrameMadness() {
    const tradingPairs = await getAllUSDTTradingPairs();
    let results = [];
    for (const symbol of tradingPairs) {
        const candles1h = await getCoinKlines(symbol, HIGHER_INTERVAL);
        const candles15m = await getCoinKlines(symbol, LOWER_INTERVAL);

        const closePrices1h = candles1h.map(c => Number(c[4]));
        const closePrices15m = candles15m.map(c => Number(c[4]));
        const highPrices15m = candles15m.map(c => Number(c[2]));
        const lowPrices15m = candles15m.map(c => Number(c[3]));
        const volume15m = candles15m.map(c => Number(c[5]));

        // Calculate indicators for the 1-hour timeframe
        const rsi1h = RSI.calculate({ values: closePrices1h, period: RSI_PERIOD });
        const sma50_1h = SMA.calculate({ period: SMA_SHORT_PERIOD, values: closePrices1h });
        const sma200_1h = SMA.calculate({ period: SMA_LONG_PERIOD, values: closePrices1h });

        // Calculate indicators for the 15-minute timeframe
        const rsi15m = RSI.calculate({ values: closePrices15m, period: RSI_PERIOD });
        const bbands15m = BollingerBands.calculate({ period: BB_PERIOD, values: closePrices15m, stdDev: 2 });
        const atr15m = ATR.calculate({ close: closePrices15m, high: highPrices15m, low: lowPrices15m, period: ATR_PERIOD });
        const macd15m = MACD.calculate({
            values: closePrices15m,
            fastPeriod: MACD_FAST_PERIOD,
            slowPeriod: MACD_SLOW_PERIOD,
            signalPeriod: MACD_SIGNAL_PERIOD,
            SimpleMAOscillator: false,
            SimpleMASignal: false
        });

        // Get the latest indicator values
        const lastRSI1h = rsi1h[rsi1h.length - 1];
        const lastRSI15m = rsi15m[rsi15m.length - 1];
        const lastClose15m = closePrices15m[closePrices15m.length - 1];
        const lastATR15m = atr15m[atr15m.length - 1];
        const lastBBandLower15m = bbands15m[bbands15m.length - 1].lower;
        const lastVolume15m = volume15m[volume15m.length - 1];

        // Determine trend direction based on moving averages
        const smaTrend1h = sma50_1h[sma50_1h.length - 1] > sma200_1h[sma200_1h.length - 1] ? 'bullish' : 'bearish';

        // Calculate MACD divergence on 15m (simple logic for detecting divergence)
        const priceMakingLowerLows = closePrices15m[closePrices15m.length - 2] > lastClose15m;
        const macdMakingHigherLows = macd15m[macd15m.length - 2].histogram < macd15m[macd15m.length - 1].histogram;
        const bullishDivergence = priceMakingLowerLows && macdMakingHigherLows;

        console.log(`RSI 1h: ${lastRSI1h}, RSI 15m: ${lastRSI15m}, Volume 15m: ${lastVolume15m}`);

        // Entry condition: 1-hour RSI above 50, 15-minute RSI below 30, price below lower BB, volume increasing, and bullish divergence
        if (
            lastRSI1h > 50 &&
            lastRSI15m < 30 &&
            lastClose15m < lastBBandLower15m &&
            bullishDivergence &&
            lastVolume15m > volume15m[volume15m.length - 2]
        ) {
            const tradeActive = await isTradeActive(symbol, STRATEGY);
            if (tradeActive) {
                console.log(`Trade already active for ${symbol}`);
                continue;
            }

            // Buy condition met
            const entryPrice = lastClose15m;
            const targetPrice = entryPrice + (TARGET_PROFIT_MULTIPLIER * lastATR15m);
            const stopLossPrice = entryPrice - (STOP_LOSS_MULTIPLIER * lastATR15m);
            await placeOrder(SYMBOL, entryPrice, targetPrice, stopLossPrice, STRATEGY);
        }

        const result = {
            symbol,
            rsi1h: lastRSI1h,
            rsi15m: lastRSI15m,
            close15m: lastClose15m,
            atr15m: lastATR15m,
            volume15m: lastVolume15m,
            smaTrend1h
        };

        results.push(result);
    }

    return results;
}