
import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ5MDIwNDUwLCJpYXQiOjE3NDkwMjAxNTAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjdjNzc1MzgyLTZjNDMtNDNkZi1hNmI4LTg0OTg1YjZlMDAxMCIsInN1YiI6Im1vdGViaHVzaGFuNjUyNEBnbWFpbC5jb20ifSwiZW1haWwiOiJtb3RlYmh1c2hhbjY1MjRAZ21haWwuY29tIiwibmFtZSI6ImJodXNoYW4gbW90ZSIsInJvbGxObyI6IjcyMzA5NjQ1aCIsImFjY2Vzc0NvZGUiOiJLUmpVVVUiLCJjbGllbnRJRCI6IjdjNzc1MzgyLTZjNDMtNDNkZi1hNmI4LTg0OTg1YjZlMDAxMCIsImNsaWVudFNlY3JldCI6IlBKWXRHeEFodUtIWm1BekUifQ.I9bsdxqEXz7TJG2sQTZRoMPc1Vg04M0FIgGESMIHBWY'; 

export async function fetchStockHistory(ticker, minutes) {
  let url = `${BASE_URL}/${ticker}`;
  if (minutes) url += `?minutes=${minutes}`;
  const headers = {
    'Authorization': `Bearer ${TOKEN}`
  };
  try {
    const { data } = await axios.get(url, { headers });
    if (Array.isArray(data)) return data;
    if (data.priceHistory) return data.priceHistory;
    if (data.stock) return [data.stock];
    return [];
  } catch (err) {
   
    throw err;
  }
}