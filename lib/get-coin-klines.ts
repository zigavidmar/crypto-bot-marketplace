/* 
    Api documentation:
    https://developers.binance.com/docs/binance-spot-api-docs/rest-api#klinecandlestick-data
*/
const BASE_URL = 'https://api.binance.com/api/v3/klines';

type Interval = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';

type Kline = [
    number,  // Kline open time
    string,  // Open price
    string,  // High price
    string,  // Low price
    string,  // Close price
    string,  // Volume
    number,  // Kline close time
    string,  // Quote asset volume
    number,  // Number of trades
    string,  // Taker buy base asset volume
    string,  // Taker buy quote asset volume
    string   // Unused field, ignore
];

async function getCoinKlines(coin: string, interval: Interval, limit: number = 1000): Promise<Kline[]> {
    if (!coin) {
        throw new Error('Coin is required');
    }

    if (!interval) {
        throw new Error('Interval is required');
    }

    const url = new URL(BASE_URL);
    url.searchParams.append('symbol', coin);
    url.searchParams.append('interval', interval);
    if (limit) {
        url.searchParams.append('limit', limit.toString());
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export default getCoinKlines;