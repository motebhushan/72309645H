export function calculateCorrelation(arr1, arr2) {
  if (!arr1.length || arr1.length !== arr2.length) return 0;
  const n = arr1.length;
  const mean1 = arr1.reduce((a, b) => a + b, 0) / n;
  const mean2 = arr2.reduce((a, b) => a + b, 0) / n;
  let cov = 0, var1 = 0, var2 = 0;
  for (let i = 0; i < n; i++) {
    const diff1 = arr1[i] - mean1;
    const diff2 = arr2[i] - mean2;
    cov += diff1 * diff2;
    var1 += diff1 * diff1;
    var2 += diff2 * diff2;
  }
  if (var1 === 0 || var2 === 0) return 0;
  return cov / Math.sqrt(var1 * var2);
}