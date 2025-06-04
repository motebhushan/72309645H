import { fetchStockHistory } from '../services/stockService.js';
import { calculateAverage, formatPriceHistory } from '../services/aggregationService.js';
import { calculateCorrelation } from '../utils/correlation.js';

export async function getAverageStockPrice(req, res) {
  try {
    const { ticker } = req.params;
    const { minutes, aggregation } = req.query;
    if (aggregation !== 'average') {
      return res.status(400).json({ error: 'Only average aggregation is supported.' });
    }
    const priceHistory = await fetchStockHistory(ticker, minutes);
    const averageStockPrice = calculateAverage(priceHistory);
    res.json({
      averageStockPrice,
      priceHistory: formatPriceHistory(priceHistory)
    });
  } catch (err) {
    if (err.response && err.response.status === 401) {
      return res.status(401).json({ error: 'Unauthorized: Check your API token.' });
    }
    res.status(500).json({ error: err.message });
  }
}

export async function getStockCorrelation(req, res) {
  try {
    const { minutes, ticker } = req.query;
    // Always treat ticker as an array
    let tickers = [];
    if (Array.isArray(ticker)) {
      tickers = ticker;
    } else if (typeof ticker === "string") {
      tickers = [ticker];
    }
    if (tickers.length !== 2) {
      return res.status(400).json({ error: 'Exactly two tickers are required.' });
    }
    const [ticker1, ticker2] = tickers;
    const [history1, history2] = await Promise.all([
      fetchStockHistory(ticker1, minutes),
      fetchStockHistory(ticker2, minutes)
    ]);
    const minLen = Math.min(history1.length, history2.length);
    const prices1 = history1.slice(-minLen).map(p => p.price);
    const prices2 = history2.slice(-minLen).map(p => p.price);

    const correlation = calculateCorrelation(prices1, prices2);

    res.json({
      correlation,
      stocks: {
        [ticker1]: {
          averagePrice: calculateAverage(history1),
          priceHistory: history1
        },
        [ticker2]: {
          averagePrice: calculateAverage(history2),
          priceHistory: history2
        }
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}