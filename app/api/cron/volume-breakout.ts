import { getStopLossPrice, getTargetPrice } from '@/lib/calculations';
import getAllUSDTTradingPairs from '@/lib/get-all-usdt-trading-pairs';
import getCoinKlines from '@/lib/get-coin-klines';
import placeOrder from '@/lib/place-order';
import isTradeActive from '@/lib/trade-active';
import { BollingerBands, ATR } from 'technicalindicators';

const STRATEGY_VOLUME_BREAKOUT = 'volume-breakout';
const VB_INTERVAL = '15m';
const VB_BB_PERIOD = 20;
const VB_ATR_PERIOD = 14;

export async function cronVolumeBreakout() {
    const tradingPairs = await getAllUSDTTradingPairs();
    let results = [];

    for (const symbol of tradingPairs) {
        const candles15m = await getCoinKlines(symbol, VB_INTERVAL);

        if (!Array.isArray(candles15m)) {
            continue;
        }

        const closePrices = candles15m.map(c => Number(c[4]));
        const highPrices = candles15m.map(c => Number(c[2]));
        const lowPrices = candles15m.map(c => Number(c[3]));
        const volume = candles15m.map(c => Number(c[5]));

        const bbands = BollingerBands.calculate({ period: VB_BB_PERIOD, values: closePrices, stdDev: 2 });
        const atr = ATR.calculate({ close: closePrices, high: highPrices, low: lowPrices, period: VB_ATR_PERIOD });

        const lastClose = closePrices[closePrices.length - 1];
        const lastVolume = volume[volume.length - 1];
        const lastBBandUpper = bbands[bbands.length - 1].upper;
        const lastBBandLower = bbands[bbands.length - 1].lower;
        const lastATR = atr[atr.length - 1];

        // Volume breakout above the upper band
        const buyCondition = lastClose > lastBBandUpper && lastVolume > volume[volume.length - 2];
        if (buyCondition) {
            const tradeActive = await isTradeActive(symbol, STRATEGY_VOLUME_BREAKOUT);
            if (tradeActive) {
                continue;
            }

            const entryPrice = lastClose;
            const targetPrice = getTargetPrice(entryPrice);
            const stopLossPrice = getStopLossPrice(entryPrice);

            await placeOrder(symbol, entryPrice, targetPrice, stopLossPrice, STRATEGY_VOLUME_BREAKOUT);
        }

        const result = {
            symbol,
            buyCondition
        };
        results.push(result);
    }

    return results;
}
