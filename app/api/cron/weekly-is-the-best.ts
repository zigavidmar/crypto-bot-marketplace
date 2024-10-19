import { getStopLossPrice, getTargetPrice } from "@/lib/calculations";
import getAllUSDTTradingPairs from "@/lib/get-all-usdt-trading-pairs";
import getCoinKlines from "@/lib/get-coin-klines";
import placeOrder from "@/lib/place-order";
import isTradeActive from "@/lib/trade-active";
import { RSI, MACD, ADX, ATR, SMA } from 'technicalindicators';

// Define your trading settings
const STRATEGY = 'weekly-is-the-best';
const INTERVAL = '1w';
const SMA_SHORT_PERIOD = 50;
const SMA_LONG_PERIOD = 200;
const MACD_FAST_PERIOD = 12;
const MACD_SLOW_PERIOD = 26;
const MACD_SIGNAL_PERIOD = 9;
const RSI_PERIOD = 14;
const ADX_PERIOD = 14;
const ATR_PERIOD = 14;

export async function cronWeeklyIsTheBest() {
    const tradingPairs = await getAllUSDTTradingPairs();

    let results = [];
    for (const symbol of tradingPairs) {
        const {
            data: candles,
            error: errorCandles
        } = await getCoinKlines(symbol, INTERVAL);

        if (errorCandles || !candles) {
            console.error(`Error fetching weekly candles for ${symbol}:`, errorCandles);
            continue;
        }

        if (candles.length < 28) {
            continue; // Skip pairs with less than 6 months of data
        }

        const closePrices = candles.map(c => Number(c[4]));
        const highPrices = candles.map(c => Number(c[2]));
        const lowPrices = candles.map(c => Number(c[3]));

        // Calculate indicators
        const smaShort = SMA.calculate({ period: SMA_SHORT_PERIOD, values: closePrices });
        const smaLong = SMA.calculate({ period: SMA_LONG_PERIOD, values: closePrices });
        const macd = MACD.calculate({
            values: closePrices,
            fastPeriod: MACD_FAST_PERIOD,
            slowPeriod: MACD_SLOW_PERIOD,
            signalPeriod: MACD_SIGNAL_PERIOD,
            SimpleMAOscillator: false,
            SimpleMASignal: false
        });
        const rsi = RSI.calculate({ values: closePrices, period: RSI_PERIOD });
        const adx = ADX.calculate({
            close: closePrices,
            high: highPrices,
            low: lowPrices,
            period: ADX_PERIOD
        });
        const atr = ATR.calculate({
            close: closePrices,
            high: highPrices,
            low: lowPrices,
            period: ATR_PERIOD
        });

        // Extract latest values
        const lastSMA50 = smaShort[smaShort.length - 1];
        const lastSMA200 = smaLong[smaLong.length - 1];
        const lastMACD = macd[macd.length - 1];
        const lastRSI = rsi[rsi.length - 1];
        const lastADX = adx[adx.length - 1].adx;
        const lastClose = closePrices[closePrices.length - 1];
        const lastATR = atr[atr.length - 1];

        // Calculate Bullishness/Bearishness Score (range from -100 to +100)
        let trendScore = 0;

        // 1. Moving Average Proximity (0 to +30 or -30)
        if (lastSMA50 > lastSMA200) {
            const percentageDistance = ((lastSMA50 - lastSMA200) / lastSMA200) * 100;
            trendScore += Math.min(30, percentageDistance);
        } else {
            const percentageDistance = ((lastSMA200 - lastSMA50) / lastSMA200) * 100;
            trendScore -= Math.min(30, percentageDistance);
        }

        // 2. MACD Histogram (0 to +30 or -30)
        const macdStrength = lastMACD.histogram;
        trendScore += Math.max(-30, Math.min(30, macdStrength * 10)); // Normalize MACD strength to -30 to +30 range

        // 3. RSI (0 to +20 or -20)
        if (lastRSI > 50) {
            trendScore += Math.min(20, (lastRSI - 50) / 2.5); // Above 50 is bullish
        } else {
            trendScore -= Math.min(20, (50 - lastRSI) / 2.5); // Below 50 is bearish
        }

        // 4. ADX Strength (0 to +20)
        if (lastADX > 25) {
            trendScore += Math.min(20, lastADX - 25); // Strong trends get a boost
        }

        // Entry conditions using the trend score range
        const buyCondition = trendScore >= 30 && trendScore <= 60;
        if (buyCondition) {
            const tradeActive = await isTradeActive(symbol, STRATEGY);
            if (tradeActive) {
                console.log(`Trade already active for ${symbol}`);
                continue;
            }

            // Buy condition met
            const entryPrice = lastClose;
            const targetPrice = getTargetPrice(entryPrice);
            const stopLossPrice = getStopLossPrice(entryPrice);
            await placeOrder(symbol, entryPrice, targetPrice, stopLossPrice, STRATEGY);
        }

        const result = {
            symbol,
            trendScore,
            buyCondition
        };

        results.push(result);
    }

    // Sort results by trend score
    results.sort((a, b) => b.trendScore - a.trendScore);

    return results;
}
