export function calculateAverage(priceHistory) {
  if (!priceHistory || priceHistory.length === 0) return 0;
  const sum = priceHistory.reduce((acc, entry) => acc + entry.price, 0);
  return sum / priceHistory.length;
}

export function formatPriceHistory(priceHistory) {
  return priceHistory.map(entry => ({
    price: entry.price,
    lastUpdatedAt: entry.lastUpdatedAt
  }));
}