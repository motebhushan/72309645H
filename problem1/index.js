import express from 'express';
import cors from 'cors';
import { getAverageStockPrice, getStockCorrelation } from './controllers/stockController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/stocks/:ticker', getAverageStockPrice);
app.get('/stockcorrelation', getStockCorrelation);

const PORT =3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});