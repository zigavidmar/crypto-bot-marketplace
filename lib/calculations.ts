const DEFAULT_TARGET_PROFIT_PERCENT = 3;
const DEFAULT_STOP_LOSS_PERCENT = 2;

function getStopLossPrice(entryPrice: number, stopLossPercent: number = DEFAULT_STOP_LOSS_PERCENT): number {
  return entryPrice - (entryPrice * (stopLossPercent / 100));
}

function getTargetPrice(entryPrice: number, targetProfitPercent: number = DEFAULT_TARGET_PROFIT_PERCENT): number {
  return entryPrice + (entryPrice * (targetProfitPercent / 100));
}

export { getStopLossPrice, getTargetPrice };
