import axios from "axios";

/* 
    Api documentation:
    https://developers.binance.com/docs/binance-spot-api-docs/rest-api#klinecandlestick-data
*/
const BASE_URLS = [
    'https://api.binance.com/api/v3/klines',
    'https://api-gcp.binance.com/api/v3/klines',
    'https://api1.binance.com/api/v3/klines',
    'https://api2.binance.com/api/v3/klines',
    'https://api3.binance.com/api/v3/klines',
    'https://api4.binance.com/api/v3/klines'
];

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

interface ResponseObject<T> {
    data?: T;
    error?: string;
}

async function getCoinKlines(coin: string, interval: Interval, limit: number = 1000): Promise<ResponseObject<Kline[]>> {
    // Validate required parameters
    if (!coin) {
        return { error: 'Coin is required' };
    }

    if (!interval) {
        return { error: 'Interval is required' };
    }

    for (const baseUrl of BASE_URLS) {
        try {
            const url = new URL(baseUrl);
            url.searchParams.append('symbol', coin);
            url.searchParams.append('interval', interval);
            
            if (limit) {
                url.searchParams.append('limit', limit.toString());
            }

            // Use axios to fetch data
            const { data } = await axios.get(url.toString());
            // If the request is successful, return the data
            return { data };
        } catch (error) {
            // Log the error for debugging (optional)
            console.error(`Error fetching data from ${baseUrl}:`, error);

            // If it's an Axios error with a response, continue to the next base URL
            if (axios.isAxiosError(error) && error.response) {
                continue; // Try the next URL in the list
            }
        }
    }

    // If all attempts fail, return an error message
    return { error: 'All endpoints failed to fetch data' };
}

export default getCoinKlines;