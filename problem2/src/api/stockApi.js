
import axios from "axios";
import qs from "qs";

export const getStockCorrelation = async (minutes, ticker1, ticker2) => {
  return axios.get("http://localhost:3000/stockcorrelation", {
    params: { minutes, ticker: [ticker1, ticker2] },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" })
  });
};